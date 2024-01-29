import React from "react";
import { finishTable } from "../utils/api";

function TablesList({ table }) {
  async function handleFinish(tableId) {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      await finishTable(tableId);
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
