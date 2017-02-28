/**
 * 顧客情報入力フォーム用部分のコンポーネント
 */
import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';

//connectのインポート宣言を行う
// → connectを用いてstoreをpropで読めるようにする
// 参考：[redux] Presentational / Container componentの分離 - react-redux.connect()のつかいかた
// http://qiita.com/yuichiroTCY/items/a3ca7d9d415049d02d60
import { connect } from 'react-redux';

//ActionCreator(Actionの寄せ集め)のインポート宣言(this.props.この中に定義したメソッド名の形で実行)
import { employeeUpdate } from '../actions';

//共通設定した部品のインポート宣言
import { GridSection, Input } from './common';

//コンポーネントの内容を定義する ※ ClassComponent
//propsの値を受け取って入力処理が行われたらステートの更新を行う
class EmployeeForm extends Component {
  render() {
    return (
      <View>
        { /* 1.名前の入力エリア */ }
        <GridSection>
          <Input
            label="Name"
            placeholder="Jane"
            value={this.props.name}
            onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}
          />
        </GridSection>
        { /* 2.電話番号の入力エリア */ }
        <GridSection>
          <Input
            label="Phone"
            placeholder="555-555-5555"
            value={this.props.phone}
            onChangeText={value => this.props.employeeUpdate({ prop: 'phone', value })}
          />
        </GridSection>
        { /* 3.曜日の選択エリア */ }
        <GridSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerTextStyle}>Shift</Text>
          <Picker
            style={styles.pickerContainerStyle}
            selectedValue={this.props.shift}
            onValueChange={value => this.props.employeeUpdate({ prop: 'shift', value })}
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </GridSection>
      </View>
    );
  }
}

//このコンポーネントのStyle定義
const styles = {
  pickerContainerStyle: {
    flex: 1
  },
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

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
export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);
