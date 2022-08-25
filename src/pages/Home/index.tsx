import "moment/locale/pt-br";
import moment from "moment";
import { RoutePath } from "types/routes";
import { ReactComponent as Search } from "assets/icons/search.svg";
import ProductItemList from "components/ProductItemList";
import Menu from "components/Menu";
import ProductItem from "components/ProductItem";

import Overlay from "components/Overlay";
import CheckoutSection from "components/CheckoutSection";
import OrderDetails from "components/OrderDetails";
import { useNavigate } from "react-router-dom";
import { navigationItems } from "data/navigation";
import { useQuery } from "react-query";
import { QueryKey } from "types/QueryKey";
import { ProductService } from "services/ProductService";
import { Auth } from "helpers/Auth";
import { TableService } from "services/TableService";
import { useEffect, useState } from "react";
import { ProductResponse } from "types/api/product";
import { OrderItemType } from "types/OrderItemType";
import * as S from "./style";
import { matchByText } from "helpers/Utils";
import { OrderType } from "types/OrderType";

const Home = () => {
  const navigate = useNavigate();
  const handleNavigation = (path: RoutePath) => navigate(path);

  const dateDescription = moment().format("dddd[,] DD MMMM YYYY");

  const { data: productsData } = useQuery(
    QueryKey.PRODUCTS,
    ProductService.getLista
  );
  const { data: tablesData } = useQuery(QueryKey.TABLES, TableService.getLista);

  const tables = tablesData || [];

  const [orders, setOrders] = useState<OrderItemType[]>([]);
  const [selectedTable, setSelectedTable] = useState<number | undefined>();
  const [proceedToPayment, setProceedToPayment] = useState<boolean>(false);

  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>(
    []
  );
  const [products, setProducts] = useState<ProductResponse[]>([]);

  const [activeOrderType, setActiveOrderType] = useState(
    OrderType.COMER_NO_LOCAL
  );

  const handleSelection = (product: ProductResponse) => {
    const existing = orders.find((i) => i.product.id === product.id);
    const quantity = existing ? existing.quantity + 1 : 1;
    const item: OrderItemType = { product, quantity };

    const list = existing
      ? orders.map((i) => (i.product.id === existing.product.id ? item : i))
      : [...orders, item];
    setOrders(list);
  };

  const handleRemoveOrderItem = (id: string) => {
    const filtered = orders.filter((i) => i.product.id !== id);
    setOrders(filtered);
  };

  const handleFilter = (title: string) => {
    const list = products.filter(({ name }) => matchByText(name, title));
    setFilteredProducts(list);
  };

  useEffect(() => {
    setProducts(productsData || []);
    setFilteredProducts(productsData || []);
  }, [productsData]);

  return (
    <S.Home>
      <Menu
        active={RoutePath.HOME}
        onNavigate={handleNavigation}
        navItems={navigationItems}
        onLogout={Auth.logout}
      />
      <S.HomeContent>
        <header>
          <S.HomeHeaderDetails>
            <div>
              <S.HomeHeaderDetailsLogo>Pizza Fresh</S.HomeHeaderDetailsLogo>
              <S.HomeHeaderDetailsDate>
                {dateDescription}
              </S.HomeHeaderDetailsDate>
            </div>

            <S.HomeHeaderDetailsSearch>
              <Search />
              <input
                type="text"
                placeholder="Procure pelo sabor"
                onChange={({ target }) => handleFilter(target.value)}
              />
            </S.HomeHeaderDetailsSearch>
          </S.HomeHeaderDetails>
        </header>

        <div>
          <S.HomeProductTitle>
            <b> Pizzas </b>
          </S.HomeProductTitle>

          <S.HomeProductList>
            <ProductItemList tables={tables} onSelectTable={setSelectedTable}>
              {Boolean(products.length) &&
                filteredProducts.map((product, index) => (
                  <ProductItem
                    product={product}
                    key={`ProductItem-${index}`}
                    onSelect={handleSelection}
                  />
                ))}

              {Boolean(products.length) &&
                Array(3 - (products.length % 3))
                  .fill("")
                  .map((_, key) => (
                    <S.HomeProductListGap key={`Phantom-${key}`} />
                  ))}
            </ProductItemList>
          </S.HomeProductList>
        </div>
      </S.HomeContent>

      <aside>
        <OrderDetails
          orders={orders}
          onOrdersChange={(data) => setOrders(data)}
          onChangeActiveOrderType={(data) => setActiveOrderType(data)}
          activeOrderType={activeOrderType}
          onRemoveItem={handleRemoveOrderItem}
          selectedTable={selectedTable}
          onProceedToPayment={() => setProceedToPayment(true)}
        />
      </aside>
      {proceedToPayment && (
        <Overlay>
          <CheckoutSection
            orders={orders}
            onChangeActiveOrderType={(data) => setActiveOrderType(data)}
            activeOrderType={activeOrderType}
            selectedTable={selectedTable}
            onOrdersChange={(data) => setOrders(data)}
            onCloseSection={() => setProceedToPayment(false)}
          />
        </Overlay>
      )}
    </S.Home>
  );
};

export default Home;
