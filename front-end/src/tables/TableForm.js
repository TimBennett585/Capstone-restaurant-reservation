import React from "react";
import { useHistory } from "react-router-dom";
import "./tableForm.css";

function TableForm({ handleSubmit, handleChange, handleCancel, table }) {
  const history = useHistory();

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-2">
            <form onSubmit={handleSubmit} className="justify-content-center">
              <div className="mb-3">
                <label htmlFor="table_name" className="form-label">
                  Table Name
                  <input
                    type="text"
                    id="table_name"
                    name="table_name"
                    placeholder="#1"
                    required
                    minLength="2"
                    onChange={handleChange}
                    value={table.table_name}
                    className="form-control"
                  />
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="capacity" className="form-label">
                  Table Capacity
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    placeholder="2"
                    required
                    onChange={handleChange}
                    value={table.capacity}
                    className="form-control"
                  />
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-secondary mx-1"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableForm;
