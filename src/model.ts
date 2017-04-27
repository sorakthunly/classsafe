export const string = 'string';
export const number = 'number';
export const boolean = 'boolean';
export const Date = 'Date';

/**
 * Base class allowing for data to be passed when an instance of the
 * class is initialized.
 */
export abstract class Model {
  constructor(data?: any) {
    Object.keys(data).forEach(key => this[key] = data[key]);
  }
}
