import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

//errors?.['notmatched']
export const passwordMatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmpassword');

  return password && confirmPassword && password.value === confirmPassword.value
    ? null
    : { notmatched: true }
}

//errors?.['tooshort']
export const passwordLengthValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');

  return password && password.value.length >= 10
    ? null
    : { tooshort: true }
}

//errors?.['noupper']
export const passwordUpperValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');

  return password && /[A-Z]/.test(password.value)
    ? null
    : { noupper: true }
}

//errors?.['nolower']
export const passwordLowerValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');

  return password && /[a-z]/.test(password.value)
    ? null
    : { nolower: true }
}

//errors?.['notunique']
export const passwordUniqueValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  let uniqueChar = "";

  if (password) {
    const pwdValue = password.value;
    for (let i = 0; i < pwdValue.length; i++) {
      if (uniqueChar.indexOf(pwdValue.charAt(i)) == -1) {
        uniqueChar += pwdValue[i];
      }
    }
  } else {
    return { notunique: true }
  }

  return password && uniqueChar.length >= 8
    ? null
    : { notunique: true }
}

//errors?.['invalidchar']
export const invalidCharValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');

  return password && /^[a-zA-Z0-9\-._@+'#!/^%{}*]*$/.test(password.value)
    ? null
    : { invalidchar: true }
}
