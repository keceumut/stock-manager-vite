import { useState } from "react";
import Modal from "./Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import NewCustomerForm from "../assets/forms/NewCustomerForm";
import { newCustomer } from "../Services/customers";

export default function AddCustomer() {
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
    mutate(e);
  }

  return (
    <>
      <button
        className="button-secondary mb-4 ml-3"
        onClick={() => setOpen(true)}
      >
        + New
      </button>
      <Modal open={open} setOpen={setOpen}>
        <NewCustomerForm onSubmit={onSubmit} />
      </Modal>
    </>
  );
}
