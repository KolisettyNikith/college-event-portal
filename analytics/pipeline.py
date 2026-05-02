import os
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
import requests
import warnings

warnings.filterwarnings('ignore')

URL = "https://lgvaojgtivxujwuhxgmd.supabase.co/rest/v1"
KEY = "sb_publishable_zVDqm_NJVwATUnZEbLkVHA_cuPOlm3H"

HEADERS = {
    "apikey": KEY,
    "Authorization": f"Bearer {KEY}",
    "Range": "0-999"
}

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public", "analytics_charts")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def fetch_table(table_name):
    response = requests.get(f"{URL}/{table_name}?select=*", headers=HEADERS)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching {table_name}: {response.text}")
        return []

def fetch_data():
    print("Fetching data from Supabase...")
    participants = fetch_table('participants')
    events = fetch_table('events')
    winners = fetch_table('winners')
    
    return pd.DataFrame(participants), pd.DataFrame(events), pd.DataFrame(winners)

def clean_data(df_part, df_events, df_winners):
    if not df_part.empty and 'fest_name' in df_part.columns:
        df_part['fest_name'] = df_part['fest_name'].str.upper().str.strip()
    if not df_events.empty and 'fest_name' in df_events.columns:
        df_events['fest_name'] = df_events['fest_name'].str.upper().str.strip()
    if not df_winners.empty and 'fest_name' in df_winners.columns:
        df_winners['fest_name'] = df_winners['fest_name'].str.upper().str.strip()
        
    if not df_part.empty and 'department' in df_part.columns:
        df_part['department'] = df_part['department'].str.upper().str.strip()
        
    return df_part, df_events, df_winners

def get_html_config():
    return {
        'displayModeBar': False,
        'responsive': True
    }

def save_fig(fig, filename):
    fig.update_layout(
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        margin=dict(l=20, r=20, t=50, b=20),
        font=dict(family="Inter, sans-serif")
    )
    fig.write_html(os.path.join(OUTPUT_DIR, filename), config=get_html_config(), include_plotlyjs='cdn')

