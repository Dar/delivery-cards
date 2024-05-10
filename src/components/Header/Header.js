import React, { useCallback, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { OrderDataContext } from "../../App";
import moment from "moment";
import "./styles.css";

const Header = ({ pageTitle }) => {
  const { setViewingDay } = useContext(OrderDataContext);

  return (
    <div className="header">
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-around" }}>
          <Typography variant="h1" className="header-title">
            {pageTitle}
          </Typography>
          <div className="toolbar-ctrl">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Select a date"
                onChange={(event, newLocale) => {
                  let dayString = moment(event).format("YYYY-MM-DD");
                  setViewingDay(dayString);
                }}
              />
            </LocalizationProvider>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
