export const minLength = min => value =>
  value && value.length < min
    ? `Must be more then ${min} characters`
    : undefined;

export const minLength6 = minLength(6);
