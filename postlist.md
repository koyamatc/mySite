---
title: 投稿記事一覧
layout: default
---

<ul class="text-white post-list">

 {% for post in site.categories.post %}
   <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.postTitle }}</a>
   </li>
 {% endfor %}

</ul>
