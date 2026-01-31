---
title: "Understanding Load Balancers — A technical deep dive"
author: "The Backend Tech"
platform: "medium"
publicationName: "The Backend Tech"
url: "https://medium.com/thebackendtech/understanding-load-balancers-a-technical-deep-dive-ff8d73f6d8df?source=rss----33614872e155---4"
publishedAt: "2025-08-29"
tags:
  - "system-design-concepts"
  - "programming"
  - "algorithms"
  - "design"
  - "technology"
  - "backend"
  - "architecture"
---

# Understanding Load Balancers — A technical deep dive

Featured

# Understanding Load Balancers — A technical deep dive

## Architecting Scalable and Resilient Systems Through Strategic Load Distribution

[Somnath Musib](/@musibs?source=post_page---byline--ff8d73f6d8df---------------------------------------)

6 min read·Aug 29, 2025

\--

Listen

Share

![Image Courtesy: https://unsplash.com/photos/three-traffic-lights-hanging-from-a-wire-with-a-blue-sky-in-the-background-Y-W7GoXLJgw]()

A load balancer distributes incoming network traffic across multiple servers to ensure that no single server is overloaded, and the traffic is uniformly distributed. This improves the application availability, scalability, performance and the reliability.

![]()

## **Types of load balancer**

### ***By OSI Layer: Layer 4 & Layer 7***

A load balancer can operate at transport layer (Layer 4) or at the application layer (Layer 7).

A layer 4 load balancer routes the request based on IP address and port. This load balancers are fast and works with TCP or UDP protocols. An example of layer 4 load balancer is AWS Network Load Balancer (NLB).

A layer 7 load balancer operates on the application layer and routes the incoming request based on the content, such as HTTP headers, URLs, cookies, and so on. It can make more intelligent routing decisions as it operates on the application layer, and it can also modify the HTTP request and the response. This load balancer performs slower than the layer 4 load balancer due to the HTTP processing overhead.

![Layer 7 Load Balancer]()

### ***By Deployment: Hardware & software load balancer***

We can also categorize the load balancers based on hardware or software level load balancers. A hardware load balancer is a physical appliance that is purpose-built for load balancing. An example of hardware load balancer is F5 BIG-IP (https://www.f5.com/products/big-ip).

Software load balancer, as the name indicates is implemented through the software. Examples of software load balancers are Ngnix, Apache HTTP Server (using mod\_proxy\_balancer module), HAProxy etc.

### ***By Architecture: Reverse & Forward Proxy***

Based on how the load balancer operates, it can be a reverse proxy or a forward proxy. It is called as proxy as it hides the client and proxy the request on their behalf.

A reverse proxy load balancer sits between client and servers and hides the backend server details to the client. Client always interacts with the load balancer. This type is the primary usage of the load balancers.

![Reverse proxy]()

A forward proxy load balancer sits between client and the internet/web server and hides the actual client details to the internet/web servers.

![Forward Proxy]()

## Load Balancer Algorithms

Load balancer algorithms can be categorized into two types — static and dynamic. Let’s understand the static types:

### Round Robin

In round robin algorithm, the load balancer routes the requests in a round robin fashion to the backend servers.

With this algorithm, the load balancer maintains a circular list of available servers and an index pointer that advances with each request. When a request arrives, the load balancer selects the server at the current index position, forwards the request, and increments the index to the next server in the list. Once the index reaches the end of the server list, it wraps around to the beginning, ensuring equal distribution across all available servers. This stateful approach requires the load balancer to track both the server pool and the current position, making it simple to implement but requiring careful handling during server pool changes and load balancer restarts.

![Figure Round robin load balancing]()

In the above diagram, the load balancer maintains the list of server pool \[s0, s1 and s2\] and an index initialized with 0. For the first request, it applies 3%0=0 and routes to the first server. It then increments the index by 1. For the next request, it applies 1%3=1 and the request is routed to server 2.

### Weighted Round-Robin

This algorithm is useful when the servers are of varied capacity. I.e. some servers have more processing power and capacity while some have less processing capacity. Thus, instead of treating all servers equally, weighted round-robin assigns a weight value to each server based on its relative capacity and distributes requests proportionally to these weights. For example, if Server A has weight 3, Server B has weight 2, and Server C has weight 1, then out of every 6 requests, Server A receives 3 requests, Server B receives 2 requests, and Server C receives 1 request.

![Figure Weighted round-robin]()

### IP Hash

IP Hash algorithm uses the client’s IP address as input to a hash function to determine which backend server should handle the request.

The load balancer calculates a hash value from the client’s IP address and uses modulo operation with the number of available servers to select the target server. This ensures that requests from the same client IP will consistently be routed to the same backend server. This provides implicit session affinity without any server-side session storage or cookie management.

![Figure: IP Hash]()

In the above example, a client with IP address 192.168.1.100 requests load balancer. It then applies the hash on the IP address and generates a hash value and applies modulo operation to find the server index. The request is forwarded to the server, in this case server 0. All subsequent requests are also forwarded to the same server.

Most enterprise grade load balancers use [consistent hashing](https://en.wikipedia.org/wiki/Consistent_hashing) or ring-based approaches to minimize server reassignment when the backend server pool changes.

Next, lets discuss the dynamic types:

### Least Connections

The Least Connections algorithm routes incoming requests to the backend server that currently has the fewest active connections.

This approach provides better load distribution than round-robin **when request processing times vary significantly**, as it automatically adapts to server performance differences. The load balancer maintains a real-time count of active connections for each server, incrementing the count when forwarding a request and decrementing it when the connection closes or the response is returned.

![Figure: Least Connections]()

### Weighted Least Connections

Weighted Least Connections combines the least connections algorithm with the weighted round-robin. Each server is assigned a weight based on its capacity. The algorithm routes requests to the server with the lowest ratio of current connections to the assigned weight. This approach ensures that high-capacity servers can handle proportionally more concurrent connections while still adapting to real-time load variations and varying request processing times.

![Figure: Weighted Least Connections]()

## Conclusion

In this article, we explored the concept of load balancing. We discussed the different types of load balancers, including Layer 4 (transport layer) and Layer 7 (application layer). Additionally, we examined various load balancing algorithms, such as Round Robin, Weighted Round Robin, IP Hash, Least Connections, Weighted Least Connections with detailed explanations on how each algorithm distributes traffic.

*If you like this article, you can subscribe to my newsletter at* [*https://musibs.substack.com/*](https://musibs.substack.com/)