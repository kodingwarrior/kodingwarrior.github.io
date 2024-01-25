---
layout: page
title: Posts
---

<ul>
  <% collections.posts.resources.each do |post| %>
    <% unless post.data.hidden %>
      <li>
        <a href="<%= post.relative_url %>"><%= post.data.title %></a>
      </li>
    <% end %>
  <% end %>
</ul>

If you have a lot of posts, you may want to consider adding [pagination](https://www.bridgetownrb.com/docs/content/pagination)!
