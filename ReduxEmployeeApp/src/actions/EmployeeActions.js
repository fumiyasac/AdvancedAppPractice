/**
 * 入力された従業員データを格納するステートを更新するためのアクション群
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

//従業員データ関連のアクションタイプ定義のインポート宣言
import { EMPLOYEE_UPDATE, EMPLOYEE_CREATE, EMPLOYEES_FETCH_SUCCESS, EMPLOYEE_SAVE_SUCCESS } from './types';

/**
 * データ処理の流れとしては、
 * (工程1) データに関わる処理の場合はFirebaseに実データを登録・変更・削除の処理を行う
 * (工程2) firebaseのメソッド処理のコールバック内にステートに関する処理を行う
 * というイメージの流れ方になります。
 */

//従業員入力時にステートの値を更新するメソッド
export const employeeUpdate = ({ prop, value }) => {

  //ステート更新アクションを実行する
  // ※ onChangeText={value => this.props.employeeUpdate({ prop: 'phone', value })}
  // → EmployeeForm.jsでprop名と入力された値をActionに仕込む形にする
  return { type: EMPLOYEE_UPDATE, payload: { prop, value } };
};

//従業員データを新規に1件追加するメソッド
export const employeeCreate = ({ name, phone, shift }) => {

  //現在認証されているユーザーを取得する
  const { currentUser } = firebase.auth();

  //データに関する処理を実行する(非同期での実行)
  return (dispatch) => {

    //firebaseのDatabaseへアクセスを行い新規データを登録する（新規追加時に一意なIDを作成される）
    // (データの持ち方や参照方法は公式ドキュメントを参考にしてみてください)
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => {

        //ステートの更新アクションを実行(※従業員データの追加)
        dispatch({ type: EMPLOYEE_CREATE });

        //従業員一覧画面へ遷移する
        Actions.employeeList({ type: 'reset' });
      });
  };
};

//従業員データの一覧を取得するメソッド
export const employeesFetch = () => {

  //現在認証されているユーザーを取得する
  const { currentUser } = firebase.auth();

  //データに関する処理を実行する(非同期での実行)
  return (dispatch) => {

    //firebaseのDatabaseへアクセスを行いユーザーに紐づく従業員データを全て取得する
    // (データの持ち方や参照方法は公式ドキュメントを参考にしてみてください)
    // 基本的にはiOSのfirebaseからのfetch処理同様にsnapshotを受け取ったタイミングでの処理内容をクロージャー内に記載する
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {

        //ステートの更新アクションを実行(※従業員一覧の取得成功)
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

//該当IDの従業員データを1件更新するメソッド（引数にuidがある）
export const employeeSave = ({ name, phone, shift, uid }) => {

  //現在認証されているユーザーを取得する
  const { currentUser } = firebase.auth();

  //データに関する処理を実行する
  return (dispatch) => {

    //firebaseのDatabaseへアクセスを行い一意なID（uidがそれにあたる）に該当するデータを更新する
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => {

        //ステートの更新アクションを実行(※従業員データの更新)
        dispatch({ type: EMPLOYEE_SAVE_SUCCESS });

        //従業員一覧画面へ遷移する
        Actions.employeeList({ type: 'reset' });
      });
  };
};

//該当IDの従業員データを1件削除するメソッド（引数にuidがある）
export const employeeDelete = ({ uid }) => {

  //現在認証されているユーザーを取得する
  const { currentUser } = firebase.auth();

  //データに関する処理を実行する(非同期での実行)
  return () => {

    //firebaseのDatabaseへアクセスを行い一意なID（uidがそれにあたる）に該当するデータを削除する
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(() => {

        //従業員一覧画面へ遷移する
        Actions.employeeList({ type: 'reset' });
      });
  };
};
