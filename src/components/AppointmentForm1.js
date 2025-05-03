// import React, { useState } from "react";
// import emailjs from "@emailjs/browser"; 

// function AppointmentForm1() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "", 
//     appointmentDate: "",
//   });

//   const amount = 500; // ₹500 in INR

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const options = {
//       key: "rzp_test_iz6F5D5MfyB6S5", 
//       amount: amount * 100,
//       currency: "INR",
//       name: "Appointment Booking",
//       description: "Payment for Appointment",
//       image: "https://example.com/logo.png",
//       prefill: {
//         name: formData.name,
//         email: formData.email,
//         contact: formData.phone, 
//       },
//       handler: function (response) {
//         console.log("Payment successful: ", response);
//         sendEmail();
//       },
//       modal: {
//         ondismiss: function () {
//           alert("Payment cancelled.");
//         },
//       },
//       theme: {
//         color: "#F37254",
//       },
//     };

//     const razorpay = new window.Razorpay(options);
//     razorpay.open();
//   };

//   const sendEmail = () => {
//     const templateParams = {
//       from_name: formData.name,
//       from_email: formData.email,
//       phone: formData.phone, 
//       appointment_date: formData.appointmentDate,
//       to_name: "Your Name", 
//       to_email: "yourmail@gmail.com",
//       message: `New Appointment Booking on ${formData.appointmentDate} from ${formData.name} (${formData.email}, ${formData.phone})`,
//     };

//     const serviceId = "service_bnt1y18"; 
//     const templateId = "template_hadbcwz"; 
//     const publicKey = "KHi-x6MTin_CZnIDK"; 

//     emailjs
//       .send(serviceId, templateId, templateParams, publicKey)
//       .then(
//         (result) => {
//           console.log("Email successfully sent!");
//           alert("Appointment booked successfully and mail sent!");
//           setFormData({ name: "", email: "", phone: "", appointmentDate: "" });
//         },
//         (error) => {
//           console.log("Email sending failed", error.text);
//           alert("Appointment booking mail failed.");
//         }
//       );
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="name"
//         placeholder="Name"
//         value={formData.name}
//         onChange={handleInputChange}
//         required
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleInputChange}
//         required
//       />
//       <input
//         type="text"
//         name="phone"
//         placeholder="Phone Number"
//         value={formData.phone}
//         onChange={handleInputChange}
//         required
//       />
//       <input
//         type="date"
//         name="appointmentDate"
//         value={formData.appointmentDate}
//         onChange={handleInputChange}
//         required
//       />
//       <button type="submit">Pay & Book Appointment</button>
//     </form>
//   );
// }

// export default AppointmentForm1;

// import React, { useState, useEffect } from "react";
// import emailjs from "@emailjs/browser";
// import { auth, provider, signInWithPopup, signOut } from "../firebase";


// import "./AppointmentForm1.css";

// function AppointmentForm1() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     appointmentDate: "",
//   });

//   const [user, setUser] = useState(null);
//   const amount = 500;

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         setFormData((prev) => ({
//           ...prev,
//           name: currentUser.displayName || "",
//           email: currentUser.email || "",
//         }));
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const login = async () => {
//     try {
//       await signInWithPopup(auth, provider);
//     } catch (err) {
//       console.error("Login error", err);
//     }
//   };

//   const logout = () => {
//     signOut(auth);
//     setUser(null);
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       appointmentDate: "",
//     });
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const options = {
//       key: "rzp_test_iz6F5D5MfyB6S5",
//       amount: amount * 100,
//       currency: "INR",
//       name: "Appointment Booking",
//       description: "Payment for Appointment",
//       image: "https://example.com/logo.png",
//       prefill: {
//         name: formData.name,
//         email: formData.email,
//         contact: formData.phone,
//       },
//       handler: function (response) {
//         console.log("Payment successful: ", response);
//         sendEmail();
//       },
//       modal: {
//         ondismiss: function () {
//           alert("Payment cancelled.");
//         },
//       },
//       theme: {
//         color: "#F37254",
//       },
//     };

//     const razorpay = new window.Razorpay(options);
//     razorpay.open();
//   };

//   const sendEmail = () => {
//     const templateParams = {
//       from_name: formData.name,
//       from_email: formData.email,
//       phone: formData.phone,
//       appointment_date: formData.appointmentDate,
//       to_name: "Your Name",
//       to_email: "yourmail@gmail.com",
//       message: `New Appointment Booking on ${formData.appointmentDate} from ${formData.name} (${formData.email}, ${formData.phone})`,
//     };

//     const serviceId = "service_425mw8m";
//     const templateId = "template_ymxaq4j";
//     const publicKey = "nkmxbleejml4kXfs9";

//     emailjs.send(serviceId, templateId, templateParams, publicKey).then(
//       (result) => {
//         console.log("Email sent!");
//         alert("Appointment booked successfully and mail sent!");
//         setFormData({
//           name: user.displayName || "",
//           email: user.email || "",
//           phone: "",
//           appointmentDate: "",
//         });
//       },
//       (error) => {
//         console.error("Email send error:", error);
//         alert("Appointment booking mail failed.");
//       }
//     );
//   };
  

//   return (
//     <div className="form-container">
//       {!user ? (
//         <button onClick={login} className="login-btn">
//           Sign in with Google
//         </button>
//       ) : (
//         <>
//           <div className="welcome">Welcome, {user.displayName}</div>
//           <button onClick={logout} className="logout-btn">
//             Logout
//           </button>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               disabled
//             />
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               disabled
//             />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               type="date"
//               name="appointmentDate"
//               value={formData.appointmentDate}
//               onChange={handleInputChange}
//               required
//             />
//             <button type="submit">Pay ₹{amount} & Book Appointment</button>
//           </form>
//         </>
//       )}
//     </div>
//   );
// }

// export default AppointmentForm1;


import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { signInWithPopup } from '../firebase';  // Correct path to your firebase.js
import { auth, provider, signOut, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

import "./AppointmentForm1.css";

function AppointmentForm1() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    appointmentDate: "",
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
      appointmentDate: "",
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
        saveAppointmentToFirestore(); // Save data to Firestore
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
      appointment_date: formData.appointmentDate,
      to_name: "Your Name",
      to_email: "yourmail@gmail.com",
      message: `New Appointment Booking on ${formData.appointmentDate} from ${formData.name} (${formData.email}, ${formData.phone})`,
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
          appointmentDate: "",
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
        appointmentDate: formData.appointmentDate,
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
              required
            />
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleInputChange}
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
