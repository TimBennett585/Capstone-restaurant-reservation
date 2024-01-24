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

function Dashboard() {
  const history = useHistory();
  const query = useQuery();
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [queryDate, setQueryDate] = useState(query.get("date"));
  const [currentDate, setCurrentDate] = useState(today());

  useEffect(loadDashboard, [currentDate]);

  async function loadDashboard() {
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

  /* if (!currentDate || !dateFormat.test(currentDate)) {
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
        <ErrorAlert error="Invalid date format" />
      </main>
    );
  } */

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
            <th>Reservation Status</th>
            <th>Seat the Party</th>
            <th>Edit Reservation</th>
            <th>Cancel Reservation</th>
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
      <table>
        <thead>
          <tr>
            <th>Table Name</th>
            <th>Table Capacity</th>
            <th>Table Status</th>
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
