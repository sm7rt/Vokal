import { url } from 'redux-form-validators';

/**
 * Check url format only if url is filled
 * @param options
 */
export const urlIfNotEmpty = (options: any) => (value: string) => {
  if (!value) {
    return '';
  }
  return url(options)(value);
};
