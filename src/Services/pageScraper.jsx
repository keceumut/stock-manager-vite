import axios from "axios";

export async function getAnimeElements(animeURL) {
  const data = axios.get(animeURL).then((response) => response.data);
  console.log(data, "test");
}
