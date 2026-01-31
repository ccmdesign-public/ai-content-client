---
title: "Mastering Java Concurrency: Advanced Executors"
author: "The Backend Tech"
platform: "medium"
publicationName: "The Backend Tech"
url: "https://medium.com/thebackendtech/mastering-java-concurrency-advanced-executors-27de97cbc4bd?source=rss----33614872e155---4"
publishedAt: "2024-11-02"
tags:
  - "tech"
  - "development"
  - "programming"
  - "java"
  - "technology"
  - "backend"
  - "architecture"
---

# Mastering Java Concurrency: Advanced Executors

# Mastering Java Concurrency: Advanced Executors

## A Guide to Using `ScheduledExecutorService`, `ThreadFactory`, and `ThreadPoolExecutor` for Efficient Task Execution

[Somnath Musib](/@musibs?source=post_page---byline--27de97cbc4bd---------------------------------------)

8 min read·Nov 2, 2024

\--

Listen

Share

![Jyväskylä, Finland, Image Courtesy: Unsplash, Tommaso Fornoni]()

In the [previous article](/thebackendtech/mastering-java-concurrency-core-concepts-and-essentials-6e5291cd324a), we talked about some of the core interfaces of the `java.util.concurrent`package. This article will dive into more advanced constructs — *ScheduledExecutorService*, *ThreadFactory*, and *ThreadPoolExecutor*.

### ScheduledExecutorService

This special type of **Executor can schedule tasks to run after a given delay or to execute periodically**. This interface has the following methods:

```
public ScheduledFuture<?> schedule(Runnable command,                                   long delay,                                    TimeUnit unit);public <V> ScheduledFuture<V> schedule(Callable<V> callable,                                       long delay,                                        TimeUnit unit);public ScheduledFuture<?> scheduleAtFixedRate(Runnable command,                                              long initialDelay,                                              long period,                                              TimeUnit unit);public ScheduledFuture<?> scheduleWithFixedDelay(Runnable command,                                                 long initialDelay,                                                 long delay,                                                 TimeUnit unit);
```

The *schedule(..)* method schedules a *Runnable* or *Callable* to execute after the supplied delay. This is for one-off execution.

The following example demonstrates the use of *ScheduledExecutorService* with a **Runnable** implementation with a delay of 1 second.

```
ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(1);scheduledExecutorService.schedule(() -> System.out.println("Executed by "+Thread.currentThread().getName()),                                   1,                                   TimeUnit.SECONDS);
```

The following example demonstrates the use of *ScheduledExecutorService* with a **Callable** implementation with a delay of 1 second.

```
// 1) Create an instance of scheduledExecutorService. In this example, we // are creating a ScheduledThreadPool with 1 thread.ScheduledExecutorService scheduledExecutorService = Executors.newScheduledThreadPool(1);// 2) Submit an instance of Callable with a delay of 10 seconds.ScheduledFuture<Integer> callableSum = scheduledExecutorService.schedule(() -> {    return IntStream.rangeClosed(1,10).sum();}, 10, TimeUnit.SECONDS);System.out.println("Execution to callableSum is "+(callableSum.isDone() ? "done" : "not done ") +"and has delay of "+callableSum.getDelay(TimeUnit.SECONDS) +" seconds.");TimeUnit.SECONDS.sleep(3);System.out.println("Execution to callableSum is "+(callableSum.isDone() ? "done" : "not done ") +"and has delay of "+callableSum.getDelay(TimeUnit.SECONDS) +" seconds.");int result = callableSum.get();System.out.println("Execution to callableSum is "+(callableSum.isDone() ? "done " : "not done ") +"and result is "+result);scheduledExecutorService.shutdown();
```

The return type of *schedule(..)* method of the *Callable* variant is *ScheduledFuture* which is a special type of *Future.* The *ScheduledFuture* adds the capabilities of the *Delayed* interface which lets us inspect the pending delay of the submitted job.

The following is the outcome of the above code snippet:

```
Execution to callableSum is not done and has delay of 9 seconds.Execution to callableSum is not done and has delay of 6 seconds.Execution to callableSum is doneand result is 55
```

The *scheduleAtFixedRate(..)* and *scheduleAtFixedDelay(..)* lets us schedule tasks that execute periodically. The main difference between these two methods lies in how they execute the task.

The scheduleAtFixedRate(..) lets us submit a periodic action that becomes enabled first after the given initial delay, and subsequently with the given period; that is, executions will commence after *initialDelay* then *initialDelay + period*, then *initialDelay + 2 \* period* and so on.

Let us see the use of *scheduleAtFixedRate(..)* in the following example:

```
scheduledExecutorService.scheduleAtFixedRate(() -> System.out.println("Executing at "+ LocalDateTime.now()),                                               0,                                               3,                                               TimeUnit.SECONDS);
```

In the above code snippet, we are scheduling a task that starts with no initial delay and executes at a rate of 3 seconds. i.e.

Start at 0 and execute, then run after 3 seconds from the last start time (0+ 1 \*3 seconds), next run after 0 + 2\*3 seconds and so on.

