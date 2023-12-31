import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../Services/customers";
import CustomerCard from "../Components/CustomerCard";
import Pagination from "../Components/Pagination";
import { useState } from "react";
import SpinnerLarge from "../Components/Spinner";
import Search from "../Components/Search";
import { useSearchParams } from "react-router-dom";
import AddCustomer from "../Components/AddCustomer";

export default function Customers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const queryParams = searchParams.get("q");
  const {
    status,
    error,
    data: customers,
  } = useQuery({
    queryKey: ["customers", queryParams, currentPage],
    queryFn: () => getCustomers({ q: queryParams, page: currentPage }),
  });

  if (status === "pending") return <SpinnerLarge />;
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>;
  return (
    <>
      <div className="mb-3">
        <Search />
      </div>
      <AddCustomer />
      <div className="flex w-full flex-wrap">
        {customers.map((customer, customerIndex) => {
          return (
            <CustomerCard
              customer={customer}
              key={`customer${customerIndex}`}
            />
          );
        })}
      </div>
      <Pagination />
    </>
  );
}

{
  /* <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {customers.map((customer, customerIndex) => {
          return (
            <CustomerCard
              customer={customer}
              key={`customer${customerIndex}`}
            />
          );
        })}
      </div>
      <Pagination />
    </> */
}
