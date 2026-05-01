import { useEffect, useState } from 'react'
import { supabase } from './supabase'

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'

import { Pie, Bar } from 'react-chartjs-2'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
)

function App() {
  const [events, setEvents] = useState([])
  const [participants, setParticipants] = useState([])
  const [teams, setTeams] = useState([])
  const [winners, setWinners] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const { data: eventsData } = await supabase
      .from('events')
      .select('*')

    const { data: participantsData } = await supabase
      .from('participants')
      .select('*')

    const { data: teamsData } = await supabase
      .from('teams')
      .select('*')

    const { data: winnersData } = await supabase
      .from('winners')
      .select('*')

    setEvents(eventsData || [])
    setParticipants(participantsData || [])
    setTeams(teamsData || [])
    setWinners(winnersData || [])
  }

  const festCounts = {}

  events.forEach((event) => {
    festCounts[event.fest_name] =
      (festCounts[event.fest_name] || 0) + 1
  })

  const pieData = {
    labels: Object.keys(festCounts),
    datasets: [
      {
        label: 'Events',
        data: Object.values(festCounts),
      },
    ],
  }

  const barData = {
    labels: ['Events', 'Participants', 'Teams', 'Winners'],
    datasets: [
      {
        label: 'Analytics',
        data: [
          events.length,
          participants.length,
          teams.length,
          winners.length,
        ],
      },
    ],
  }

  return (
    <div
      style={{
        backgroundColor: '#0f172a',
        minHeight: '100vh',
        color: 'white',
        padding: '30px',
        fontFamily: 'Arial',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          fontSize: '50px',
          marginBottom: '40px',
        }}
      >
        College Event Analytics Portal
      </h1>

      {/* DASHBOARD CARDS */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
          gap: '20px',
          marginBottom: '40px',
        }}
      >
        <div style={cardStyle}>
          <h2>Total Events</h2>
          <h1>{events.length}</h1>
        </div>

        <div style={cardStyle}>
          <h2>Total Participants</h2>
          <h1>{participants.length}</h1>
        </div>

        <div style={cardStyle}>
          <h2>Total Teams</h2>
          <h1>{teams.length}</h1>
        </div>

        <div style={cardStyle}>
          <h2>Total Winners</h2>
          <h1>{winners.length}</h1>
        </div>
      </div>

      {/* ANALYTICS */}

      <h2
        style={{
          marginBottom: '20px',
          fontSize: '35px',
        }}
      >
        Analytics
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(350px,1fr))',
          gap: '20px',
          marginBottom: '50px',
        }}
      >
        <div
          style={{
            backgroundColor: '#1e293b',
            padding: '20px',
            borderRadius: '20px',
          }}
        >
          <h2>Fest-wise Events</h2>
          <Pie data={pieData} />
        </div>

        <div
          style={{
            backgroundColor: '#1e293b',
            padding: '20px',
            borderRadius: '20px',
          }}
        >
          <h2>Portal Analytics</h2>
          <Bar data={barData} />
        </div>
      </div>

      {/* EVENTS SECTION */}

      <h2 style={{ marginBottom: '20px', fontSize: '35px' }}>
        Events
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
          gap: '20px',
        }}
      >
        {events.map((event) => (
          <div
            key={event.event_id}
            style={{
              backgroundColor: '#1e293b',
              padding: '20px',
              borderRadius: '15px',
              boxShadow: '0px 0px 10px rgba(0,0,0,0.4)',
            }}
          >
            <h2 style={{ marginBottom: '10px' }}>
              {event.event_name}
            </h2>

            <p>
              <strong>Fest:</strong> {event.fest_name}
            </p>

            <p>
              <strong>Category:</strong> {event.category}
            </p>

            <p>
              <strong>Type:</strong> {event.event_type}
            </p>

            <p>
              <strong>Team Size:</strong> {event.team_size}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const cardStyle = {
  backgroundColor: '#1e293b',
  padding: '25px',
  borderRadius: '20px',
  textAlign: 'center',
  boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
}

export default App

