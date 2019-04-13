---
title: Kotlin으로 C++의 lower_bound, upper_bound 함수 구현하기
layout: post
date: '2019-04-13 16:31:00'
categories: post
toc: true
---

> TL;DR
> *  **`lower_bound`**, **`upper_bound`**를 구현할 때 반열린 구간 Notation을 지키는 것이 좋다. 
>
> * **`lower_bound`** 구현하기
> 1. 이분탐색을 수행하듯이 lo, mid, hi 파라미터를 반복문 돌려가면서 적당히 조정한다.(**`while(lo < hi)`**)
> 2. mid가 가리키는 값이 **value보다 작으면(`elements[mid] < value`)**, 탐색해야 하는 범위가 뒤쪽에 있다고 가정한다. → **`lo = mid + 1`**
> 3. mid가 가리키는 값이 **value보다 크거나 같으면**(**`elements[mid] ≥ value`**),  탐색해야 하는 범위는 좁혀진다.(**`high = mid`**)
> 4. 탐색에 성공하여 value 이상의 값이 처음 나타나는 위치를 발견하게 된다면, 탐색 범위가 좁혀진 **`lo`**(==**`hi`**)를 반환한다.
> 5. 탐색에 실패하여 mid가 포함되지 않는 구간인 high에 도달하게 된다면, 없다고 가정하고 high를 반환한다. 
> 
> * **`upper_bound`** 구현하기
> 1. 이분탐색을 수행하듯이 lo, mid, hi 파라미터를 반복문 돌려가면서 적당히 조정한다.(**`while(lo < hi)`**)
> 2. mid가 가리키는 값이 **value보다 작거나 같으면(`elements[mid] <= value`**), 탐색해야 하는 범위가 뒤쪽에 있다고 가정한다. → **`lo = mid + 1`**
> 3. mid가 가리키는 값이 **value보다 크면**(**`elements[mid] > value`**), 탐색해야 하는 범위는 좁혀진다.(**`high = mid`**)
> 4. 탐색에 성공하여 value를 넘는 값이 처음 나타나는 위치를 발견하게 된다면, 탐색 범위가 좁혀진 **`lo`**(==**`hi`**)를 반환한다.
> 5. mid가 포함되지 않는 구간인 high에 도달하게 된다면, 없다고 가정하고 high를 반환한다.
> 
> * **Kotlin** 믿고 잡숴보시라

이 글에서는 **Kotlin**을 이용해서, **C++**의 STL에서 제공되는 **`lower_bound`**, **`upper_bound`** 함수를 어떻게 구현하게 되었는지 공유하고자 한다. 

