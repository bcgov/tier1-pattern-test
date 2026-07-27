# Overview

`greet(name)` returns a greeting string in the form `"Bonjour, <name>!"`.

- **Parameter**: `name` — string, defaults to `"world"`
- **Returns**: `` `Bonjour, ${name}!` ``

Example:

```js
import { greet } from "./src/hello.js";
greet("Alice"); // → "Bonjour, Alice!"
greet();        // → "Bonjour, world!"
```
