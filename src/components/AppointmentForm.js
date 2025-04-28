// src/components/AppointmentForm.js
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import "./AppointmentForm.css";

function AppointmentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "appointments"), {
        name,
        email,
        date,
        time,
      });

      const templateParams = {
        from_name: name,
        from_email: email,
        appointment_date: date,
        appointment_time: time,
      };

      await emailjs.send(
        "service_e295vpc",
        "template_bn2fzq9",
        templateParams,
        "nkmxbleejml4kXfs9"
      );

      alert("Appointment booked and email sent!");
      setName("");
      setEmail("");
      setDate("");
      setTime("");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="form-container">
      <h2>Book an Appointment</h2>
      <form   onSubmit={handleSubmit}>
        <input type="text" name="user_name" placeholder="Name" value={name} required onChange={(e) => setName(e.target.value)} />
        <input type="email" name="user_email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
        <input type="date" name="appointment_date" value={date} required onChange={(e) => setDate(e.target.value)} />
        <input type="time" name="appointment_time" value={time} required onChange={(e) => setTime(e.target.value)} />
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default AppointmentForm;
