import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { setReservationStatus } from "../utils/api";

function ReservationsList({ reservation, date, loadDashboard }) {
  const [error, setError] = useState(null);
  const history = useHistory();

  //Window confirm and change reservation status upon hitting Cancel
  async function handleCancel(reservationID) {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      console.log(
        "Reservation Date before cancellation:",
        reservation.reservation_date
      );
      try {
        await cancelReservation(reservationID);
        //afterCancellation();
        loadDashboard(reservation.reservation_date);
      } catch (error) {
        setError(error);
      }
    }
  }

  async function cancelReservation(reservationID) {
    const abortController = new AbortController();
    setError(null);

    try {
      await setReservationStatus(
        reservationID,
        "cancelled",
        abortController.signal
      );
    } finally {
      abortController.abort();
    }
  }

  function afterCancellation() {
    // Additional actions after successful cancellation
    // For example, updating the UI or triggering a reload
    history.push("/dashboard");
  }

  //Lists reservations based on date and/or "status"
  if (
    reservation.reservation_date === date &&
    reservation.status !== "finished"
  ) {
    return (
      <tr>
        <th scope="row">{reservation.reservation_id}</th>
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
              <button>Edit</button>
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
        <th scope="row">{reservation.reservation_id}</th>
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
              <button>Edit</button>
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
