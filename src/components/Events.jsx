import "../styles/events.css";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

export default function Events() {

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState("past");

  useEffect(() => {

    const logged =
      localStorage.getItem(
        "isLoggedIn"
      );

    if (logged === "true") {
      setLoggedIn(true);
    }

  }, []);

  function handleTab(tab) {

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

      type: "Cultural Fest",

      date: "12 Mar 2025 - 14 Mar 2025",

      venue: "Chanakya University",

      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    },

    {
      title: "Srujana 2025",

      type: "Innovation",

      date: "22 Feb 2025 - 25 Feb 2025",

      venue: "Bengaluru",

      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865",
    },

    {
      title: "Samyuti",

      type: "Technical Fest",

      date: "10 Jan 2025 - 12 Jan 2025",

      venue: "Chanakya Campus",

      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
    },
  ];

  const ongoingEvents =
    JSON.parse(
      localStorage.getItem(
        "ongoingEvents"
      )
    ) || [];

  const upcomingEvents =
    JSON.parse(
      localStorage.getItem(
        "upcomingEvents"
      )
    ) || [];

  return (
    <section
      className="events-section"
      id="events"
    >

      <h2>Explore Events</h2>

      <div className="event-buttons">

        <button
          onClick={() =>
            handleTab("past")
          }
          className={
            activeTab === "past"
              ? "active"
              : ""
          }
        >
          Past Events
        </button>

        <button
          onClick={() =>
            handleTab("ongoing")
          }
          className={
            activeTab === "ongoing"
              ? "active"
              : ""
          }
        >
          Ongoing Events
        </button>

        <button
          onClick={() =>
            handleTab("upcoming")
          }
          className={
            activeTab === "upcoming"
              ? "active"
              : ""
          }
        >
          Upcoming Events
        </button>

      </div>

      <div className="events-grid">

        {activeTab === "past" &&
          pastEvents.map(
            (event, index) => (

              <div
                className="event-card"
                key={index}
              >

                <img
                  src={event.image}
                  alt=""
                />

                <div className="event-info">

                  <span>
                    {event.type}
                  </span>

                  <h3>
                    {event.title}
                  </h3>

                  <p>
                    {event.date}
                  </p>

                  <small>
                    {event.venue}
                  </small>

                </div>

              </div>
            )
          )}

        {activeTab === "ongoing" && (

          ongoingEvents.length > 0 ? (

            ongoingEvents.map(
              (event, index) => (

                <div
                  className="event-card"
                  key={index}
                >

                  <img
                    src={event.image}
                    alt=""
                  />

                  <div className="event-info">

                    <span>
                      {event.type}
                    </span>

                    <h3>
                      {event.title}
                    </h3>

                    <p>
                      {event.date}
                    </p>

                    <small>
                      {event.venue}
                    </small>

                  </div>

                </div>
              )
            )

          ) : (

            <div className="empty-box">
              No ongoing events created.
            </div>
          )
        )}

        {activeTab === "upcoming" && (

          upcomingEvents.length > 0 ? (

            upcomingEvents.map(
              (event, index) => (

                <div
                  className="event-card"
                  key={index}
                >

                  <img
                    src={event.image}
                    alt=""
                  />

                  <div className="event-info">

                    <span>
                      {event.type}
                    </span>

                    <h3>
                      {event.title}
                    </h3>

                    <p>
                      {event.date}
                    </p>

                    <small>
                      {event.venue}
                    </small>

                  </div>

                </div>
              )
            )

          ) : (

            <div className="empty-box">
              No upcoming events created.
            </div>
          )
        )}

      </div>

    </section>
  );
}

