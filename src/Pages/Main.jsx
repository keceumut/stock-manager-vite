import { useQuery } from "@tanstack/react-query";
import { Outlet, useSearchParams } from "react-router-dom";
import { getAnimeElements } from "../Services/pageScraper";

export default function Main() {
  const [searchParams] = useSearchParams();
  const animeURL = searchParams.get("qUrl");

  const {
    status,
    error,
    data: animeData,
  } = useQuery({
    queryKey: ["animePage", animeURL],
    queryFn: () => getAnimeElements(animeURL),
  });
  return (
    <>
      <div>Main</div>
    </>
  );
}
