import React, { useMemo, useContext } from "react";
import { OrderDataContext } from "../../../App.js";
import "./styles.css";
import OrderCard from "../../../components/OrderCard/OrderCard";
import Header from "../../../components/Header/Header.js";

const OrderView = () => {
  const { deliveries } = useContext(OrderDataContext);
  const memoizedOrderList = useMemo(() => {
    return deliveries.map((deliveryItem) => (
      <OrderCard key={deliveryItem.id} deliveryItem={deliveryItem} />
    ));
  }, [deliveries]);

  return (
    <div className="order-list-wrapper">
      <div className="order-list-container">
        <Header pageTitle={"Deliveries"} />
        <div className="order-list">{memoizedOrderList}</div>
      </div>
    </div>
  );
};

export default OrderView;
