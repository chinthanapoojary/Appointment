import React, { useState } from "react";
import emailjs from "@emailjs/browser"; // Make sure EmailJS is installed

function AppointmentForm1() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // New phone field
    appointmentDate: "",
  });

  const amount = 500; // ₹500 in INR

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      key: "rzp_test_iz6F5D5MfyB6S5", // Replace with your Razorpay Key ID
      amount: amount * 100,
      currency: "INR",
      name: "Appointment Booking",
      description: "Payment for Appointment",
      image: "https://example.com/logo.png",
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone, // Prefill phone number
      },
      handler: function (response) {
        // Only when payment is successful
        console.log("Payment successful: ", response);
        sendEmail();
      },
      modal: {
        ondismiss: function () {
          // Payment modal dismissed by user
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
      phone: formData.phone, // Add phone to the template parameters
      appointment_date: formData.appointmentDate,
      to_name: "Your Name", // your name
      to_email: "yourmail@gmail.com", // your email
      message: `New Appointment Booking on ${formData.appointmentDate} from ${formData.name} (${formData.email}, ${formData.phone})`,
    };

    // Replace these values with your actual EmailJS credentials
    const serviceId = "service_bnt1y18"; // Your EmailJS Service ID
    const templateId = "template_hadbcwz"; // Your EmailJS Template ID
    const publicKey = "KHi-x6MTin_CZnIDK"; // Your EmailJS Public Key

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(
        (result) => {
          console.log("Email successfully sent!");
          alert("Appointment booked successfully and mail sent!");
          setFormData({ name: "", email: "", phone: "", appointmentDate: "" });
        },
        (error) => {
          console.log("Email sending failed", error.text);
          alert("Appointment booking mail failed.");
        }
      );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleInputChange}
        required
      />
      <input
        type="date"
        name="appointmentDate"
        value={formData.appointmentDate}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Pay & Book Appointment</button>
    </form>
  );
}

export default AppointmentForm1;
