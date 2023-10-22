import axios from "axios";
import { apiPrefix, axiosHeader } from "../configs/apiConfig";

const headers = axiosHeader();

export function getCustomers(searchParams) {
  return axios
    .get(`${apiPrefix}customer/customers`, { params: searchParams })
    .then((response) => response.data);
}

export function newCustomer(customer) {
  const data = axios
    .post(`${apiPrefix}customer/newcustomer`, customer, { headers })
    .then((response) => response.data);
  return data;
}

// paymentObj = {customer._id, payment[method,amount], paymentDate, totalPayment}
export function newPayment(paymentObj) {
  const data = axios
    .post(`${apiPrefix}payment/newpayment`, paymentObj, { headers })
    .then((response) => response.data);
  return data;
}
