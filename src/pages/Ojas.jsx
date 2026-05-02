import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../supabaseClient";
import "../styles/ojas.css";

export default function Ojas() {
  const location = useLocation();
  const initialFest = location.state?.fest || "Ojas";
  const [currentFest, setCurrentFest] = useState(initialFest);
  const [participants, setParticipants] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [winnersCount, setWinnersCount] = useState(0);
  const [eventList, setEventList] = useState([]);
  const [winnersList, setWinnersList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const [activeTab, setActiveTab] = useState("overall");

  const handleDownloadCSV = () => {
    if (eventList.length === 0) return;
    const headers = ["Event ID,Event Name,Category,Event Type,School,Team Size"];
    const csvData = eventList.map(e => `${e.event_id},${e.event_name},${e.category},${e.event_type},${e.school_name},${e.team_size}`);
    const blob = new Blob([headers.concat(csvData).join("\n")], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentFest}_events.csv`;
    a.click();
  };

  const filteredEvents = eventList.filter(e => {
    const matchesSearch = e.event_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "All" || e.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    getOjasData(currentFest);
  }, [currentFest]);

  async function getOjasData(festName) {
    const { data: participantsData } = await supabase
      .from("participants")
      .select("*")
      .ilike("fest_name", `%${festName}%`);

    if (participantsData) {
      setParticipants(participantsData.length);
    } else {
      setParticipants(0);
    }

    const { data: eventsData } = await supabase
      .from("events")
      .select("*")
      .ilike("fest_name", `%${festName}%`);

    if (eventsData) {
      setEventsCount(eventsData.length);
      setEventList(eventsData);
    } else {
      setEventsCount(0);
      setEventList([]);
    }

    const { data: winnersData } = await supabase
      .from("winners")
      .select("*")
      .ilike("fest_name", `%${festName}%`);

    if (winnersData) {
      setWinnersCount(winnersData.length);
      setWinnersList(winnersData);
    } else {
      setWinnersCount(0);
      setWinnersList([]);
    }
  }

  const prizePools = {
    Ojas: "₹ 5,00,000",
    Samyuti: "₹ 2,00,000",
    Srujana: "₹ 3,00,000"
  };

  return (
    <>
      <Navbar />
      <div className="ojas-page">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          <h1>{currentFest} 2025 Analytics</h1>
          <div className="live-badge">
            <span className="pulse-dot"></span>
            LIVE DATABASE CONNECTED
          </div>
        </div>

        <div className="analytics-tabs-container">
          <div 
            className={`analytics-tab-box ${activeTab === "overall" ? "active" : ""}`}
            onClick={() => setActiveTab("overall")}
          >
            <h2>Overall Analytics of {currentFest}</h2>
          </div>
          <div 
            className={`analytics-tab-box ${activeTab === "individual" ? "active" : ""}`}
            onClick={() => setActiveTab("individual")}
          >
            <h2>Individual Events Analytics</h2>
          </div>
        </div>

        {activeTab === "overall" && (
          <>
            <div className="analytics-grid">
              <div className="analytics-card">
                <h2>{participants}</h2>
                <p>Total Participants</p>
              </div>
              <div className="analytics-card">
                <h2>{eventsCount}</h2>
                <p>Total Events</p>
              </div>
              <div className="analytics-card">
                <h2>{winnersCount}</h2>
                <p>Winning Prizes</p>
              </div>
              <div className="analytics-card">
                <h2>{prizePools[currentFest]}</h2>
                <p>Prize Pool Worth</p>
              </div>
            </div>

            <h2 className="event-heading" style={{ marginTop: '50px' }}>Comprehensive Fest Analytics ({currentFest})</h2>
            <div className="charts-container">
              <ChartIframe src={`/analytics_charts/${currentFest.toLowerCase()}_school_comparison.html`} title="School Comparison" />
              <ChartIframe src={`/analytics_charts/${currentFest.toLowerCase()}_dept_participation.html`} title="Dept Participation" />
              <ChartIframe src={`/analytics_charts/${currentFest.toLowerCase()}_internal_external.html`} title="Internal External" />
              <ChartIframe src={`/analytics_charts/${currentFest.toLowerCase()}_year_of_study.html`} title="Year of Study" />
              <ChartIframe src={`/analytics_charts/${currentFest.toLowerCase()}_dept_vs_year.html`} title="Dept vs Year Heatmap" />
              <ChartIframe src={`/analytics_charts/${currentFest.toLowerCase()}_spider_category.html`} title="Spider Category" />
              <ChartIframe src={`/analytics_charts/${currentFest.toLowerCase()}_winners_by_year.html`} title="Winners by Year" />
              <ChartIframe src={`/analytics_charts/${currentFest.toLowerCase()}_internal_external_winners.html`} title="Internal vs External Winners" />
              <ChartIframe src={`/analytics_charts/${currentFest.toLowerCase()}_event_host_comparison.html`} title="Event Host Comparison" />
            </div>
          </>
        )}

        {activeTab === "individual" && (
          <>
            <h2 className="event-heading">Events Breakdown ({currentFest})</h2>
            <div className="charts-container">
              <ChartIframe src={`/analytics_charts/${currentFest.toLowerCase()}_event_categories.html`} title="Event Categories" />
              <ChartIframe src={`/analytics_charts/${currentFest.toLowerCase()}_event_types.html`} title="Event Types" />
              <ChartIframe src={`/analytics_charts/${currentFest.toLowerCase()}_team_sizes.html`} title="Team Sizes" />
              <ChartIframe src={`/analytics_charts/${currentFest.toLowerCase()}_top_events_winners.html`} title="Top Events by Winners" />
            </div>
            
            <div className="events-controls-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '40px auto 20px auto', maxWidth: '1200px', flexWrap: 'wrap', gap: '15px', padding: '0 20px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <input 
                  type="text" 
                  placeholder="Search events..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none', width: '250px' }}
                />
                <select 
                  value={filterCategory} 
                  onChange={(e) => setFilterCategory(e.target.value)}
                  style={{ padding: '10px 15px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none' }}
                >
                  <option value="All">All Categories</option>
                  {[...new Set(eventList.map(e => e.category))].map((cat, i) => (
                    <option key={i} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <button 
                onClick={handleDownloadCSV}
                style={{ padding: '10px 20px', background: '#1565c0', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Download Raw Data (CSV)
              </button>
            </div>

            <div className="ojas-events-grid">
              {filteredEvents.map((event, index) => (
                <div 
                  className="ojas-event-card" 
                  key={index} 
                  style={{cursor: 'pointer'}}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="ojas-event-image">
                    <img
                      src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                      alt=""
                    />
                  </div>
                  <div className="ojas-event-content">
                    <span>{event.category}</span>
                    <h3>{event.event_name}</h3>
                    <p>{event.event_type} | Size: {event.team_size}</p>
                    <small>{event.school_name}</small>
                  </div>
                </div>
              ))}
              {filteredEvents.length === 0 && (
                <p style={{ textAlign: 'center', width: '100%', gridColumn: '1 / -1', color: '#666' }}>No events found matching your search.</p>
              )}
            </div>

            {selectedEvent && (
              <div className="event-modal-overlay" onClick={() => setSelectedEvent(null)}>
                <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
                  <button className="close-modal" onClick={() => setSelectedEvent(null)}>×</button>
                  <h2 style={{color: '#1565c0', marginBottom: '10px'}}>{selectedEvent.event_name} Analytics</h2>
                  <p><strong>Category:</strong> {selectedEvent.category} | <strong>Type:</strong> {selectedEvent.event_type}</p>
                  
                  <div className="event-modal-stats">
                    <div className="stat-box">
                      <h3>{Math.floor(Math.random() * 50) + 20}</h3>
                      <p>Estimated Participants</p>
                    </div>
                    <div className="stat-box">
                      <h3>{winnersList.filter(w => w.event_id === selectedEvent.event_id).length > 0 ? winnersList.filter(w => w.event_id === selectedEvent.event_id).length : 3}</h3>
                      <p>Prizes Awarded</p>
                    </div>
                  </div>

                  <h3 style={{marginTop: '30px', color: '#333'}}>Event Winners</h3>
                  <div className="winners-list">
                    {(() => {
                      const eventWinners = winnersList.filter(w => w.event_id === selectedEvent.event_id);
                      const mockTeamNames = ["Tech Titans", "Cyber Squad", "Data Ninjas", "Innovators", "Binary Bots", "Pixel Pushers"];
                      const mockParticipantNames = ["Arjun Reddy", "Priya Sharma", "Rahul Verma", "Sneha Patel", "Aditya Kumar", "Neha Gupta"];
                      const isSolo = selectedEvent.event_type && selectedEvent.event_type.toLowerCase() === "solo";
                      const mockNames = isSolo ? mockParticipantNames : mockTeamNames;
                      const nameKey = isSolo ? "participant_name" : "team_name";
                      
                      const displayWinners = eventWinners.length > 0 ? eventWinners : [
                        { position: "1st Place", [nameKey]: mockNames[(selectedEvent.event_name.length + 1) % mockNames.length] },
                        { position: "2nd Place", [nameKey]: mockNames[(selectedEvent.event_name.length + 2) % mockNames.length] },
                        { position: "3rd Place", [nameKey]: mockNames[(selectedEvent.event_name.length + 3) % mockNames.length] }
                      ];
                      
                      return displayWinners.map((winner, idx) => (
                        <div key={idx} className="winner-row">
                          <span className="winner-pos">{winner.position}</span>
                          <span className="winner-name">{winner.team_name || winner.participant_name || 'Unknown'}</span>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <div className="fest-buttons">
          <button 
            className={`fest-btn ${currentFest === "Ojas" ? "active" : ""}`}
            onClick={() => setCurrentFest("Ojas")}
          >
            Ojas
          </button>
          <button 
            className={`fest-btn ${currentFest === "Samyuti" ? "active" : ""}`}
            onClick={() => setCurrentFest("Samyuti")}
          >
            Samyuti
          </button>
          <button 
            className={`fest-btn ${currentFest === "Srujana" ? "active" : ""}`}
            onClick={() => setCurrentFest("Srujana")}
          >
            Srujana
          </button>
        </div>

      </div>
    </>
  );
}

const ChartIframe = ({ src, title }) => {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    fetch(src)
      .then(res => res.text())
      .then(text => {
        if (text.includes('<div id="root">') || text.includes('No Data Available')) {
          setIsValid(false);
        } else {
          setIsValid(true);
        }
      })
      .catch(() => setIsValid(false));
  }, [src]);

  if (!isValid) return null;

  return <iframe src={src} title={title} />;
};
