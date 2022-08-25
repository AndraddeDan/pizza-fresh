import React, { HTMLAttributes, useEffect, useState } from "react";
import ButtonToggle from "components/ButtonToggle";
import OrderItemList from "components/OrderItemList";
import OrderItem from "components/OrderItem";
import ButtonLarge from "components/ButtonLarge";
import { OrderType } from "types/OrderType";
import { OrderItemType } from "types/OrderItemType";
import * as S from "./style";

type OrderDetailsType = HTMLAttributes<HTMLDivElement>;

type OrderDetailsProps = {
  orders: OrderItemType[];
  selectedTable?: number | string;
  onRemoveItem: (id: string) => void;
  onOrdersChange: (orders: OrderItemType[]) => void;
  onProceedToPayment: () => void;
  onChangeActiveOrderType: (data: OrderType) => void;
  activeOrderType: OrderType;
} & OrderDetailsType;

const OrderDetails: React.FC<OrderDetailsProps> = ({
  orders,
  onRemoveItem,
  onOrdersChange,
  onProceedToPayment,
  onChangeActiveOrderType,
  activeOrderType,
  selectedTable: selectedTableId,
}) => {
  const price = orders
    .map((i) => i.product.price * i.quantity)
    .reduce((a, b) => a + b, 0);

  const [priceState, setPriceState] = useState(price);

  const disabledButton =
    !Boolean(orders.length) ||
    !Boolean(selectedTableId) ||
    selectedTableId === "default";

  const handleChange = (data: OrderItemType) => {
    const list = orders.map((item) =>
      item.product.id === data.product.id ? data : item
    );
    onOrdersChange(list);
  };

  useEffect(() => {
    setPriceState(price);
  }, [orders, price]);

  return (
    <S.OrderDetails>
      <S.OrderDetailsTitle>Detalhes do pedido</S.OrderDetailsTitle>
      <S.OrderDetailsButtonGroup>
        <ButtonToggle
          onClick={() => onChangeActiveOrderType(OrderType.COMER_NO_LOCAL)}
          active={activeOrderType === OrderType.COMER_NO_LOCAL}
          value="Comer no local"
        />
        <ButtonToggle
          onClick={() => onChangeActiveOrderType(OrderType.PARA_VIAGEM)}
          active={activeOrderType === OrderType.PARA_VIAGEM}
          value="P/ Viagem"
        />
        <ButtonToggle
          onClick={() => onChangeActiveOrderType(OrderType.DELIVERY)}
          active={activeOrderType === OrderType.DELIVERY}
          value="Delivery"
        />
      </S.OrderDetailsButtonGroup>

      <S.OrderDetailsList>
        <OrderItemList
          header={
            <S.OrderDetailsListTitle>
              <h4>Item</h4>
              <h4>Qtd</h4>
              <h4>Preço</h4>
            </S.OrderDetailsListTitle>
          }
          list={
            Boolean(orders.length) ? (
              orders.map((item, index) => (
                <OrderItem
                  onRemoveItem={() => onRemoveItem(item.product.id)}
                  onItemChange={handleChange}
                  product={item.product}
                  quantity={item.quantity}
                  observation={item.description}
                  key={`OrderDetails-${index}`}
                />
              ))
            ) : (
              <S.OrderDetailsListGap />
            )
          }
          footer={
            <S.OrderDetailsListFooter>
              <S.OrderDetailsListFooterRow>
                <span> Subtotal </span>
                <span> R$ {priceState.toFixed(2)} </span>
              </S.OrderDetailsListFooterRow>
              {(!Boolean(selectedTableId) || selectedTableId === "default") && (
                <S.OrderDetailsListFooterWarning>
                  Escolha a mesa primeiro
                </S.OrderDetailsListFooterWarning>
              )}
              <ButtonLarge
                value="Continue para o pagamento"
                disabled={disabledButton}
                onClick={onProceedToPayment}
              />
            </S.OrderDetailsListFooter>
          }
        />
      </S.OrderDetailsList>
    </S.OrderDetails>
  );
};

export default OrderDetails;
