import 'reflect-metadata';
export const ATTRS_META_KEY = 'attributes';

/**
 * Store the type of each attribute to the metadata
 * @param type  Basic Javascript type (number, string, boolean)
 */
export function attr(type: string) {
  return (target: Object, key: string) => {
    let attrs = { ... Reflect.getMetadata(ATTRS_META_KEY, target) };
    attrs[key] = type;

    Reflect.defineMetadata(ATTRS_META_KEY, attrs, target);
  }
}

/** Model basic type validator function */
export function validate(model: Object) {
  return new Promise((resolve, reject) => {
    let data = Reflect.getMetadata(ATTRS_META_KEY, model);

    for (let key in data) {
      if (model[key] === undefined) {
        continue;
      } else if (typeof model[key] !== data[key]) {
        reject('Invalid data type');
      }
    }

    resolve(true);
  });
}
