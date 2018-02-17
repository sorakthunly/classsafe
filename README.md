# classsafe
A light-weight es5-compatible typescript class validator for basic types (string, number and boolean).

## Installation
Run `npm install --save classsafe`

## Example Use

```typescript
import { Model, attr, string, boolean, number, validate } from 'classsafe';

class Person extends Model {
  @attr(string)
  name: string;
}

let p = new Person({ name: 'John'});

validate(p).then(doSth).catch(doSth);
```
