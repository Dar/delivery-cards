import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DateDisplay from "../../../components/DateDisplay/DateDisplay.js";
import { OrderDataContext } from "../../../App.js";
import { formatState, handleGoogleMapsLink } from "../../../lib/helper.js";
import "./styles.css";

const OrderDetail = () => {
  const { id } = useParams();
  const { deliveries, handleUpateState } = useContext(OrderDataContext);
  const deliveryItem = deliveries.find((item) => item.id === parseInt(id));

  if (!deliveryItem) {
    return <div>Order not found!</div>;
  }

  return (
    <Container maxWidth="sm">
      <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
        <div className="order-detail-container">
          <div className="order-detail-header">
            <Link to="/" className="back-button">
              <Button size="small">Back to Orders</Button>
            </Link>
            <Button size="small" onClick={() => handleUpateState(deliveryItem)}>
              {formatState(deliveryItem.state).toUpperCase()}
            </Button>
          </div>

          <div className="order-info">
            <div>
              <DateDisplay deliveryItem={deliveryItem} />
            </div>
            <br />

            <div>
              <h3>Pickup Address:</h3>
              <strong>{deliveryItem.restaurant}</strong> -
              <Link
                to="#"
                onClick={() => handleGoogleMapsLink(deliveryItem.pickupAddress)}
              >
                {deliveryItem.pickupAddress}
              </Link>
            </div>
            <br />
            <div>
              <h3>Delivery Address: </h3>
              <strong>{deliveryItem.client} </strong> -
              <Link
                to="#"
                onClick={() =>
                  handleGoogleMapsLink(deliveryItem.deliveryAddress)
                }
              >
                {deliveryItem.deliveryAddress}
              </Link>
            </div>
            <br />
            <div>
              <strong>Item Total:</strong> {deliveryItem.orderItems.length}
            </div>
          </div>
          <div className="order-items">
            <ul>
              {deliveryItem.orderItems.map((item) => (
                <li key={item.id}>{item.description}</li>
              ))}
            </ul>
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default OrderDetail;
