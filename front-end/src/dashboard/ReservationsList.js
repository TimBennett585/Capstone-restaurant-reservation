import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { setReservationStatus } from "../utils/api";

function ReservationsList({ reservation, date, loadDashboard }) {
  const [error, setError] = useState(null);
  const history = useHistory();

  function handleCancel(reservationID) {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      setError(null);
      setReservationStatus(reservationID, "cancelled", abortController.signal)
        .then(() => {
          loadDashboard();
          history.push("/dashboard");
        })
        .catch(setError);
      return () => abortController.abort();
    }
  }
  //If there are reservations on the passed in date, lists those
  if (
    reservation.reservation_date === date &&
    reservation.status !== "finished" &&
    reservation.status !== "cancelled"
  ) {
    return (
      <tr>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <td data-reservation-id-status={reservation.reservation_id}>
          {reservation.status}
        </td>
        <td>
          {reservation.status === "booked" || reservation.status === null ? (
            <Link to={`/reservations/${reservation.reservation_id}/seat`}>
              <button>Seat</button>
            </Link>
          ) : (
            <></>
          )}
        </td>
        <td>
          {reservation.status === "booked" || reservation.status === null ? (
            <Link to={`/reservations/${reservation.reservation_id}/edit`}>
              <button className="btn btn-primary">Edit</button>
            </Link>
          ) : (
            <></>
          )}
        </td>
        <td data-reservation-id-cancel={reservation.reservation_id}>
          {reservation.status === "booked" || reservation.status === null ? (
            <button onClick={() => handleCancel(reservation.reservation_id)}>
              Cancel
            </button>
          ) : (
            <></>
          )}
        </td>
      </tr>
    );
  } else if (!date) {
    return (
      <tr>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <td data-reservation-id-status={reservation.reservation_id}>
          {reservation.status}
        </td>
        <td>
          {reservation.status === "booked" || reservation.status === null ? (
            <Link to={`/reservations/${reservation.reservation_id}/seat`}>
              <button>Seat</button>
            </Link>
          ) : (
            <></>
          )}
        </td>
        <td>
          {reservation.status === "booked" || reservation.status === null ? (
            <Link to={`/reservations/${reservation.reservation_id}/edit`}>
              <button className="btn btn-primary">Edit</button>
            </Link>
          ) : (
            <></>
          )}
        </td>
        <td data-reservation-id-cancel={reservation.reservation_id}>
          {reservation.status === "booked" || reservation.status === null ? (
            <button onClick={() => handleCancel(reservation.reservation_id)}>
              Cancel
            </button>
          ) : (
            <></>
          )}
        </td>
      </tr>
    );
  } else {
    return <></>;
  }
}

export default ReservationsList;
