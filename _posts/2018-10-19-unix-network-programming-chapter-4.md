---
title: 'Unix Network Programming Chapter 4 : Elementary TCP Sockets'
layout: post
date: '2018-10-19 00:00:00'
categories: post
---

# 4.1 Introduction
4장에서는 TCP 서버/클라이언트를 구축하는데 필요한 기본 소켓 함수들을 다루고 있다. 4장에서 기본 소켓 함수들을 예시를 들어서 설명 후, 5장에서  TCP 서버/클라이언트를 점진적으로 개선한다. 

또한, **여러개의 클라이언트가 서버와 동시에 연결이 되었을 때 동시성(concurrency)를 제공** 하는 유닉스의 잘 알려진 기법인 동시 서버(concurrent server)를 다룬다. 여기서 각 클라이언트의 연결은 서버가 상대방 클라이언트에 대한 연결을 유지하기 위해 `fork` 시스템 콜을 호출하도록 한다. 4장에서는 `fork` 시스템콜을 이용하여 **클라이언트마다 프로세스로 연결을 유지(one-process-per-client)**하는 모델을 다루며, 26장에서는 스레드를 설명하면서 **클라이언트마다 스레드로 연결을 유지(one-thread-per-client)**하는 모델을 다룬다.
# 4.2 `socket` Function
네트워크 I/O를 수행하기 위해서 프로세스가 가장 먼저해야 하는 작업은 **어떤 프로토콜을 이용해서 통신하고 싶은지 명시하면서** `socket` 함수를 호출하는 것이다. 예를 들면, IPv4 주소를 이용하는 TCP, IPv6 주소를 이용하는 UDP, 유닉스 도메인 스트림 프로토콜 같은 것들이 있을 것이다. `socket` 함수는 아래와 같이 `<sys/socket.h>` 헤더파일에 정의되어 있다.

* `int socket(int family, int type, int protocol)` : 소켓을 성공적으로 생성하면, 음수가 아닌 **소켓 디스크립터**를 반환하며, 실패할 경우 -1을 반환한다.

인자 `family`는 `protocol family`를 의미하며, 어떤 상수를 이용할 수 있는지는 책에서는 아래의 표와 같이 설명했다. (책에서는 `AF_XXX` 로 설명했지만, 뒤에서도 후술했지만 혼선이 없도록 하기 위해 여기서는 `PF_XXX` 로 정정했다.)

| _family_ |      description     |
|:--------:|:--------------------:|
|  `PF_INET` |     IPv4 protocol    |
| `PF_INET6`|     IPv6 protocol    |
| `PF_LOCAL` | Unix domain protocol(Chap. 15) |
| `PF_ROUTE` |    Routing sockets(Chap. 18)   |
|  `PF_KEY`  |      Key socket(Chap. 19)      |

인자 `type`에는 아래의 표에서 설명한 것과 같은 상수가 들어가야 한다. 

| _type_| description |
|:------:|:-----------:|
|`SOCK_STREAM`|stream socket|
|`SOCK_DGRAM`|datagram socket|
|`SOCK_SEQPACKET`|sequenced packet socket|
|`SOCK_RAW`|raw socket|

인자 `protocol`에는 아래의 표에서 설명한 것과 같은 상수가 들어가야 한다. 

|_protocol_|description|
|:----:|:----:|
|`IPPROTO_TCP`|TCP transport protocol|
|`IPPROTO_UDP`|UDP transport protocol|
|`IPPROTO_SCTP`|SCTP transport protocol|

`family`, `type` 의 조합을 보고 시스템이 디폴트로 프로토콜을 설정하게 하려면 0를 넣을 수도 있다. `family` 와 `type`의 조합이 항상 유효한 것은 아니며, 아래의 표는 어떤 조합이 유효한지를 다루고 있다. "Yes"라 마크되어 있는건 유효한 조합이지만, 이러한 조합을 다루는 프로토콜이 있다는 것은 아니며, 공란으로  되어있는 것은 지원되지 않는다는 의미이다.

|_type_ \ _family_ | `PF_INET` | `PF_INET6` | `PF_LOCAL` | `PF_ROUTE` | `PF_KEY`
|:-----:|:-----:|:-----:|:-----:|:-----:|:---:|
|`SOCK_STREAM`|**TCP/SCTP**|**TCP/SCTP**|Yes| | |
|`SOCK_DGRAM`|**UDP**|**UDP**|Yes| | |
|`SOCK_SEQPACKET`|**SCTP**|**SCTP**|Yes| | |
|`SOCK_RAW`|IPv4|IPv6| |Yes|Yes|

## `AF_XXX` versus `PF_XXX`

