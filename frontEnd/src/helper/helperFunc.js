import moment from "moment";

export const formatDate = (dateString) => {
  const date = moment(dateString, "YYYY-MM-DDTHH:mm:ssZ");
  return date.format("YYYY-MM-DD");
};
