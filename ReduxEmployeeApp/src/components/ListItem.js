/**
 * 顧客データ表示エリアの1つのリスト用の独自コンポーネント
 */
import React, { Component } from 'react';

//コンポーネントで使用する要素のインポート宣言を行う
// (参考1) TouchableWithoutFeedbackの公式ドキュメント
// https://facebook.github.io/react-native/docs/touchablewithoutfeedback.html
// (参考2) LayoutAnimationの公式ドキュメント
// https://facebook.github.io/react-native/docs/layoutanimation.html
import { Text, TouchableWithoutFeedback, View } from 'react-native';

//react-native-router-fluxライブラリのインポート宣言
// (ライブラリ概要)このライブラリのGithubリポジトリ
// https://github.com/aksonov/react-native-router-flux
// 基本的な用法：
// Routerタグで各々のSceneを囲む → Sceneにはkeyが設定されており「Actions.key_name()」で遷移する
import { Actions } from 'react-native-router-flux';

//共通設定した部品のインポート宣言
import { GridSection } from './common';

//コンポーネントの内容を定義する ※ ClassComponent
class ListItem extends Component {

  //リストのアイテムを押下した時に発動するアクション
  onRowPress() {

    //Scene名：employeeEditへ遷移する
    Actions.employeeEdit({ employee: this.props.employee });
  }

  //見た目データのレンダリングを行う
  render() {

    //this.props.employee(Firebaseに格納されているデータをstateに詰め直したもの)から名前を取得する
    const { name } = this.props.employee;

    //見た目に関する処理をする
    /**
      * TouchableWithoutFeedbackでタッチした際のイベントを受け取れるようにする
      * onPress属性の部分に処理内容を記載 ※this.onRowPressメソッドをバインドしてthis.propsの値を利用する
      */
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <GridSection>
            <Text style={styles.titleStyle}>
              {name}
            </Text>
          </GridSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

//このコンポーネントのStyle定義
const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

//インポート可能にする宣言
export default ListItem;
