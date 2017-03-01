/**
 * 顧客一覧表示用部分のコンポーネント
 */
import React, { Component } from 'react';
import { ListView } from 'react-native';

//connectのインポート宣言を行う
// → connectを用いてstoreをpropで読めるようにする
// 参考：[redux] Presentational / Container componentの分離 - react-redux.connect()のつかいかた
// http://qiita.com/yuichiroTCY/items/a3ca7d9d415049d02d60
import { connect } from 'react-redux';

//ActionCreator(Actionの寄せ集め)のインポート宣言(this.props.この中に定義したメソッド名の形で実行)
import { employeesFetch } from '../actions';

//自作コンポーネント：ListItemのインポート宣言
import ListItem from './ListItem';

//コンポーネントの内容を定義する ※ ClassComponent
class EmployeeList extends Component {

  //コンポーネントの内容がMountされる前に行う処理
  componentWillMount() {

    //propsから取得できた値をListViewのデータソースへ格納する
    this.createDataSource(this.props);
  }

  //処理の過程の中でpropsを再度受け取った際に行う処理
  componentWillReceiveProps(nextProps) {

    //コメント：
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    //propsから取得できた値をListViewのデータソースへ格納する
    this.createDataSource(nextProps);
  }

  //データソース部分の定義をする
  //初期化済みのDataSourceを準備する
  //rowHasChanged：各データの同一性を検証する（r1とr2を比較して違うものかどうかを返す）
  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    //dataSourceに値を入れる
    //cloneWithRows：DataSourceを複製して引数で与えられた値を追加する
    this.dataSource = ds.cloneWithRows(employees);
  }

  //リストになっている出前データの一覧表示用の部品(<ListItem>)の設定を行う
  renderRow(employee) {
    return <ListItem employee={employee} />;
  }

  //見た目データのレンダリングを行う
  render() {

    //見た目に関する処理をする
    // → 表示の際にはこの2つを設定：
    // (1) <ListView>のpropsに表示させたいデータを指定するdataSource
    // (2) データの表示方法を指定するrenderRow ※renderRow(delivery)の引数は設定される
    return (
      <ListView enableEmptySections dataSource={this.dataSource} renderRow={this.renderRow} />
    );
  }
}
