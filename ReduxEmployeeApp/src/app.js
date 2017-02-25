/**
 * アプリケーション構築用のファイル
 *
 * (参考) Reduxの基本的な用語や役割について
 * ReactとReduxちょっと勉強したときのメモ
 * http://qiita.com/mgoldchild/items/5be49ea49ebc2e4d9c55#_reference-f1dd704690278d098790
 */
import React, { Component } from 'react';

//React-Reduxのインポート宣言
// → ProviderタグでラップすることでReactコンポーネント内でStoreにアクセスできるようにする
// (参考1) React+Redux入門
// http://qiita.com/erukiti/items/e16aa13ad81d5938374e
// (参考2) React-Redux をわかりやすく解説しつつ実践的に一部実装してみる
// http://ma3tk.hateblo.jp/entry/2016/06/20/182232
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

//reducerのインポート宣言
// → ざっくり言えば状態変化を起こすための具体的な処理の寄せ集め
// (参考) Redux基礎：Reducer編
// http://qiita.com/yasuhiro-okada-aktsk/items/9d9025cb58ffba35f864
import reducers from './reducers';

//firebaseのインポート宣言を行う
import firebase from 'firebase';

//アプリの画面の組み立て
class App extends Component {

  //コンポーネントの内容がMountされる前に行う処理
  componentWillMount() {

    //firebaseのセッティング情報を記載する
    //※ API情報に関してFirebaseコンソールを取得 → Authentication → 「ログイン方法」でメール/パスワードを有効にする
    const config = {
      apiKey: "AIzaSyDVwEbIjIT66gvdHFPhSvD6nekm3d6w0l8",
      authDomain: "authfirebaseappli.firebaseapp.com",
      databaseURL: "https://authfirebaseappli.firebaseio.com",
      storageBucket: "authfirebaseappli.appspot.com",
      messagingSenderId: "919888847951"
    };

    //firebaseを適用する
    firebase.initializeApp(config);
  }

  //見た目データのレンダリングを行う
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

//アプリの画面本体となるこのファイルのエクスポート宣言
export default App;
