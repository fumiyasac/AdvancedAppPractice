/**
 * 従業員データの追加・変更時の状態ステータスを管理するためのReducer
 * → 定義されたaction経由で実行されるステートに関する処理に関するロジックを定義する
 *
 * ※ Reducerの原則：
 * (1) 現在のstateオブジェクト(state)を変更せずに新しいステートオブジェクトを作成して返す。
 * (2) 受け取るのはステートオブジェクト(state)とアクション(action)の2つ。
 * (3) 変更は全てpureな関数で書かれる。
 * (4) 受け取ったステートは読み取りだけできる。
 * (5) storeからアクション(action)と現在保持しているステートが渡ってくる
 */

//従業員データの追加・変更時の状態ステータス関連のアクションタイプ定義のインポート宣言
import { EMPLOYEE_UPDATE, EMPLOYEE_CREATE, EMPLOYEE_SAVE_SUCCESS } from '../actions/types';

//初期状態のステート定義（オブジェクトの形にする）
const INITIAL_STATE = { name: '', phone: '', shift: '' };

// JFYI: この辺りのドキュメントを追っかけてもいいかもしれない
// → Reduxを動かしながら理解する
// http://takayukii.me/post/20160122426

//選択されたケースを元にstateの更新を行うメソッド（アクションのタイプに応じての場合分けがされている）
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case EMPLOYEE_CREATE:
      return INITIAL_STATE;
    case EMPLOYEE_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
