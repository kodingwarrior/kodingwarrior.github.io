---
title: 'Unix Network Programming Chapter 4 : Elementary TCP Sockets'
layout: post
date: '2018-10-19 00:00:00'
categories: post
toc: true
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

아래의 테이블에서는 소켓 주소 구조체에 어떤 값을 넣었느냐에 따라 `bind` 함수를 호출했을때 소켓에 어떻게 바인딩되는지를 설명하고 있다. 

| IP 주소 | 포트 번호 | 어떻게 바인딩 되는가? |
|:--:|:--:|:--:|
|*Wild Card*|0|커널이 알아서 IP주소와 포트 번호를 할당|
|*Wild Card*|nonzero|커널이 알아서 IP 주소를 잡고, 포트 번호는 프로세스에서 정한대로 할당|
|로컬 IP 주소|0|IP 주소는 프로세스에서 정한대로 쓰고, 포트 번호는 커널이 알아서 할당|
|로컬 IP 주소|nonzero| 프로세스에서 정한 IP 주소와 포트번호를 이용해서 할당|

* 위의 테이블에서 알 수 있듯이, **서버는 시작할 때 무조건 well-known 포트 번호를 명시**해야 한다. 여기서 well-known 포트 번호는 ftp, ssh 의 포트 번호와 같이 쓰임새가 공개적으로 알려져 있는 것이 아니라, 서버 전용으로 쓰기로 약속한 포트 번호를 넘겨줘야 한다는 의미이다. 만약, 포트 번호를 넘겨주지 않으면, 커널이 다이나믹(dynamic or ephemeral) 포트에서 임의대로 포트번호를 결정하게 되어버려서 다른 프로세스와 충돌이 일어날 수 있기 때문이다. 
	* 예를 들면, 웹서버를 띄우고자 하는 경우, 서버 개발자 임의대로 8000 번 내지는 5000 번 포트 번호를 디폴트로 설정하는게 대표적이라 할 수 있다.
	* 다이나믹 포트와 충돌이 일어날 일이 없도록, 다이나믹 포트의 범위를 보고 다이나믹 포트 범위의 하한값으로 서버의 포트번호를 잡는 것이 권장된다. 다이나믹 포트의 범위는 Linux 를 기준으로 `/proc/sys/net/ipv4/ip_local_port_range` 에서 알 수 있다.
* IPv4에서 *와일드카드 주소* 는, `sin_addr` 멤버변수에 `INADDR_ANY` 를 넘겨주는 경우를 의미한다.
* 커널이 소켓의 포트 번호와 IP 주소를 알아서 결정할 수 있긴 하지만, 소켓 주소 구조체의 포인터를 넘겨줬더라도 `const` 지정자를 같이 넘겨줬기 때문에, `bind` 함수가 리턴되더라도 소켓 주소 구조체에는 변화가 없다. 따라서, 커널에서 소켓에 할당한 주소와 포트번호를 얻으려면 `getsockname` 함수를 이용해야 한다.

# 4.5 `listen` Function
`listen` 함수는 TCP 서버에서만 호출되며, 크게 두 가지 역할을 한다.

1. 커널이 클라이언트에서 오는 연결 요청(`connect()`)을 받아들일 수 있게, 연결되지 않은 소켓을 passive open 한다.  TCP state transition diagram 을 예로 들어 설명하면, `CLOSED` 상태에 있는 소켓은 `LISTEN` 상태가 된다. 
2. `backlog` 인자를 통해 커널이 관리해야하는 connection queue 의 최대 사이즈를 결정할 수 있다.

`listen` 함수는 `<sys/socket.h>` 헤더파일에 아래와 같이 정의되어 있다.

* `int listen(int sockfd, int backlog)` : 성공할 경우 0, 에러가 발생할 경우 -1 을 반환

`listen` 함수는 일반적으로 `socket`, `bind` 함수를 호출하고 나서야 쓰이는 편이며, **`accept` 함수를 호출하기 전에 무조건 `listen` 함수를 호출** 해야 한다.

`backlog` 인자를 이해하기 전에, 커널이 listening socket 에 대해 두 개의 queue 를 관리하는 것을 알고 있어야 한다.

1. **`incomplete connection queue`** : 클라이언트로부터 SYN 메시지를 받고, 서버 측에서 3-way handshaking 이 끝나기를 기다리는 소켓에 대한 엔트리를 포함한다. 여기서 각 소켓은 `SYN_RCVD` 상태이다.
2. **`completed connection queue`** : TCP 3-way handshaking이 완료되어서 연결이 성립된 소켓에 대한 엔트리를 포함한다. 여기서 각 소켓은 `ESTABLISHED` 상태이다.

