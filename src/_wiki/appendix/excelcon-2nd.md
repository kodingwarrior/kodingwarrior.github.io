---
title: 제 2회 EXCELCON - Neovim으로 생산성 퀀텀점프하기
description: 어쩌다가 Neovim으로 생산성이 올라가게 되었는지 발표하게 되었습니다.
date: 2023-05-19
layout: wiki
tags: archive productivity vim
---

> Q&A는 취합해서 6월 중순 쯤에 업데이트해서 공유하겠습니다.

제 2회 EXCELCON 에서 시간상 다루지 못했던 주제들, 그리고 참고하면 좋을 것 같은 자료들을 전달하기 위해 이 문서를 만들었습니다. 관심가지고 찾아오신 분들에게 도움이 되길 바랍니다.

* [공개용 슬라이드](https://docs.google.com/presentation/d/1DaVImp6dEz7q5Vdz1U10Hh0hE_CDGEUa4DNy39cv6-w/edit?usp=drivesdk)


# I. Neovim 입문하기
{:#s-1}

주변 사람들의 온보딩 없이 CLI 기반의 에디터에 익숙해지는게 마냥 쉽지는 않습니다.

저의 개인적인 경험에 기반하자면, 2020년도 쯤에 Neovim을 쓰는 것을 시도했었으나 dotfiles 설정하는 과정에서 어딘가가 꼬여서 포기했던 적이 있었거든요. 2022년도 쯤부터 였을까요? 주변 사람들이 하나둘씩 Neovim을 쓰기 시작하면서부터 `이젠 정말 시행착오를 겪는데 있어서도 답답함은 없겠다` 싶은 생각이 들었고, 저도 덩달아서 다시 한번 Neovim을 써볼까하는 생각이 들기 시작했던 것 같습니다.

2020년도쯤에는 혼자서 맨땅에 헤딩하면서 dotfiles를 세팅해왔기 때문에, 좀 더 나은 개발경험을 위해서 어떤 것들을 할 수 있는지, 괜찮은 플러그인은 어떤 것들이 있는지 같은 것들을 아예 모르고 시작했던 것 같아요. 한국어권 한정으로는 양질의 자료들을 보지 못했던 것도 있구요. 2022년에 다시 Neovim을 접할 때 쯤에는  Vim을 사용하는 **주변 지인분들께 이것저것 물어보면서** 겨우겨우 Neovim을 주 에디터로 쓸 수 있는 경지에 도달하게 되었습니다.

물어볼 사람이 있다는 것, 주변 사람들을 통해서 괜찮은 리소스를 알게 된다는 것이 생각보다 의미가 크다는 것을 알았어요. 이 글을 읽는 분들에게는 Neovim 입문에 도움이 되실 수 있기를 바랍니다.

## All-in-one 패키지를 원하는 분들을 위해...
{:#s-1-1}

Neovim을 시작하는 데 있어서 가장 부담이 되는 것은 플러그인을 설치하고 dotfiles를 구성하는 것입니다. 다행히도 그런 분들을 위한 스타터킷이 여럿 있습니다. 아래에 있는 것 중에 본인에게 맞는 것을 찾아서 시도해보는 것을 권장합니다.

* [AstroNvim](https://github.com/AstroNvim/AstroNvim) - VSCode, IntelliJ 등의 IDE와 비슷하게 구성한 Neovim 개발환경입니다.
* [Ecovim](https://github.com/ecosse3/nvim) - 프론트엔드 개발 맞춤형 Neovim 개발환경입니다.
* [LazyVim](https://github.com/lazyvim/lazyvim) - Neovim 플러그인 개발자로 유명한 folke가 구성한 Neovim 개발환경입니다.

플러그인도 굉장히 다양한 종류가 있는데요. 일본의 어떤 개발자가 Neovim 플러그인을 정리해 놓은 아티클이 있으니 참고가 되었으면 합니다. [(참고)](https://zenn.dev/yutakatay/articles/neovim-plugins-2022)

## dotfiles
{:#s-1-2}

좋은 코드를 짜려면, 다른 사람들이 짠 좋은 코드를 보다 보면 늘게 된다는 건 흔히 알려져 있는 사실입니다. dotfiles를 구성하는 것도 마찬가지입니다. 다른 사람들이 만들어놓은 dotfiles를 살펴보면서 나에게 필요하겠다싶은것들을 적절히 취사선택해서 도입하면 생산성에 유의미한 변화가 생길 수 있을 것입니다.

아래에 나열한 리포지토리는 제가 개인적으로 많이 참고하고 있는 dotfiles 레포지토리입니다.

* [simnalamburt님의 dotfiles](https://github.com/simnalamburt/.dotfiles)
* [wookayin님의 dotfiles](https://github.com/wookayin/dotfiles)
* [achimnol님의 dotfiles](https://github.com/achimnol/dotfiles)
* [JohnGrib님의 dotfiles](https://github.com/johngrib/dotfiles)

# II. 세션에서 다루지 못했던 주제들
{:#s-2}

30분이라는 제약된 시간 상 어쩔 수 없이 생략할 수 밖에 없었던 다양한 주제가 있었는데요. 그 중, 몇 가지를 소개하고자 합니다

## textobject
{:#s-2-1}

textobject는 텍스트를 블록 단위로 선택할 수 있게 해주는 기능입니다. 블록 단위로 선택할 수 있게 되면, 블록에 대해 다양한 명령어를 사용할 수 있습니다. 예를 들어, 블록을 복사하고 붙여넣기, 블록을 이동시키기, 블록을 삭제하기, 블록을 변경하기 등의 작업을 할 수 있습니다.

예를 들면, 아래와 같은 키맵이 자주 사용됩니다.

- `ciw` : **단어**를 지우고 삽입 모드로 진입
- `ci"` : **따옴표** 안에 있는 내용을 지우고 삽입 모드로 진입
- `ci(` : **괄호** 안에 있는 내용을 지우고 삽입 모드로 진입
- `ci{` : **중괄호** 안에 있는 내용을 지우고 삽입 모드로 진입
- `ci[` : **대괄호** 안에 있는 내용을 지우고 삽입 모드로 진입

그 외에도, 아래에서 설명할 `nvim-treesitter-textobject` 와 함께라면 더욱 개발하는데 가속도가 붙습니다.

## Treesitter (neovim only)
{:#s-2-2}

Treesitter는 Neovim에서 사용하는 텍스트 파서입니다. 텍스트를 분석하여 AST(Abstract Syntax Tree)를 만들고, 텍스트를 수정할 때마다 AST를 업데이트합니다. 이렇게 AST를 만들어두면, 텍스트를 더욱 정교하게 분석할 수 있습니다. 예를 들어, `if` 문을 만나면 `endif` 문을 만날 때까지의 내용을 모두 선택하고 싶다면, AST를 이용하면 쉽게 구현할 수 있습니다.

Treesitter는 `nvim-treesitter`라는 이름으로 Neovim에서 사용할 수 있습니다.

Neovim에서 사용가능한 Treesitter 플러그인이 많지만, 대표적인 플러그인 몇 가지 정도만 소개하겠습니다.

### [Neovim treesitter playground](https://github.com/nvim-treesitter/playground)
{:#s-2-2-1}

내가 편집하고 있는 소스코드를 트리시터가 파싱했을때 **Syntax Tree** 구조가 어떻게 만들어지는지 시각화해주는 도구입니다. 주로 treesitter 커스텀 쿼리를 작성하거나, treesitter를 응용한 플러그인을 만들때 자주 사용되기도 하지만, treesitter 기반으로 만들어진 플러그인이 어떻게 동작하는지 파악하기에 좋습니다.

### [nvim-treesitter-textobject](https://github.com/nvim-treesitter/nvim-treesitter-textobjects)
{:#s-2-2-2}

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

### [syntax-tree-surfer](https://github.com/ziontee113/syntax-tree-surfer)
{:#s-2-2-3}

트리시터를 응용해서 플러그인을 만든다고 했을 때, 어떻게 하면 생산성을 끌어올리는 방향으로 사용할 수 있을지를 잘 보여주는 사례입니다.

다음과 같은 것들이 가능합니다.

* 논리적인 구조를 기반으로 커서를 빠르게 이동 (**Syntax Tree** 구조 기준으로 어느 노드로 점프할지가 표시됩니다.)
* 선택한 코드의 영역을 위/아래의 코드와 빠르게 바꿔치기 (**Syntax Tree** 구조 기준으로는 subtree의 위치를 바꾸는 것이라 할 수 있습니다.)
  * 쉽게 말하자면, **함수의 정의 순서 바꾸기/클래스 내의 메서드 정의 순서 바꾸기/변수 정의 순서 바꾸기** 등을 할 수 있습니다.


머릿속에 **Syntax Tree** 가 그려지는 분들이라면 더욱 잘 응용할 수 있는 플러그인이라 할 수 있겠습니다.

물론, 위에서 언급한 Playground를 같이 켜서 관찰해보면 어떻게 동작하는지 대략적으로 파악이 가능합니다.

## [nvim-cmp](https://github.com/hrsh7th/nvim-cmp) (Neovim)
{:#s-2-3}

**nvim-cmp**는 말 그대로 자동완성을 도와주는 플러그인입니다. 자동완성이라면 Language Server와 연동해서 자동완성하는것을 생각할 수도 있는데요. 그뿐만이 아니라, 스니펫 자동완성도 가능하고, 심지어 **git commit hash**까지 자동완성을 해줍니다. 개인적으로는 [Telescope.nvim](https://github.com/nvim-telescope/telescope.nvim)과 맞먹을 수준으로 굉장한 플러그인이라고 생각하고 있습니다.

몇 가지 대표적인 플러그인을 소개해보겠습니다.

* [cmp-git](https://github.com/petertriho/cmp-git) : Github/Gitlab 리포지토리 기반으로 PR, Issue, username 자동완성
* [cmp_luasnip](https://github.com/saadparwaiz1/cmp_luasnip) : 스니펫 자동완성
* [crates.nvim](https://github.com/Saecki/crates.nvim) : Rust의 디펜던시를 관리할때 자동완성 기능으로 보조해줍니다.

그 외에도 어떻게 응용할 수 있을지는 [여기서](https://github.com/hrsh7th/nvim-cmp/wiki/List-of-sources) 확인이 가능합니다.


# III. 개인적으로 관심있게 보는 주제들
{:#s-3}



## Note Taking
{:#s-3-1}

* [How I'm able to take notes in mathematics lectures using LaTeX and Vim](https://castel.dev/post/lecture-notes-1/) - 수학과 학생이 Vim 으로 강의노트를 작성한 후기
  * [How I manage my LaTeX lecture notes](https://castel.dev/post/lecture-notes-3/) - LaTeX 기반으로 작성한 강의노트를 관리하는 방법을 소개

## Miscellaneous
{:#s-3-2}

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

# IV. 마치며
{:#s-4}

이것저것 영업하고 싶은 마음에 얘기가 좀 길어졌습니다. 개인적으로는 Neovim이 굉장히 파워풀한 도구라고 생각하고 이것저것 소개하긴 했습니다만, 다른 분들은 어떻게 생각할지는 모르겠어요. **검색해서 도달가능한 한국어로 된 자료를 하나 더 만든다**에 큰 의미를 두고 싶어요.

이렇게 영업글을 쓰는 저도 아직까지는 완전히 사용법을 숙달했다고 자신하기는 어렵습니다. Vim User Guide를 완주하지도 않았거니와, 매크로라던가 textobject 같은것도 아직까지는 초보적인 수준으로 응용하고 있는 수준이고, 키맵도 전부 알고 있지 않습니다.

다만, 제가 정말 딱 필요한 수준으로 숙지하고만 있어도 어지간한 작업에는 지장이 없었습니다.[^1] GUI 기반의 프로그램으로 작업할때보다 작업속도가 비교적으로 빨라지기도 했습니다. Vim을 사용한다는 것 자체가 키맵에 익숙해지는걸 디폴트로 깔고 가기 때문에 평소에 체화하는 습관을 들이면 진입장벽이라고 느껴질만한 무수히 많은 키맵도 별 것도 아니게 느껴집니다.

아무튼, 영업은 여기까지구요. Vim/Neovim을 쓰지는 않더라도 본인에게 맞는 도구를 최대한 잘 활용해서 생산성을 끌어올릴 수 있으면 베스트라고 생각합니다. 읽어주셔서 감사합니다.

그리고... [vim.kr](https://vim.kr) 많은 관심 부탁드립니다.

[^1]: 이 글을 작성한 시각 기준으로는 Neovim을 사용하게 된 지 8개월 정도 됩니다.
