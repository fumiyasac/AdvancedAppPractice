/**
 * データ表示で使用するReducerの定義（アプリケーションのステート一覧に関するもの）
 * Reduxの原則の1つであるグローバルな状態ツリーがすべてのソースとなる。
 * → しかしながら一部を更新するような形がほとんどなので役割に応じてReducerを分割する。
 */

//CombineReducersの処理を行うためのインポート宣言
// → CombineReducersの処理に関するポイント
// (1)各reducerを呼び出して初期状態を取り出す
// (2)初期状態をまとめて初期状態ツリーを作成する
// (3)reducerの処理をまとめたcombination関数を返す

//※参考資料集：
// (参考1) Reduxにおけるreducer分割とcombineReducersについて
// http://qiita.com/kuy/items/59c6d7029a10972cba78
// (参考2) combineReducers(reducers)
// http://redux.js.org/docs/api/combineReducers.html
// (参考3) ReduxのcombineReducersの仕組みについて理解したいマン
// https://hogehuga.com/post-1113/
import { combineReducers } from 'redux';

//各々の要素に関するReducerのインポート宣言
// → DeliveryReducer：出前データのReducer
// → SelectionReducer：選択状態のセクション管理用のReducer
import DeliveryReducer from './DeliveryReducer';
import SelectionReducer from './SelectionReducer';

//combineReducers関数を用いてそれぞれの異なるReducerを結合したものを作成する
// → (子)DeliveryReducer + (子)SelectionReducer = (親)Reducer
export default combineReducers({
  deliveries: DeliveryReducer,
  selectedLibraryId: SelectionReducer
});

//Debug.
//console.log(store.getState());
