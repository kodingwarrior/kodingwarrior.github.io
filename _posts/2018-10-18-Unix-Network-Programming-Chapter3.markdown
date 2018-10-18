---
title: 'Unix Network Programming Chapter 3 : Socket Introduction'
layout: post
date: '2018-10-18 07:09:00'
categories: post
---

# 3.1 Introduction

이 챕터에서는 전반적으로 네트워크 프로그래밍에서 주로 활용되는 socket API 를 다룰때 알아둬야 할 내용을 다루고 있다. 소켓 주소 구조체를 다루는 자료구조를 다루는 것부터 시작해서, 1) 프로세스에서 커널로, 2) 커널에서 프로세스로 어떻게 소켓 주소 구조체를 통해 정보를 전달하는지를 다루며,  IP 주소를 나타내는 텍스트 표현법과 소켓 주소 구조체에 저장되는 이진 값 사이의 변환을 해주는 `inet_addr`, `inet_ntoa` 함수를 다루면서도 IPv4/IPv6 의 호환을 위해 `inet_pton`, `inet_ntop` 유틸리티 함수를 다룬다.


# 3.2 Socket Address Structure
IPv4 소켓 주소 구조체는 흔히 `인터넷 소켓 주소 구조체` 라고 불리며, `<netinet/in.h>` 헤더 파일에 `sockaddr_in` 이라는 구조체로서 정의되어 있다.

POSIX 표준에서는 아래와 같이 정의되어 있다.

```c
struct in_addr {
    in_addr_t s_addr; /* 32 bit IPv4 주소이며, 네트워크 바이트 순서 */
}

struct sockaddr_in {
    uint8_t  sin_len; /* 구조체의 크기 */
    sa_family_t sin_family; /* AF_INET */
    in_port_t sin_port; /* 포트 번호를 담기 위한 16 bit 변수이며, 네트워크 바이트 순서 */
		
    struct in_addr sin_addr; /* 32 bit IPv4 주소이며, 네트워크 바이트 순서 */
		
    char sin_zero[8]; /* 사용되지 않는 패딩 바이트 */
}
```

이를 시각화하면 아래와 같이 나타낼 수 있다.

```
+--------------+-----------------+---------------+-----------------------+
| sin_len : 1B | sin_family : 1B | sin_port : 2B | sin_addr(s_addr) : 4B |
+--------------+-----------------+---------------+-----------------------+
|                             sin_zero[] : 8B                            |
+------------------------------------------------------------------------+
```

여기서 좀 더 설명이 필요한 부분이 있는데,

* `sin_len`는 **소켓 주소 구조체 자체의 크기**를 나타내는 1 바이트 크기의 멤버변수이다. 운영체제에 따라, `sin_len` 멤버변수가 정의되어 있지 않기도 하는데, 그럴 경우에는 `sin_family` 가 첫번째로 나타나는 멤버변수이며 2 바이트의 크기를 가진다.
* `s_addr`, `sin_family`, `sin_port` 멤버변수를 보면 `in_addr_t`, `in_port_t` 와 같이 사용자 정의 타입으로 정의되어 있는데, 어떤 시스템에서 이용하더라도 `in_port_t` 변수는 2byte, `sin_addr` 변수는 4byte 의 크기를 가지는 것을 보장해준다. 비슷한 예시로, `<sys/types.h>` 에는 `uint32_t`,  `uint8_t` 와 같이 어떤 아키텍쳐를 이용하더라도 항상 변수가 4바이트, 1바이트의 크기를 가지는 것을 보장해주는 자료형이 정의되어 있다.
* IPv4 주소와 TCP, UDP 포트 번호는 네트워크 바이트 순서로 저장된다. 네트워크 바이트 순서는 빅 엔디언 방식이며, 이는 3.4 절에서 상세한 정보를 알 수 있다.

## Generic Socket Address Structure

소켓 주소 구조체는 **항상** 소켓과 관련된 함수의 인자에 주소값으로서 전달이 된다. 

예를 들면, `bind` 함수를 보더라도 `int bind(int, struct sockaddr*, socklen_t);` 이와 같이 정의되어 있고, 함수에 인자를 넘겨줄 때는 `bind(sockfd, (struct sockaddr*) &servaddr, sizeof(servaddr))` 와 같이 넘겨주게 된다. 여기서 `struct sockaddr` 구조체를 들여다볼 필요가 있는데, 이는 `<sys/socket.h>` 헤더파일에 아래와 같이 정의되어 있다.

```c
struct sockaddr {
    uint8_t sa_len;
    sa_family_t sa_family; /* Address family : AF_XXX */
    char  sa_data[14]; /* protocol-specific address */
};
```

위의 접근방법과 같이 포인터로 형변환을 하는 방식은 ANSI C 에서 `void *` 이라는 generic 포인터 타입으로 형변환하는 방식과 같다. generic한 접근에 `void *`를 사용하듯 `struct sockaddr`는 protocol에 특화된 소켓 주소 구조체를 좀 더 generic한 구조체의 포인터로 캐스팅하는 목적으로 쓰인다고 볼 수 있다. 


# 3.3 Value-Result Arguments

value-result 전달 방식은 함수 내부에서 parameter에 대한 조작을 수행한 후, 함수가 리턴할 때 argument에 parameter에 대한 조작을 수행한 결과가 저장되는 방식을 나타낸다.

소켓 주소 구조체의 크기에 대한 변수가 어떻게 전달되는지는 1) 프로세스에서 커널로, 2) 커널에서 프로세스로 어느 방향으로 구조체가 전달되느냐에 따라 결정이 된다.

