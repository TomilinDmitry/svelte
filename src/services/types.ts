export type TDetails = {
  detail: {
    confirm_password: string | null;
    email: string | null;
    firstname: string | null;
    password: string | null;
    touched: string | null;
    valid: boolean | null;
  };
};
export type TUser = {
  map(arg0: (el: any) => any): unknown;
  length: number;
  confirm_password: string | null;
  email: string | null;
  firstname: string | null;
  password: string | null;
  touched: string | null;
  valid: boolean | null;
};
