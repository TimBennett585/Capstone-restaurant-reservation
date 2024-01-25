import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { listReservations, listTables } from "../utils/api";
import useQuery from "../utils/useQuery";
import {
  today,
  previous,
  next,
  formatAsDate,
  formatAsTime,
  dateFormat,
} from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "./ReservationsList";
import TablesList from "./TablesList";
import "./dashboard.css";

function Dashboard({ date }) {
  const history = useHistory();
  const query = useQuery();
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [queryDate, setQueryDate] = useState(query.get("date"));
  const [currentDate, setCurrentDate] = useState(today());

  useEffect(loadDashboard, [currentDate]);

  async function loadDashboard(date = null) {
    const abortController = new AbortController();
    setReservationsError(null);

    try {
      const [reservationsResponse, tablesResponse] = await Promise.all([
        listReservations(currentDate, abortController.signal),
        listTables(abortController.signal),
      ]);

      const formattedReservations = reservationsResponse.map((reservation) => ({
        ...reservation,
        reservation_date: formatAsDate(reservation.reservation_date),
        reservation_time: formatAsTime(reservation.reservation_time),
      }));

      setReservations(formattedReservations);
      setTables(tablesResponse);
    } catch (error) {
      setReservationsError(error);
    } finally {
      abortController.abort();
    }
  }

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
      <div>
        <h4>Reservations for date: {currentDate}</h4>
      </div>
      <div className="row">
        <div className="btn-group" role="group" aria-label="Button Group">
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
      </div>
      <ErrorAlert error={reservationsError} />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Reservation ID</th>
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
        <tbody>
          {reservations.map((reservation, index) => (
            <ReservationsList
              reservation={reservation}
              date={currentDate}
              key={index}
              loadDashboard={loadDashboard}
            />
          ))}
        </tbody>
      </table>
      <div>
        <h4>Current Table Status</h4>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Table Name</th>
            <th scope="col">Table Capacity</th>
            <th scope="col">Table Status</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table, index) => (
            <TablesList
              table={table}
              key={index}
              loadDashboard={loadDashboard}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Dashboard;
