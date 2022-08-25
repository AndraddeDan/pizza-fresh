import { Api } from "helpers/Api";
import { endpoint } from "helpers/endpoints";
import { Order } from "types/api/order";

export const OrderService = {
  create: (order: Order) => {
    const products = order.products.map(({ product, ...rest }) => ({ ...rest, productId: product.id }))

    console.log({ ...order, products })

    return Api(endpoint.createOrder(), {
      method: "POST",
      body: JSON.stringify({ ...order, products }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }
};
