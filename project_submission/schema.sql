-- College Event Intelligence Portal
-- Database Schema Definition

-- 1. Events Table
CREATE TABLE events (
    event_id VARCHAR(50) PRIMARY KEY,
    fest_name VARCHAR(100) NOT NULL,
    school_name VARCHAR(100) NOT NULL,
    event_name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    team_size VARCHAR(20)
);

-- 2. Participants Table
CREATE TABLE participants (
    participant_id VARCHAR(50) PRIMARY KEY,
    participant_name VARCHAR(150) NOT NULL,
    college_name VARCHAR(150) NOT NULL,
    department VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    participant_type VARCHAR(50) NOT NULL,
    fest_name VARCHAR(100) NOT NULL
);

-- 3. Winners Table
CREATE TABLE winners (
    winner_id VARCHAR(50) PRIMARY KEY,
    event_id VARCHAR(50) REFERENCES events(event_id),
    event_name VARCHAR(150) NOT NULL,
    position VARCHAR(50) NOT NULL,
    participant_id VARCHAR(50) REFERENCES participants(participant_id),
    participant_name VARCHAR(150),
    team_id VARCHAR(50),
    team_name VARCHAR(150),
    fest_name VARCHAR(100) NOT NULL
);
