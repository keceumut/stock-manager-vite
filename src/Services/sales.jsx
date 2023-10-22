import axios from "axios";
import { apiPrefix, axiosHeader } from "../configs/apiConfig";

const headers = axiosHeader();

export function getSales(params) {
  const data = axios
    .get(`${apiPrefix}sales/latestsales`, { params: { params } })
    .then((response) => response.data);
  return data;
}

export function getLatestSales(searchParams) {
  const data = axios
    .get(`${apiPrefix}sales/salesbycustomer`, {
      params: searchParams,
    })
    .then((response) => response.data);
  return data;
}

export function newSale(saleObj) {
  const data = axios
    .post(`${apiPrefix}sales/newsale`, saleObj, { headers })
    .then((response) => response.data);
  return data;
}