1) `bind`, `connect`, `send` 와 같은 함수는 소켓 주소 구조체를 프로세스에서 커널로 인자를 전달한다.

```c
struct sockaddr_in serv;

/* fill in serv() */
connect(sockfd, (SA *) &serv, sizeof(serv));
```
2) 반면, `accept`, `recvfrom`, `getsockname`, `getpeername` 과 같은 함수는 소켓 주소 구조체를 커널에서 프로세스로 전달받는다. `accept` 의 예시를 들자면, 클라이언트의 연결을 기다리다가 클라이언트와 연결이 되었는데, 이 때 연결된 클라이언트가 어떤 주소를 가지고 있는지 정보를 나타내는 소켓 주소 구조체를 커널에서 프로세스로 전달받아야하고, 그 구조체의 크기가 얼마나 되는지에 대한 정보를 받아야 하는데,  프로세스의 **어느 변수에다가 할당되면 좋겠는지 주소값을 함수의 인자로 넘기는 것**이다.

```c
struct  sockaddr_un cli; /* unix domain */
socklen_t len;

len = sizeof(cli);
getpeername(unixfd, (SA *) &cli, &len);
/* len may have changed */
```

네트워크 프로그래밍에서는 value-result 전달 방식으로 소켓 주소 구조체의 크기를 구하는 일이 흔히 있는 일이며, `select`, `getsockopt`, `sysctl` 함수 등을 다루면서 value-result 전달 방식을 계속 접하게 될 것이다.
# 3.4 Byte Ordering Functions

여러개의 바이트로 구성된 데이터가 메모리에 저장되는 순서는 크게 두 가지로 나뉘어진다. 

* `리틀 엔디안` : LSB가 낮은 메모리 주소에 위치하고, MSB 가 높은 메모리 주소에 위치 
* `빅 엔디안` : MSB가 높은 메모리 주소에 위치하고, LSB가 낮은 메모리 주소에 위치

메모리 상에서 바이트가 어떻게 정렬되는지는 CPU 제조업체에 따라 다르며, 현재 사용중인 컴퓨터에서 어떤 바이트 순서로 바이트가 정렬되는지는 터미널에서 `byteorder` 명령으로 확인할 수 있다. 

네트워킹 프로토콜에서는 네트워크 바이트 순서로 데이터를 저장해서 쓰기 때문에, 네트워크 프로그래밍을 하려면 바이트 순서를 반드시 고려해야 한다. 

호스트 바이트 순서에서 네트워크 바이트 순서로, 네트워크 바이트 순서에서 호스트 바이트 순서로 재정렬을 일일이 하기에는 너무 고통스러울 수 있기 때문에, `<netinet/in.h>` 헤더파일에 정의되어 있는 다음의 함수들을 이용하는게 훨씬 편리하다.

* `uint16_t htons(uint16_t)`, `uint32_t htonl(uint32_t)` : 네트워크 바이트 순서로 정렬된 값을 반환한다. host byte order to network byte order를 의미.
* `uint16_t ntohs(uint16_t)`, `uint32_t ntohl(uint32_t)` : 호스트 바이트 순서로 정렬된 값을 반환한다. network byte order to host byte order를 의미.


# 3.5 Byte Manipulation Functions
데이터를 읽어들일 필요없이(각 멤버 변수에 대한 할당을 의미), 멀티바이트 필드를 조작할 수 있는 유틸리티 함수를 알아두는 게 좋다. 

첫번째로는, b로 시작하는 함수인데 ANSI C 표준의 `<string.h>` 헤더파일의 `bzero`, `bcopy`, `bcmp` 함수가 꽤 쓸만하다. 비록 문자열을 다루는게 아니지만, 소켓 주소 구조체를 byte string 이라는 관점에서 본다면, 소켓 주소 구조체를 다루기 위해 바이트 단위로 접근할 수 있는 유용한 함수들이기도 하다.
* `void bzero(void* dest, size_t nbytes)` : 인자로 주어진 구조체를 n bytes 만큼 0으로 채운다. 
* `void bcopy(const void *src, void *dest, size_t nbytes)` : n bytes 만큼 src 에서 dest 로 값을 복사한다.
* `int bcmp(const void *ptr1, const void *ptr2, size_t nbytes)` : 두 포인터가 가리키는 값이 n bytes 만큼 비교해서 동일하다면 0 를 반환한다. 동일하지 않다면 0이 아닌 값을 반환한다.

두번째로는, mem 으로 시작하는 함수가 있는데, 위와 차이가 있긴 하지만 거의 동일하다.
* `void* memset(void *dest, int c, size_t len)` : `bzero` 와 동일하지만, 바이트 단위로 어떤 값으로 초기화할 것이냐의 차이가 있다. 0 으로 초기화할 수도 있고, -1로 초기화할 수도 있다.
* `void* memcpy(void *dest, const void *src, size_t nbytes)` : `bcopy` 와 인자 전달 순서가 다르다.
* `int memcmp(const void *ptr1, const void *ptr2, size_t nbytes)` : byte string 을 비교했을 때, 두 string 이 동일하다면 0, ptr1이 ptr2보다 크거나 작다면 음수 혹은 양수를 반환한다.

# 3.6 `inet_aton`, `inet_addr`, and `inet_ntoa` Functions



# 3.7 `inet_pton` and `inet_ntop` Functions

# 3.8 `sock_ntop` and Related Functions

# 3.9 `readn`, `writen` and `readline` Functions

*