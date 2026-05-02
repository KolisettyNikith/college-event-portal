# College Event Intelligence Portal - ER Diagram

```mermaid
erDiagram
    EVENTS {
        string event_id PK
        string fest_name
        string school_name
        string event_name
        string category
        string event_type
        string team_size
    }

    PARTICIPANTS {
        string participant_id PK
        string participant_name
        string college_name
        string department
        int year
        string participant_type
        string fest_name
    }

    WINNERS {
        string winner_id PK
        string event_id FK
        string event_name
        string position
        string participant_id FK
        string participant_name
        string team_id
        string team_name
        string fest_name
    }

    EVENTS ||--o{ WINNERS : "has"
    PARTICIPANTS ||--o{ WINNERS : "wins"
```
