### This is an example post. Original from [markdownguide.org](https://www.markdownguide.org/cheat-sheet/)

# Markdown Cheat Sheet

Thanks for visiting [The Markdown Guide](https://www.markdownguide.org)!

This Markdown cheat sheet provides a quick overview of all the Markdown syntax elements. It can’t cover every edge case, so if you need more information about any of these elements, refer to the reference guides for [basic syntax](https://www.markdownguide.org/basic-syntax) and [extended syntax](https://www.markdownguide.org/extended-syntax).

## Basic Syntax

These are the elements outlined in John Gruber’s original design document. All Markdown applications support these elements.

### Heading

# H1

```
# H1
```

## H2

```
## H2
```

### H3

```
### H3
```

### Bold

```
### Bold
```

**bold text**

```
**bold text**
```

_italicized text_

```
*italicized text*
```

> blockquote

```
> blockquote
```

### Ordered List

1. First item
2. Second item
3. Third item

```
1. First item
2. Second item
3. Third item
```


### Unordered List

- First item
- Second item
- Third item

```
- First item
- Second item
- Third item
```

### Code

`code`

```
`code`
```

### Horizontal Rule

---

```
---
```

### Link

[title](https://www.example.com)
```
[title](https://www.example.com)
```

### Image

![puppy](https://cdn.akc.org/content/hero/pyr_pup_hero.jpg)
```
![alt text](image url)
```

## Extended Syntax

These elements extend the basic syntax by adding additional features. Not all Markdown applications support these elements.

### Fenced Code Blocks
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

    ```
    {
    "firstName": "John",
    "lastName": "Smith",
    "age": 25
    }
    ```

### Table

| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

```
| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |
```

### Footnote

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.
```
Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.
```

### Definition List

term
: definition
```
term
: definition
```

### Strikethrough

~~The world is flat.~~
```
~~The world is flat.~~
```

### Task List

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
```
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
```
