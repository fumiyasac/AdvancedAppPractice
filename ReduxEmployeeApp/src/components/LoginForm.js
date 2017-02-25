/**
 * ログイン用のフォーム部分のコンポーネント
 */
import React, { Component } from 'react';
import { Text } from 'react-native';

//LoginFormの作成に必要な自作コンポーネント群のインポート宣言を行う
import { GridArea, GridSection, Input, Button, Spinner } from './common';

//ログイン用フォーム部分のUIの組み立てを行う
class LoginForm extends Component {

  //ボタン押下時に実行されるメソッド
  onButtonPress() {

    //ステートからメールアドレスとパスワードを取得する
    const { email, password } = this.props;

    //TODO: 残りの処理を記載する
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
