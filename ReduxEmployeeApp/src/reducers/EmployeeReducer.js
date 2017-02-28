/**
 * 従業員一覧表示時の状態ステータスを管理するためのReducer
 * → 定義されたaction経由で実行されるステートに関する処理に関するロジックを定義する
 *
 * ※ Reducerの原則：
 * (1) 現在のstateオブジェクト(state)を変更せずに新しいステートオブジェクトを作成して返す。
 * (2) 受け取るのはステートオブジェクト(state)とアクション(action)の2つ。
 * (3) 変更は全てpureな関数で書かれる。
 * (4) 受け取ったステートは読み取りだけできる。
 * (5) storeからアクション(action)と現在保持しているステートが渡ってくる
 */

//従業員一覧表示時時の状態ステータス関連のアクションタイプ定義のインポート宣言
import { EMPLOYEES_FETCH_SUCCESS } from '../actions/types';

//初期状態のステート定義（オブジェクトの形にする）
const INITIAL_STATE = {};

// JFYI: この辺りのドキュメントを追っかけてもいいかもしれない
// → Reduxを動かしながら理解する
// http://takayukii.me/post/20160122426

//選択されたケースを元にstateの更新を行うメソッド（アクションのタイプに応じての場合分けがされている）
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEES_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
