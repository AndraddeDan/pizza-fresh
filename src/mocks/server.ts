import { endpoint } from "helpers/endpoints";
import { orders } from "./orders";
import { products } from "./products";
import { ProductResponse } from "types/api/product";

export const server = {
  get: (rota: string, useBodyResponse = false) =>
    useBodyResponse
      ? bodyResponseTransform(mapeadorDeRotas[rota])
      : mapeadorDeRotas[rota] ?? simulador(null, true),
  post: (rota: string) => mapeadorDeRotas[rota] ?? simulador(null, true),
  put: (rota: string) => mapeadorDeRotas[rota] ?? simulador(null, true),
  delete: (rota: string) => mapeadorDeRotas[rota] ?? simulador(null, true),
};

function simulador<T>(resposta: T, comErro = false, tempo = 2000) {
  return new Promise(function (resolve, reject) {
    const retorno = () =>
      comErro ? reject(new Error("Sem resposta")) : resolve(resposta);
    setTimeout(retorno, tempo);
  });
}

const mapeadorDeRotas: { [key in string]: Promise<unknown> } = {
  [endpoint.listProducts()]: simulador<ProductResponse[]>(products),
  [endpoint.listOrders()]: simulador(orders),
};

const bodyResponseTransform = <T>(data: T) => {
  // TODO: fix respnse return to work with response.json() method
  return new Response(JSON.stringify(data), {
    status: 200,
    statusText: "OK",
    headers: { "Content-Type": "application/json" },
  });
};
