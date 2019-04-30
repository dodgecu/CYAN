export const requirePassword = value =>
  value ? undefined : "Please type your password";

export const repeatPassword = value =>
  value ? undefined : "Please repeat password you have written above";

export const requireUserName = value =>
  value ? undefined : "Please type your name";

export const requireEmail = value =>
  value ? undefined : "Please type your email address";

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const passwordsMatch = (value, allValue) =>
  value !== allValue.password ? "Passwords do not match" : undefined;

export const maxLength15 = maxLength(15);
