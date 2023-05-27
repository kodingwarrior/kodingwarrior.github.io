---
title: 제 2회 EXCELCON - Neovim으로 생산성 퀀텀점프하기
date: 2023-05-19
layout: wiki
---

제 2회 EXCELCON 에서 시간상 다루지 못했던 주제들, 그리고 참고하면 좋을 것 같은 자료들을 전달하기 위해 이 문서를 만들었습니다. 관심가지고 찾아오신 분들에게 도움이 되길 바랍니다.

공개용 슬라이드는 발표가 끝난 후 다음날에 공개하겠습니다. (추가적인 내용이 들어갈 예정입니다.)

## Neovim 입문하기

Neovim을 시작하는 데 있어서 가장 부담이 되는 것은 플러그인을 설치하고 dotfiles를 구성하는 것입니다. 다행히도 그런 분들을 위한 스타터킷이 여럿 있습니다. 아래에 있는 것 중에 본인에게 맞는 것을 찾아서 시도해보는 것을 권장합니다.

* [AstroNvim](https://github.com/AstroNvim/AstroNvim) - VSCode, IntelliJ 등의 IDE와 비슷하게 구성한 Neovim 개발환경입니다.
* [Ecovim](https://github.com/eceosse3/nvim) - 프론트엔드 개발 맞춤형 Neovim 개발환경입니다. 
* [LazyVim](https://github.com/lazyvim/lazyvim) - Neovim 플러그인 개발자로 유명한 folke가 구성한 Neovim 개발환경입니다.

플러그인도 굉장히 다양한 종류가 있는데요. 일본의 어떤 개발자가 Neovim 플러그인을 정리해 놓은 아티클이 있으니 참고가 되었으면 합니다. [(참고)](https://zenn.dev/yutakatay/articles/neovim-plugins-2022)

## textobject

textobject는 텍스트를 블록 단위로 선택할 수 있게 해주는 기능입니다. 블록 단위로 선택할 수 있게 되면, 블록에 대해 다양한 명령어를 사용할 수 있습니다. 예를 들어, 블록을 복사하고 붙여넣기, 블록을 이동시키기, 블록을 삭제하기, 블록을 변경하기 등의 작업을 할 수 있습니다.

예를 들면, 아래와 같은 키맵이 자주 사용됩니다.

- `ciw` : **단어**를 지우고 삽입 모드로 진입
- `ci"` : **따옴표** 안에 있는 내용을 지우고 삽입 모드로 진입
- `ci(` : **괄호** 안에 있는 내용을 지우고 삽입 모드로 진입
- `ci{` : **중괄호** 안에 있는 내용을 지우고 삽입 모드로 진입
- `ci[` : **대괄호** 안에 있는 내용을 지우고 삽입 모드로 진입

그 외에도, 아래에서 설명할 `nvim-treesitter-textobject` 와 함께라면 더욱 개발하는데 가속도가 붙습니다.

## Treesitter

Treesitter는 Neovim에서 사용하는 텍스트 파서입니다. 텍스트를 분석하여 AST(Abstract Syntax Tree)를 만들고, 텍스트를 수정할 때마다 AST를 업데이트합니다. 이렇게 AST를 만들어두면, 텍스트를 더욱 정교하게 분석할 수 있습니다. 예를 들어, `if` 문을 만나면 `endif` 문을 만날 때까지의 내용을 모두 선택하고 싶다면, AST를 이용하면 쉽게 구현할 수 있습니다.

Treesitter는 `nvim-treesitter`라는 이름으로 Neovim에서 사용할 수 있습니다.

Neovim에서 사용가능한 Treesitter 플러그인이 많지만, 대표적으로 `nvim-treesitter-textobjects`만 소개하겠습니다.

### <big>nvim-treesitter-textobject</big>

`nvim-treesitter-textobject`는 `nvim-treesitter`와 `textobject`를 연결해주는 플러그인입니다. `nvim-treesitter-textobject`를 이용하면, 텍스트를 분석하여 AST를 만들고, AST를 이용하여 다양한 작업을 할 수 있습니다. `nvim-treesitter-textobject`를 사용하면, `textobject`의 범위를 함수, 클래스, 모듈로 확장이 가능합니다.

**nvim-treesitter-textobjects로 할 수 있는 것들**

- `if`문을 만나면 `endif`문을 만날 때까지의 내용을 모두 선택
- `for`문을 만나면 `endfor`문을 만날 때까지의 내용을 모두 선택 
- `while`문을 만나면 `endwhile`문을 만날 때까지의 내용을 모두 선택
- `class`문을 만나면 `endclass`문을 만날 때까지의 내용을 모두 선택
- `function`문을 만나면 `endfunction`문을 만날 때까지의 내용을 모두 선택
- `if`문을 만나면 `else`문을 만날 때까지의 내용을 모두 선택
- `try`문을 만나면 `catch`문을 만날 때까지의 내용을 모두 선택
- `try`문을 만나면 `finally`문을 만날 때까지의 내용을 모두 선택
- `try`문을 만나면 `catch`문과 `finally`문을 모두 선택


## Note Taking

* [How I'm able to take notes in mathematics lectures using LaTeX and Vim](https://castel.dev/post/lecture-notes-1/) - 수학과 학생이 Vim 으로 강의노트를 작성한 후기
  * [How I manage my LaTeX lecture notes](https://castel.dev/post/lecture-notes-3/) - LaTeX 기반으로 작성한 강의노트를 관리하는 방법을 소개

## Miscellaneous

* [Helix Editor](https://helix-editor.com/)
  * Vim의 뒤를 잇는 또 하나의 multi-modal 텍스트 에디터입니다. (Rust 기반으로 개발)
  * Neovim에서는 플러그인 설치해야만 이용할 수 있었던 좋은 기능들을 Helix는 All-in-one으로 제공하려고 하는 느낌입니다.
  * 2023년 6월 3일 기준으로는 플러그인 시스템이 탑재되어 있지 않습니다. 
* Neovim을 사용하는 유튜브 스트리머 
  * [ThePrimeagen](https://youtube.com/ThePrimeagen) - 주로 Rust/Typescript 기반으로 개발합니다.
  * [TJ DeVries](https://youtube.com/teej_dv) - 세션에서 언급했던 [Telescope.nvim](https://github.com/nvim-telescope/telescope.nvim)를 개발한 사람입니다.
  * [BashBunni](https://youtube.com/bashbunni) - 주로 Golang 기반으로 개발합니다.
* Neovim/Emacs를 사용하는 사람들이 모이는 컨퍼런스도 있습니다.
  * [Neovim 컨퍼런스](https://www.neovimconf.live/)
  * [Emacs 컨퍼런스](https://emacsconf.org/)
  * 개발자 뿐만이 아니라 아카데믹한 분야에서도 Neovim을 쓰는 사람들이 제법 있다는것을 알게 되었습니다.
