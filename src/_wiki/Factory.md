---
title: Factory
date:  2024-05-12
layout: wiki
---


## Reference

### DDD - Eric Evans

<%= book_quote do %>
"어떤 객체나 전체 Aggregate를 생성하는 일이 복잡해지거나 내부 구조를 너무 많이 드러내는 경우 Factory가 캡슐화를 제공해준다." - p140
<% end %>

<%= book_quote do %>
"Factory는 복잡한 객체나 Aggregate를 생성하는데 필요한 지식을 캡슐화 한다." - p142
<% end %>

<%= book_quote do %>
"자신의 책임이 다른 객체를 생성하는 것인 프로그램인 요소를 Factory라 한다." - p142
<% end %>

<%= book_quote do %>
"Standalone Factory는 전체 Aggregate를 생설해서 루트에 대한 참조를 건네주며, 생성된 Aggregate의 불변식이 지켜지도록 보장해준다." - p145
<% end %>

<%= book_quote do %>
"Aggregate와 같이 복잡한 조립과정을 거쳐 만들어지는 것을 생성하려면 Factory가 필요하다." - p146
<% end %>

<%= book_quote do %>
"Factory의 책임은 그것이 만들어내는 객체나 Aggregate의 불변식이 충족되도록 보장하는 것이다." - p148
<% end %>

<%= book_quote do %>
"Factory는 객체의 생성과 재구성이라는 lifetime transition을 캡슐화한다." - p151
<% end %>
