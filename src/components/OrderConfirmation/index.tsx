import React, { HTMLAttributes, useEffect, useState } from "react";
import OrderItemList from "components/OrderItemList";
import OrderItem from "components/OrderItem";
import { OrderItemType } from "types/OrderItemType";
import * as S from "./style";

type OrderConfirmationType = HTMLAttributes<HTMLDivElement>;

type OrderConfirmationProps = {
  orders: OrderItemType[];
  onOrdersChange: (orders: OrderItemType[]) => void;
} & OrderConfirmationType;

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  orders,
  onOrdersChange,
}) => {
  const price = orders
    .map((i) => i.product.price * i.quantity)
    .reduce((a, b) => a + b, 0);

  const [priceState, setPriceState] = useState(price);

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
    <S.OrderConfirmation>
      <S.OrderConfirmationHead> Confirmação </S.OrderConfirmationHead>
      <S.OrderConfirmationSub>Detalhes do pedido </S.OrderConfirmationSub>
      <OrderItemList
        list={orders.map((item, index) => (
          <OrderItem
            quantity={item.quantity}
            product={item.product}
            observation={item.description}
            key={`OrderConfirmation-${index}`}
            onItemChange={handleChange}
            canDelete={false}
          />
        ))}
        footer={
          <S.OrderConfirmationFooter>
            <S.OrderConfirmationFooterRow>
              <span> Subtotal </span>
              <span> R$ {priceState.toFixed(2)} </span>
            </S.OrderConfirmationFooterRow>
          </S.OrderConfirmationFooter>
        }
      />
    </S.OrderConfirmation>
  );
};

export default OrderConfirmation;
