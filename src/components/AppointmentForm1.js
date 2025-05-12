import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { signInWithPopup } from "../firebase";
import { auth, provider, signOut, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

import "./AppointmentForm1.css";

function AppointmentForm1() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    appointmentDateTime: "",  // Changed to include both date and time
  });

  const [user, setUser] = useState(null);
  const amount = 500;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setFormData((prev) => ({
          ...prev,
          name: currentUser.displayName || "",
          email: currentUser.email || "",
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      provider.setCustomParameters({
        prompt: "select_account", // Force account selection
      });
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login error", err);
    }
  };

  const logout = () => {
    signOut(auth);
    setUser(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      appointmentDateTime: "",
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      key: "rzp_test_iz6F5D5MfyB6S5",
      amount: amount * 100,
      currency: "INR",
      name: "Appointment Booking",
      description: "Payment for Appointment",
      image: "https://example.com/logo.png",
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      handler: function (response) {
        console.log("Payment successful: ", response);
        sendEmail();
        saveAppointmentToFirestore();
      },
      modal: {
        ondismiss: function () {
          alert("Payment cancelled.");
        },
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const sendEmail = () => {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      appointment_date_time: formData.appointmentDateTime,
      to_name: "Your Name",
      to_email: "yourmail@gmail.com",
      message: `New Appointment Booking on ${formData.appointmentDateTime} from ${formData.name} (${formData.email}, ${formData.phone})`,
    };

    const serviceId = "service_425mw8m";
    const templateId = "template_ymxaq4j";
    const publicKey = "nkmxbleejml4kXfs9";

    emailjs.send(serviceId, templateId, templateParams, publicKey).then(
      (result) => {
        console.log("Email sent!");
        alert("Appointment booked successfully and mail sent!");
        setFormData({
          name: user.displayName || "",
          email: user.email || "",
          phone: "",
          appointmentDateTime: "",
        });
      },
      (error) => {
        console.error("Email send error:", error);
        alert("Appointment booking mail failed.");
      }
    );
  };

  const saveAppointmentToFirestore = async () => {
    try {
      await addDoc(collection(db, "appointments"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        appointmentDateTime: formData.appointmentDateTime,
        createdAt: new Date(),
      });
      console.log("Appointment saved to Firestore!");
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      alert("Failed to save appointment in database.");
    }
  };

  return (
    <div className="form-container">
      {!user ? (
        <button onClick={login} className="login-btn">
          Sign in with Google
        </button>
      ) : (
        <>
          <div className="welcome">Welcome, {user.displayName}</div>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} disabled />
            <input type="email" name="email" value={formData.email} disabled />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              pattern="^\d{10}$"
              title="Phone number must be exactly 10 digits"
              required
            />
            <input
              type="datetime-local"  // Changed to datetime-local for both date and time
              name="appointmentDateTime"
              value={formData.appointmentDateTime}
              onChange={handleInputChange}
              min={new Date().toISOString().split("T")[0] + "T00:00"}  // Current date and time as min
              required
            />
            <button type="submit">Pay ₹{amount} & Book Appointment</button>
          </form>
        </>
      )}
    </div>
  );
}

export default AppointmentForm1;
