/**
 * 顧客情報新規追加用部分のコンポーネント
 */
import React, { Component } from 'react';

//connectのインポート宣言を行う
// → connectを用いてstoreをpropで読めるようにする
// 参考：[redux] Presentational / Container componentの分離 - react-redux.connect()のつかいかた
// http://qiita.com/yuichiroTCY/items/a3ca7d9d415049d02d60
import { connect } from 'react-redux';

//ActionCreator(Actionの寄せ集め)のインポート宣言(this.props.この中に定義したメソッド名の形で実行)
import { employeeUpdate, employeeCreate, employeeRefresh } from '../actions';

//共通設定した部品のインポート宣言
import { GridArea, GridSection, Button } from './common';

//自作コンポーネント：EmployeeFormのインポート宣言
import EmployeeForm from './EmployeeForm';

//コンポーネントの内容を定義する ※ ClassComponent
class EmployeeCreate extends Component {

  //コンポーネントの内容がMountされる前に行う処理
  componentWillMount() {

    //stateの中を一旦リフレッシュする ※編集画面から特に処理を行わずにバックした際の考慮
    this.props.employeeRefresh();
  }

  //Createボタン押下時の処理
  onButtonPress() {

    //取得したthis.propsの値をそれぞれの値に分割する
    const { name, phone, shift } = this.props;

    //新規追加用のデータを受け取り新規に1件データを追加する
    this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
  }

  //見た目データのレンダリングを行う
  render() {
    return (
      <GridArea>
        { /* 1. 従業員フォームのコンポーネントを表示する */ }
        <EmployeeForm {...this.props} />
        { /* 2. データの新規追加用のボタン表示 */ }
        <GridSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </GridSection>
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
export default connect(mapStateToProps, { employeeUpdate, employeeCreate, employeeRefresh })(EmployeeCreate);
