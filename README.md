# classpass
A light-weight minimal typescript class validator for basic types (string, number and boolean)

## Installation
Run `npm install --save classpass`

## Example Use

```typescript
import { Model, attr, string, boolean, number, validate } from 'classpass';

class Person extends Model {
  @attr(string)
  name: string;
}

let p = new Person({ name: 'John'});

validate(p).then(doSth).catch(doSth);
```
