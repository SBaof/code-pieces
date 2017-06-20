## 文本换行

### word-break

> 指定如何在单词内换行

| 规则 | 解释 |
|------|------|
| normal | 默认断行规则 |
| break-all | 任意字符间断行 |
| keep-all  | CJK 文本不断行；non-CJK 文本表现同 normal |
|
| 备注： CJK 代表的就是中文（Chinese）、日文（Japanese）和韩文（Korean）等亚洲语言; non-CJK 就是指非亚洲语言（英语之类的）

[http://keenwon.com/901.html](http://keenwon.com/901.html)

### overflow-wrap

> overflow-wrap 是用来说明当一个不能被分开的字符串太长而不能填充其包裹盒时，为防止其溢出，浏览器是否允许这样的单词中断换行。

| 规则 | 解释 |
|------|------|
| normal | 正常的单词结尾处换行 |
| break-word | 如果行内没有足够的空间可以容纳单词到结尾，则那些正常的不能被分割的单词将会强制换行 |

### white-space

> 指定如何处理元素中的空白

| 规则 | 解释 |
|------|------|
| normal | 连续的空白会被合并，换行符被当做空白处理，填充 line 盒子必要时换行 |
| nowrap | 和 normal 一样，连续空白将会合并。文本内换行无效 |
| pre | 连续空白保留，「换行」 OR <br> 则换行 |
| pre-wrap | 连续空白符保留，在遇到换行 OR <br> OR 需要填充 line 盒子时才会换行 |
| pre-line | 连续空白符合并，在遇到换行 OR <br> OR 需要填充 line 盒子时才会换行 |

