import "../styles/admin.css";

import { useState } from "react";

export default function AdminPanel() {

  const [title, setTitle] = useState("");

  const [type, setType] = useState("");

  const [date, setDate] = useState("");

  const [venue, setVenue] = useState("");

  const [image, setImage] = useState("");

  const [category, setCategory] =
    useState("ongoing");

  function createEvent(e) {

    e.preventDefault();

    const newEvent = {
      title,
      type,
      date,
      venue,
      image,
    };

    const existing =
      JSON.parse(
        localStorage.getItem(
          category === "ongoing"
            ? "ongoingEvents"
            : "upcomingEvents"
        )
      ) || [];

    existing.push(newEvent);

    localStorage.setItem(
      category === "ongoing"
        ? "ongoingEvents"
        : "upcomingEvents",

      JSON.stringify(existing)
    );

    alert("Event Created Successfully");

    setTitle("");

    setType("");

    setDate("");

    setVenue("");

    setImage("");
  }

  return (
    <div className="admin-panel">

      <h2>Create Event</h2>

      <form onSubmit={createEvent}>

        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Event Type"
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e) =>
            setVenue(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
          required
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >

          <option value="ongoing">
            Ongoing Event
          </option>

          <option value="upcoming">
            Upcoming Event
          </option>

        </select>

        <button type="submit">
          Create Event
        </button>

      </form>

    </div>
  );
}
