import React, {
  createContext,
  useState,
  useEffect,
  Suspense,
  lazy,
} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import moment from "moment";
import {
  DeliveryStates,
  fetchDeliveries,
  storeDeliveries,
} from "./lib/deliveries";

const OrderView = lazy(() => import("./views/Orders/OrderView/OrdersView"));
const OrderDetail = lazy(() =>
  import("./views/Orders/OrderDetail/OrderDetail")
);

export const OrderDataContext = createContext();
function App() {
  const [deliveries, setDeliveries] = useState([]);
  const [viewingDay, setViewingDay] = useState(moment().format("YYYY-MM-DD"));
  const sortDeliveriesByTime = (deliveries, property) => {
    return deliveries.sort((a, b) => {
      return a[property].localeCompare(b[property]);
    });
  };

  const handleStateChange = (orderId, newState) => {
    const updatedDeliveries = deliveries.map((order) =>
      order.id === orderId ? { ...order, state: newState } : order
    );
    setDeliveries(updatedDeliveries);
    storeDeliveries(viewingDay, updatedDeliveries);
  };

  const handleUpateState = (deliveryItem) => {
    let nextState;
    switch (deliveryItem.state) {
      case DeliveryStates.SCHEDULED:
        nextState = DeliveryStates.DRIVER_CONFIRMED;
        break;
      case DeliveryStates.DRIVER_CONFIRMED:
        nextState = DeliveryStates.DRIVER_AT_RESTAURANT;
        break;
      case DeliveryStates.DRIVER_AT_RESTAURANT:
        nextState = DeliveryStates.PICKED_UP;
        break;
      case DeliveryStates.PICKED_UP:
        nextState = DeliveryStates.DRIVER_AT_CLIENT;
        break;
      case DeliveryStates.DRIVER_AT_CLIENT:
        nextState = DeliveryStates.DELIVERED;
        break;

      default:
        nextState = deliveryItem.state;
    }
    handleStateChange(deliveryItem.id, nextState);
  };

  useEffect(() => {
    let deliveriesFromStorage = localStorage.getItem(viewingDay);
    let deliveries;
    if (deliveriesFromStorage) {
      deliveries = JSON.parse(deliveriesFromStorage);
    } else {
      deliveries = fetchDeliveries(viewingDay);
    }
    const sortedDeliveries = sortDeliveriesByTime(deliveries, "deliverAt");
    setDeliveries(sortedDeliveries);
  }, [viewingDay]);

  return (
    <Router>
      <OrderDataContext.Provider
        value={{
          deliveries,
          sortDeliveriesByTime,
          setDeliveries,
          handleUpateState,
          setViewingDay,
          viewingDay,
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path="/" element={<OrderView />} />
            <Route path="/order/:id" element={<OrderDetail />} />
          </Routes>
        </Suspense>
      </OrderDataContext.Provider>
    </Router>
  );
}

export default App;
