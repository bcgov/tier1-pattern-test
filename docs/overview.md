# Overview

## `greet(name)`

Returns a French greeting string.

**Parameters**

| Parameter | Type   | Default   | Description              |
|-----------|--------|-----------|--------------------------|
| `name`    | string | `"world"` | The name to greet        |

**Returns** `string` — e.g. `"Bonjour, world!"` or `"Bonjour, Alice!"`

**Example**

```js
import { greet } from "./src/hello.js";

greet();          // "Bonjour, world!"
greet("Alice");   // "Bonjour, Alice!"
```
