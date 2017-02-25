/**
 * ローディング時のぐるぐるインジケーター用の共通コンポーネント
 */
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

//コンポーネントの内容を定義する ※ FunctionalComponent
//参考：ES2015(ES6)新構文：アロー関数(Arrow function)
/**
 * この書き方のポイント：
 *
 * 引数：オブジェクトに格納するものは下記
 * 1. size：インジケーターの大きさ
 * → このように引数に色々設定したコンポーネントを作っておくことで使い回しができるようにしておく
 */
const Spinner = ({ size }) => {

  //各スタイルの適用のために分割する
  const {
    spinnerStyle
  } = styles;

  //表示する要素を返す
  return (
    <View style={spinnerStyle}>
      {
        /**
         * ActivityIndicatorの大きさを調整できるようにしておく ※初期値はlarge
         */
      }
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { Spinner };
