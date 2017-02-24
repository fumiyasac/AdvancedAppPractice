/**
 * 出前データ表示エリアの1つのリストにおいてToggleで詳細表示を行うアクション
 */
export const selectDelivery = (deliveryId) => {
  return {
    type: 'select_delivery',
    payload: deliveryId
  };
};
