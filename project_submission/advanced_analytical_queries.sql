-- College Event Intelligence Portal
-- Advanced Analytical Queries (Master Level)
-- These queries demonstrate advanced SQL concepts like CTEs (Common Table Expressions) and Window Functions.

-- 1. Identify the Top 3 Departments by Participation for Each Fest using Window Functions
WITH DepartmentRankings AS (
    SELECT 
        fest_name,
        department,
        COUNT(participant_id) as total_participants,
        RANK() OVER (PARTITION BY fest_name ORDER BY COUNT(participant_id) DESC) as dept_rank
    FROM participants
    GROUP BY fest_name, department
)
SELECT * FROM DepartmentRankings
WHERE dept_rank <= 3;


-- 2. Calculate the Running Total of Events Hosted per School within each Fest
SELECT 
    fest_name,
    school_name,
    event_name,
    COUNT(event_id) OVER (PARTITION BY fest_name, school_name ORDER BY event_id ROWS UNBOUNDED PRECEDING) as running_event_count
FROM events
ORDER BY fest_name, school_name, event_id;


-- 3. Complex Join: Find the Most Successful Colleges (Colleges with the highest number of 1st Place Wins)
WITH WinningParticipants AS (
    SELECT 
        w.event_name,
        w.position,
        p.college_name,
        p.department
    FROM winners w
    INNER JOIN participants p ON w.participant_id = p.participant_id
    WHERE w.position ILIKE '%1st%'
)
SELECT 
    college_name,
    COUNT(*) as first_place_wins
FROM WinningParticipants
GROUP BY college_name
ORDER BY first_place_wins DESC
LIMIT 5;


-- 4. Determine Internal vs External Participation Ratios using CTEs
WITH TotalParticipants AS (
    SELECT fest_name, COUNT(participant_id) as total_count
    FROM participants
    GROUP BY fest_name
),
TypeBreakdown AS (
    SELECT fest_name, participant_type, COUNT(participant_id) as type_count
    FROM participants
    GROUP BY fest_name, participant_type
)
SELECT 
    tb.fest_name,
    tb.participant_type,
    tb.type_count,
    ROUND((tb.type_count::numeric / tp.total_count::numeric) * 100, 2) as percentage
FROM TypeBreakdown tb
JOIN TotalParticipants tp ON tb.fest_name = tp.fest_name;
