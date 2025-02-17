import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable, listTables } from "../utils/api";
import TableForm from "./TableForm";

function CreateTable() {
  const [error, setError] = useState(null);
  const [tables, setTables] = useState([]);
  const [table, setTable] = useState({
    table_name: "",
    capacity: "",
  });

  const handleChange = ({ target }) => {
    setTable({
      ...table,
      [target.name]: target.value,
    });
  };
  const history = useHistory();

  function handleCancel() {
    history.goBack();
  }

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables);
    return () => abortController.abort();
  }

  useEffect(loadTables, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    if (table.capacity.length) {
      const tableCapacity = Number(table.capacity);
      table.capacity = tableCapacity;
    }
    createTable(table, abortController.signal)
      .then((response) => {
        setTable({ ...table });
        return response;
      })
      .then(history.push("/dashboard"))
      .then(loadTables)
      .catch((error) => {
        console.error("Error during table creation:", error);
        setError(error);
      })
      .finally(() => abortController.abort());
  };

  return (
    <>
      <div>
        <h1>Add New Table</h1>
        <ErrorAlert error={error} />
        <TableForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleCancel={handleCancel}
          table={table}
        />
      </div>
    </>
  );
}

export default CreateTable;
