---
title: "「고양이도 할 수 있는 Vue.js」 리뷰"
layout: post
date: '2019-10-02 02:27:00'
categories: post
toc: true
---

필자는 회사에서 프론트엔드 프레임워크 **Vue.js**를 이용하여 프론트엔드 개발을 하고 있으며, 개발 언어는 **Typescript**를 쓰고 있다. 제이펍 출판사의 이벤트에 당첨되어, "고양이도 할 수 있는 Vue.js"라는 책을 받았으며 아래와 같이 후기를 남긴다.

# I. 선행 지식

이 책을 읽으려면 약간의 선행지식이 필요하다.

초보자도 이해할 수 있는 책인건 분명하지만, 어느 정도 배경지식은 갖추고 있어야 이해할 수 있음을 밝혀둔다. 이 중에 하나라도 모르는 것이 있다면, 이 책만으로는 공부하는데 어려움이 있을 것이다.

- **HTML/CSS 기본 지식**

이 책을 구매하려고 고민중인 사람들이 **Vue.js**를 어떤 목적으로 배우려고 하는지는 모르겠다. 하지만, **Vue.js**로 개발하려면 **HTML/CSS**로 페이지를 윤곽잡는 것부터 시작하기 때문에 **HTML/CSS**에 대한 배경지식은 필수적으로 요구된다.

- **자바스크립트 기본 지식**

Vue.js는 이름만 봐도 알 수 있듯이 자바스크립트로 짜여진 프레임워크이다. 자바스크립트로 짜여진 프레임워크를 이용하려면 당연히 자바스크립트에 대한 지식은 필수라고 할 수 있다. 

그럼 자바스크립트 문법만 대충 알고 가도 되냐? 그렇지도 않다. 자바스크립트 문법을 아는 것 만으로는 충분하지 않다. **Vue.js**의 주된 용도는 자바스크립트로 UI를 구성하는 것이기 때문에, 자바스크립트를 이용해서 DOM 요소를 어떻게 조작하는지는 알고 있어야 할 것이다. 

여기까지도 이해하고 있다면, 책을 펼치고 공부하는데 어려움이 없을 것이다. 

