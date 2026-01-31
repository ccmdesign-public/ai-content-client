---
title: "Using Go To Schedule And Run Tasks with Dependencies"
author: "Level Up Coding"
platform: "medium"
publicationName: "Level Up Coding"
url: "https://levelup.gitconnected.com/using-go-to-schedule-and-run-tasks-with-dependencies-9259e088bafe?source=rss----5517fd7b58a6---4"
publishedAt: "2026-01-30"
tags:
  - "directed-acyclic-graph"
  - "task-management"
  - "golang"
  - "concurrency"
  - "runnable"
  - "coding"
  - "frameworks"
---

# Using Go To Schedule And Run Tasks with Dependencies

## Go Tutorial

# **Using Go To Schedule And Run Tasks with Dependencies**

## **Learn About Directed Acyclic Graph (DAG) And Topological Sort**

[Alain Drolet](https://medium.com/@alain.drolet.0?source=post_page---byline--9259e088bafe---------------------------------------)

24 min read·20 hours ago

\--

![Fig. 1. A generated DAG with 12 nodes and dependencies across multiple layers. The numbers in the ovals are the names the generator gave to each task. They do not reflect the execution order. All graphics by the author.]()

## **Table of Contents**

• [Summary](#37c9)
• [Motivation](#9439)
• [Context and Limitations](#e310)
• [Data Model](#1b6e)
• [Topological Sort](#5769)
• [Algorithm High-Level View](#4fc1)
• [Library Implementation](#88a7)
◦ [Nodes and DAGs](#a3a5)
◦ [The Algorithm Engine](#2236)
• [The Demo Application (CLI)](#a755)
• [References](#165d)

## **Summary**

This article describes an algorithm for scheduling the concurrent execution of a set of tasks, in which many tasks have ordering dependencies.

The article demonstrates that the dependencies between the tasks can be represented by a Directed Acyclic Graph (DAG) \[[1](https://en.wikipedia.org/wiki/Directed_acyclic_graph)\]. It shows how the graph can be traversed while respecting dependencies by performing a topological sort \[[2](https://en.wikipedia.org/wiki/Topological_sorting)\].

Once the problem is well understood, the article explains how the algorithm is implemented in the Go library, deprunlib. The code of the deprunlib library is part of a larger git repository available in GitLab at:
\[[3](https://gitlab.com/adrolet/deprun)\] [https://gitlab.com/adrolet/deprun](https://gitlab.com/adrolet/deprun).

In addition to the library, the repo stores the code of a CLI application that uses deprunlib. In this demo application, you can see the user code required to properly use deprunlib. With the CLI, you can quickly experiment with deprunlib and various graphs of tasks.

Of interest to some, the CLI has a task implementation that calls an external process. If you want to know how to call and cancel an external process from Go, you may want to read about the ExecRunnable Go type in the file: [examples/example\_common.go](https://gitlab.com/adrolet/deprun/-/blob/main/examples/example_common.go)

## **Motivation**

This article proposes an algorithm and a Go implementation of it that can be used to execute a procedure made up of a set of tasks. The tasks have dependencies. This means that some tasks must be executed first, and others can only be executed once the tasks they depend-on have successfully completed.

The procedure could be about following a workflow to achieve a terminal state. More concretely, it could be an assembly process that builds smaller parts and assembles them into larger parts, to finally bring all parts together to produce a shipping product.

In the past, I used a similar algorithm to drive a load build application. The build process would handle the build of 100s of components, using a large variety of build tools (e.g., make, gcc, javac, gradel…). Basic libraries would be built, then incorporated into applications, and finally, installation disk images and document bundles would be produced.

## **Context and Limitations**

The solution presented here assumes that your procedure can be controlled by an overall software application.

The algorithm is implemented using the Go language and is readily available from a git repo. If Go is not acceptable for your project, you should be able to re-implement the algorithm using any reasonable modern language.

In its simplest form, the tasks of your procedure can all be run within a single OS process instance of an application that uses the deprunlib library. A more complex example could be that of a main OS process sending messages (e.g., using REST or gRPC) to other processes to distribute the workload. Tasks, while initiated from software, could also involve physical maneuvers. For instance, you could be sending messages to a robot to do some manipulations.

As you can see, the algorithm could be applied over a wide range of domains.

One thing the algorithm is not designed for is to conditionally execute subsets of tasks. For this, a task scheduler is not enough; you also need your application to have some control or orchestration abilities.

The only conditional behavior implemented by the library is that it stops the execution of the process as soon as one of the tasks fails. If needed, it would not be too hard to add a configuration that requests the library to attempt to run as many tasks as possible.

## **Data Model**

To implement a scheduling algorithm, we need a structure to store information about the tasks and their dependencies. The natural model for this is a graph. The tasks become graph nodes (aka vertices) and the dependencies become graph links (aka edges).

More precisely, we need a Directed Acyclic Graph, typically abbreviated as DAG \[[1](https://en.wikipedia.org/wiki/Directed_acyclic_graph)\]. Directed means that the links have a direction, i.e., the dependency specifies that node A depends on node B, not the inverse. The graph must also be acyclic. This means that there is no circular dependency in the graph. A circular dependency could look like: node A depends on node B, which depends on node C, which depends on node A. There is no scheduling solution in a graph with cycles. So, if the deprunlib library is fed a DAG with a cycle, it exits and returns an error.

A simple DAG with a root task A that depends on tasks B and C, and whose tasks B and C depend on task D, looks like this.

![Fig. 2. A simple 4 nodes DAG.]()

In this article and in the code, we will often refer to a dependent task as a parent node, and a task being depended on as the child node. In the diagram above, node B and C are parents of node D, and node D is the child of node B and C.

## **Topological Sort**

To process the graph, we need a way to list all nodes. This means having a way to traverse the graph and build a list of unique nodes. One way to do this traversal is to do a topological sort. A topologically sorted list is a list where the first node is one with no dependency, and the last node is depended on by noone.

Here is a slightly edited definition of topological sorting from Wikipedia \[[2](https://en.wikipedia.org/wiki/Topological_sorting)\]:

> A linear ordering of the graph’s vertices such that for every directed edge (u,v) from vertex u to vertex v, u comes before v in the ordering. For instance, the vertices of the graph may represent tasks to be performed, and the edges may represent constraints that one task must be performed before another; in this application, a topological ordering is just a valid sequence for the tasks.
> 
> Precisely, a topological sort is a graph traversal in which each node v is visited only after all its dependencies are visited.

One interesting aspect of topologically sorted lists is that, in DAGs with non-trivial topology, you can have many differently ordered sequences of nodes that satisfy the topological sort requirements.

For instance, in the 4-node DAG of Figure 2, these two sequences are valid:

-   D, B, C, A
-   D, C, B, A

Note that since nodes B and C only depend on node D, they can be executed concurrently, once the execution of Node D has completed.

If we were not aiming to support concurrency, the library could simply take this sorted list and execute the nodes from first to last. In non-trivial DAGs, it will often be valid to execute many nodes at the same time (i.e., these concurrent nodes do not depend on each other, but may depend on some common nodes). It makes sense to design the algorithm to benefit from these concurrency windows to hopefully reduce the overall execution time of the graph.

The scheduling algorithm needs a list of unique nodes, so why not use the topologically sorted list. Also, a benefit of doing a topological sort is that the sorting algorithm detects circularity. This is how the library exits on invalid DAGs.

The sorting algorithm will not be explained further here, but its implementation with comments can be found in: [deprunlib/types.go](https://gitlab.com/adrolet/deprun/-/blob/main/deprunlib/types.go). The sort is initiated by the method TopologicalSort on the Dag struct. TopologicalSort uses the recursive function, walkGraph. These functions are an adaptation of the sorting algorithm presented in the [Depth-first search](https://en.wikipedia.org/wiki/Topological_sorting#Depth-first_search) section of \[2\].

## **Algorithm High-Level View**

Now that we have an understanding of the problem to be solved, let’s present the scheduling algorithm. When I did this the first time, I was expecting that, due to the possible complex topology of some DAGs, the algorithm would be complex. It turned out that the problem could be solved with just a few simple rules.

Here is the high-level description of the scheduling algorithm:

To support concurrent execution, the tasks are executed in a worker pool. The number of tasks being executed concurrently at any one time depends on the number of nodes that are ready at that time, and of course on the size of the pool.

**Initialization:**

-   Linearize the graph into a list by doing a topological sort on it.
-   Scan the list and add each node that has no dependencies (i.e., no children) to a new list of Ready nodes.

**Main loop:**

-   Start a loop that reads nodes from the ready list.
-   As workers are available, execute each node from the ready list.
-   When a node’s task completes successfully, loop on all its parents.
    If a parent has no more unexecuted dependencies,
    add the parent node to the end of the ready list.
-   Exit the loop when there are no more nodes to execute, or on task failure.

Figure 3 below provides a graphical depiction of the algorithm.

![Fig. 3. High-level view of the scheduling algorithm.]()

In the library’s implementation, the green pipes are buffered channels that carry ready nodes as input to the worker pool, and a struct that wraps together a task and its execution result as output.

## **Library Implementation**

The library code is presented in the sections below. To make the code excerpts smaller, most comments and logs have been removed. Also, Getter and Stringer functions are mentioned but not shown. Key types are introduced first, while supporting types are presented after the type that uses them.

After or while reading this article, I suggest you clone the [repo](https://gitlab.com/adrolet/deprun) and explore it with the IDE of your choice. This will allow you to see the fully commented code, and explore the usage examples in the demo application (aka the CLI tool).

### **Nodes and DAGs**

To implement our data model, we need a Go type that represents the DAG nodes, and one that represents the DAG itself. Dependencies will be implemented as references (pointers to nodes) in the node type.

Our node type is called, DagNode, and the DAG type, Dag.

These types and their support types are found in the file [deprunlib/types.go](https://gitlab.com/adrolet/deprun/-/blob/main/deprunlib/types.go).

```
type DagNode struct {    name string    parents []*DagNode    children []*DagNode    state DagNodeState    runnableTask Runnable}type DagNodeState intconst (    NotReady DagNodeState = iota + 1    Ready    Running    Completed    Failed    Cancelled)type Dag struct {    rootNodes []*DagNode}
```

In the DagNode, the key elements are the parents and children slices. Children contains pointers to the nodes this node depends on, and parents contains the nodes that depend on it.

DagNode also contains a runnableTask. This is code provided by the caller of this library. It implements the behavior the caller wants out of this task. The Runnable type is discussed further below.

The name is so far only used for logging or debugging. The library does not depend on it to be unique, although that would be a pretty good idea, and it is not used to match nodes.

The node has a state implemented by the type DagNodeState. As the DAG is processed, the nodes go from the NotReady state to one of the completion states. A node transition to the Ready state is done by following the parents’ references from a child, while a node transition to one of the final states is done on the node itself. The DagNodeState type has a Stringer method that returns a nice human-readable name for each state.

The full state transition diagram is presented in the next figure.

![Fig. 4. DagNode state diagram.]()

The DAG structure is pretty simple. It only stores the root nodes of the DAG. Basically, to process a DAG, we just need the entry point, or points if the DAG has multiple roots. To list all the nodes, the algorithm starts from the roots and traverses the DAG by following the children’s paths.

```
func NewDagNode(name string, runnable Runnable, parents ...*DagNode) *DagNode {    dn := &DagNode{}    dn.name = name    dn.runnableTask = runnable    dn.parents = parents    dn.children = []*DagNode{}    dn.state = NotReady    for _, p := range parents {        p.children = append(p.children, dn)    }    return dn}func (d *DagNode) AddParent(newParent *DagNode) {    d.parents = append(d.parents, newParent)    newParent.children = append(newParent.children, d)}func (n *DagNode) HasDependency() bool {    for _, child := range n.children {        if child.state != Completed {            return true        }    }    return false}
```

The DagNode has methods. To avoid uncontrolled access to the library’s internals by the caller, its fields are only available through getter methods. Also available on the DagNode is a Stringer method. It returns a nicely formatted string that shows all its internal fields, including the list of parents and children. In general, the getters and Stringer are only expected to be used for logging or debugging.

The recommended way to instantiate a DagNode is to use the constructor, NewDagNode. The constructor accepts a name, a Runnable (i.e., a task), and a set of parents, if any, that depend on the node. The list of parents is used to link parent nodes to the new child. The constructor sets its parents slice field to the parents provided in the arguments. It then adds itself to the children slices of each parent. This is how a node becomes part of the DAG. This produces a doubly linked graph structure that can be navigated top-down as well as bottom-up.

To instantiate a root node (i.e., a node without parents), you only pass a name and a Runnable to the constructor.

In some cases, the dependencies, and therefore the parents, cannot be known at instantiation-time. In such a case, you can use the constructor to instantiate the new DagNode without specifying any parent. Later, once you know about the parents, you can call the method AddParent to link a parent node to an existing child node. Repeat this call for every parent. This was not the way I originally expected DAGs to be built, but while working on the CLI run-large-dags command, I realized I needed it. The command run-large-dags generates random DAGs for testing. The way the generation is done, dependencies are added after the nodes are created. You can see how AddParent was used by looking at the code for run-large-dags in [examples/cmd\_run\_large\_dag.go](https://gitlab.com/adrolet/deprun/-/blob/main/examples/cmd_run_large_dag.go).

DagNode additionally provides the method HasDependency. HasDependency is a small utility method used to find out if a parent still has unfulfilled dependencies.

```
type Runnable interface {    Run(node *DagNode, ctx context.Context) (RunnableState, error)}type RunnableState intconst (    RunSuccess RunnableState = iota + 1    RunFailed    RunCancelled)type runnableResult struct {    state RunnableState    err   error    node  *DagNode}
```

The DagNode has a reference to an instance implementing the Runnable interface. This caller-provided instance implements the behavior that defines the task. To be compliant, the instance simply has to implement the Run method.

The Run method receives its wrapping node. The node might only be needed to get the node name for logging. It receives a Context object as well. This is typically used to cancel the task mid-run, if feasible. Optionally, the caller may provide its own Context, which could contain things like a timeout or extra data. Use of Context is discussed further when the engine is presented.

The Run method must return a RunnableState, and if the execution was not successful, an error instance. The RunnableState is an enum that indicates the completion status of the Runnable execution. RunnableState is a type distinct from DagNodeState but can be seen as a subset of it, representing only the completion states. Like all enums in the library, it has a Stringer method that returns a human-readable name for each value.

Within the engine, discussed below, a channel is used to communicate the task execution status. The channel carry instance of the type runnableResult. This type is a simple wrapper that includes: the node, its result state, and an optional error.

## Get Alain Drolet’s stories in your inbox

 from this writer.

To create a Dag instance, one should use the NewDag constructor.

```
func NewDag(roots ...*DagNode) *Dag {    return &Dag{        rootNodes: roots,    }}
```

As an example, here is how you would create the four-node DAG shown in Figure 2.

-   Create the root DagNode and pass it to the constructor NewDag.
-   Create more nodes and link them with their parents already in the DAG.

The code should look like:

```
import (    "context"    "fmt"    "gitlab.com/adrolet/deprun/deprunlib")type PrintingRunnable struct{}func (r PrintingRunnable) Run(node *deprunlib.DagNode, ctx context.Context) (deprunlib.RunnableState, error) {    fmt.Printf("Running Task `%s`\n", node.Name())    return deprunlib.RunSuccess, nil}func createMyDag() *deprunlib.Dag {    var simpleRunnable = &PrintingRunnable{}    rootA := deprunlib.NewDagNode("A", simpleRunnable)    dag := deprunlib.NewDag(rootA)    nodeB := deprunlib.NewDagNode("B", simpleRunnable, rootA)    nodeC := deprunlib.NewDagNode("C", simpleRunnable, rootA)    // D is a leaf, so no need to store it in a variable    deprunlib.NewDagNode("D", simpleRunnable, nodeB, nodeC)    fmt.Println(dag.PlantUmlString("")) // if you want to see its diagram    return dag}
```

The Dag type has two more methods: TopologicalSort and PlantUmlString. TopologicalSort, which uses the function walkGraph, was discussed above.

The method PlantUmlString is an interesting method that returns a string that represents the DAG using the PlantUML syntax \[[5](https://plantuml.com/component-diagram)\]. The string can then be used by itself or embedded in a Markdown file to create a graphical view of the DAG.

The PlantUML string for the DAG in Figure 2 is:

```
```plantuml@startumlskinparam usecase {  BackgroundColor LightSkyBlue}usecase D as ( D )usecase B as ( B )B --> Dusecase C as ( C )C --> Dusecase A as ( A )A --> BA --> C@enduml```
```

The `usecase` keyword is used to produce ovals, instead of the rectangle we would get with the keyword `component`. Note that the weird ordering is due to the way the lines are generated. A human would probably write all the usecase statements first, then write the links, but as long as in the end the rendering is OK, that is all we care about.

### **The Algorithm Engine**

The scheduling and execution algorithm is implemented in a type called Engine and by a set of supporting functions.

This type and its support functions are found in the file [deprunlib/engine.go](https://gitlab.com/adrolet/deprun/-/blob/main/deprunlib/engine.go).

```
type Engine struct {    graph *Dag    nodes []*DagNode    numNodes int}func NewEngine(graph *Dag) (*Engine, error) {    eng := &Engine{graph: graph}    nodes, err := graph.TopologicalSort()    if err != nil {        return nil, err // Invalid DAG. E.g. circularity issue    }    eng.nodes = nodes    eng.numNodes = len(nodes)    return eng, nil}
```

The Engine type simply holds a DAG. Furthermore, it provides a convenient way to access the topologically sorted list of DAG nodes and the number of nodes in the DAG. The Engine type provides getter methods for each field, and the key algorithm methods: Run and RunWithContext.

I do not think the creation of the Engine type was absolutely necessary, but this is how I started it, and where I landed in the end.

An instance of Engine should be created using the constructor function, NewEngine. Since the constructor gets its list of nodes by doing a topological sort, DAGs with cycles are detected and rejected right from the start. DAG validation is one of the benefits of using the Engine type.

The methods Run and RunWithContext execute basically the same code. Run expects no Context instance. Run creates a Context from the default Context and calls RunWithContext with it. Alternatively, the caller of the library can provide its own context and directly call RunWithContext.

Before digging into the code details, the sequence diagram for the RunWithContext, hereafter simply called Run, is presented below. This should help the reader to follow the textual description found below the diagram.

![Fig. 5. Sequence diagram for the Run method.]()

This diagram is a detailed version of the algorithm diagram presented above in Figure 3. It shows the functions, channels, and go routines used by Run.

We can see that the function seedReadyChannel is called to populate the readyChan channel with the nodes that can be executed right away.

Then, two go routines are started. These routines run the functions processNode and handleResult. Each of these starts an infinite loop that reads from an input channel.

The loop in processNode reads one by one the nodes that are ready to be executed from the readyChan channel. It submits each of them to a worker pool implemented by the library, alitto/pond version 2 \[[4](https://github.com/alitto/pond/tree/v2)\].

What is submitted is a closure. This is a function that knows how to run the task of a node and how to report the result. The closure calls node.runnableTask.Run. When node.runnableTask. Run returns, the closure wraps the node, its RunnableState, and a possible error into a runnableResult instance, which is then written to resultChan.

The loop in handleResult reads one by one the runnableResult from the resultChan channel. If the result indicates a success, the parents of the nodes that just completed are inspected. All the parents that no longer have unexecuted dependencies are added at the end of readyChan so that they can get scheduled for execution. If the node failed, the remaining nodes are cancelled, the error is written to the exitChan channel, all loops exit, and the engine.Run method returns the error.

Let’s now look at the code used by the Engine.

```
func (e *Engine) Run(workerPoolSize int) error {    return e.RunWithContext(workerPoolSize, context.Background())}func (e *Engine) RunWithContext(workerPoolSize int, callerCtx context.Context) error {    resultChan := make(chan *runnableResult, e.numNodes)    defer close(resultChan)    readyChan := make(chan *DagNode, e.numNodes)    if callerCtx == nil {        callerCtx = context.Background() // in case caller passes nothing, instead of calling Run().    }    ctx, cancel := context.WithCancel(callerCtx)    seedReadyChannel(readyChan, e.nodes)    exitChan := make(chan error, 1)    var wg sync.WaitGroup    wg.Add(1)    go handleResult(resultChan, readyChan, e.numNodes, &wg, ctx, cancel, exitChan)    wg.Add(1)    go processNode(readyChan, resultChan, workerPoolSize, &wg, ctx)    wg.Wait()    execError := <-exitChan    if execError == nil {        slog.Debug("Run: completed the DAG execution with success")    } else {        slog.Error(fmt.Sprintf("Run: failed the DAG execution: %s", execError.Error()))    }    return execError}func seedReadyChannel(readyChan chan<- *DagNode, nodes []*DagNode) {    for _, node := range nodes {        if !node.HasDependency() {            node.state = Ready            readyChan <- node        }    }}
```

As discussed above, Run simply provides a Context if none was provided, then call RunWithContext.

The method RunWithContext sets up what can be seen as a pipeline system, initiates flow in it, then waits for it to complete.

RunWithContext creates the two pipes. These are buffered channels, sized to the number of nodes in the DAG. Typically, the number of nodes in any of the channels is likely to be a small fraction of all the DAG’s nodes. Since we cannot guarantee this, we sized them large enough so that we can never block on write, and potentially end up with a deadlock. This was tested with DAGs of up to 100 thousands nodes and worked very well.

A third channel is also created, exitChan. It is used by handleResult to communicate back to RunWithContext that something failed and why.

To avoid resource leaks, channels should be closed when no longer needed. In Go, writing to a closed channel results in panic. For this reason, the channel is typically closed by the writer, making the writer able to determine when it is safe to write. For these reasons, the readyChan and exitChan channels are closed when their writer, handleResult, exits. This is done using defer statements in handleResult.

The situation for the resultChan channel is a little bit more complicated. The channel is written by each task closure, in ephemeral routines created by the worker pool. Given that we have multiple, possibly concurrent, writers, the next safe place to close resultChan is in RunWithContext, once we know that all the activities are over, i.e., when the method returns.

Once readyChan is created, seedReadyChannel is called. It simply loops on every node in the DAG. When it finds a node with no dependencies, i.e., no children, it writes this node to the readyChan. These nodes are the first ones that will be executed in the DAG. Their execution will lead to more nodes becoming ready for execution. The process continues until all nodes are executed or one fails.

Another important aspect of RunWithContext is that it creates two Go routines to execute: handleResult and processNode. A WaitGroup is created before starting the routines, so that RunWithContext can block on it until handleResult and processNode routines terminate.

Following the Wait statement, RunWithContext blocks on reading from exitChan. Potentially, blocking only on exitChan would have made the job of stopping RunWithContext from exiting too early, but properly waiting for the two go routines to exit first is cleaner and safer.

Reading from exitChan is used as an easy way for the routine running handleResult to communicate the exit status back to RunWithContext. RunWithContext needs this info to determine if it should return with a success, a nil error, or an actual error message.

Now, let’s examine the code running in the two supporting routines started by RunWithContext.

```
func processNode(readyChan <-chan *DagNode, resultChan chan<- *runnableResult,    workerPoolSize int, wg *sync.WaitGroup, engineCtx context.Context) {    defer wg.Done()    wp := pond.NewPool(workerPoolSize, pond.WithContext(engineCtx))    defer func() { <-wp.Stop().Done() }()    for node := range readyChan {        runClosure := func() {            if engineCtx.Err() != nil {                result := &runnableResult{                    state: RunCancelled,                    err:   fmt.Errorf("context was cancelled, before this node was run"),                    node:  node,                }                resultChan <- result                return            }            node.state = Running            runState, err := node.runnableTask.Run(node, engineCtx)            result := &runnableResult{                state: runState,                err:   err,                node:  node,            }            resultChan <- result        } // end of runClosure        wp.Submit(runClosure) // Ask the worker pool to queue it and run it    }}
```

The function processNode runs an infinite loop that reads nodes ready for execution from the readyChan channel.

At its start, processNode defers a call to the Done method of the WaitGroup created by RunWithContext. This way, no matter how the function exits, RunWithContext will unblock and return.

Before the infinite loop starts, a worker pool is created using the alitto/pond \[[4](https://github.com/alitto/pond/tree/v2)\] library. A Context is passed to the worker pool. If this Context is later cancelled, the pool will abort as soon as possible. The creation is followed by a deferred call to the Stop().Done() method of the worker pool. This is how we ensure that the worker pool resources are cleaned up when processNode exits. Note that Stop only asks the pool to stop accepting new tasks; in-flight tasks may still be running. By reading from the channel returned by the call to Done on the future returned by Stop, we block until the pool is fully shut down; only then can the defer returns. Also note that the defer on the WaitGroup will be executed after the defer on Stop().Done(). In Go, defers are executed in a LIFO order. This means that the WaitGroup will not be released until after all tasks in the pool have completed or have been cancelled.

In the loop, a closure function is created for each node read. This closure provides the behavior needed to run the Node’s task and report its execution. The closure has access to all the variables that are in scope where the closure is defined; this means all the arguments of processNode, the current node, etc. The closure test first that the engine Context has not been cancelled. If it was cancelled, it marks the node as RunCancelled and returns it without executing it. Otherwise, the node’s task is executed by calling node.runnableTask.Run. On completion, the task’s execution status is wrapped in a runnableResult and then written to the resultChan channel.

Once created, the closure is submitted to the worker pool, where its behavior is eventually executed. The maximum number of concurrent tasks is enforced by the worker pool based on the pool size specified when the pool was created.

```
func handleResult(resultChan <-chan *runnableResult, readyChan chan<- *DagNode,    numNodes int, wg *sync.WaitGroup, engineCtx context.Context, cancel context.CancelFunc,    exitChan chan error) {    defer wg.Done()    defer close(readyChan) // triggers the reader function, processNode, to terminate    defer close(exitChan)  // unblocks Engine.RunWithContext    var numDoneNodes int = 0 // used to determine when we processed the whole DAG    for nodeResult := range resultChan {        node := nodeResult.node        switch nodeResult.state {        case RunSuccess:            node.state = Completed            numDoneNodes++            if numDoneNodes == numNodes {                return            }            updateParentState(node, readyChan, engineCtx)        case RunFailed:            node.state = Failed            var errMsg string            if nodeResult.err != nil {                errMsg = nodeResult.err.Error()            }            fullMsg := fmt.Sprintf("handleResult: aborting: Node `%s` failed its execution. Error: %s", node.name, errMsg)            cancel()            exitChan <- errors.New(fullMsg) // tell Engine.RunWithContext we failed            return        case RunCancelled:            node.state = Cancelled // The task was cancelled while in the worker pool            slog.Debug(fmt.Sprintf("handleResult: node `%s` was cancelled", node.name))        default:            slog.Error(fmt.Sprintf("handleResult: node `%s` read from resultChan with unexpected result state: %s", node.name, nodeResult.state))        }    }}
```

The function handleResult runs an infinite loop that reads runnableResult instances from the resultChan channel.

At its start, it defers a call to the Done method of the WaitGroup created by RunWithContext. Just like in processNode, this allows RunWithContext to unblock and return.

This is followed by defer statements that close the channels handleResult writes to: readyChan and exitChan. Again, the defers order (close‑>close‑>Done) is important.

HandleResult is the function that determines when all the nodes have been executed. This is done by simply counting the number of executed nodes in the variable numDoneNodes.

Within the infinite loop, the function tests the task execution state and reacts appropriately to each runnableResult instance read.

On success, the node state is set to Completed. Note that the task execution state and the node state, while aligned, are two different states. We then add one to the number of nodes done. We return if the whole DAG has been executed. If nodes are remaining, updateParentState is called to find out if more nodes can now be scheduled (see more below).

If the task failed, the node state is set to Failed. An error message is also created that includes the message from the task if one is provided.

On failure, we call the cancel function that was provided as an argument. The cancel function was obtained when the Context was created in RunWithContext with the statement:

> `ctx, cancel := context.WithCancel(callerCtx)`

Cancelling the Context terminates the worker pool and can be acted on by the task Runnable implementation, if it chooses to. See an example in: [ExecRunnable.Run](https://gitlab.com/adrolet/deprun/-/blob/main/examples/example_common.go).

The RunFailed case concludes by writing an error message on the exitChan. This write releases the last read block in RunWithContext, allowing it to process the error and return.

If the runnableResult shows a state of RunCancelled, we simply set the node state to Cancelled, log it, and go to read the next instance. This should be a rare event since when a task fails, the resultChan read loop exits. Tasks cancelled while in the worker pool will therefore most likely never be read. In concurrent systems, you can never be absolutely sure of what is happening in races. By having a proper block for RunCancelled, we ensure at least some form of logging. This would be useful if one wanted to modify this library to support a mode where, on failure, as many tasks as possible are still run, instead of the, exit on first failure, mode.

HandleResult is the only function that triggers the unraveling of the pipeline system built by RunWithContext, and therefore the end of any of the engine’s Run calls. HandleResult has three mandatory statements that make Run stop, two are: close on exitChan, and Done on the WaitGroup. The third is close on readyChan. Closing readyChan is important since it is the event that will make processNode return and call Done on the WaitGroup.

Finally, let’s look at our last library function, updateParentState.

```
func updateParentState(node *DagNode, readyChan chan<- *DagNode, engineCtx context.Context) {    if engineCtx.Err() == nil {        if node.state == Completed {            for _, parent := range node.parents {                if !parent.HasDependency() {                    if parent.state == NotReady {                        parent.state = Ready                        readyChan <- parent                    }                }            }        } else {            slog.Error(fmt.Sprintf("updateParentState: Node `%s` with unexpected state: %s", node.name, node.state))        }    } else {        slog.Debug(fmt.Sprintf("updateParentState: skipping node `%s` since the run has been cancelled", node.name))    }}
```

It is a support function of handleResult. Its role is to look at all the parents of a node that just completed and determine if some parents are now ready to be executed.

To be safe, the core of the function is only executed if the engine was not cancelled, and if the current node, a child, is still in the Completed state, and not in the Cancelled state. Given the way handleResult is written, this is almost impossible, but again in concurrent systems, we should always be ready for races or unexpected ordering.

The core behavior is a loop on all the parents. For each, we test if the parent node has all its children executed. If so, we set the parent state to Ready and add it to the readyChan channel. This is done only if the parent is in the NotReady state. This test ensures that the parent is added to the channel only once. Without this test, multiple additions of the same node could have been possible if two children completed almost at the same time and were both present in resultChan. This way, only the first child processed triggers the parent’s state change. Any other child node would be ignored.

## **The Demo Application (CLI)**

Examples on how to use the library can be found in a demo application in the git repository. The application provides a Command Line Interface (CLI) from which various sub-commands can be run.

The application’s code can be found in the [examples](https://gitlab.com/adrolet/deprun/-/tree/main/examples) directory of the repo.

The code was tested on MacOS, but is likely to run as-is on Linux. Minor modifications will probably be needed to run on Windows.

To get help on the top-level command, you can run this line from the top directory of the repo.

```
% go run ./examples -hUsage:  examples [command]Available Commands:  completion     Generate the autocompletion script for the specified shell  create-dag     Instantiates a known DAG and prints its content.  help           Help about any command  list-dags      Prints the list of known DAG names.  run-dag        Instantiates a known DAG and executes it.  run-large-dags Generates random DAGs and runs them.Flags:  -h, --help      help for examples  -V, --verbose   Write debug logs to stderr.  -v, --version   version for examplesUse "examples [command] --help" for more information about a command.
```

For instance, here is how you would call the run-dag command.

```
# Printing the help for run-dag% go run ./examples run-dag -hInstantiates the DAG named in the argument and executes it.Usage:  examples run-dag dagName [flags]Flags:  -h, --help                   help for run-dag  -w, --worker-pool-size int   The maximum number of workers to use for concurrency. 0 = number of CPUs. (default 2)Global Flags:  -V, --verbose   Write debug logs to stderr.# Executing the run-dag command on one of the demo DAGs% go run ./examples run-dag SingleRootSimpleDag -w 0Running Task `E`Running Task `G`Running Task `F`Running Task `D`Running Task `B`Running Task `C`Running Task `A`
```

More information about the CLI app can be found in the [examples/README.md](https://gitlab.com/adrolet/deprun/-/blob/main/examples/README.md) file. The code is also amply commented.

If you are interested in simulations or the creation of DAGs with random topologies, you should review the code used for the run-large-dags command. The command’s code is very different than the code used for the deprunlib, but might interest some of you. To guide you in your exploration, read the section named `Implementation of the run-large-dags CLI Command` near the end of the [examples/README.md](https://gitlab.com/adrolet/deprun/-/blob/main/examples/README.md) file.

The bulk of the code for run-large-dags is in [examples/cmd\_run\_large\_dag.go](https://gitlab.com/adrolet/deprun/-/blob/main/examples/cmd_run_large_dag.go), with a few functions in [random/generators.go](https://gitlab.com/adrolet/deprun/-/blob/main/random/generators.go)\].

## **References**

\[1\] Wikipedia: Directed acyclic graph
[https://en.wikipedia.org/wiki/Directed\_acyclic\_graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph)

\[2\] Wikipedia: Topological sorting
[https://en.wikipedia.org/wiki/Topological\_sorting](https://en.wikipedia.org/wiki/Topological_sorting)

\[3\] Deprun git repository (includes the deprunlib library)
[https://gitlab.com/adrolet/deprun](https://gitlab.com/adrolet/deprun)

\[4\] Pound library, version 2.
Pond is a minimalistic and high-performance Go library designed to elegantly manage concurrent tasks.
[https://github.com/alitto/pond/tree/v2](https://github.com/alitto/pond/tree/v2)

\[5\] PlantUml Component Diagram
[https://plantuml.com/component-diagram](https://plantuml.com/component-diagram)