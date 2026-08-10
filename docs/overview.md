# Overview

## `greet(name?)`

Returns a French greeting string.

| Parameter | Type   | Default   | Description           |
|-----------|--------|-----------|-----------------------|
| `name`    | string | `"world"` | The name to greet     |

**Returns:** `string` — `"Bonjour, <name>!"`

**Example:**

```js
import { greet } from "./hello.js";

greet();         // "Bonjour, world!"
greet("Alice");  // "Bonjour, Alice!"
```
