import React  from "react";
import { ProductResponse } from "types/api/product";
import * as S from "./style";

type ProductItemProps = {
	product: ProductResponse
	onSelect: (data: ProductResponse) => void
};

const ProductItem: React.FC<ProductItemProps> = ({ product, onSelect }) => {
  return (
    <S.ProductItem role='listitem' onClick={() => onSelect(product)}>
		<S.ProductItemImage src={product.image} alt={`Pizza de ${product.image}`} />

		<div>
			<S.ProductItemName> { product.name } </S.ProductItemName>
			<S.ProductItemPrice> { product.price } </S.ProductItemPrice>
			<S.ProductItemDescription> { product.description } </S.ProductItemDescription>
		</div>
    </S.ProductItem>
  );
};

export default ProductItem;
