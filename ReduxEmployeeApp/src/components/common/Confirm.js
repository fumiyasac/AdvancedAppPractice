import React from 'react';
import { Text, View, Modal } from 'react-native';

//このコンポーネントで使用する共通コンポーネントのインポート宣言
import { GridSection } from './GridSection';
import { Button } from './Button';

//コンポーネントの内容を定義する ※ FunctionalComponent
//参考：ES2015(ES6)新構文：アロー関数(Arrow function)
/**
 * この書き方のポイント：
 *
 * 引数：オブジェクトに格納するものは下記4つ
 * 1. children：さらに子の要素 ※<Confirm>...</Confirm>で囲まれた部分のテキストだけが必要
 * → props.childrenとする場合には中身のタグごと取得する場合
 * 2. visible：表示に関するステータス
 * 3. onPress時のアクション（onAccept：削除処理の実行ボタン処理）
 * 4. onDecline時のアクション（onDecline：削除処理のキャンセル処理）
 */
const Confirm = ({ children, visible, onAccept, onDecline }) => {

  //表示する要素を返す
  /**
   * モーダルビューに関するセッティングを行う
   * (参考) Modalに関する公式ドキュメント
   * https://facebook.github.io/react-native/docs/modal.html
   */
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={styles.containerStyle}>
        { /* 1. ポップアップの表示文言 */ }
        <GridSection style={styles.cardSectionStyle}>
          <Text style={styles.textStyle}>
            {children}
          </Text>
        </GridSection>
        { /* 2. 削除・キャンセルのボタン */ }
        <GridSection>
          <Button onPress={onAccept}>Yes</Button>
          <Button onPress={onDecline}>No</Button>
        </GridSection>
      </View>
    </Modal>
  );
};

//このコンポーネントのStyle定義
const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};

//インポート可能にする宣言
export { Confirm };
