---
title: Dotfiles 해설본
date:  2024-04-13
layout: wiki
tags: productivity
---

> 아직까지는 문서화가 제대로 되어 있지 않은 관계로, 직접 이것저것 지워가면서 시행착오를 해야 할 수도 있으니 주의하시길 바랍니다.

Dotfiles 구경은 [여기](https://github.com/malkoG/dotfiles)에서 할 수 있습니다.

## 사용 방법

dotfiles는 [chezmoi](https://www.chezmoi.io/)라는 CLI 도구를 사용하면서 관리하고 있습니다. 따라서 dotfiles를 그대로 사용하려면, chezmoi를 설치하는 것을 권장합니다.

chezmoi로 dotfiles를 사용하는 방법은 다음과 같습니다.

1. 먼저, [dotfiles](https://github.com/malkoG/dotfiles) 리포지토리를 fork 해줍니다.
2. 그 다음, chezmoi를 설치합니다.
3. 마지막으로, 아래 명령어를 실행합니다.

```bash
sh -c "$(curl -fsLS get.chezmoi.io)" -- init --apply git@github.com:<fork한 리포지토리> (ex. malkoG/dotfiles)
```

## 구성

- [zsh](https://github.com/malkoG/dotfiles/blob/main/dot_zshrc) (with oh-my-zsh)
  - fzf 를 사용한 검색이 많은 비중을 차지하고 있습니다.
  - 자주 사용하는 스크립트는 [여기](https://github.com/malkoG/dotfiles/blob/main/private_dot_config/kungfu/scroll.sh)에 모아놨습니다.
    - Todoist API를 사용한 스크립트도 포함되어 있습니다.
- [mise](https://github.com/malkoG/dotfiles/tree/main/private_dot_config/mise) : 패키지 매니저 겸 커스텀 스크립트 실행
  - 커스텀 스크립트는 [여기](https://github.com/malkoG/dotfiles/tree/main/private_dot_config/mise/tasks)서 확인할 수 있습니다.
- [wezterm](https://github.com/malkoG/dotfiles/tree/main/private_dot_config/wezterm) : GPU 가속을 지원하는 터미널 에뮬레이터
  - lua로 커스터마이징이 가능한 터미널 에뮬레이터입니다.
- tmux (with tmuxinator)
  - [tmuixnator](https://github.com/malkoG/dotfiles/tree/main/private_dot_config/tmuxinator)
- [neovim](https://github.com/malkoG/dotfiles/tree/main/private_dot_config/nvim)
- [gitconfig](https://github.com/malkoG/dotfiles/blob/main/dot_gitconfig)


### 설치가 필요한 프로그램

* [fzf](https://github.com/junegunn/fzf)
  * fuzzy search를 지원하는 강력한 CLI 도구입니다.
* [gum](https://github.com/charmbracelet/gum)
  * 텍스트 입력/단일 선택/다중 선택 등 bash 스크립트에서 사용자 입력을 처리하는 데 도움을 주는 도구입니다. Perl/Ruby/Python 등의 스크립트 언어에서 시스템 콜을 호출하는 방식으로도 이용할 수 있습니다.
  * 사용 예시는 [여기](https://github.com/malkoG/dotfiles/blob/main/automation/browse_diff.rb)에서 확인할 수 있습니다.
    * 예시의 스크립트는, 자세하게 보고 싶은 git log를 선택해서 각각의 diff를 보여주는 스크립트입니다.

#### RiiR CLI

* [ripgrep](https://github.com/BurntSushi/ripgrep) : grep의 대체제로 빠른 검색을 지원합니다.
  * nvim-telescope의 backend로 사용하고 있습니다.
* [bat](https://github.com/sharkdp/bat) : cat의 대체제로 syntax highlighting을 지원합니다.
  * .gitconfig에서 pager로 설정되어 있습니다.
* [delta](https://github.com/dandavison/delta) : diff를 rust 기반으로 구현한 CLI 도구
  * diff에다가 syntax highlighting을 지원하여 좀 더 가독성을 높여줍니다.
    * syntax highlighting을 하는 방식 역시 커스터마이징 할 수 있습니다.
  * .gitconfig에서 diff 툴로 설정되어 있습니다.
* [lsd](https://github.com/lsd-rs/lsd) : ls의 대체제로 좀 더 다양한 옵션을 제공합니다. [$XDG_CONFIG/lsd/config.yaml](https://github.com/malkoG/dotfiles/blob/main/private_dot_config/lsd/config.yaml)에서 기본으로 적용되는 옵션을 커스터마이징할 수 있습니다.


#### Third-party CLI

* [Github CLI](https://cli.github.com/)
* (Optional) [Todoist CLI](https://github.com/sachaos/todoist)


## Neovim에서 사용하는 커스텀 스크립트

### 타임슬롯 리마인더


하루 시간을 여러 개의 슬롯으로 분할하고,  각 타임슬롯의 시작 시간/종료 시간마다 nvim-notify를 이용해서 알림을 주는 스크립트입니다.

<hr/>

<div class="flex flex-col lg:flex-row lg:justify-center gap-x-4 gap-y-4">
<center>
	<iframe src="https://social.silicon.moe/@kodingwarrior/110683948620729734/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" height="720" allowfullscreen="allowfullscreen"></iframe>
</center>

<center>
<iframe src="https://social.silicon.moe/@kodingwarrior/110683962938056431/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" height="775" allowfullscreen="allowfullscreen"></iframe>
</center>
</div>

<hr/>



소스코드는 [여기](https://github.com/malkoG/dotfiles/blob/main/private_dot_config/nvim/init.lua#L9-L30)에서 확인할 수 있습니다.

### OpenAI 연동

`OPENAI_API_KEY`를 세팅해야만 이용할 수 있습니다.

* [커밋 메시지 자동 작성](https://github.com/malkoG/dotfiles/blob/main/private_dot_config/nvim/lua/utilities/prompt-engineering.lua#L3-L19)
  * 요약 : "`git diff --cached` 에서 파악되는 내용을 기반으로 커밋 메시지를 작성해주세요"
* [커밋 메시지 수정](https://github.com/malkoG/dotfiles/blob/main/private_dot_config/nvim/lua/utilities/prompt-engineering.lua#L21-L56)
  * 요약 : "커밋 메시지를 이렇게 작성했지만, 이렇게 쓰는게 맞는지 모르겠어요. `git diff --cached` 에서 파악되는 내용을 기반으로, 커밋 메시지를 좀 더 적절하게 수정해주세요"

<script src="https://social.silicon.moe/embed.js" async="async"></script>
