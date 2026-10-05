# 百家姓

A reusable reader/reference app for the traditional Chinese primer 《百家姓》.

- `data/baijiaxing.json` — metadata and chunk index
- `data/surnames-01.json` … `surnames-09.json` — 504 surnames in chunked order
- `src/baijiaxing-engine.js` — lazy-loading/search engine
- `index.html` — responsive reader

The app preserves a commonly used 504-surname ordering and explicitly warns that surname origins can have multiple historical branches. Detailed origin notes should only be added when supported by reliable sources.
