# College Event Intelligence Portal - Final Report

## Architecture
The system follows a modern decoupled architecture:
1. **Frontend**: React-based single-page application (SPA) built with Vite. It serves as the primary portal for displaying analytics and event details.
2. **Database**: Cloud-hosted PostgreSQL on Supabase (`lgvaojgtivxujwuhxgmd`). It handles raw structured data for events, participants, and winners.
3. **Data Processing Layer**: Python pipeline using `pandas`, `requests`, `matplotlib`, and `seaborn`. The pipeline fetches data directly via Supabase's REST API, processes the raw data, calculates derived metrics, and exports visual dashboards as images to the frontend's public directory.

## Design Decisions
- **Database Schema**: To avoid redundancy (normalized to at least 2NF) and ensure flexibility, we split the domain into `events`, `participants`, and `winners`.
- **Pipeline Implementation**: Rather than building a heavy backend server (like FastAPI), the Python pipeline is designed as an ETL script. It writes visualizations directly into the frontend's `public/analytics_charts/` folder. This ensures the React app can serve dynamic analytics fast and securely without maintaining an always-on Python backend instance.
- **Frontend State**: The analytics view (`Ojas.jsx`) uses React state to filter and tab between "Overall Analytics" and "Individual Events Analytics".

## Sample Data Used
The system was tested using real structured records. For example:
- **Events**: "Hackathon", "Logic Loop", "CAD Clash" from the "Srujana" fest.
- **Participants**: Students from "Chanakya University" across departments like "LAW", "BCA", "MBA".
- **Winners**: Documented team names and individual positions (e.g., 1st Place for "Code Titans").

## Insights Found
1. **Department-wise Trends**: Analysis revealed which departments are most active in specific fests (e.g., Engineering dominates Srujana, while LAW and MBA participate actively in OJAS).
2. **Event Categories**: Technical events account for a large percentage of total occurrences, particularly team-based hackathons.
3. **Internal vs. External**: The dashboard captures the proportion of internal (own university) vs external students, allowing management to track the reach and popularity of the fests.
