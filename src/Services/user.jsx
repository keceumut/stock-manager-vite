import axios from "axios";
import { apiPrefix, axiosHeader } from "../configs/apiConfig";

const headers = axiosHeader();

export function signIn(user) {
  const jwt = axios
    .post(`${apiPrefix}user/signin`, user, { headers })
    .then((response) => response.data);

  return jwt;
}

export function userAuthenticate(jwt) {
  const authenticated = axios
    .post(`${apiPrefix}user/userauthenticate`, {}, { headers })
    .then((response) => response.data);
  return authenticated;
}
