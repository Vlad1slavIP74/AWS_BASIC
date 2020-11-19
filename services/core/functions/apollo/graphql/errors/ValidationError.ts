import { strict } from 'assert';

export default class ValidationError extends Error {
  readonly fields;
  readonly message: string = 'FORMAT_ERROR';
  readonly type: string;
  constructor({ fields, errorMessage }) {
      super(errorMessage);
      this.type = 'CUSTOM_ERROR';
    }
}
