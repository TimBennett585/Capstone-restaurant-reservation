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
      <div>
        <div>
          <ErrorAlert error={error} />
        </div>
        <div>
          <h2>Find a reservation!</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              id="mobile_number"
              name="mobile_number"
              type="text"
              placeholder="Enter customer phone number from reservation"
              onChange={(event) => setMobileNumber(event.target.value)}
              value={mobile_number}
            />
          </div>
          <div>
            <button className="btn btn-primary" type="submit">
              Find
            </button>
          </div>
        </form>
      </div>
      {reservations.length !== 0 ? (
        <div>
          <div>
            <h3>Found Reservations</h3>
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Mobile Number</th>
                  <th>Reservation Date</th>
                  <th>Reservation Time</th>
                  <th>Party Size</th>
                  <th>Reservation Status</th>
                  <th>Seat the Party</th>
                </tr>
              </thead>
              <tbody>
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
    </>
  );
}

export default SearchReservations;
