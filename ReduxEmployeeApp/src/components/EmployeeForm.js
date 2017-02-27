/**
 * 顧客情報入力フォーム用部分のコンポーネント
 */
import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';

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
            style={{ flex: 1 }}
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
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};
