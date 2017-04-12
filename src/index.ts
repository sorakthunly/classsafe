import 'reflect-metadata';

export const string = 'string';
export const number = 'number';
export const boolean = 'boolean';
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

/**
 * Base class allowing for data to be passed when an instance of the
 * class is initialized.
 */
export abstract class Model {
  constructor(data?: any) {
    Object.assign(this, data);
  }
}

/** Model basic type validator function */
function validate(model: Object) {
  return new Promise((resolve, reject) => {
    let data = Reflect.getMetadata(ATTRS_META_KEY, model);

    for (let key in model) {
      if (typeof model[key] !== data[key]) reject('Invalid data type');
    }

    resolve(true);
  });
}
