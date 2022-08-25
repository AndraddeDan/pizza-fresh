import React, {
  ButtonHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { ProductResponse } from "types/api/product";
import { ReactComponent as Trash } from "assets/icons/trash.svg";
import * as S from "./style";
import { OrderItemType } from "types/OrderItemType";

type DivType = ButtonHTMLAttributes<HTMLDivElement>;

export type OrderItemProps = {
  canDelete?: Boolean;
  product: ProductResponse;
  quantity: number;
  observation?: string;
  onRemoveItem?: () => void;
  onItemChange: (item: OrderItemType) => void;
} & DivType;

const OrderItem: React.FC<OrderItemProps> = ({
  product,
  onRemoveItem,
  quantity,
  observation = "",
  onItemChange,
  canDelete = true,
  ...props
}) => {
  const [quantityState, setQuantityState] = useState(quantity);
  const [observationState, setObservationState] = useState(observation);

  const handleObservation = (data: string) => {
    setObservationState(data);
  };

  const handleQuantity = (data: number) => {
    setQuantityState(data);
  };

  const handleChange = (quantityParam: number, observationParam: string) => {
    onItemChange({
      product: product,
      quantity: quantityParam,
      description: observationParam,
    });
  };

  useEffect(() => {
    handleObservation(observation);
  }, [observation]);

  useEffect(() => {
    handleQuantity(quantity);
  }, [quantity]);

  return (
    <S.OrderItem {...props} role="listitem">
      <S.OrderItemLeft>
        <S.OrderItemLeftTop>
          <S.OrderItemProduct>
            <S.OrderItemProductImage
              src={product.image}
              alt={`Pizza de ${product.name}`}
            />
            <S.OrderItemProductDetails>
              <S.OrderItemProductDetailsName>
                {product.name}
              </S.OrderItemProductDetailsName>
              <S.OrderItemProductDetailsPrice>
                R$ {product.price}
              </S.OrderItemProductDetailsPrice>
            </S.OrderItemProductDetails>
          </S.OrderItemProduct>

          <S.OrderItemQuantity
            type="number"
            value={quantityState}
            onChange={({ target }) => {
              setQuantityState(Number(target.value));
              handleChange(Number(target.value), observationState);
            }}
          />
        </S.OrderItemLeftTop>
        <S.OrderItemLeftObservation
          type="text"
          placeholder="Observações do pedido"
          value={observationState}
          onChange={({ target }) => {
            setObservationState(target.value);
            handleChange(quantityState, target.value);
          }}
        />
      </S.OrderItemLeft>
      <S.OrderItemRight>
        <S.OrderItemRightTotalPrice>
          R$ {Number(product.price * quantityState).toFixed(2)}
        </S.OrderItemRightTotalPrice>

        {canDelete && (
          <S.OrderItemRightTrash onClick={onRemoveItem}>
            <Trash />
          </S.OrderItemRightTrash>
        )}
      </S.OrderItemRight>
    </S.OrderItem>
  );
};

export default OrderItem;
