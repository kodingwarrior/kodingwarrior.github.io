---
layout: page
title: Recent wiki documents
---

{% assign seconds_for_interpolation = 1 | times: 24 | times: 60 | times: 60 %}
{% assign today_date = site.time | date: '%s' | plus: seconds_for_interpolation | date: '%Y-%m-%d' %}

<ul>
  {% for wiki_document in collections.wiki.resources %}
  	{% unless wiki_document.relative_url contains "templates"  %}
	  {% assign target_date = wiki_document.date | date: '%Y-%m-%d' %}
	  {% if today_date >= target_date %}
	    <li>
	      <a href="{{ wiki_document.relative_url }}">{{ wiki_document.data.title }}</a>
	    </li>
	  {% endif %}

	{% endunless %}
  {% endfor %}
</ul>

