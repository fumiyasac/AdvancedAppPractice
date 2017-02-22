/**
 * 出前ができそうなお店の情報を選出するReducer
 *
 * ※ Reducerの原則：
 * (1) 現在のstateオブジェクト(state)を変更せずに新しいステートオブジェクトを作成して返す。
 * (2) 受け取るのはステートオブジェクト(state)とアクション(action)の2つ。
 * (3) 変更は全てpureな関数で書かれる。
 * (4) 受け取ったステートは読み取りだけできる。
 * (5) storeからアクション(action)と現在保持しているステートが渡ってくる
 */

//JFYI: この辺りのドキュメントを追っかけてもいいかもしれない
// → Reduxを動かしながら理解する
// http://takayukii.me/post/20160122426

//TODO: DeliveryList.jsonのデータを作成する

//JSONデータ(DeliveryList.json)のインポート
import data from './DeliveryList.json';

//JSONデータをそのまま返すだけのメソッド
export default () => data;
