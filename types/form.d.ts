export interface TForm {
  originalEvent: OriginalEvent;
  valid: boolean;
  states: States;
  values: Values;
  errors: Errors;
  reset: () => void;
}

export interface OriginalEvent {
  isTrusted: boolean;
  _vts: number;
}

export interface States {
  login: Login;
  password: Password;
}

export interface Login {
  value: string;
  touched: boolean;
  dirty: boolean;
  pristine: boolean;
  valid: boolean;
  invalid: boolean;
  error: any;
  errors: any[];
}

export interface Password {
  value: string;
  touched: boolean;
  dirty: boolean;
  pristine: boolean;
  valid: boolean;
  invalid: boolean;
  error: any;
  errors: any[];
}

export interface Values {
  login: string;
  password: string;
}

export interface Errors {}
