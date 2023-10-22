// export const apiPrefix = "https://stock-content-manager.netlify.app/api/";
export const apiPrefix = "http://localhost:8888/api/";

export function axiosHeader() {
  const headers = {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("JWT"),
  };
  return headers;
}
