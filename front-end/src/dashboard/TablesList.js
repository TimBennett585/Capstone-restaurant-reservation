import React from "react";
import { finishTable } from "../utils/api";
import { useHistory } from "react-router-dom";

function TablesList({ table, loadTables }) {
  const history = useHistory();

  async function handleFinish(tableId) {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      await finishTable(tableId).then((response) => {
        console.log("response: ", response);
        loadTables();
      });
    }
  }
  return (
    <tr>
      <th scope="row">{table.table_name}</th>
      <td>{table.capacity}</td>
      <td data-table-id-status={`${table.table_id}`}>
        {table.reservation_id ? "Occupied" : "Free"}
      </td>
      {table.reservation_id ? (
        <button
          type="button"
          data-table-id-finish={table.table_id}
          onClick={() => handleFinish(table.table_id)}
        >
          Finish
        </button>
      ) : (
        <></>
      )}
    </tr>
  );
}

export default TablesList;