아직 준비가 되어 있지 않았음에도 지금 당장 뛰어들어보고 싶다면, W3School([https://www.w3schools.com/](https://www.w3schools.com/))과 함께하기를 권장한다.

# II. 책의 구성

어떤 책인지 알 수 있는 방법은 뭐니뭐니해도 목차를 살펴보는 방법이라 할 수 있다. 책의 구성을 살펴보자. 책은 9개의 장(Chapter)과 55개의 절(Section)로 구성되어 있다.

**전반부에서는 Vue.js의 기본적인 기능을 설명하고 있다.**

- **1장** Vue.js 프레임워크의 기초
- **2장** 데이터 등록과 변경
- **3장** 이벤트와 입력 양식
- **4장** 데이터 감시하고 가공하기
- **5장** 컴포넌트로 UI 부품 만들기
- **6장** 트랜지션과 애니메이션

**후반부에서는 자바스크립트, Vue.js 생태계를 활용해서 본격적으로 개발하는 방법을 설명하고 있다.**

- **7장** 큰 규모의 애플리케이션 개발하기
- **8장** Vuex로 애플리케이션 상태 관리하기
- **9장** Vue Router로 SPA 만들기

목차만 봐도 알 수 있듯이 이 책은 A-Z까지 친절하게 설명해주고 있다. Vue.js의 키 컨셉을 설명하는 것부터 시작해서, 컴포넌트를 조합해서 어플리케이션의 기능을 구현하는 방법을 살펴보고, Vue.js 생태계를 활용해서 큰 규모의 어플리케이션을 만들 수 있도록 안내해준다.

완전히 초보자를 위한 책은 아니지만, Vue.js를 처음 접하는 사람들에게는 꽤 권장할 만하다.

### 직관적인 이해를 돕는 일러스트

입문서로서 이 책이 무엇보다 좋은 점은 중간중간에 동작원리를 설명하는 삽화가 잘 삽입되어있다는 점이다. 책의 원 저자가 엔지니어 겸 디자이너이다보니 삽화의 퀄리티도 제법 괜찮은 편이었다.

![컴포넌트를 조합해서 복잡한 구성의 페이지를 간단하게 만들 수 있다는 것을 의미내는 삽화](https://lh3.googleusercontent.com/4cTk9gJ93qWp7PdKrWau0n7I2b8mxN1jQECbL3fPmWhqc1KcSVBIwKCZ1osMVHAfnsoah3X4HEfOZO7Hm5LTWO4_cqTckofJpiBEkZv3NfizGU-6H-Q6jo38Za-CLqwR9he97TBJtq9YrdmrOY-D57ef_w9TBQ7W_nLymyruoLuep8qK6cCcrR1db3XkDVEXNGAtWBmjrl_mmLMldBM42e0uN4kF6JI5kRPVDlQCv6XW99cnyMpN538CyAOGpK4MksXvYrKf-oGhW2op9-eipe_A_MIlA4M7rA1La2CbiElSzoYNuVQbJgI_y0_VsEzomYjJamTZUfqIDutG30sJbcsYpOaRmAgGp0WHLvPzZclQgwvMjHwueuMy3RWvjatPbCv-hQJmhuuRxJXgqZSvtiTFA1L_NxX0X6acd2UwxeP8MLSmJG96wzwNwz8PlTxhwyohFf9RY9o5EMqvk6JKYKnvA_t1iqjMC2a1saktAlLL_VVw5N-LeAA3CygASqtDY-nLhyE8chiSvK8KRy4TL9JBmeMHEhcKN8YXWy6EylTaTIKOHFG8p1bx3U_5p56Fk-GqfaXaQGnSr7kim-OWnGiLKkSDHY-HXQriS9qkC8okyw0cMhH1u2fIbkIE4EeSLlS-OOGhhd4-4X5Vn2K8zeop2SFvdWW2JGeDYSbE67AjlD0zkinoU-M=w947-h411-no)

> 컴포넌트를 조합해서 복잡한 구성의 페이지를 간단하게 만들 수 있다는 것을 의미내는 삽화

![재사용가능한 컴포넌트를 활용해서 동일한 모양의 UI 요소를 간단하게 만들어냄을 의미하는 삽화](https://lh3.googleusercontent.com/zYuBZoP6d-VnxkyrjqNoGG_HXCYFiHHSbsL2c0wmeTtkaVAp9aODH7F3M0CNziHaCFKTaOVnS8BTmb2Zfj0S26WA25vQA-KhH6t_27upGeU1DOlKRcR0gIUvCItRa6NYxIo0pPmr_yOPMXZAtAak4maW_drUHJD4WMH7fbHjBjOizeysCXxfmOBTZEVBDKzN5ArH07KwAH5uyqSS5DBcJcWKW1W-MI7qoNpM0X9ld4aZzMcNVJIpj3Ns5TQIhsrQ6HmlH0sKFwqW30LkyJzr3xygKpWymqP7DgITdlaEYmcqwFUhJoy0NkIv7JxzuUAt2BddYSw-WjDKdmTolpYt22E0KzINmkmviYdlGBDXj_0fzat31LiHQuQZsKaNFLkO-KWxhHMiL3giTs_9amTq0KpqFXm5NsgNYbRRrfKAzgeOvmGcRxJxjGUxXXZ9jRDujWqKEcRicp_Xl-AJ-56clqkHuVt_p5n_EFzvcXsCRSUvulHfet2qub180Xp2WmD9g1_vryQqxYZvU7Mr98ZZt5Ay1VWfTT1_ZWyj2F5j8ZYsqe7A8eLq_FKKVBkwvCUfl4vvH9Rfrj_MT1mT75cYETdZQ3GxPBS6_RSClXjPlev72GG0jZqN28bBSRAo9l6wAdauBNNV_VYmnvt5CnFZzNP2NeGmeMYBtz-zhi-RI_y6_Q8oPm99qCE=w884-h354-no)

> 재사용가능한 컴포넌트를 활용해서 동일한 모양의 UI 요소를 간단하게 만들어냄을 의미하는 삽화

![트랜지션 태그가 동작하는 모습을 설명하는 삽화](https://lh3.googleusercontent.com/bKE22lskhWZnnzd-E3bXKhy9pECMZa5m8mzz9uP38NyW5QyJrNKOFFwYr9LSXhqF8-GAvezxhNGEgVIzCx1t2NjrV1hr3BAHF-ub_opySSf6IbIuu6i9Eh1xlJaN6cuEW5Kt8BJESuvRnWjs_DUHb2uieEYgtMbkHaqf8O19F8EUIlOnON--rwmdhm5_MB8Yc-JFkdCD4gNVhK9jagWoSmyJVQHPRGYJ5EVtt-0CqjN4JsDs7d4CecCxLEudMYLmIhnirIPaV-gCGyhmAGoHwYQt4xYjjvsEc7gYX0CcGdirZlWZJVHT3kdOEvT9W7rOM4yt2WI_Ur5xSpZL2nbaybmh3C2m-7IhCcFpBdtICBkRp8HjXxi6p-OSvPxqg0KLvkXJvO9EHHvGEUvkj4LJy_H5pVXPOQlr15Aa6g9udiPypRI2PEVJ2pLagsqb3pY4ycVzdu7B-SzeCqcUCNkvpexNSQYl4Mo80GnSJghC2YZRn_sWismelAC-7vvr8fZQK7RjJSXYWxiIMIAtxapNKawfO5twTvXmNqvadfK9Y3iVxnbJmRQ5DBUP7OuXXSWcm66lz3ZYfGe-Kyb54phSVZkUuRo3XNLoh_OdjP5vXS41aQceVqHCtQxsxQ38NdYibJ4ogWvvkIVIZxm7Ut2wL4D4xZLKzCyJ6UP7iRFxWWv1hpJKGyRtX8kj6YAmKz0vGL3_uXnOuPc5snzQE5-JwLp2i0p88-3X3XFH12wrvfadwnvv=w884-h354-no)

> 트랜지션 태그가 동작하는 모습을 설명하는 삽화

### 책 못지 않게 완성도 있는 보조 자료

책의 이해를 돕기 위해 배포된 메뉴얼 페이지도 인상적으로 와닿았다. 원본은 일본어로 되어 있지만, 한글 버전으로 옮겨진 버전이 있다. 원서 못지 않은 정성을 발휘해서 번역하신 번역가분께 리스펙을 표현하고 싶다. [https://rintiantta.github.io/jpub-vue](https://rintiantta.github.io/jpub-vue)

![메뉴얼 탭에서는 책에서 설명했던 소스코드들이 나열되어 있으며, 소스코드를 실행한 결과를 눈으로 직접 확인해볼 수 있다.](https://lh3.googleusercontent.com/4XO0sIGQrKQNEJBrz-IJjhJamjRUYfDtUCCdJ6yt7h390-mVcE8Uu-tp-vc6bmkFo079TEJCqh8Ri7s1xqGaJCfW-4rk22lTq4YWSyetJfRr8-O0yVbeF2MGaPbglg-sMqp8vHBE1DlWYPCSFid-XwKHLampPxFugnVGlFsJUAa2Unk7oTXltT66eq4Ce0GJFxH2PLvldD8na3qEUFICi2UEMYTQvRLuuA9jllsSs7wwz5AK7E9Ye-98QHBF5rX-URCH4fx0GS9h_FBXyXQl4r64zTcedIw47FbPlo-U9C3VViMMdBwDoVrQxkWrgAeCTQqFTelIPfZpDa9mq6K4Zw51ObZFb1wzNImBLoV-MF7wJGot_1KmYpBWtwykrXda0GzJDKcs_rMqc2W-zieQ1zMsPvcDOC5CKqQSfqzYVZwygWeHBDsPmnmSH7I8OYvIS31kF1a6Jw7yDBGWyeVv9uHvg6s2X1jG-0jeL4lq2i_5A-C81ei2vuyAwmnP8IC-nPOcFfwEbqyercKXQiptDGBBDOnUEKLgq7NRsLFK9w0cCu0GeiZYhOcJYkh6eTiK9asw-l2TWClLUG9SF1qVjfc65uHIJkfCcognm6W4kdnyHWqLZsm-5dINZzGxwUWoOgCj9RSNUZ_2g1P2WiHmJQ_w-92XGu_GNKkZZrzoG6MGYlq-sqI6KxI=w1365-h759-no)

> 메뉴얼 탭에서는 책에서 설명했던 소스코드들이 나열되어 있으며, 소스코드를 실행한 결과를 눈으로 직접 확인해볼 수 있다.

![메뉴얼 페이지는 Vue.js를 이용한 소스코드를 직접 돌려볼 수 있도록 개발되어 있다.](https://lh3.googleusercontent.com/G-p-cpaYl_JNzpecQs1Rro5jj3J490ZxXg7gFbQJ9h2XxC1xvUln1p62STRoC2-AU4IwnoI1rHMoTykGiaLI1vRB-QLT3ss5pkVvpQIhDPNcDrTq-xGZTsl9uY0iDy5xAN3FsfaOJLViGVq4Mx4oYR2cd1EQS2aA18vizvWLMMq2qFu7jbTnqMsr5LJKWw22lZf7MqtuFgzvqVDR511riIufxIGOL3sj2zEPMc1G51VrH8QGjjKOvwfVlU4PBN0oHaECpyBL9GwH6BLCNc-ricfSYnpDkyUh9p5hft0CYH46xacitf_it2aaXcVixh5bKZHuB15ExHDSfNmNGx4XvlAXdp1cIMHmeMKsmX9T_o3XVihUdX9ckUh5IwisyIsNnNSfvkQ4C0SWs5XhyvNWeFMoxZ7HrzhojyAFYHpQKfibF-v0R04kQDb6CIk7Vk-tEoeLVTYufVXmcF8uzRN2FHPQoGVtQmRoPnu5wLCpg1PZd4dHzkNh-rxfDqQEXxqAgDQXAR7xjwNh_0XgV-xFyuvcTH2rNDjdgt8j17y_ECJwJkSKkzGWqH0qgrJuPnuyBlMLIEHuOxxW-T2cSq6cRw4xJMl4ZtqxgbRebF_80322e_f5P93-hUDcXndWwSUXZPqsO1Gg8AHAl86kT0gZ4uOwcJqJPs8bFo1SLov85pl59Ucq0Wz4QTY=w1365-h803-no)

> 메뉴얼 페이지는 Vue.js를 이용한 소스코드를 직접 돌려볼 수 있도록 개발되어 있다.

# III. 결론

이 책은 초보자도 이해할 수 있는 수준으로 설명이 잘 되어 있다. **Vue.js**는 공식 가이드만 봐도 사용법을 한번에 이해할 수 있을 정도로 문서화가 잘 되어 있는 것으로 잘 알려져 있으나, 본 교재는 **Vue.js** 가이드를 보고도 이해가 되지 않는 점들을 삽화까지 첨부하면서 이해시키려고 노력하고 있다. **Vue.js** 가이드가 어렵게 느껴진다면, 한번쯤은 구매를 생각해볼만 하다.

이미 **Vue.js** 사용법을 알고 있는 시점에서 이 책을 읽긴 했지만, 애매하게 알고 있었던 부분을 제대로 이해하는데 도움을 얻을 수 있었다. 주어진 시간이 얼마 없는 개발자라면, 쓱 훑어보면서 대략적인 컨셉을 이해하고, 필요할 때마다 관련된 챕터를 공부해보는 방법도 괜찮을 것이라 감히 권장해본다.