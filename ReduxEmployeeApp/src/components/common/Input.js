/**
 * ユーザー入力テキストフィールド用の共通コンポーネント
 */
import React from 'react';
import { TextInput, View, Text } from 'react-native';

//コンポーネントの内容を定義する ※ FunctionalComponent
//参考：ES2015(ES6)新構文：アロー関数(Arrow function)
/**
 * この書き方のポイント：
 *
 * 引数：オブジェクトに格納するものは下記の5つ
 * 1. label：ラベル部分に表示する文字列
 * 2. value：TextInputに格納されている値
 * 3. onChangeText：TextInputの入力が変更された際に実行される関数
 * 4. placeholder：TextInputのプレースホルダ値
 * 5. secureTextEntry：TextInputの値を●●●の表示にするかを決める(Bool)
 * → このように引数に色々設定したコンポーネントを作っておくことで使い回しができるようにしておく
 */
const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {

  //表示する要素を返す
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelStyle}>{label}</Text>
      {
        /**
         * テキストフィールド部分の設定
         * LoginForm.js内でテキストフィールドを設定する際に引数に設定した情報を定義する
         */
      }
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={styles.inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

//このコンポーネントのStyle定義
const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 14,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 14,
    paddingLeft: 10,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

//インポート可能にする宣言
export { Input };
