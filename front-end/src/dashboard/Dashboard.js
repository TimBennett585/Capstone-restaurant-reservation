import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { listReservations } from "../utils/api";
import { today, previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "./ReservationsList";
import useQuery from "../utils/useQuery";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  let history = useHistory();
  const query = useQuery();

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [queryDate, setQueryDate] = useState(query.get("date"));
  let [currentDate, setCurrentDate] = useState(today());

  useEffect(loadDashboard, [currentDate]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations(currentDate, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  //Grabs current date from parameter, then allows us to change date from on-screen form
  useEffect(() => {
    if (queryDate) {
      setCurrentDate(queryDate);
    }
  }, [queryDate]);

  function handleNext() {
    setCurrentDate(next(currentDate));
  }

  function handlePrevious() {
    setCurrentDate(previous(currentDate));
  }

  function handleToday() {
    setCurrentDate(today());
    history.push("/dashboard");
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {currentDate}</h4>
      </div>
      <div>
        <button
          onClick={() => handlePrevious()}
          type="button"
          className="btn btn-secondary btn-sm"
        >
          Previous Day
        </button>
        <button
          onClick={() => handleToday()}
          type="button"
          className="btn btn-primary btn-sm"
        >
          Today
        </button>
        <button
          onClick={() => handleNext()}
          type="button"
          className="btn btn-secondary btn-sm"
        >
          Next Day
        </button>
      </div>
      <ErrorAlert error={reservationsError} />

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile Number</th>
            <th>Reservation Date</th>
            <th>Reservation Time</th>
            <th>Party Size</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <ReservationsList
              reservation={reservation}
              currentDate={currentDate}
              key={index}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Dashboard;