def generate_fest_charts_plotly(fest_name, df_part, df_events, df_winners):
    print(f"Generating Plotly Interactive Charts for {fest_name}...")
    prefix = fest_name.lower()

    # 1. School Comparison
    if not df_part.empty and 'college_name' in df_part.columns:
        colleges = df_part['college_name'].value_counts().reset_index()
        colleges.columns = ['College', 'Participants']
        fig = px.bar(colleges, x='Participants', y='College', orientation='h', title=f'[{fest_name}] School Comparison', color='Participants', color_continuous_scale='Viridis')
        save_fig(fig, f"{prefix}_school_comparison.html")

    # 2. Winning Comparison
    if not df_winners.empty and 'team_name' in df_winners.columns:
        valid_teams = df_winners.dropna(subset=['team_name'])
        if not valid_teams.empty:
            team_wins = valid_teams['team_name'].value_counts().head(5).reset_index()
            team_wins.columns = ['Team', 'Wins']
            fig = px.bar(team_wins, x='Team', y='Wins', title=f'[{fest_name}] Top Winning Teams', color='Wins', color_continuous_scale='Magma')
            save_fig(fig, f"{prefix}_winning_comparison.html")

    # 3. Department Participation
    if not df_part.empty and 'department' in df_part.columns:
        dept_counts = df_part['department'].value_counts().reset_index()
        dept_counts.columns = ['Department', 'Count']
        fig = px.bar(dept_counts, x='Department', y='Count', title=f'[{fest_name}] Dept Participation', color='Count', color_continuous_scale='Blues')
        save_fig(fig, f"{prefix}_dept_participation.html")

    # 4. Event Categories (Treemap)
    if not df_events.empty and 'category' in df_events.columns:
        cat_counts = df_events['category'].value_counts().reset_index()
        cat_counts.columns = ['Category', 'Count']
        fig = px.treemap(cat_counts, path=['Category'], values='Count', title=f'[{fest_name}] Event Categories Treemap', color='Count', color_continuous_scale='Teal')
        save_fig(fig, f"{prefix}_event_categories.html")

    # 5. Internal vs External
    if not df_part.empty and 'participant_type' in df_part.columns:
        type_counts = df_part['participant_type'].value_counts().reset_index()
        type_counts.columns = ['Type', 'Count']
        fig = px.pie(type_counts, names='Type', values='Count', hole=0.4, title=f'[{fest_name}] Internal vs External', color_discrete_sequence=px.colors.qualitative.Pastel)
        save_fig(fig, f"{prefix}_internal_external.html")

    # 6. Year of Study
    if not df_part.empty and 'year' in df_part.columns:
        year_counts = df_part['year'].value_counts().reset_index()
        year_counts.columns = ['Year', 'Count']
        year_counts['Year'] = 'Year ' + year_counts['Year'].astype(str)
        fig = px.pie(year_counts, names='Year', values='Count', title=f'[{fest_name}] Year of Study', color_discrete_sequence=px.colors.qualitative.Set3)
        save_fig(fig, f"{prefix}_year_of_study.html")

    # 7. Dept vs Year (Heatmap)
    if not df_part.empty and 'year' in df_part.columns and 'department' in df_part.columns:
        heatmap_data = pd.crosstab(df_part['department'], df_part['year'])
        fig = px.imshow(heatmap_data, text_auto=True, aspect="auto", title=f'[{fest_name}] Dept vs Year Heatmap', color_continuous_scale='YlGnBu')
        save_fig(fig, f"{prefix}_dept_vs_year.html")

    # 8. Spider Category
    if not df_events.empty and 'category' in df_events.columns:
        categories = df_events['category'].value_counts().reset_index()
        categories.columns = ['Category', 'Count']
        if len(categories) > 2:
            fig = px.line_polar(categories, r='Count', theta='Category', line_close=True, title=f'[{fest_name}] Event Categories Radar')
            fig.update_traces(fill='toself')
            save_fig(fig, f"{prefix}_spider_category.html")

    # 9. Winners by Year
    if not df_winners.empty and not df_part.empty and 'participant_id' in df_winners.columns and 'year' in df_part.columns:
        winners_part = df_winners.merge(df_part, on='participant_id', how='inner')
        if not winners_part.empty:
            year_wins = winners_part['year'].value_counts().reset_index()
            year_wins.columns = ['Year', 'Wins']
            year_wins['Year'] = 'Year ' + year_wins['Year'].astype(str)
            fig = px.bar(year_wins, x='Year', y='Wins', title=f'[{fest_name}] Winners by Year', color='Wins', color_continuous_scale='Cividis')
            save_fig(fig, f"{prefix}_winners_by_year.html")

    # 10. Internal vs External Winners
    if not df_winners.empty and not df_part.empty and 'participant_id' in df_winners.columns and 'participant_type' in df_part.columns:
        winners_part = df_winners.merge(df_part, on='participant_id', how='inner')
        if not winners_part.empty:
            type_wins = winners_part['participant_type'].value_counts().reset_index()
            type_wins.columns = ['Type', 'Wins']
            fig = px.pie(type_wins, names='Type', values='Wins', hole=0.3, title=f'[{fest_name}] Winners Type', color_discrete_sequence=px.colors.qualitative.Dark2)
            save_fig(fig, f"{prefix}_internal_external_winners.html")

    # 11. Event Host Comparison
    if not df_events.empty and 'school_name' in df_events.columns:
        hosts = df_events['school_name'].value_counts().reset_index()
        hosts.columns = ['School', 'Events']
        fig = px.bar(hosts, x='Events', y='School', orientation='h', title=f'[{fest_name}] Events Hosted by School', color='Events', color_continuous_scale='Sunset')
        save_fig(fig, f"{prefix}_event_host_comparison.html")

    # 12. Event Types
    if not df_events.empty and 'event_type' in df_events.columns:
        type_counts = df_events['event_type'].value_counts().reset_index()
        type_counts.columns = ['Type', 'Count']
        fig = px.pie(type_counts, names='Type', values='Count', title=f'[{fest_name}] Event Types', color_discrete_sequence=px.colors.qualitative.Bold)
        save_fig(fig, f"{prefix}_event_types.html")

    # 13. Team Sizes
    if not df_events.empty and 'team_size' in df_events.columns:
        team_counts = df_events['team_size'].value_counts().reset_index()
        team_counts.columns = ['Size', 'Count']
        fig = px.bar(team_counts, x='Size', y='Count', title=f'[{fest_name}] Team Sizes', color='Count', color_continuous_scale='Plasma')
        save_fig(fig, f"{prefix}_team_sizes.html")

    # 14. Top Events by Winners
    if not df_winners.empty and 'event_name' in df_winners.columns:
        event_wins = df_winners['event_name'].value_counts().head(5).reset_index()
        event_wins.columns = ['Event', 'Wins']
        fig = px.bar(event_wins, x='Wins', y='Event', orientation='h', title=f'[{fest_name}] Top Events by Winners', color='Wins', color_continuous_scale='Oryel')
        save_fig(fig, f"{prefix}_top_events_winners.html")

def main():
    df_part, df_events, df_winners = fetch_data()
    df_part, df_events, df_winners = clean_data(df_part, df_events, df_winners)
    
    fests = ["OJAS", "SAMYUTI", "SRUJANA"]
    
    for fest in fests:
        part_filtered = df_part[df_part['fest_name'] == fest] if not df_part.empty else pd.DataFrame()
        events_filtered = df_events[df_events['fest_name'] == fest] if not df_events.empty else pd.DataFrame()
        winners_filtered = df_winners[df_winners['fest_name'] == fest] if not df_winners.empty else pd.DataFrame()
        
        generate_fest_charts_plotly(fest, part_filtered, events_filtered, winners_filtered)
    
    print(f"Pipeline completed successfully. Plotly HTML charts saved in {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
