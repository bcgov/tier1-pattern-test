# Overview

`greet(name)` returns a greeting string.

**Signature:** `greet(name = "world")`

**Returns:** `` `Bonjour, ${name}!` `` — a French-style greeting with the provided name.

**Example:**
```js
import { greet } from "./src/hello.js";

greet();          // "Bonjour, world!"
greet("Alice");   // "Bonjour, Alice!"
```

(Intentionally simple — change `src/hello.js` without updating this file to exercise docs drift.)
