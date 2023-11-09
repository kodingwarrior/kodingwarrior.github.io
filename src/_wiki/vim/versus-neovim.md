---
title: Vim vs Neovim
date:  2023-11-09
layout: wiki
tags: vim developer-experience
---

주변에서 하도 계속 물어봐서 Vim과 Neovim의 결정적인 차이점을 문서로 남긴다. 당장은 생각나는대로 나열했기 때문에, 추후에 내용이 더 추가될 순 있다.

## 사용하는 언어부터 다르다 (VimScript / Lua)

Vim을 커스터마이징할때는 **VimScript**를 쓰지만, Neovim을 커스터마이징할때는 **lua**를 사용한다.

개인적으론 VimScript를 선호하진 않는데, vimscript 기반으로 짜여져 있는 플러그인의 소스코드를 읽는 것 자체가 고통스러웠던 경험이기도 했고, vimscript라는 언어 자체가 그닥 가독성이 좋은 편은 아니라고 생각한다. 기능적으로는 모자람이 없을 순 있으나, 읽을때도 고통스러운데 이걸로 스크립트를 짜라면 어지간하면 피할 것 같다.

반면. lua는 vimscript에 비하면 가독성이 적당히 나쁜 편은 아니다. 언어 자체의 기능으로 보자면 Python/Ruby/Javascript 등의 언어와 비교했을때 굉장히 좀 난해하게 느껴질 수는 있다.[^1] 다만, lua는 macOS에서 사용하는 자동화 툴인 [hammerspoon](https://www.hammerspoon.org/)이라던가, 터미널 에뮬레이터인 [wezterm](https://wezfurlong.org/wezterm/index.html)이라던가 **Unix 계열의 CLI 프로그램의 configuration을 작성하는데 있어서 사실상 De facto의 역할**을 하고 있다. 언어 자체가 마음에 들지 않는 부분은 어느 정도 있긴 하지만, 가독성이나 개발편의성이 엄청 나쁜 것은 아니기 때문에 거부할 이유는 딱히 없다고 생각하고 쓰고 있다.

## luarocks 패키지와 호환이 된다
Neovim을 커스터마이징할때 활용하는 lua는 luarocks라는 패키지매니저가 있기 때문에, 필요하다면 얼마든지 가져다 쓸 수 있다.

luarocks를 이용하는 Neovim 플러그인은 그렇게 많지는 않지만, (실질적인 쓸모의 유무를 떠나서) luarocks를 활용한 플러그인도 종종 보이긴 한다. 확실한건, lua 기반으로 개발되어 온 ecosystem을 등에 업고 언제든지 활용할 수 있다.


## 플러그인 생태계도 제법 괜찮은 편이다.
**telescope** / **nvim-cmp** / **treesitter** 같은 키워드 위주로만 찾아봐도 이걸 응용한 괜찮은 기능의 플러그인들을 많이 살펴볼 수 있다.

### telescope

Neovim에서 사용할 수 있는 검색엔진이라고 생각해봐도 될 것 같다. 자세한 내용은 `:help telescope` 만 봐도 알 수 있겠지만, 파일 검색/패턴 검색 뿐만이 아니라 **query를 넣을 수 있는 것이라면 어떤 것이든 다 해낼 수 있는 요술봉**이라 생각한다.

예를 들면, **git log**를 검색한다던가, 현재 열어놓은 파일의 **git history를 열람**한다던가, **각각의 브랜치**에 대한 git history를 표시하는 등의 git과 관련된 유용한 기능은 이미 네이티브로 들어가 있다.

여기서 좀 더 응용한다면, 아래의 예시와 같이 이용할 수 있다.
* 프로젝트를 구성하는 소스코드의 **클래스/모듈/함수/상수 검색**
* formatter/linter 오류 검색 **(diagnostics)**
* GitHub 리포지토리의 **issue/PR 검색** -- [pwntester/octo.nvim](https://github.com/pwntester/octo.nvim) 참고
* throttling만 잘한다면 **웹 요청**이랑도 연결할 수 있다. 개인적으론 [알라딘 검색 API와 연동하는 실험](https://github.com/malkoG/aladin.nvim)을 하고 있다.

### nvim-cmp

이름에서 알 수 있듯이, 말 그대로 **자동완성 기능**을 위해 만들어진 플러그인 ecosystem이다. Neovim에서 자동완성 기능을 커스터마이징 해야 한다면, 바로 이 친구를 이용한다면 아주 간단한 문제가 된다.

pwd 기준의 경로 자동 완성 / emoji / 버퍼 내에서 반복적으로 사용되는 단어 위주의 자동완성 같은 사소한 것부터 **Code Snippet** / **git commit sha1 해쉬** / **GitHub author 자동 완성** / **Language Server와 연동된 auto import** 까지 입맛대로 자동완성 기능을 커스터마이징할 수 있다. 위에서 설명했던 telescope와 마찬가지로 쿼리할 수 있는 것이라면 어떻게든 활용할 수 있기 때문에 가능성은 무궁무진하다.

### treesitter

사실 이게 왜 좋냐고 하냐면 많은 사람들에게 설득하는게 약간 어려운 난제이기도 하다. "굳이?" 라는 생각이 들 수도 있기 때문이다.

[treesitter](https://tree-sitter.github.io/tree-sitter/) 자체는 파서를 만들어주는 제네레이터일 뿐이지만, 트리시터 기반으로 만들어진 파서가 활용도가 높기 때문에 유용함을 알고 있는 사람들은 잘 쓰고 있는 것 같다.

예를 들면, 커스텀 룰을 지정해주면 내가 탐험하고자 하는 소스코드의 범위를 탐색하는 것이 간단해진다. 왜냐면, scheme으로 커스텀 룰을 추가하는 것 자체가 일종의 트리 자료구조를 탐색하는 쿼리이기 때문이다.

**알고리즘**에 대한 배경지식이 있는 사람들한테는 좀 더 단순하게 설명하기도 하는데, **"treesitter는 2차원 배열로 바라봐야 하는 소스코드를 트리로 바꿔서 생각할 수 있게 해준다."** 이런 표현을 즐겨쓰는 편이다.

이에 대해 좀 더 직관적으로 와닿을 수 있는 예시는 [ziontee113/syntax-tree-surfer](https://github.com/ziontee113/syntax-tree-surfer)인데, 함수가 정의되어 있는 위치를 바꾸는 demo 영상을 살펴보자. Syntax tree로 나타내면 두 함수의 위치는 Tree의 관점에서 보면 sibling으로 볼 수 있다. **두 함수가 정의되어 있는 위치를 바꾸는것은 사실상 트리 노드의 위치를 바꾸는 아주 간단한 문제**로 환원이 된다.

## 그 외에도 두드러지는 점들

language server 지원도 나름 나쁘지는 않은 편인데, 제대로 세팅하려면 각각 language server마다 걸맞는 configuration을 해줘야 하는 수고로움이 생길 순 있지만, [coc-nvim](https://github.com/neoclide/coc.nvim) 세팅해놔도 개인적으론 크게 문제가 없었다.

Helix라는 신흥강자도 생기고 있는 모양이지만, 2023년 11월 기준으로는 크게 확 와닿을 정도로 삶에 혁신을 가져다 줄 만한 변화가 없기 때문에 당문간 관심을 가지는 건 보류


[^1]: lua라는 언어의 불편함에 대해서는 따로 글로 작성하게 될 것 같다. 그렇다고 아예 못 쓰겠다라고 느낄 수준은 아니지만, 여러가지 면에서 인지 부조화를 느끼게 하는 부분이 있다는 것은 부정할 여지가 없다.
