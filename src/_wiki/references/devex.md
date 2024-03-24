---
title: 개발자 경험 관련 레퍼런스
date:  2024-03-24
layout: wiki
---


## Tree Sitter

Tree Sitter 자체는 문법을 정의하고, 그 문법을 기반으로 소스코드를 파싱하는 파서를 생성할 수 있게 해주는 프레임워크라고 볼 수 있다. 이를 이용해서 생성된 파싱트리는 Scheme이라는 LISP 언어 기반의 질의어로 트리 구조를 탐색하거나 조작할 수 있게 해준다.

Tree Sitter는 소스코드를 `개행 문자가 포함되어있는 1차원 문자열`로 바라보던 관점을 `AST`, 즉 `트리` 라는 관점으로 바라볼 수 있게 해준다.
어떤 언어든 모두 각 언어마다 각 언어로 작성된 소스코드를 AST로 변환해주는 라이브러리가 있지만, Tree Sitter는 완전 다른 접근이다.
트리시터를 기반으로 파서가 정의되어 있다면, 트리시터 기반의 파서로 생성된 파싱트리에 대한 질의는 언어에 상관없이 동일한 경험을 제공할 수 있다.


### Tree Sitter를 응용할 수 있는 사례

* 코드가 정의된 위치를 바꿔치기 (트리에서 sibling끼리 위치를 바꿔준다고 생각하면 이해하기 편하다)
* 주석에 포함되어 있는 소스코드의 문법 강조


### Tree Sitter를 응용한 프로젝트

- [ast-grep](https://github.com/ast-grep/ast-grep) - `tree-sitter`의 쿼리를 응용해서 AST를 기반으로 패턴을 검색하거나, 매칭되는 것을 찾아서 대체할 수 있게 해준다.
- [difftastic](https://github.com/Wilfred/difftastic) - Rust 기반으로 RIIR (Rewrite It In Rust) 프로젝트로 구현된 diff 도구이다. delta와 크게 차이없어 보이지만, diff 안에서의 소스 코드 구문 강조는 `tree-sitter` 기반으로 구현되어 있다.
- [GritQL](https://github.com/getgrit/gritql) - ast-grep과 비슷한 프로젝트로, `tree-sitter`를 이용해서 AST를 기반으로 쿼리를 날릴 수 있게 해준다.


## Language Server

Language Server는 특정 언어에 대한 지원을 제공하는 서버이다. 이 서버는 LSP라는 프로토콜을 사용하는 클라이언트와 통신하며, 클라이언트가 요청하는 작업을 수행한다. 더 나은 경험을 제공해주기 위해서 랭귀지 서버는 백그라운드에서 상시 실행되면서 LSP 클라이언트의 요청을 처리하는데, 여기서 LSP 클라이언트는 에디터나 IDE를 말한다.

Language Server Protocol은 Microsoft에서 제안한 프로토콜로, 에디터/IDE와 랭귀지 서버 간의 통신을 위한 표준을 제공한다. LSP에 대한 설명은 [여기](https://microsoft.github.io/language-server-protocol/)에서 확인할 수 있다.

즉, 랭귀지 서버가 구현되어 있다면, 에디터/IDE가 어떻게 구현되어 있든 상관없이 랭귀지 서버를 통해 통일된 경험을 제공할 수 있다.


랭귀지 서버는 다음과 같은 기능을 제공한다

- 코드 완성
- 코드 정의로 이동
- 코드 참조 찾기
- 코드 하이라이팅
- 코드 포맷팅
- 코드 분석 (에러, 경고, 힌트 등)

IDE에서 기대할만한 기능들은 다 제공해준다고 볼 수 있다.
여기다 덧붙여서 마크다운/HTML/AsciiDoc/LaTeX 같은 마크업 언어도 랭귀지 서버를 이용하면 좀 더 풍부한 경험을 제공받을 수 있다.


### Language Server를 응용한 프로젝트

- [Vale](https://vale.sh/) - 마크다운 문서에 대한 스타일 가이드를 제공해준다. 구글/어도비/마이크로소프트 등에서 제안하는 스타일 가이드를 그대로 적용할 수도 있으며, 사용자가 직접 스타일 가이드를 정의해서 사용할 수도 있다. 주로, 적절하지 못한 표현이 들어가 있을때 경고를 띄워주는데, 이런 경험이 랭귀지 서버를 이용해서 구현되어 있다. VSCode, Emacs, Neovim 등 대부분의 에디터에서 사용할 수 있다.
- [korean language server](https://github.com/aca/korean-language-server) - 한국어 맞춤법 검사기를 랭귀지 서버에 연결한 프로젝트이다. 어떤 에디터를 사용하든, 한국어 맞춤법 검사를 랭귀지 서버를 통해 이용할 수 있다.
