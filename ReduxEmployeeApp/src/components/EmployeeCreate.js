/**
 * 顧客情報新規追加用部分のコンポーネント
 */
import React, { Component } from 'react';

//共通設定した部品のインポート宣言
import { GridArea, GridSection, Button } from './common';

//自作コンポーネント：EmployeeFormのインポート宣言
import EmployeeForm from './EmployeeForm';

//コンポーネントの内容を定義する ※ ClassComponent
class EmployeeCreate extends Component {

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
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}
