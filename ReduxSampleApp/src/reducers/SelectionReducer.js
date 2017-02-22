/**
 * Toggleした対象のセクション番号を選出するReducer
 *
 * ※ Reducerの原則：
 * (1) 現在のstateオブジェクト(state)を変更せずに新しいステートオブジェクトを作成して返す。
 * (2) 受け取るのはステートオブジェクト(state)とアクション(action)の2つ。
 * (3) 変更は全てpureな関数で書かれる。
 * (4) 受け取ったステートは読み取りだけできる。
 * (5) storeからアクション(action)と現在保持しているステートが渡ってくる
 */

// JFYI: この辺りのドキュメントを追っかけてもいいかもしれない
// → Reduxを動かしながら理解する
// http://takayukii.me/post/20160122426

//選択されたケースを元にstateの更新を行うメソッド
export default (state = null, action) => {
  switch (action.type) {
    case 'select_delivery':
      return action.payload;
    default:
      return state;
  }
};
