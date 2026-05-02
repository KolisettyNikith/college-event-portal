import { useEffect, useState } from "react";

import { supabase } from "../supabase";

import "../styles/ojasdetails.css";

export default function OjasDetails() {

  const [stats, setStats] = useState({
    participants: 0,
    events: 0,
    prizes: 0,
    prizeWorth: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {

    const { data, error } = await supabase
      .from("ojas_stats")
      .select("*")
      .single();

    if (!error && data) {
      setStats(data);
    }
  }

  return (
    <div className="ojas-page">

      <h1>Ojas 2025 Analytics</h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>{stats.participants}</h2>
          <p>Total Participants</p>
        </div>

        <div className="stat-card">
          <h2>{stats.events}</h2>
          <p>Total Events</p>
        </div>

        <div className="stat-card">
          <h2>{stats.prizes}</h2>
          <p>Winning Prizes</p>
        </div>

        <div className="stat-card">
          <h2>₹ {stats.prizeWorth}</h2>
          <p>Prize Pool Worth</p>
        </div>

      </div>

    </div>
  );
}