---
layout: wiki_main
title: Recent wiki documents
---

<ul>
  <% collections.wiki.resources.each do |wiki_document| %>
  	<% unless wiki_document.relative_url.include?("templates")  %>
	    <li>
	      <a href="<%= wiki_document.relative_url %>"><%= wiki_document.data.title %></a>
	    </li>
    <% end %>

  <% end %>
</ul>

