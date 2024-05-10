import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { formatState, handleGoogleMapsLink } from "../../lib/helper";

import { OrderDataContext } from "../../App";
import DateDisplay from "../DateDisplay/DateDisplay";
import "./styles.css";
const OrderCard = React.memo(({ deliveryItem }) => {
  const { handleUpateState } = useContext(OrderDataContext);

  return (
    <Card sx={{ width: 400, margin: 2, position: "relative" }}>
      <CardContent>
        <Typography gutterBottom variant="body2" component="div">
          <DateDisplay deliveryItem={deliveryItem} />
        </Typography>
        <CardActions sx={{ position: "absolute", top: 0, right: 0 }}>
          <Button size="small" onClick={() => handleUpateState(deliveryItem)}>
            {formatState(deliveryItem.state).toUpperCase()}
          </Button>
        </CardActions>
      </CardContent>
      <CardContent></CardContent>
      <CardContent>
        <Typography gutterBottom variant="p" component="div">
          Pickup: <br />
          <strong>{deliveryItem.client}</strong>
        </Typography>
        <Typography gutterBottom variant="p" component="div">
          <Link
            to="#"
            onClick={() => handleGoogleMapsLink(deliveryItem.pickupAddress)}
          >
            {deliveryItem.pickupAddress}
          </Link>
        </Typography>
        <br />
        <Typography gutterBottom variant="p" component="div">
          Deliver to: <br />
          <strong>{deliveryItem.restaurant}</strong>
        </Typography>
        <Typography gutterBottom variant="p" component="div">
          <Link
            to="#"
            onClick={() => handleGoogleMapsLink(deliveryItem.deliveryAddress)}
          >
            {deliveryItem.deliveryAddress}
          </Link>
        </Typography>
      </CardContent>

      <CardContent xs={{ marginBottom: 10 }}>
        <Typography gutterBottom variant="p" component="div">
          Item total: {deliveryItem.orderItems.length}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to={`/order/${deliveryItem.id}`}>
          <Button size="small">View Details</Button>
        </Link>
      </CardActions>
    </Card>
  );
});

export default OrderCard;
