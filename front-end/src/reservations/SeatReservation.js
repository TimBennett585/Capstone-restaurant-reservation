import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, sitReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatReservation() {
  const [error, setError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tableInfo, setTableInfo] = useState({
    table_id: "",
    reservation_id: "",
  });
  const history = useHistory();
  const { reservation_id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setError);
    return () => abortController.abort();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    sitReservation(tableInfo.table_id, reservation_id)
      .then(() => history.push("/"))
      .catch(setError);
    return () => abortController.abort();
  };

  const handleChange = ({ target }) => {
    setTableInfo({
      ...tableInfo,
      [target.name]: target.value,
    });
  };

  function handleCancel() {
    history.goBack();
  }

  const tablesMap = tables.map((table) => (
    <option value={table.table_id} key={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ));

  return (
    <>
      <div>
        <h1>Seating Options for Reservation {reservation_id}</h1>
        <ErrorAlert error={error} />
        <select
          className="custom-select w-25 mb-2"
          id="table_form"
          name="table_id"
          value={tablesMap.table_id}
          aria-label="Default select example"
          onChange={handleChange}
          required
        >
          <option defaultValue={0}>Select a table:</option>
          {tablesMap}
        </select>
        <div>
          <button
            className="btn btn-outline-primary btn-sm"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="btn btn-outline-secondary btn-sm mr-2"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default SeatReservation;
