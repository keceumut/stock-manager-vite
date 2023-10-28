import { useState } from "react";
import Modal from "./Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { newCustomer } from "../Services/customers";
import PaymentForm from "../assets/forms/PaymentForm";

export default function AddPayment({ customer }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { status, error, mutate } = useMutation({
    mutationFn: newCustomer,
    onSuccess: (newCustomer) => {
      queryClient.invalidateQueries(["customers"]);
      setOpen(false);
    },
  });

  function onSubmit(e) {
    console.log(e);
  }

  return (
    <>
      <button className="button p-1 mt-2" onClick={() => setOpen(true)}>
        Add Payment
      </button>
      <Modal open={open} setOpen={setOpen}>
        <PaymentForm onSubmit={onSubmit} customer={customer} />
      </Modal>
    </>
  );
}