AF 로 시작하는 상수와 PF 로 시작하는 상수는 `<sys/socket.h>`헤더파일에서 포함하는 `<bits/socket.h>` 헤더파일에서 정의되어 있다. [여기](https://sites.uclouvain.be/SystInfo/usr/include/bits/socket.h.html)에서 알 수 있듯이, `AP_` 와 `PF_` 가 동일한 값을 가지긴 하지만, 둘이 항상 같다는 보장은 없다. 예를 들어, AF_LOCAL이 3으로 정의되어 있고, PF_LOCAL이 5로 정의되어 있는데, AF_LOCAL과 PF_LOCAL이 같을 것이라는 생각에 코드를 짰다가 엄청나게 많은 코드들이 깨질 수도 있다. 그렇기 때문에, `socket` 함수의 인자에는 PF 상수를 넘겨주고, 소켓 주소 구조체에는 AP 상수를 집어넣는 것이 바람직하다.

# 4.3 `connect` Function
`connect` 함수는 TCP 클라이언트에서 TCP 서버와 연결을 성립(establish)시키기 위해서 쓰인다. `connect` 함수도 아래와 같이 `<sys/socket.h>` 헤더파일에 정의되어 있다.

* `int connect(int sockfd, const struct sockaddr *servaddr, socklen_t addrlen)` : 연결에 성공하면 0, 오류가 발생할 경우 -1을 반환

`sockfd` 는 `socket` 함수를 호출하고 나서 반환되는 소켓디스크립터를 의미한다. 두번째, 세번째 인자에는 소켓 주소 구조체를 가리키는 포인터와 소켓 주소 구조체의 크기가 들어가야 한다. 물론, 서버에 연결을 요청해야 하기 때문에, 소켓 주소 구조체에는 서버의 IP 주소와 포트번호가 들어가야 한다. 

클라이언트는 서버가 `bind` 를 호출하기도 전에 `connect` 를 호출하면 안 된다.

TCP 소켓의 경우, 클라이언트에서 `connect` 함수를 호출하게 되면, 클라이언트가 SYN 세그먼트를 보내면서 TCP의 three-way handshaking 을 시작하게 된다. `connect` 함수는 연결이 성립되거나 오류가 발생하게 되는 경우에만 반환하게 되며, 이는  `connect` 함수를 호출한 프로세스는 반환할때까지  `block` 상태가 된다는 것을 의미한다. `connect` 함수를 호출했을때 발생할 수 있는 에러는 다음과 같다.

1. TCP 클라이언트가 SYN 세그먼트에 대한 응답을 받지 못했을 경우, `errno` 에 `ETIMEDOUT` 가 세팅되면서 반환하게 된다.
2. 클라이언트의 `SYN` 세그먼트에 대한 서버의 응답이 리셋(`RST`)을 의미하는 경우에도 에러가 발생하는데, 이는 명시된 서버의 특정 포트로 연결을 기다리는 프로세스가 없다는 것을 의미한다. 특정 포트로 연결을 기다리는 서버 프로세스가 돌고 있지 않은 경우가 대표적이라 할 수 있다. 이런 경우는 `hard error` 라고 불리기도 하며, 클라이언트는 `RST` 세그먼트를 받자마자 `errno` 에 `ECONNREFUSED` 가 세팅되면서 반환된다.
	* `RST` 는 TCP 연결이 뭔가 잘못되었을때 전송되는 TCP 세그먼트 타입인데, 일반적으로 다음과 같은 3가지 시나리오에서 RST 세그먼트를 보내게 된다.
		1. port 를 listening 하고 있는 서버가 없는데, 해당 포트에 대해 연결하고자 하는 SYN 세그먼트가 도착한 경우
		2. 연결을 중단하고자 하는 경우
		3. 존재하지 않는 연결에 대한 세그먼트를 받은 경우
3. 클라이언트에서 보낸 SYN 세그먼트를 보낸 후, 중간에 거쳐가는 라우터에서 ICMP 메시지 **"destination unreachable"** 가 뒤따라오는 경우인데, 이는 `soft error` 라고 한다. 클라이언트 커널은 ICMP 메시지를 기억하고 있으면서도, 계속해서 SYN 세그먼트를 보낸다. 그럼에도 불구하고, 서버로부터 응답을 받지 못하게 된다면, 클라이언트의 커널에서 기억하고 있던 ICMP 오류가 프로세스로 반환된다. 이 때, `errno`에는 `EHOSTUNREACH` 혹은 `ENETUNREACH`가 세팅된다.
	* `ENETUNREACH` 에러는 호스트가 속한 네트워크를 찾지 못하는 경우에 발생하며, `EHOSTUNREACH` 에러는 호스트가 속한 네트워크는 찾았지만, 호스트에 문제가 있는 경우 발생한다.

# 4.4 `bind` Function
`bind` 함수는 소켓에 로컬 프로토콜 주소를 할당한다. 인터넷 프로토콜의 경우, 32비트 IPv4 혹은 128비트 IPv6 주소와 16 비트 TCP/UDP 포트 번호의 조합이다. `bind` 함수는 `<sys/socket.h>` 헤더파일에 아래와 같이 정의되어 있다.

* `int bind(int sockfd, const struct sockaddr *myaddr, socklen_t addrlen)` : 성공할 경우 0, 오류가 발생할 경우 -1을 반환.

두 번째 인자에는 소켓 주소 구조체에 대한 포인터를, 세 번째 인자에는 소켓 주소 구조체의 크기를 넘겨줘야 한다. TCP의 경우, IP 주소와 포트번호를 지정한 소켓 주소 구조체를 넘겨줘야 한다.

# 4.5 `listen` Function

# 4.6 `accept` Function

# 4.7 `fork` and `exec` Functions

# 4.8 Concurrent Servers

# 4.9 `close` Function