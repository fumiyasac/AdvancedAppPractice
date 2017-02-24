/**
 * 出前データ表示エリアの1つのリスト用の独自コンポーネント
 */
import React, { Component } from 'react';

//コンポーネントで使用する要素のインポート宣言を行う
// (参考1) TouchableWithoutFeedbackの公式ドキュメント
// https://facebook.github.io/react-native/docs/touchablewithoutfeedback.html
// (参考2) LayoutAnimationの公式ドキュメント
// https://facebook.github.io/react-native/docs/layoutanimation.html
import { Text, View, TouchableWithoutFeedback, LayoutAnimation, Image } from 'react-native';

//connectのインポート宣言を行う
// → connectを用いてstoreをpropで読めるようにする
// 参考：[redux] Presentational / Container componentの分離 - react-redux.connect()のつかいかた
// http://qiita.com/yuichiroTCY/items/a3ca7d9d415049d02d60
import { connect } from 'react-redux';

//共通設定した部品のインポート宣言
import { GridSection } from './common';

//ActionCreator(Actionの寄せ集め)のインポート宣言
import * as actions from '../actions';

//コンポーネントの内容を定義する ※ ClassComponent
class ListItem extends Component {

  //コンポーネントの内容がMountされる前に行う処理
  componentWillUpdate() {

    //LayoutAnimationでスプリングのような動きで開閉をするようにする
    LayoutAnimation.spring();
  }

  //Toggleで展開する部分のレンダリングを行う
  renderDescription() {

    //this.propsに格納されているデータを分解する
    const { delivery, expanded } = this.props;

    //変数：expandedの値に応じて表示・非表示を決定する
    if (expanded) {
      return (
        <View>
          <GridSection>
            <View style={styles.thumbnailAreaStyle}>
              <Image style={styles.thumbnailStyle} source={require('./img/sample.jpg')} />
            </View>
            <View style={styles.informationAreaStyle}>
              <Text style={styles.telTextStyle}>電話：{delivery.tel}</Text>
              <Text>営業時間：{delivery.opentime}</Text>
              <Text>定休日：{delivery.closetime}</Text>
            </View>
          </GridSection>
          <GridSection>
            <View style={styles.detailAreaStyle}>
              <Text style={styles.catchCopyStyle}>
                {delivery.catchcopy}
              </Text>
              <Text style={styles.descriptionStyle}>
                {delivery.description}
              </Text>
            </View>
          </GridSection>
        </View>
      );
    }
  }

  //見た目データのレンダリングを行う
  render() {

    //this.propsのdeliveryプロパティに格納されている値を分解する
    const { id, shopname } = this.props.delivery;

    //見た目に関する処理をする
    /**
      * TouchableWithoutFeedbackでタッチした際のイベントを受け取れるようにする
      * onPress属性の部分に処理内容を記載 ※{() => 処理}
      * → 今回の処理に関してはActionCreator内に定義されているメソッドを実行する
      */
    return (
      <TouchableWithoutFeedback onPress={() => this.props.selectDelivery(id)}>
        <View>
          <GridSection>
            <Text style={styles.shopNameStyle}>
              {shopname}
            </Text>
          </GridSection>
          {/* タップした際に選択状態かを見て詳細表示エリアを描画する */}
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

//このコンポーネントのStyle定義
const styles = {
  detailAreaStyle: {
    flex: 1
  },
  catchCopyStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10
  },
  descriptionStyle: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 6
  },
  shopNameStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 8
  },
  thumbnailAreaStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    marginBottom: 8
  },
  thumbnailStyle: {
    height: 60,
    width: 80
  },
  informationAreaStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  telTextStyle: {
    fontSize: 14,
    fontWeight: 'bold'
  }
};

//ステートから値を取得してthis.propsにセットする
// → 内容は「reducers/index.js」を参照
// ※ Reducerにあるものを再度詰め直しを行うイメージ
const mapStateToProps = (state, ownProps) => {

  //このコンポーネントで更新するステートはどのセクションをToggleで展開するかの部分になる
  // → state内の選択状態になっているidとこのコンポーネントのpropsで保持しているidとの同一性チェック
  const expanded = state.selectedDeliveryId === ownProps.delivery.id;

  //選択結果を返す
  return { expanded };
};

//インポート可能にする宣言
// ※書き方メモ：export default connect(mapStateToProps, mapDispatchToProps)(Class)の形で記述する
//
// 引数：
// mapStateToProps：globalなstateから利用する値をとってきてthis.propsにセットする
// mapDispatchToProps：this.method.actionHoge()を呼ぶとstore.dispatch()が呼ばれる → アクションを定義している場合にはそのアクションメソッドを設定
//
// http://qiita.com/yuichiroTCY/items/a3ca7d9d415049d02d60
export default connect(mapStateToProps, actions)(ListItem);
