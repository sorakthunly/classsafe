import 'reflect-metadata';
import * as Promise from 'promise';
import { boolean } from './model';
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
/** Model basic type validator function */
export function validate(model: Object) {
  return new Promise((resolve, reject) => {
    let data = Reflect.getMetadata(ATTRS_META_KEY, model);

    for (let key in data) {
      if (model[key] === undefined) continue;
      if (typeof model[key] !== data[key]) {
        const validBoolean = [0, 1].indexOf(model[key]) > -1;
        if (data[key] === boolean && validBoolean) continue;
        reject({
          attr: key,
          expectedType: data[key],
          receivedType: typeof model[key],
          message: 'Invalid data type'
        });
      }
    }

    resolve(true);
  });
}
