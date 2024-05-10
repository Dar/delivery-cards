import React from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { green } from "@mui/material/colors";
import { formatDate } from "../../lib/helper";
import "./styles.css";

const DateDisplay = ({ deliveryItem }) => {
  const updateTimeOnStatusChange = () => {
    if (deliveryItem.state !== "picked_up") {
      return formatDate(deliveryItem.pickupAt);
    } else {
      return (
        <div>
          {formatDate(deliveryItem.deliverAt)}
          <div className="icon-container">
            <CheckCircleOutlineOutlinedIcon sx={{ color: green[500] }} />
            <p>Picked up!</p>
          </div>
        </div>
      );
    }
  };
  return <div>{updateTimeOnStatusChange()}</div>;
};

export default DateDisplay;
