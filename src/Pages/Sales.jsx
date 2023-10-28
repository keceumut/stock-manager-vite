import { useQuery } from "@tanstack/react-query";
import { getLatestSales, getSales } from "../Services/sales";
import SpinnerLarge from "../Components/Spinner";
import AddSale from "../Components/AddSale";

export default function Sales() {
  const {
    status,
    error,
    data: salesList,
  } = useQuery({
    queryKey: ["salesList"],
    queryFn: () => getSales({}),
  });

  if (status === "pending") return <SpinnerLarge />;
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>;
  return (
    <>
      <AddSale />
      <div>Sales</div>
    </>
  );
}
