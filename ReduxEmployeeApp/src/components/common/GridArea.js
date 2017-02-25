/**
 * 罫線付きのグリッドエリア用の共通コンポーネント
 */
import React from 'react';
import { View } from 'react-native';

//コンポーネントの内容を定義する ※ FunctionalComponent
//参考：ES2015(ES6)新構文：アロー関数(Arrow function)
/**
 * この書き方のポイント：
 *
 * 引数：propsで<GridArea>...</GridArea>の中にある要素を表示する
 * → props.childrenとすると...の中身が取得できる
 * → この場合は<Card>は<View>でラッピングをしているコンテンツになる
 * → そしてこのViewに対するスタイルを設定する
 */
const GridArea = (props) => {

  //表示する要素を返す
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

//このコンポーネントのStyle定義
const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
};

//インポート可能にする宣言
export { GridArea };
