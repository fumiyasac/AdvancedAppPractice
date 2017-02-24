/**
 * アプリケーション構築用のファイル
 *
 * (参考) Reduxの基本的な用語や役割について
 * ReactとReduxちょっと勉強したときのメモ
 * http://qiita.com/mgoldchild/items/5be49ea49ebc2e4d9c55#_reference-f1dd704690278d098790
 */

//ReactNative用のインポート宣言
import React from 'react';
import { View } from 'react-native';

//React-Reduxのインポート宣言
// → ProviderタグでラップすることでReactコンポーネント内でStoreにアクセスできるようにする
// (参考1) React+Redux入門
// http://qiita.com/erukiti/items/e16aa13ad81d5938374e
// (参考2) React-Redux をわかりやすく解説しつつ実践的に一部実装してみる
// http://ma3tk.hateblo.jp/entry/2016/06/20/182232
import { Provider } from 'react-redux';
import { createStore } from 'redux';

//reducerのインポート宣言
// → ざっくり言えば状態変化を起こすための具体的な処理の寄せ集め
// (参考) Redux基礎：Reducer編
// http://qiita.com/yasuhiro-okada-aktsk/items/9d9025cb58ffba35f864
import reducers from './reducers';

//共通設定した部品のインポート宣言
import { Header } from './components/common';

//自作コンポーネントのインポート宣言
import DeliveryList from './components/DeliveryList';

//アプリの画面の組み立て
const App = () => {
  return (
    <Provider store={createStore(reducers)}>
      <View style={styles.baseAppStyle}>
        <Header headerText="自分の出前リスト" />
        <DeliveryList />
      </View>
    </Provider>
  );
};

//このコンポーネントのStyle定義
const styles = {
  baseAppStyle: {
    flex: 1
  }
};

//アプリの画面本体となるこのファイルのエクスポート宣言
export default App;
