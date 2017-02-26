/**
 * ログイン用のフォーム部分のコンポーネント
 */
import React, { Component } from 'react';
import { Text } from 'react-native';

//connectのインポート宣言を行う
// → connectを用いてstoreをpropで読めるようにする
// 参考：[redux] Presentational / Container componentの分離 - react-redux.connect()のつかいかた
// http://qiita.com/yuichiroTCY/items/a3ca7d9d415049d02d60
import { connect } from 'react-redux';

//ActionCreator(Actionの寄せ集め)のインポート宣言(this.props.この中に定義したメソッド名の形で実行)
import { emailChanged, passwordChanged, loginUser } from '../actions';

//LoginFormの作成に必要な自作コンポーネント群のインポート宣言を行う
import { GridArea, GridSection, Input, Button, Spinner } from './common';

//ログイン用フォーム部分のUIの組み立てを行う
class LoginForm extends Component {

  //ボタン押下時に実行されるメソッド
  onEmailChange(text) {

    //AuthActions.jsに定義されたアクション：emailChangedを実行する
    this.props.emailChanged(text);
  }

  //ボタン押下時に実行されるメソッド
  onPasswordChange(text) {

    //AuthActions.jsに定義されたアクション：passwordChangedを実行する
    this.props.passwordChanged(text);
  }

  //ボタン押下時に実行されるメソッド
  onButtonPress() {

    //ステートからメールアドレスとパスワードを取得する
    const { email, password } = this.props;

    //AuthActions.jsに定義されたアクション：loginUserを実行する
    this.props.loginUser({ email, password });
  }

  //現在の実行状態と紐づいたボタンのレンダリングを行うメソッド
  renderButton() {

    //状態がアクセスの最中ならばインジケーターを表示する
    //※ <Spinner>コンポーネントを自作している
    if (this.props.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        ログイン＆サインアップ
      </Button>
    );
  }

  //見た目データのレンダリングを行う
  render() {
    return(
      <GridArea>
        { /* 1：Eメールアドレスの入力部分 */ }
        <GridSection>
          <Input
            placeholder="user@gmail.com"
            label="メールアドレス"
            value={this.props.email}
            onChangeText={ /* TODO:残りの処理を記載する */ }
          />
        </GridSection>
        { /* 2：パスワードの入力部分 */ }
        <GridSection>
          <Input
            secureTextEntry
            placeholder="password"
            label="パスワード"
            value={this.props.password}
            onChangeText={ /* TODO:残りの処理を記載する */ }
          />
        </GridSection>
        { /* 3：認証失敗時のエラーメッセージ表示部分 */ }
        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>
        { /* 4：認証を行うボタン部分 */ }
        <GridSection>
          {this.renderButton()}
        </GridSection>
      </GridArea>
    );
  }
}

//このコンポーネントのStyle定義
const styles = {
  errorTextStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red'
  }
};

//ステートから値を取得してthis.propsにセットする
// → 内容は「reducers/index.js」を参照
// ※ Reducerにあるものを再度詰め直しを行うイメージ
const mapStateToProps = ({ auth }) => {

  //引数で受け取った認証データを変数に分解する
  const { email, password, error, loading } = auth;

  //分解したそれぞれの値をオブジェクトにして返却する
  return { email, password, error, loading };
};

//インポート可能にする宣言
// ※書き方メモ：export default connect(mapStateToProps, mapDispatchToProps)(Class)の形で記述する
//
// 引数：
// mapStateToProps：globalなstateから利用する値をとってきてthis.propsにセットする
// mapDispatchToProps：this.method.actionHoge()を呼ぶとstore.dispatch()が呼ばれる → アクションを定義している場合にはそのアクションメソッドを設定
//
// http://qiita.com/yuichiroTCY/items/a3ca7d9d415049d02d60
export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
