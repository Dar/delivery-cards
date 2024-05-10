import React, { useMemo, useContext } from "react";
import { OrderDataContext } from "../../../App";
import Header from "../../../components/Header/Header";
import OrderCard from "../../../components/OrderCard/OrderCard";
import "./styles.css";

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