The following is the output:

![scheduleAtFixedRate(..) execution]()

The *scheduleAtFixedDelay(..)* lets us create a periodic action that becomes enabled first after the given initial delay, and subsequently with the given delay between the termination of one execution and the commencement of the next.

The following code snippet demonstrates the use of *scheduleAtFixedDelay(..)*

```
scheduledExecutorService.scheduleWithFixedDelay(() -> {            System.out.println("Executing at "+ LocalTime.now());            try {                TimeUnit.SECONDS.sleep(3);            } catch (InterruptedException e) {                throw new RuntimeException(e);            }        }, 0, 3, TimeUnit.SECONDS);
```

In the above example, we are executing a task with no initial delay and a fixed delay of 3 seconds. The task takes 3 seconds to finish. The following is the outcome:

![scheduleAtFixedDelay(..) execution]()

> A detailed discussion on the difference between scheduleWithFixedRate and scheduleWithFixedDelay could be found at [this StackOverflow](https://stackoverflow.com/questions/24649842/scheduleatfixedrate-vs-schedulewithfixeddelay) link.

### ThreadFactory

**A ThreadFactory lets us create a new thread and customize the thread behaviour**. We can provide custom thread name, priority, daemon thread etc. Using this interface removes the need for direct invocation of *new Thread().*

Let us demonstrate the use of *ThreadFactory*. We’ll first define our Thread class — *AppThread* and then define a new *ThreadFactory* implementation *AppThreadFactory* that creates new threads.

```
public class AppThread extends Thread {   private static final String POOL_DELIMITER = "-";    /**    * Application thread    *     * @param runnable, tasks to be processed    * @param pool, name of the pool    * @param id, Identifier for the thread    */   public AppThread(ThreadGroup group, Runnable runnable, String pool, int id) {      super(group, runnable, String.format("%s%s%d", pool+"-thread", POOL_DELIMITER, id));   }}
```

In the above code snippet, we are extending the *Thread* class to define the custom thread pool name.

```
public class AppThreadFactory implements ThreadFactory{ private String poolName; private ThreadGroup group; private AtomicInteger atomicInteger = new AtomicInteger();  public AppThreadFactory(String poolName) {    this.poolName = poolName;    group = Thread.currentThread().getThreadGroup(); }  @Override public Thread newThread(Runnable runnable) {    Thread appThread = new AppThread(group, runnable, poolName, atomicInteger.incrementAndGet());    if(appThread.isDaemon()) {       appThread.setDaemon(false);    }    if(appThread.getPriority() != Thread.NORM_PRIORITY) {       appThread.setPriority(Thread.NORM_PRIORITY);    }    return appThread;   }}
```

In the above example, we define a custom implementation of the ThreadFactory interface. The *AppThreadFactory* creates new instances of the *AppThread* class. It customizes the Daemon property and priority of the generated threads.

Lastly, let us define an ExecutorService with this *AppThreadFactory* implementation:

```
ExecutorService executorService = Executors.newFixedThreadPool(2, new AppThreadFactory("medium-demo")); executorService.execute(() -> {     IntStream.rangeClosed(1,4).forEach((i) -> System.out.println("Executed by "+Thread.currentThread().getName())); });
```

In the above snippet, we are creating a FixedThreadPool with 2 threads and using the *AppThreadFactory* implementation. Next, we submit a task to print a few statements to view the thread name.

```
Executed by medium-demo-thread-1Executed by medium-demo-thread-1Executed by medium-demo-thread-1Executed by medium-demo-thread-1
```

The output prints the thread name as customized in the *AppThreadFactory.*

### ThreadPoolExecutor

**ThreadPoolExecutor is the thread pool implementation provided in Java.**

Though this class provides the full implementation for a thread pool, programmers often use more specific types of thread pools e.g. *FixedThreadPool*, *CachedThreadPool*, *SingleThreadExeutor*, *WorkStealingPool* etc, based on the task processing needs. For instance, a *FixedThreadPool* provides a fixed set of threads for task execution with a *LinkedBlockingQueue* as a backing queue for task queuing if tasks can not be picked up for immediate processing. This implementation is suitable for good resource optimization.

Before proceeding further, let us understand how a thread pool internally works. A thread pool executor has the following properties that can be customized:

1.  Core Pool Size
2.  Maximum Pool Size
3.  Keep Alive Time
4.  A Queue
5.  A Thread Factory
6.  Rejection Execution Handler

**Core Pool Size:** This is the minimum number of threads that should be always available in the pool. This is applicable even if there are no active tasks available in the pool for processing. In the event of an abnormal termination of a core pool thread, Java ensures a new thread is created and the core pool size is maintained. However, core pool size threads can be terminated if the *allowCoreThreadTimeOut* flag is set to true. In this case, core pool threads will be terminated once *keepAliveTime* expires. The thread pool will have no thread if the pool is inactive and the *keepAliveTime* expires for all core pool threads.

**Maximum Pool Size:** This is the maximum number of threads that a pool can have and can not go beyond this value.

**Queue:** A queue is used internally to hold the additional tasks once all core pool threads are occupied and not available for new tasks. It is important to note that a new thread is only created if fewer threads are running than the configured number of core poll threads and the job is submitted for processing rather than queuing.

**Thread Factory:** A thread factory is used to create new threads in the thread pool.

**Rejection Execution Handler:** This handler is used to decide when the thread pool is not able to accept new tasks due to various reasons. This includes the max pool size limit that has been reached or the backing queue is full. There are different policies on how to handle tasks that can not be processed by the pool.

The following example shows the usage of a ThreadPoolExecutor:

```
private static final int CORE_POOL_SIZE = 1; private static final int MAX_POOL_SIZE = 2; private static final int KEEP_ALIVE_TIME = 10;/** Create a new thread pool executor   *  The minimum number of threads is 1   *  The maximum number of threads is 2   *  Keep alive time for idle thread is 10 seconds   *  The backing queue implementation is an ArrayBlockingQueue with capacity 2   *  The custom thread factory AppThreadFactory is used   *  The RejectedExecutionHandler is CallerRunsPolicy   */  ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(CORE_POOL_SIZE,                  MAX_POOL_SIZE,                  KEEP_ALIVE_TIME,                  TimeUnit.SECONDS,                  new ArrayBlockingQueue<>(1),                  new AppThreadFactory("medium-demo"),                  new ThreadPoolExecutor.CallerRunsPolicy()                  );  // Prints the executing thread's name - medium-demo-thread-1  threadPoolExecutor.execute(() -> System.out.println(Thread.currentThread().getName()));
```

Let us explore the use of queue and CallerRunsPolicy a bit more:

```
private static final int CORE_POOL_SIZE = 1; private static final int MAX_POOL_SIZE = 2; private static final int KEEP_ALIVE_TIME = 10;     public static void main(String[] args) throws InterruptedException {    /** Create a new thread pool executor     *  The minimum number of threads is 1     *  The maximum number of threads is 2     *  Keep alive time for idle thread is 10 seconds     *  The backing queue implementation is an ArrayBlockingQueue with capacity 2     *  The custom thread factory AppThreadFactory is used     *  The RejectedExecutionHandler is CallerRunsPolicy     */    ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(CORE_POOL_SIZE,                    MAX_POOL_SIZE,                    KEEP_ALIVE_TIME,                    TimeUnit.SECONDS,                    new ArrayBlockingQueue<>(1),                    new AppThreadFactory("medium-demo"),                    new ThreadPoolExecutor.CallerRunsPolicy()                    );    // Prints the executing thread's name - medium-demo-thread-1    threadPoolExecutor.execute(() -> System.out.println(Thread.currentThread().getName()+" executed this task"));        // Make the thread sleep so that it is not available for processing    threadPoolExecutor.execute(() -> {     try {      Thread.sleep(500000);     }     catch(InterruptedException ie) {      //     }    });      // Prints the executing thread's name - This task is queued.    threadPoolExecutor.execute(() -> System.out.println(Thread.currentThread().getName()+" executed this task"));      TimeUnit.SECONDS.sleep(2);      // Remaining capacity is 0 as there is a task already queues. Since the queue size is 1. The queue is now full.    System.out.println("Remaining queue capacity: "+threadPoolExecutor.getQueue().remainingCapacity());      /**     *  A new thread is created and put to sleep. At this stage, the max thread pool limit is reached.     *  No new threads can be created.     */    threadPoolExecutor.execute(() -> {     try {      System.out.println(Thread.currentThread().getName() + " is created and going to sleep");      Thread.sleep(500000);     }     catch (InterruptedException ie) {}    });      /**     *  This task is executed by the main thread due to CallerRunPolicy.     *  Since both the threads of the pool is occupied and the queue is also full,     *  based on the CallerRunPolicy, Main thread executed the new tasks.     */    threadPoolExecutor.execute(() -> System.out.println(Thread.currentThread().getName()+" thread executed this task"));    threadPoolExecutor.execute(() -> System.out.println(Thread.currentThread().getName()+" thread executed this task"));    threadPoolExecutor.shutdownNow();}
```

The following is the output (Output will vary due to thread scheduling):

```
medium-demo-thread-1 executed this taskRemaining queue capacity: 0medium-demo-thread-2 is created and going to sleepmain thread executed this taskmain thread executed this task
```

### Conclusion

This article provides an overview of the *ScheduledExecutorService, ThreadFactory,* and *ThreadPoolExecutor.*

A *ScheduledExecutorService* lets us schedule tasks. This scheduling can be one-time or recurring. The schedule, scheduleAtFixedRate, and scheduleAtFixedDelay are the important methods.

A ThreadFactory lets us create custom threads and removes the need for direct instantiation of the *Thread* class.

A *ThreadPoolExecutor* is a concrete implementation of a thread pool in Java. It provides a rich configuration set to customize the pool properties and their behaviour.

The source code for this article is available in the following [GitHub repository](https://github.com/musibs/Java-Concurrency).