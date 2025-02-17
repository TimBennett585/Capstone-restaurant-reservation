import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({ handleSubmit, handleChange, reservation }) {
  const history = useHistory();

  return (
    <>
      <form onSubmit={handleSubmit} className="justify-content-center">
        <div className="form-group">
          <label htmlFor="first_name" className="form-label">
            First Name
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First Name"
              required
              onChange={handleChange}
              value={reservation.first_name}
              className="form-control"
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Last Name
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              required
              onChange={handleChange}
              value={reservation.last_name}
              className="form-control"
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="mobile_number" className="form-label">
            Mobile Number
            <input
              type="number"
              id="mobile_number"
              name="mobile_number"
              placeholder="555-555-5555"
              required
              onChange={handleChange}
              value={reservation.mobile_number}
              className="form-control"
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="reservation_date" className="form-label">
            Reservation Date
            <input
              type="date"
              id="reservation_date"
              name="reservation_date"
              required
              placeholder="YYYY-MM-DD"
              onChange={handleChange}
              value={reservation.reservation_date}
              className="form-control"
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="reservation_time" className="form-label">
            Reservation Time
            <input
              type="time"
              id="reservation_time"
              name="reservation_time"
              placeholder="HH:MM:SS"
              required
              onChange={handleChange}
              value={reservation.reservation_time}
              className="form-control"
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="people" className="form-label">
            Party Size
            <input
              type="number"
              id="people"
              name="people"
              placeholder="2"
              required
              onChange={handleChange}
              value={reservation.people}
              className="form-control"
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          onClick={() => history.push("/")}
          className="btn btn-secondary mx-1"
        >
          Cancel
        </button>
      </form>
    </>
  );
}

export default ReservationForm;
