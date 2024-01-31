import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { listReservations, listTables } from "../utils/api";
import {
  today,
  previous,
  next,
  formatAsDate,
  formatAsTime,
} from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "./ReservationsList";
import TablesList from "./TablesList";

function Dashboard({ date }) {
  const history = useHistory();
  const query = useQuery();
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [queryDate, setQueryDate] = useState(query.get("date"));

  async function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    try {
      const [reservationsResponse] = await Promise.all([
        listReservations({ date }, abortController.signal),
      ]);

      const formattedReservations = reservationsResponse.map((reservation) => ({
        ...reservation,
        reservation_date: formatAsDate(reservation.reservation_date),
        reservation_time: formatAsTime(reservation.reservation_time),
      }));

      setReservations(formattedReservations);
    } catch (error) {
      setReservationsError(error);
    } finally {
      // Ensure the abort signal is always called, even on success
      abortController.abort();
    }
  }

  useEffect(loadDashboard, [date]);

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables);
    return () => abortController.abort();
  }

  useEffect(loadTables, []);

  useEffect(() => {
    if (queryDate) {
      date = queryDate;
    }
  }, [queryDate]);

  function handleNext() {
    const nextDate = next(date);
    history.push(`/dashboard?date=${nextDate}`);
  }

  function handlePrevious() {
    const previousDate = previous(date);
    history.push(`/dashboard?date=${previousDate}`);
  }

  function handleToday() {
    const todayDay = today();
    history.push(`/dashboard?date=${todayDay}`);
  }

  return (
    <main>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom  d-md-flex">
        <div>
          <h1>Dashboard</h1>
          <h4>Reservations for date: {date}</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div
            className="btn-group me-2"
            role="group"
            aria-label="Button Group"
          >
            <button
              onClick={() => handlePrevious()}
              type="button"
              className="btn btn-outline-secondary btn m-1 mt-2 float-right"
            >
              Previous Day
            </button>
            <button
              onClick={() => handleToday()}
              type="button"
              className="btn btn-outline-secondary btn m-1 mt-2 float-right"
            >
              Today
            </button>
            <button
              onClick={() => handleNext()}
              type="button"
              className="btn btn-outline-secondary btn m-1 mt-2 float-right"
            >
              Next Day
            </button>
          </div>
        </div>
      </div>
      <ErrorAlert error={reservationsError} />

      <div className="table-responsive table-striped">
        <table className="table table-sm w-75 text-center mb-5">
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
          <tbody className="table-group-divider">
            {reservations.map((reservation, index) => (
              <ReservationsList reservation={reservation} key={index} loadDashboard={loadDashboard} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-responsive table-striped">
        <div>
          <h4>Current Table Status</h4>
        </div>
        <table className="table table-sm w-75 text-center">
          <thead>
            <tr>
              <th scope="col">Table Name</th>
              <th scope="col">Table Capacity</th>
              <th scope="col">Table Status</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {tables.map((table, index) => (
              <TablesList table={table} key={index} loadTables={loadTables} loadDashboard={loadDashboard} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Dashboard;
