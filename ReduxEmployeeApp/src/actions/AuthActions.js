/**
 * 認証結果を格納するステートを更新するためのアクション群
 * → 各々のアクションが実行されると対応するReducersに定義されたステート更新処理を実行する
 */

//firebaseライブラリのインポート宣言
import firebase from 'firebase';

//react-native-router-fluxライブラリのインポート宣言
// (ライブラリ概要)このライブラリのGithubリポジトリ
// https://github.com/aksonov/react-native-router-flux
// (参考1) React Native Routing について
// http://twins-tech.hatenablog.com/entry/2016/06/05/101916
// (参考2) React Native Router Fluxを使ってみませんか・・・？
// http://qiita.com/YutamaKotaro/items/ab52b6ba664d88a87bd9
// (参考3) react-native-router-fluxをいい感じに使う3つの方法
// http://web-salad.hateblo.jp/entry/2016/12/04/090000
import { Actions } from 'react-native-router-flux';

//認証関連のアクションタイプ定義のインポート宣言
import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER } from './types';

//メールアドレス入力時に実行されるメソッド
export const emailChanged = (text) => {

  //Reducerへ渡すオブジェクトを作成する（アクションとステートの変更後に変わる値を設定）
  return { type: EMAIL_CHANGED, payload: text };
};

//パスワード入力時に実行されるメソッド
export const passwordChanged = (text) => {

  //Reducerへ渡すオブジェクトを作成する（アクションとステートの変更後に変わる値を設定）
  return { type: PASSWORD_CHANGED, payload: text };
};

//ログインボタン押下時に実行されるメソッド
export const loginUser = ({ email, password }) => {

  //アクションの実行とFirebaseへの認証処理を行う(非同期での実行)
  return (dispatch) => {

    //ステートの更新を行う（ログイン中状態のステータスにする）
    dispatch({ type: LOGIN_USER });

    //サインイン用のfirebaseのメソッドauth().signInWithEmailAndPassword(email, password)を利用する
    // → then内のログイン認証処理を実行(ログイン処理を実行する) ※エラーの際にはcatch以下の処理を実行する
    // → ログイン処理に失敗した場合はアカウント作成を行いログイン状態にする ※エラーの際にはcatch以下の処理を実行する
    //
    // (参考)今更だけどPromise入門
    // http://qiita.com/koki_cheese/items/c559da338a3d307c9d88

    //入力されたメールアドレス・パスワードを元にFirebaseの認証を行う
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {

        //エラー時のデバッグ用ログ出力
        console.log(error);

        //入力されたメールアドレス・パスワードをFirebaseへ登録する
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          .catch(() => loginUserFail(dispatch));
      }
    );
  };
};

//ログイン認証失敗時に実行されるメソッド
const loginUserFail = (dispatch) => {

  //ステートの更新を行う（ログイン失敗状態のステータスにする）
  dispatch({ type: LOGIN_USER_FAIL });
};

//ログイン認証成功時に実行されるメソッド
const loginUserSuccess = (dispatch, user) => {

  //ステートの更新を行う（ログイン成功状態のステータスにする）
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });

  //メインの画面へ遷移する
  Actions.main();
};
