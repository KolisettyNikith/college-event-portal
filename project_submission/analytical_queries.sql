-- College Event Intelligence Portal
-- Analytical Queries

-- 1. Department-wise participation volume (Which department is most active?)
SELECT department, COUNT(participant_id) as total_participants
FROM participants
GROUP BY department
ORDER BY total_participants DESC;

-- 2. Event category breakdown (What type of events are most common?)
SELECT category, COUNT(event_id) as total_events
FROM events
GROUP BY category
ORDER BY total_events DESC;

-- 3. Internal vs External participation ratio
SELECT participant_type, COUNT(participant_id) as count,
       ROUND((COUNT(participant_id) * 100.0) / (SELECT COUNT(*) FROM participants), 2) as percentage
FROM participants
GROUP BY participant_type;

-- 4. Top performing departments (Most winning prizes)
SELECT p.department, COUNT(w.winner_id) as total_prizes
FROM winners w
JOIN participants p ON w.participant_id = p.participant_id
GROUP BY p.department
ORDER BY total_prizes DESC;

-- 5. Event popularity (Events with the most participants)
SELECT e.event_name, e.category, COUNT(p.participant_id) as participant_count
FROM events e
JOIN participants p ON e.fest_name = p.fest_name
GROUP BY e.event_name, e.category
ORDER BY participant_count DESC;
