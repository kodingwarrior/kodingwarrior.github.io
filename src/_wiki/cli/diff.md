---
title: CLI/diff
date:  2023-01-25
layout: wiki
tags: cli
---

[diff](https://en.wikipedia.org/wiki/Diff) 명령어는 겉으로 보기에 비슷해보이는 두 개의 파일이 있을때, 어떤 부분이 다른지 파악하기 쉽게 해주는 유닉스 명령어이다. ~~운영체제 과제를 하면서 친해질 수 밖에 없는 친구이다~~

## diff 옵션 설명

* `-u` - diff 명령의 출력을 좀 더 읽기 쉽게 해준다.
  * 해당 옵션을 빼고 실행할때는 코드가 삭제되는 부분/코드가 추가되는 부분만 표시해주지만, `-u` 옵션을 포함해서 실행하면 **추가/삭제되는 코드가 포함된 맥락을 같이 표시**해준다. 
  * 즉, 어떤 역할을 하는 코드가 변경되는건지 한눈에 파악하기 좋다.
* `-r` - 디렉토리 내부에 포함된 subdirectory까지 포함해서 재귀적으로 실행한다.

## diff 명령어 레시피

* `diff -Naur dir1/ dir2/`

두 개의 directory 간 diff를 표시해준다.

* `vimdiff`

diff 명령어는 일반적으로 before/after가 상하로 분리되어서 표시되지만, vimdiff 명령어를 사용하면 before/after가 좌우로 분리된 화면으로 확인이 가능하다.
