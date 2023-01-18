---
layout: page
title: Recent wiki documents
---

<ul>
  {% for wiki_document in collections.wiki.resources %}
  	{% unless wiki_document.relative_url contains "templates"  %}
	  <li>
	    <a href="{{ wiki_document.relative_url }}">{{ wiki_document.data.title }}</a>
	  </li>
	{% endunless %}
  {% endfor %}
</ul>

