/**
 * 出前データ表示エリアの全体用の独自コンポーネント
 *
 * How To Get Started with Redux in React Native
 * https://www.packtpub.com/books/content/how-get-started-redux-react-native
 */
import React, { Component } from 'react';

//ListViewを使うのでListViewのインポート宣言を行う
// (参考1) ListViewの公式ドキュメント
// https://facebook.github.io/react-native/docs/listview.html
// (参考2) ReactNativeハンズオンの資料 ※「Using a ListView」のところ
// https://github.com/besutome/slides/tree/master/20170219-ReactNative-handson#using-a-listview
import { ListView } from 'react-native';

//connectのインポート宣言を行う
// → connectを用いてstoreをpropで読めるようにする
// 参考：[redux] Presentational / Container componentの分離 - react-redux.connect()のつかいかた
// http://qiita.com/yuichiroTCY/items/a3ca7d9d415049d02d60
import { connect } from 'react-redux';

//自作コンポーネント：ListItemのインポート宣言
import ListItem from './ListItem';

//コンポーネントの内容を定義する ※ ClassComponent
class DeliveryList extends Component {

  //コンポーネントの内容がMountされる前に行う処理
  componentWillMount() {

    //データソース部分の定義をする
    //初期化済みのDataSourceを準備する
    //rowHasChanged：各データの同一性を検証する（r1とr2を比較して違うものかどうかを返す）
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    //dataSourceに値を入れる
    //cloneWithRows：DataSourceを複製して引数で与えられた値を追加する
    this.dataSource = ds.cloneWithRows(this.props.deliveries);
  }

  //リストになっている出前データの一覧表示用の部品(<ListItem>)の設定を行う
  renderRow(delivery) {
    return (
      <ListItem delivery={delivery} />
    );
  }

  //見た目データのレンダリングを行う
  render() {

    //見た目に関する処理をする
    // → 表示の際にはこの2つを設定：
    // (1) <ListView>のpropsに表示させたいデータを指定するdataSource
    // (2) データの表示方法を指定するrenderRow ※renderRow(delivery)の引数は設定される
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

//ステートから値を取得してthis.propsにセットする
// → 内容は「reducers/index.js」を参照
// ※ Reducerにあるものを再度詰め直しを行うイメージ
const mapStateToProps = state => {
  return { deliveries: state.deliveries };
};

//インポート可能にする宣言
// ※書き方メモ：export default connect(mapStateToProps, mapDispatchToProps)(Class)の形で記述する
//
// 引数：
// mapStateToProps：globalなstateから利用する値をとってきてthis.propsにセットする
// mapDispatchToProps：this.method.actionHoge()を呼ぶとstore.dispatch()が呼ばれる → アクションを定義している場合にはそのアクションメソッドを設定
// ()内にはコンポーネントのクラスが入る
// http://yukidarake.hateblo.jp/entry/2015/09/30/195932
//
// 参考：[redux] Presentational / Container componentの分離 - react-redux.connect()のつかいかた
// http://qiita.com/yuichiroTCY/items/a3ca7d9d415049d02d60
export default connect(mapStateToProps)(DeliveryList);
