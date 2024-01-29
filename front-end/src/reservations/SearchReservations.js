import React, { useState } from "react";
import { listReservations } from "../utils/api";
import { formatAsDate, formatAsTime } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../dashboard/ReservationsList";

function SearchReservations() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [mobile_number, setMobileNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    // Check if mobile_number is provided before making the API call
    if (mobile_number.trim() !== "") {
      listReservations({ mobile_number })
        .then((response) => {
          // Format date and time before setting reservations
          const formattedReservations = response.map((reservation) => {
            return {
              ...reservation,
              reservation_date: formatAsDate(reservation.reservation_date),
              reservation_time: formatAsTime(reservation.reservation_time),
            };
          });
          setReservations(formattedReservations);
        })
        .catch(setError);
    } else {
      // If mobile_number is empty, clear the reservations
      setReservations([]);
    }
  };

  return (
    <>
      <main>
        <form onSubmit={handleSubmit}>
          <h1>Find a reservation!</h1>
          <ErrorAlert error={error} />
          <div className="input-group mb-3 w-50">
            <input
              id="mobile_number"
              name="mobile_number"
              type="text"
              className="form-control"
              placeholder="Enter phone number"
              onChange={(event) => setMobileNumber(event.target.value)}
              value={mobile_number}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit">
                Find
              </button>
            </div>
          </div>
        </form>
        <div className="container-fluid col">
          <div className="row d-md-flex mb-3">
            <h3>Found Reservations</h3>
          </div>
          {reservations.length !== 0 ? (
            <div className="row d-md-flex mb-3">
              <div className="table-responsive">
                <table className="table table-sm w-75 text-center mb-5">
                  <thead>
                    <tr>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Mobile Number</th>
                      <th scope="col">Reservation Date</th>
                      <th scope="col">Reservation Time</th>
                      <th scope="col">Party Size</th>
                      <th scope="col">Reservation Status</th>
                      <th scope="col">Seat the Party</th>
                      <th scope="col">Edit Reservation</th>
                      <th scope="col">Cancel Reservation</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {reservations.map((reservation, index) => (
                      <ReservationsList reservation={reservation} key={index} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <p>No reservations found for that mobile number.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default SearchReservations;
