import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { findReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import formatReservationDate from "../utils/format-reservation-date";
import formatReservationTime from "../utils/format-reservation-time";

function EditReservation() {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    findReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setError);
    return () => abortController.abort();
  }, [reservation_id]);

  const handleChange = ({ target }) => {
    setReservation({
      ...reservation,
      [target.name]: target.value,
      reservation_id: reservation_id,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    formatReservationDate(reservation);
    formatReservationTime(reservation);
    const abortController = new AbortController();
    setError(null);
    reservation.people = Number(reservation.people);
    updateReservation(reservation, abortController.signal)
      .then(() =>
        history.push(`/dashboard?date=${reservation.reservation_date}`)
      )
      .catch(setError);
    return () => abortController.abort();
  };

  return (
    <>
      <div>
        <ErrorAlert error={error} />
        <ReservationForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          reservation={reservation}
        />
      </div>
    </>
  );
}

export default EditReservation;
