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
import "./dashboard.css";

function Dashboard({ date }) {
  const history = useHistory();
  const query = useQuery();
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [queryDate, setQueryDate] = useState(query.get("date"));

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        const [reservationsResponse] = await Promise.all([
          listReservations({ date: queryDate }, abortController.signal),
        ]);

        const formattedReservations = reservationsResponse.map(
          (reservation) => ({
            ...reservation,
            reservation_date: formatAsDate(reservation.reservation_date),
            reservation_time: formatAsTime(reservation.reservation_time),
          })
        );

        setReservations(formattedReservations);
      } catch (error) {
        setReservationsError(error);
      } finally {
        // Ensure the abort signal is always called, even on success
        abortController.abort();
      }
    }

    fetchData();

    // Cleanup function to abort ongoing fetch when the component unmounts
    return () => abortController.abort();
  }, [queryDate]);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchTables() {
      try {
        const tablesResponse = await listTables(abortController.signal);
        setTables(tablesResponse);
      } catch (error) {
        // Handle error, e.g., set an error state
      } finally {
        abortController.abort();
      }
    }

    fetchTables();

    return () => abortController.abort();
  }, []); // Empty dependency array to run once on mount

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
      <h1>Dashboard</h1>
      <div>
        <h4>Reservations for date: {date}</h4>
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
              key={index}
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
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Dashboard;
