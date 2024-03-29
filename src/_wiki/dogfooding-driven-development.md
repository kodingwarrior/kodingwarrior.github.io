---
title: 개밥먹기 주도 개발
date: 2023-01-24
layout: wiki
---

> 이 글은 의식의 흐름대로 2023-01-24 기준으로 작성된 Draft 이기 때문에, 큰 흐름은 변하지 않을 수 있으나 내용이 다소 변경될 수 있습니다.


<br/>
<br/>

[개밥먹기](https://en.wikipedia.org/wiki/Eating_your_own_dog_food)란 무엇일까? 통상적으로 말하는 **개밥먹기**란 내가 직접 만든 프로덕트/서비스를 직접 사용하는 행위를 의미한다. 

개밥먹기를 통해서 내가 만든 제품에서 생각지도 못한 버그를 발견하기도 하고, 개밥먹기를 통해서 어떻게 하면 사용자에게 좀 더 나은 경험을 제공해줄 수 있을지 고민할 수 있게 된다. 개밥먹기를 할 수 있으려면 내가 개발자이면서 나 또한 고객이 되어야 한다.

내가 생각하는 **개밥먹기 주도 개발(Dogfooding-driven development)**은 개밥먹기를 하면서 제품을 만드는 것을 지향하는 개발이라고 정의하고 싶다. 어떤 프로젝트를 만들지가 고민인 사람들에게 **개밥먹기 주도 개발**이 해답 중 하나가 될 수도 있지 않을까라는 생각에 기록을 남긴다.

프로젝트를 만드는 사람들은 다양한 동기를 가지고 프로젝트를 만들기도 한다. 예를 들자면

* 특정 기술을 익히기 위해서라던가
* 할 줄 아는 스킬셋을 늘리기 위해서라던가
* 특정 서비스의 구현 원리를 익히기 위해서라던가

어떤 의도에서 프로젝트를 만들었는지는 아무래도 좋다. 성장을 위한 과업이 어떤 거창한 의도로 시작할 필요도 없으니깐. 하지만, 나에게는 프로젝트를 만들고 나서의 방향이 중요했다.

* 이걸 만들고나서 누군가에게 실질적인 쓸모가 있을 것인가?
* 이걸 만들고나서 내가 이걸 지속적으로 유지보수할 가치가 있는 것인가?
* 이걸 만들고나서 어떤 가치를 만들어낼 수 있을 것인가?

어떤 프로젝트이던간에 만들어 놓으면 내 성장에 도움이 될 수 있는 것은 자명하고, 이력서에 적을만한 것들도 생기는 것도 자명하다. 하지만, 나에게는 그런 것으로는 스스로 설득하기가 힘들었다. **당장 누군가한테라도 쓸모있는 도구여야 했다.** 그래야 유지보수할만한 가치가 충분하니까.

이러한 생각을 기반으로, 개밥먹기 주도 개발을 꾸준히 주장하는 사람 중 한명이 되었다. 위에서 언급한 세 가지 의문점을 기반으로 개밥먹기 주도 개발의 지향점을 다음과 같이 정의하였다.

* 당장 나에게 쓸모가 있어야 한다.
* 나에게 쓸모있는 만큼 남에게도 권장할 수 있는 제품이어야 한다.
* 내가 만드는 것이기 때문에 어떤 부가적인 가치를 만들어낼 수 있을지 계속해서 고민할 수 있어야 한다.
* 내가 만드는 제품이지만, 나 또한 고객이기 때문에 고객의 입장에서 불편사항을 빠르게 캐치할 수 있어야 한다.


## 개밥먹기 주도 개발로 만들었던 프로젝트

[[projects/neural-bridge]]{Neural Bridge}
  * 향후 개발 예정인 학습자료 아카이빙 서비스에 사용할 데이터로 사용하고자 시작했다.
  * [[neovim]] 기반으로 기록관리를 시작하면서부터, 구독 중이던 RoamResearch의 그래프 구조 시각화 역시 대체하고 싶었다.

[Mastodon.nvim](https://github.com/kode-team/mastodon.nvim)
  * Neovim으로 개발하고, Neovim으로 기록관리를 하면서 Neovim 안에서 SNS를 할 수는 없는 것일까? 라는 생각에서 개발을 시작한 프로젝트
  * [Mastodon.nvim 을 개발하고자 했던 의도를 잘 요약하는 GIF](https://github.com/kode-team/mastodon.nvim/blob/main/assets/tip-using-mastodon-buffer.gif)
