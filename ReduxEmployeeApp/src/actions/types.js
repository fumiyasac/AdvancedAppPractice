/**
 * アクションのタイプを定義した定数
 * → 該当の定数で定義されたアクションを実行することでステートを更新する
 */

//認証部分に関するアクションの定義
export const EMAIL_CHANGED = 'email_changed';
export const PASSWORD_CHANGED = 'password_changed';
export const LOGIN_USER_SUCCESS = 'login_user_success';
export const LOGIN_USER_FAIL = 'login_user_fail';
export const LOGIN_USER = 'login_user';

//従業員の一覧・追加・変更に関するアクションの定義
export const EMPLOYEE_UPDATE = 'employee_update';
export const EMPLOYEE_CREATE = 'employee_create';
export const EMPLOYEES_FETCH_SUCCESS = 'employees_fetch_success';
export const EMPLOYEE_SAVE_SUCCESS = 'employee_save_success';
export const EMPLOYEE_DELETE_SUCCESS = 'employee_save_success';
export const EMPLOYEE_REFRESH = 'employee_refresh';
