/**
 * 認証状態を管理するためのReducer
 * → 定義されたaction経由で実行されるステートに関する処理に関するロジックを定義する
 *
 * ※ Reducerの原則：
 * (1) 現在のstateオブジェクト(state)を変更せずに新しいステートオブジェクトを作成して返す。
 * (2) 受け取るのはステートオブジェクト(state)とアクション(action)の2つ。
 * (3) 変更は全てpureな関数で書かれる。
 * (4) 受け取ったステートは読み取りだけできる。
 * (5) storeからアクション(action)と現在保持しているステートが渡ってくる
 */

//認証関連のアクションタイプ定義のインポート宣言
import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER } from '../actions/types';

//初期状態のステート定義（オブジェクトの形にする）
const INITIAL_STATE = { email: '', password: '', user: null, error: '', loading: false };

// JFYI: この辺りのドキュメントを追っかけてもいいかもしれない
// → Reduxを動かしながら理解する
// http://takayukii.me/post/20160122426

//選択されたケースを元にstateの更新を行うメソッド（アクションのタイプに応じての場合分けがされている）
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: '認証に失敗しました。', password: '', loading: false };
    default:
      return state;
  }
};
