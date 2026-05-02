
import "../styles/events.css";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import ojasImg from "../assets/ojas.JPG";
import srujanaImg from "../assets/srujana.JPG";
import samyutiImg from "../assets/samyuti.JPG";

export default function Events() {

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);

  const [activeTab, setActiveTab] = useState("past");

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setLoggedIn(true);
    }
  }, []);

  function checkLogin(tab) {

    if (!loggedIn) {

      alert("Please login first");

      navigate("/login");

      return;
    }

    setActiveTab(tab);
  }

  const pastEvents = [
    {
      title: "Ojas 2025",
      festName: "Ojas",
      category: "Cultural Fest",
      date: "12 Mar 2025 - 14 Mar 2025",
      venue: "Chanakya University",
      image: ojasImg,
    },
    {
      title: "Srujana 2025",
      festName: "Srujana",
      category: "Innovation",
      date: "22 Feb 2025 - 25 Feb 2025",
      venue: "Chanakya Campus",
      image: srujanaImg,
    },
    {
      title: "Samyuti",
      festName: "Samyuti",
      category: "Technical Fest",
      date: "10 Jan 2025 - 12 Jan 2025",
      venue: "Bengaluru",
      image: samyutiImg,
    },
  ];

  const ongoingEvents = [];
  const upcomingEvents = [];

  return (
    <section className="events-section" id="events">
      <h2>Explore Events</h2>
      <div className="event-tabs">
        <button
          className={activeTab === "past" ? "active" : ""}
          onClick={() => checkLogin("past")}
        >
          Past Events
        </button>
        <button
          className={activeTab === "ongoing" ? "active" : ""}
          onClick={() => checkLogin("ongoing")}
        >
          Ongoing Events
        </button>
        <button
          className={activeTab === "upcoming" ? "active" : ""}
          onClick={() => checkLogin("upcoming")}
        >
          Upcoming Events
        </button>
      </div>

      <div className="events-grid">
        {activeTab === "past" &&
          pastEvents.map((event, index) => (
            <div 
              className="event-card" 
              key={index}
              onClick={() => navigate("/ojas", { state: { fest: event.festName } })}
              style={{ cursor: "pointer" }}
            >
              <img src={event.image} alt="" />
              <div className="event-content">
                <span>{event.category}</span>
                <h3>{event.title}</h3>
                <p>{event.date}</p>
                <small>{event.venue}</small>
              </div>
            </div>
          ))}

        {activeTab === "ongoing" &&
          (ongoingEvents.length === 0 ? (
            <div className="empty-box">
              No ongoing events created yet.
            </div>
          ) : null)}

        {activeTab === "upcoming" &&
          (upcomingEvents.length === 0 ? (
            <div className="empty-box">
              No upcoming events created yet.
            </div>
          ) : null)}

      </div>

    </section>
  );
}

