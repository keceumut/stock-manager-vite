import axios from "axios";
import { apiPrefix, axiosHeader } from "../configs/apiConfig";

const headers = axiosHeader();

export function getProducts(searchParams) {
  console.log(searchParams);
  const products = axios
    .get(`${apiPrefix}product/product`, { params: searchParams })
    .then((response) => response.data);
  return products;
}

// productId = 'xyz-numbers'
export function getProduct(productId) {
  return axios
    .get(`${apiPrefix}product/product?pid=${productId}`)
    .then((response) => response.data);
}

// product = {productId, name, tags}
export function addProduct(product) {
  return axios
    .post(`${apiPrefix}product/newproduct`, product, {
      headers,
    })
    .then((response) => response.data);
}

// receiptObject = {receiptNumber, receiptDate, items:[]}
export function newPurchase(receiptObject) {
  const data = axios
    .post(`${apiPrefix}purchase/newpurcase`, receiptObject, { headers })
    .then((response) => response.data);
  return data;
}

export function updateProduct(product, updateFields) {
  const apiObj = {
    productId: product.pid,
    updateFields,
  };
  return axios
    .patch(`${apiPrefix}product/product`, apiObj, {
      headers,
    })
    .then((response) => response.data);
}
