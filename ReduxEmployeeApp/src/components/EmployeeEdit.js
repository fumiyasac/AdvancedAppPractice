/**
 * 顧客情報編集用部分のコンポーネント
 */
import React, { Component } from 'react';

//オブジェクトを配列に変換するのに便利なライブラリ「lodash」のインポート宣言
// → underscore.jsとほぼ同様の機能を提供してくれるもの？
// (公式ドキュメント)
// https://lodash.com/docs
// 参考：JavaScriptで関数型プログラミングを強力に後押しするUnderscore.jsのおすすめメソッド12選（lodashもあるよ）
// http://qiita.com/takeharu/items/7d4ead780710c627172e
// 参考：lodashでよく使う関数まとめ
// http://matsukaz.hatenablog.com/entry/2014/04/09/082410
import _ from 'lodash';

//connectのインポート宣言を行う
// → connectを用いてstoreをpropで読めるようにする
// 参考：[redux] Presentational / Container componentの分離 - react-redux.connect()のつかいかた
// http://qiita.com/yuichiroTCY/items/a3ca7d9d415049d02d60
import { connect } from 'react-redux';

//
import Communications from 'react-native-communications';

//共通設定した部品のインポート宣言
import { GridArea, GridSection, Button, Confirm } from './common';

//自作コンポーネント：EmployeeFormのインポート宣言
import EmployeeForm from './EmployeeForm';

//ActionCreator(Actionの寄せ集め)のインポート宣言(this.props.この中に定義したメソッド名の形で実行)
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';

//コンポーネントの内容を定義する ※ ClassComponent
class EmployeeEdit extends Component {

  //このコンポーネント内のステート ※このステートはモーダルのコントロールをするために使用する
  state = { showModal: false };

  //コンポーネントの内容がMountされる前に行う処理
  componentWillMount() {

    //
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  //「Save Changes」ボタン押下時の処理
  onButtonPress() {

    //
    const { name, phone, shift } = this.props;

    //
    this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
  }

  //
  onTextPress() {

    //
    const { phone, shift } = this.props;

    //
    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }

  //onAccept属性に設定した関数が発火した際の処理
  onAccept() {

    //
    const { uid } = this.props.employee;

    //
    this.props.employeeDelete({ uid });
  }

  //onDecline属性に設定した関数が発火した際の処理
  onDecline() {

    //このコンポーネントのstateをfalseに戻す
    this.setState({ showModal: false });
  }

  //見た目データのレンダリングを行う
  render() {
    return (
      <GridArea>
        { /**/ }
        <EmployeeForm />

        { /**/ }
        <GridSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </GridSection>

        { /**/ }
        <GridSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
        </GridSection>

        {
          /**
           * 4. モーダル表示用のトリガーとなるボタン
           * ※デフォルト値がfalseなのでtrueにする → そうすることで削除用のモーダルが表示される形になる
           */
        }
        <GridSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Fire Employee
          </Button>
        </GridSection>

        {
          /**
           * 5. モーダル表示
           * ※this.stateと連動してモーダルの表示・非表示が決定する
           */
        }
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
          >
            Are you sure you want to delete this?
        </Confirm>
      </GridArea>
    );
  }
}

//ステートから値を取得してthis.propsにセットする
// → 内容は「reducers/index.js」を参照
// ※ Reducerにあるものを再度詰め直しを行うイメージ
const mapStateToProps = (state) => {

  //引数で受け取った認証データを変数に分解する
  const { name, phone, shift } = state.employeeForm;

  //分解したそれぞれの値をオブジェクトにして返却する
  return { name, phone, shift };
};

//インポート可能にする宣言
// ※書き方メモ：export default connect(mapStateToProps, mapDispatchToProps)(Class)の形で記述する
//
// 引数：
// mapStateToProps：globalなstateから利用する値をとってきてthis.propsにセットする
// mapDispatchToProps：this.method.actionHoge()を呼ぶとstore.dispatch()が呼ばれる → アクションを定義している場合にはそのアクションメソッドを設定
//
// http://qiita.com/yuichiroTCY/items/a3ca7d9d415049d02d60
export default connect(mapStateToProps, { employeeUpdate, employeeSave, employeeDelete })(EmployeeEdit);
