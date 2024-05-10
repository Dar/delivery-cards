import moment from "moment-timezone";

export const formatDate = (dateString) => {
  const formattedDate = moment(dateString).format("MMMM DD, YYYY [@] h:mm a");
  return formattedDate;
};

export const formatState = (state) => {
  return state.replace(/_/g, " ");
};

export const handleGoogleMapsLink = (address) => {
  const mapsUrl = `https://www.google.com/maps/place/${encodeURIComponent(
    address
  )}`;
  window.open(mapsUrl, "_blank");
};
