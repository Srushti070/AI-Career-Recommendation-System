import os
import sqlite3
import json
from typing import Dict, List, Optional, Any

DB_PATH = "database/app.db"

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    os.makedirs("database", exist_ok=True)
    conn = get_db()
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # Progress table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS progress (
        user_id INTEGER PRIMARY KEY,
        completed_tasks TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
    ''')

    # Assessments table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS assessments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        payload TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
    ''')

    # Career Results table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS career_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        career TEXT NOT NULL,
        match_score REAL NOT NULL,
        data TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
    ''')
    
    conn.commit()
    conn.close()

def create_user(name: str, email: str, password_hash: str) -> Optional[int]:
    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute(
            'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
            (name, email, password_hash)
        )
        conn.commit()
        user_id = cursor.lastrowid
        return user_id
    except sqlite3.IntegrityError:
        return None
    finally:
        conn.close()

def get_user_by_email(email: str) -> Optional[sqlite3.Row]:
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
    user = cursor.fetchone()
    conn.close()
    return user

def get_user_by_id(user_id: int) -> Optional[sqlite3.Row]:
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE id = ?', (user_id,))
    user = cursor.fetchone()
    conn.close()
    return user

def save_assessment_and_result(user_id: int, payload: dict, result: dict):
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute(
        'INSERT INTO assessments (user_id, payload) VALUES (?, ?)',
        (user_id, json.dumps(payload))
    )
    
    cursor.execute(
        'INSERT INTO career_results (user_id, career, match_score, data) VALUES (?, ?, ?, ?)',
        (user_id, result.get("career", ""), result.get("match_score", 0.0), json.dumps(result))
    )
    
    conn.commit()
    conn.close()

def get_latest_result(user_id: int) -> Optional[dict]:
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        'SELECT data FROM career_results WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
        (user_id,)
    )
    row = cursor.fetchone()
    conn.close()
    
    if row and row['data']:
        return json.loads(row['data'])
    return None

def get_completed_tasks(user_id: int) -> List[str]:
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT completed_tasks FROM progress WHERE user_id = ?', (user_id,))
    row = cursor.fetchone()
    conn.close()
    if row and row['completed_tasks']:
        return row['completed_tasks'].split(',')
    return []

def save_completed_tasks(user_id: int, tasks: List[str]):
    conn = get_db()
    cursor = conn.cursor()
    tasks_str = ','.join(tasks)
    cursor.execute(
        'INSERT OR REPLACE INTO progress (user_id, completed_tasks) VALUES (?, ?)',
        (user_id, tasks_str)
    )
    conn.commit()
    conn.close()
