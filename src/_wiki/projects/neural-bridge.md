---
title: Neural Bridge
data: 2023-01-19
layout: wiki
---

이름의 유래는 `neural network` + `bridgetown`.

**신경망(Neural network)**처럼 복잡하게 얽힌 지식들을 시각화하고자 하는 의도에서 출발했고, 본 사이트를 구축하는 엔진이 **[bridgetown](https://bridgetownrb.com)**이기 때문에 지어진 이름이다.

제텔카스텐을 RoamResearch 에서 [[vim-plugin/telekasten.nvim]] 으로 옮겨가면서, 글 작성 + 개발 + 지식관리의 삼위일체를 이루어내고자 장기간 진행하고 있는 프로젝트이다. 

실제로 [[wezterm]] + [[tmuxinator]] 의 조합으로 워크스페이스를 분리해서 모든 작업을 진행하고 있는데, 프로젝트 별로 건너뛰고 싶을때는 [wezterm configuration 파일](https://github.com/malkoG/dotfiles/blob/main/private_dot_config/wezterm/keymaps.lua)에서 정의한 키 조합을 사용하고, 워크스페이스 안에서 window 간 이동할때는 tmux 명령어를 사용하면 된다. 
글 작성 프로그램 따로, 지식관리 프로그램 따로, 개발 프로그램 따로 켜놓고 `Super` + `Tab` 키 조합으로 화면을 바꾸는 것 자체가 번거로운 작업이었는데 모든 것을 [[Neovim]] 으로 해결하니 마음의 평안이 찾아오고 생산성도 퀀텀점프했다. Neovim을 사용해서 어떻게 워크플로우를 개선했는지에 대해서는 따로 아티클로 다루게 될 것 같다.

아무튼, 본 위키 프로젝트는 [[vim-plugin/telekasten.nvim]]{telekasten.nvim} 으로 작성한 문서들을 Bridgetown 기반으로 시각화해주는 프로젝트이기 때문에, 이를 사용하기 위해서는 **telekasten.nvim** 을 설치해야만 제대로 이용이 가능하다.  


