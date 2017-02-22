import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

//コンポーネントの内容を定義する ※ FunctionalComponent
//参考：ES2015(ES6)新構文：アロー関数(Arrow function)
/**
 * この書き方のポイント：
 *
 * 引数：オブジェクトに格納するものは下記の2つ
 * 1. onPress時のアクション（この部分を押下した際のアクション）
 * 2. さらに子の要素 ※<Button>...</Button>で囲まれた部分のテキストだけが必要
 * → props.childrenとする場合には中身のタグごと取得する場合
 */
const Button = ({ onPress, children }) => {

  //表示する要素を返す
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
      <Text style={styles.textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

//このコンポーネントのStyle定義
const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ff9900',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ff9900',
    marginLeft: 5,
    marginRight: 5
  }
};

//インポート可能にする宣言
export { Button };
