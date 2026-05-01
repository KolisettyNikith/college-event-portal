import { useEffect, useState } from 'react'
import { supabase } from './supabase'

function App() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    const { data } = await supabase
      .from('events')
      .select('*')

    setEvents(data || [])
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

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit,minmax(280px,1fr))',
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
            }}
          >
            <h2>{event.event_name}</h2>

            <p>Fest: {event.fest_name}</p>

            <p>Category: {event.category}</p>

            <p>Type: {event.event_type}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