큐의 엔트리는 SYN 메시지를 받자마자 incomplete queue 에서 처음으로 생성된다. incomplete queue에 있는 엔트리는 클라이언트로부터 ACK 메시지를 받거나, 혹은 타임아웃(RTT)이 될 때까지 계속해서 큐에 남게 된다. 클라이언트로부터 ACK 메시지를 받아서 3-way handshaking 이 성공하게 되면 incomplete queue에 있는 엔트리는 completed queue의 맨 마지막 엔트리로 옮겨지게 된다.

프로세스가 `accept` 함수를 호출하게 되면, 프로세스에는 completed queue의 첫 번째 엔트리의 소켓이 프로세스에 반환된다. 큐가 비어있다면, `accept`를 호출한 프로세스는 completed queue에 엔트리가 들어올 때까지 block 상태가 된다.

# 4.6 `accept` Function

`accept` 함수는 TCP 서버에서 호출되며, completed queue의 첫 번째 엔트리에서 ESTABLISH 상태의 소켓의 디스크립터를 반환한다. completed connection queue가 비어있다면, `accept`를 호출한 프로세스는 BLOCK 상태가 된다.

`accept` 함수는 `<sys/socket.h>` 헤더파일에 다음과 같이 정의되어 있다.

* `int accept(int sockfd, struct sockaddr *cliaddr, socklen_t *addrlen)` : 성공했을 경우 음이 아닌 디스크립터, 
에러일 경우 -1

`cliaddr`, `addrlen`는 연결된 클라이언트의 프로토콜 주소에 대한 정보를 나타낸다. `accept` 함수가 성공하면, 커널에서 자동으로 생성한 디스크립터 번호가 반환되며, 이는 TCP 클라이언트에 연결된 소켓을 나타낸다. `accept` 함수의 첫번째 인자에는 **listening socket**을 넘겨줘야 하며, 그 결과로 반환되는 소켓을 **connected socket**이라 한다. **listening socket**은 서버가 시작할때 하나씩 만들어져서 서버가 죽을때까지 계속 유지되며, **connected socket**은 클라이언트와의 연결(TCP의 경우 3-way handshaking)이 성공할때마다 커널에서 만들어내는 소켓이다. 클라이언트의 요청을 처리하고 나면, connected socket은 close 된다.
# 4.8 Concurrent Servers

*iterative server* 는 요청을 하나 처리하고 나서 다음 요청을 처리하는 식으로 동작한다. 클라이언트의 요청 하나를 처리하는데 오래 걸린다면, 하나의 서버가 한 클라이언트만 담당하는 식으로 가게 될 수 있다. 이런 경우는 상당히 바람직하지 않으며, 한 서버가 여러 클라이언트의 요청을 동시에 처리할 수 있도록 해야 한다. 이를 해결할 수 있는 방법이 `concurrent server` 이며, 유닉스에서는 `fork` 시스템 콜을 호출하여 child 프로세스를 생성하고 각 child 프로세스가 각 클라이언트의 요청을 처리하는 방식으로 응용할 수 있다.

다음은 전형적인 concurrent server 이다.

```c
pid_t pid;
int listenfd, connfd;

listenfd = Socket(...);

Bind(listenfd, ... );
Listen(listenfd, LISTENQ);

for(; ; ) {
	connfd = Accept(listenfd, ...);
	
	if( (pid = Fork() ) == 0 ) {
		Close(listenfd);
		doit(connfd);
		Close(connfd);
		exit(0);
	}
	
	Close(connfd);
}
```

연결이 성공하고 나서야 `accept` 함수가 리턴되며, 서버는 `fork` 를 호출하여 child 프로세스가 클라이언트(`connfd` 소켓으로 연결이 되어있는 클라이언트)의 요청을 처리하도록 하고 서버는 다시 다른 연결을 기다린다. child 프로세스가 새로 들어온 클라이언트의 요청을 처리할 수 있게, parent 프로세스는 클라이언트와 연결된 소켓을 close해야 한다.

# 4.9 `close` Function

Unix의 close 함수는 소켓을 close 하여 TCP 연결을 종료하는데 쓰이며, `<unistd.h>` 헤더파일에 아래와 같이 정의되어 있다.

* `int close(int fd)` : 성공하면 0, 에러일 경우 -1 반환

close 함수는 일반적으로는 descriptor의 레퍼런스 카운트를 줄이는 역할을 한다. close 함수를 호출하여 레퍼런스 카운트가 줄어든 시점에서, 레퍼런스 카운트가 0보다 크면 (concurrent server의 예시에서 볼 수 있듯이) 클라이언트와 연결된 소켓을 parent 프로세스와 child 프로세스 사이에서 공유하고 있을 수 있기 때문에 TCP 연결을 종료하지 않는다. 물론 레퍼런스 카운트가 0이면, 서버의 커널에서 TCP 연결을 종료하기 위해 FIN 메시지를 보내게 된다.

레퍼런스 카운트가 남아있음에도 불구하고, FIN 메시지를 보내서 연결을 종료하고 싶다면 `shutdown` 함수를 이용할 수 있다.