프로그래밍 대회 준비/학회 내부 알고리즘 교육 때문에 **C++**로 알고리즘 문제를 풀어왔었지만, 학부 생활을 벗어나니 **C++**를 쓸 일도 없어졌다. **웹 개발자**로서 주로 접하게 되는 언어는 **Java**, **Python**, **Ruby**, **Javascript** 정도 밖에 되지 않는다. 그 중에서도 [Baekjoon Online Judge](https://acmicpc.net)에서 대부분의 알고리즘 문제를 풀 수 있으려면 가장 무난한 언어가 **Java**였다. 

**`Java로 알고리즘 문제 푸는 걸 연습해야겠다`**고 결심이 들던 와중 [이런 글](https://www.acmicpc.net/blog/view/71)을 발견했다. **Kotlin**을 이용해서 알고리즘 문제를 푸는 방법을 기초적인 수준에서 설명하는 글이다. 뒤에서 설명하겠지만, **Java**로 알고리즘 문제를 푸는 행위에 회의감을 느끼던 나에게는 상당히 흥미롭게 느껴졌고, [저자 분](https://shiftpsh.com/)에게 직접 이것저것 물어보면서 **Kotlin**으로 알고리즘 문제를 푸는 방법을 연마하는 중이다. 

## Kotlin으로 PS를 하면서 느낀 점

대략 **4월 초**부터 **Kotlin**으로 알고리즘 문제를 풀기 시작했다. **C++**가 아닌 언어로 알고리즘 문제를 풀어놓은 흔적을 남겨놓은 [리포지토리](https://github.com/malkoG/polyglot-cp)를 한달 전부터 유지하고 있는데, `.kt` 확장자가 보인다면 **`이게 Kotlin으로 풀이한거구나`**하고 이해하면 된다.

**`Kotlin`**으로 알고리즘 문제를 풀게 된 건 그렇게 오래되지는 않았지만, 1주~2주의 짧은 기간 동안 건드리면서 느꼈던 점들을 간단하게 아래에서 정리했다.

### **좋았던 점**

- **Java**와 100% 호환되기 때문에, **Java**에서 제공하는 클래스를 그대로 끌어다 쓸 수 있다. (컨테이너 클래스는 **C++** 못지 않다)
- **Java**로 코딩하는 방식에 비해, 불편한 점이 상당히 줄었다.
    - **`Pair`**, **`Triple`** 자료구조를 지원한다.  (**Java**에서는 이런 자료구조까지 클래스와 생성자로 직접 정의해야 했고, 정렬할 때도 정렬 함수를 따로 정의해줘야 하는 불편함이 있다. 하지만 코틀린에서는? 그런거 없다. 이미 만들어져 있고, 생성자도 잘 정의되어 있고, 정렬 함수도 납득할만한 수준으로 잘 정의되어 있다. **C++**에서 옮겨와도 크게 불편함이 없을 수준이다.)
    - 디폴트 파라미터를 지원한다.
    - 연산자 오버로딩을 지원한다. (**Java**에서는 **`ArrayList`** 컬렉션에 random access를 할 때, `.at(idx)` 노테이션을 이용해서 접근해야 하는 불편함이 있었지만, **Kotlin**에서는 random access를 할 때 `[idx]` 노테이션으로 접근하기만 하면 된다. **`String`**도 마찬가지로 적용된다.)
    - **`typealias`**를 지원한다. (**Java**는 상속으로 흉내내야 한다.)
    - 불필요한 OOP 문법을 적용하지 않아도 된다.(**Kotlin**으로 문제 풀면서 **`public static class`** 이런걸 거의 보지 않았던 것 같다.)
- **C++** 최신 표준 못지 않게 현대적인 문법이 많이 제공된다. (destructuring, 메서드 연쇄 중 어딘가에서 null이 튀어나오면 null을 리턴하는 등 Optional type에 대한 우아한 처리)

### **아쉬웠던 점**

- **C++**에 비해 제공되는 함수가 적다. 정확히는, 필요한데 제공되지 않는 함수들이 있어서 빈자리가 느껴진다.(**`lower_bound/upper_bound`** 등 이분 탐색을 응용한 함수, **`next_permutation/prev_permutation`** 등 순열을 다루는 함수)
- 컴파일 속도가 좀 느리다.
- **Java**와 100% 호환이 되는 건 좋지만, 공식 문서가 모자란 것 같다는 느낌이 든다. (**Java** 공식 문서를 더 많이 봤던 것 같다.)

## 없으면 직접 만들어야지, 뭐...

알고리즘 문제 중에는 이분탐색으로 분류된 여러가지 문제가 있는데, 이분탐색으로 분류된 문제 중에는 **`lower_bound`**, **`upper_bound`** 함수를 이용해야만 편리하게 풀 수 있는 문제들이 있다. 하지만, 위에서 언급했다시피 **Kotlin에서는 이런 함수를 가져다 쓸 수가 없다**. 그러면 뭐다? 직접 만들어야지.

### **lower_bound**

> C++에서 **`lower_bound`** 함수를 어떻게 활용하는지는 [여기](https://en.cppreference.com/w/cpp/algorithm/lower_bound)에서 볼 수 있다.

**`lower_bound`**는 정렬된 리스트 내에서 특정 값 이상의 값이 처음 나타나는 위치를 반환하는 함수로 구현되어야 한다. 일단, 구현되는 원리는 이분탐색에서 기반한 거라고 주워들은 게 있었기 때문에, **Parametric Search**를 적용하던 방식을 떠올리기 시작했다. 

**Parametric Search**는 어떤 값이 정답일 지 알 수 없지만, **결과값 y**가 결정되어 있을 때 **`f(x) = y`** 식을 만족하도록 이분탐색으로 solution이 될 수 있는 범위를 좁혀가면서 solution x의 최솟값/최댓값을 구하는데 쓰이는 알고리즘이다. **Parametric Search**를 적용할 수 있으려면, 적용되는 함수가 **단조증가함수**이거나 **단조감소함수**여야 한다는 제약이 있다.

함수 **`f(x)`**가 **단조증가함수**라고 가정해보자. **Parametric Search**는 이런 조건에서 아래와 같이 구현할 수 있다.

> i) **`f(x1) < y`**일 경우, **`f(x)`**는 **단조증가함수**이기 때문에 **해답이 되는 x는 x1보다 뒤에 있다**고 생각할 수 있다.
> ii) **`f(x1) > y`**일 경우, **`f(x)`**는 **단조증가함수**이기 때문에 **해답이 되는 x는 x1보다 앞에 있다**고 생각할 수 있다.
> iii) 특정구간에서 계단함수로 나타날 가능성이 있기 때문에, **`f(x1) = y`**일 때, 탐색범위가 하나로 좁혀질때까지 탐색범위를 줄여나간다.

 **`lower_bound`**도 어떻게 보면 **Parametric Search**의 응용이라고 볼 수 있는데, 해의 범위는 조사를 시작하는 인덱스 low와 조사를 끝내는 인덱스 high 사이이며, 적용되는 함수는 인자로 넘겨진 배열 **`elements`**에 random access한 값이다. 이분탐색을 적용할 수 있으려면, **"`elements`는 오름차순으로 정렬되어 있어야 한다"**라는 전제조건이 있기 때문에, **단조증가**일 수 밖에 없다. 따라서, **`lower_bound`**도 **Parametric Search**처럼 구현이 가능하다.

**Parametric Search**의 구현원리를 이용하여 **Kotlin**으로 **`lower_bound`** 함수를 구현한 코드는 아래와 같다.
```kotlin
typealias Index = Int

fun lower_bound(elements: ArrayList<Int>,
		low: Index, high: Index, value: Int) : Index {
	var lo = low
	var hi = high
	var mid: Index = high
	while(lo < hi) {
		mid = (lo + hi) shr 1
		if (mid == high)
			return high

		if(elements[mid] < value) { // value보다 작은 값을 만난 경우
			lo = mid + 1            // 탐색해야 하는 범위가 뒤쪽에 있다고 가정
		} else {                    // value보다 크거나 같은 값을 만난 경우
			hi = mid                // 탐색해야 하는 범위가 안쪽에 있다고 가정
		}
	}

	return lo                     // 맨 왼쪽 범위가 처음 나타나는 위치를 의미
}
```

### **upper_bound**

> C++에서 **`upper_bound`** 함수를 어떻게 활용하는지는 [여기](https://en.cppreference.com/w/cpp/algorithm/upper_bound)에서 볼 수 있다.

**`upper_bound`**는 정렬된 리스트 내에서 특정 값을 넘는 값이 처음 나타나는 위치를 반환하는 함수로 구현되어야 한다. **`upper_bound`**는 **`lower_bound`**와 비슷하게 **`Parametric Search`**처럼 구현 가능하다.. 다만, 특정 원소보다 크거나 같은 값이 처음으로 나타나는 위치가 아닌 특정 원소보다 큰 값이 처음으로 나타나는 위치를 반환해야 하기 때문에, **`elements`**에 random access한 값이 찾고자 하는 값보다 작거나 같다면, 탐색해야 하는 범위는 뒤쪽에 있다고 가정해야 한다. 

**`Parametric Search`**의 구현원리를 이용하여 **`Kotlin`**으로 **`upper_bound`** 함수를 구현한 코드는 아래와 같다. **`lower_bound`**와 비슷하지만, 등호 부분만 바꿔주면 된다.

```kotlin
typealias Index = Int

fun upper_bound(elements: ArrayList<Int>,
		low: Index, high: Index, value: Int) : Index {
	var lo = low
	var hi = high
	var mid: Index = high
	while (lo < hi) {
		mid = (lo + hi) shr 1
		if (mid == high)
			return high

		if(elements[mid] <= value) {  // value보다 작거나 같은 값을 만난 경우
			lo = mid + 1              // 탐색 범위가 뒤쪽에 있다고 가정
		} else {                      // value보다 큰 값을 만난 경우
			hi = mid                  // 탐색 범위가 안쪽에 있다고 가정
		}
	}

	return lo                       // 맨 왼쪽 범위가 처음 나타나는 위치를 의미
}
```
### **equal_range**

> C++에서 **`equal_range`** 함수를 어떻게 활용하는지는 [여기](https://en.cppreference.com/w/cpp/algorithm/equal_range)에서 볼 수 있다.

**`equal_range`**는 정렬된 리스트 내에서 특정 값이 나타나는 구간을 반열린 구간으로 반환하는 함수로 구현되어야 한다. **`equal_range`**를 구현하는 건 그렇게 어렵지 않다. **`lower_bound`**, **`upper_bound`**로 구성된 **`Pair`**를 반환하면 그만이다.

```kotlin
typealias Index = Int

// equal_range는 정렬된 리스트의 [low, high) 구간 사이에서 특정 값이 나타나는 구간을 Pair로 반환한다.
// lower_bound == upper_bound일 경우, value가 나타나는 구간은 없다고 가정한다.
// low : 조사를 시작하는 구간(닫힌 구간) - 포함
// high : 조사를 끝내는 구간(열린 구간) - 미포함
// value : 조사할 값
fun equal_range(elements: ArrayList<Int>,
		low: Index, high: Index,  value: Int) : Pair<Index,Index> {
	return Pair(lower_bound(elements, low, high, value), upper_bound(elements, low, high, value))
}

val (lower,upper) = equal_range(arr, 0, N, target) 
```

## 마치며

**Kotlin**을 개발한 JetBrain에서 ACM-ICPC(세계 대학생 프로그래밍 대회)를 후원하고 있다. [ACM-ICPC 공식 페이지에서도 Kotlin을 지원하게 될 것](https://blog.jetbrains.com/kr/2017/06/jetbrains-acm-icpc-%EA%B3%B5%EC%8B%9D-%ED%9B%84%EC%9B%90/)이라고 밝혔기 때문에, **`Kotlin을 이용한 알고리즘 문제 풀이`**에 대한 수요는 계속해서 증가할 것이라 본다.

하지만, 아직까지는 국내에 **Kotlin**을 이용해서 알고리즘 문제를 풀이하는 방법을 소개하는 리소스가 많지 않다. **Kotlin**이라는 언어가 아직까지는 **`Java에 대한 배경지식을 요구한다는 인식`**이 지배적이며, **Kotlin**이 정규 교과과정에 들어가는 언어도 아니다보니 따로 공부하는 사람만 알고 있는 편이다. 

국내에서 출판된 **Kotlin** 도서도 **Java**에 대한 배경지식이 있다고 가정하고 쓰여진 책이 여럿 있다보니, **`"Kotlin을 하려면 Java를 알아야 한다"`**가 통념이 되어버리는 것 같다. **`C++를 알기 위해서, C를 알고 있어야 한다`**는 논리처럼 보여지기도 하지만, 나도 역시 **Java**를 어느 정도 공부하고 나서 **Kotlin**을 영접한 케이스이고, 개인차가 있는 것 같으니 확실히 답하기는 어렵다. 

그럼에도, **Kotlin**은 정말 배우기 쉬운 편이며, 문법이 다른 언어 못지 않게 간결하며, 배울만한 가치가 있다. 지금 당장은 암흑기라고 판단되지만, 조만간 대중적인 언어로서 주가가 크게 상승할 것이라고 강하게 촉이 오는 언어는 **Kotlin**이 처음이었다. 대중적으로 쓰이는 **Java**와 100% 호환이 되며, **Java**와 비슷하면서도 **Java**보다 문법이 훨씬 간결하고 편의 문법이 여럿 제공되는데 **Kotlin**을 선택하지 않을 이유가 무엇이란 말인가?

**Kotlin**, 한번 믿고 잡숴보시라.