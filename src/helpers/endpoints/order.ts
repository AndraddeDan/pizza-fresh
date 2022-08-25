import { endpoint } from "helpers/endpoints";

export const order = {
  createOrder: () => `${endpoint.baseUrl}/order`,
  listOrders: () => `${endpoint.baseUrl}/order`,
  orderById: (id: string) => `${endpoint.baseUrl}/order/${id}`,
  addItemInOrder: () => `${endpoint.baseUrl}/order/add-item`,
  removeItemInOrder: () => `${endpoint.baseUrl}/order/remove-item`,
  closeOrder: (id: string) => `${endpoint.baseUrl}/order/close-order/${id}`,
};
