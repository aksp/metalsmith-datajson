# metalsmith-datajson
Metalsmith plugin which parses json files from a data directory and exposed their properties as metadata.json on the file object

## how to

### setup metalsmith

[An extremely simple, pluggable static site generator](http://www.metalsmith.io/)

### install the metalsmit-datajson node_module

```bash
~ npm install https://github.com/FrontEndStudio/metalsmith-datajson --save-dev
```

### inside the src directory of your metalsmith project

```bash
~ mkdir data
~ cd data
~ touch social.json
~ touch test.json
```

*social.json*

```javascript
{
  "channels": [
    {
      "name": "Twitter",
      "url": "http://www.twitter.com"
    },
    {
      "name": "Facebook",
      "url": "http:/www.facebook.com"
    }
  ]
}
```

*test.json*

```javascript
{
  "object": [
    {
      "title" : "Title 01",
      "sub_object": {
        "sub_title": "Subtile 01"
      },
      "list": ["a1", "a2"]
    },
    {
      "title": "Title 02",
      "list": ["b1", "b2", "b3"]
    }
  ]
}
```

### inside your metalsmith.js

```javascript
var datajson = require('metalsmith-datajson');

metalsmith
.metadata(metadata)
.source(options.source_dir)
.clean(true)
.use(datajson({dir: './src/data/'}))
```

### inside your (Nunjucks) template

[A rich and powerful templating language for JavaScript.](https://mozilla.github.io/nunjucks/)

```javascript
{% for channel in json.social.channels %}
  name: {{channel.name}} <br>
  url: {{channel.url}} <br>
{% endfor %}

<hr>

{% for obj in json.test.object %}
  title: {{obj.title}} <br>
  sub_title: {{obj.sub_object.sub_title}} <br>
  <ul>
  {% for item in obj.list %}
    <li>item: {{item}}</li>
  {% endfor %}
  </ul>
{% endfor %}
```
