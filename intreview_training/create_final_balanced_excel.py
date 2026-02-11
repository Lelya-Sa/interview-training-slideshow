"""
Create final Excel checklist for rebalanced junior fullstack interview preparation
Includes all core and extra topics with proper time allocation
"""

import csv
from datetime import datetime, timedelta
import sys

# Complete rebalanced topic mapping from rebalance_schedule_junior_fullstack.py
CORE_TOPICS = {
    "logic-questions": {"priority": "CRITICAL", "daily": True},
    "leetcode": {"priority": "CRITICAL", "daily": True},
    "data-structures": {"priority": "CRITICAL", "daily": True},
    "time-complexity": {"priority": "HIGH", "days": [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60]},
    "binary-trees": {"priority": "HIGH", "days": [8, 12, 16, 20, 24, 28, 32, 36, 40, 44]},
    "hash-tables": {"priority": "HIGH", "days": [3, 5, 9, 13, 17, 21, 25, 29, 33, 37]},
    "javascript": {"priority": "CRITICAL", "days": list(range(1, 29)) + [32, 36, 40, 44, 48, 52, 56, 60]},
    "react": {"priority": "CRITICAL", "days": list(range(1, 29)) + [32, 36, 40, 44, 48, 52, 56, 60]},
    "es6": {"priority": "HIGH", "days": [3, 6, 9, 12, 15, 18, 21, 24, 27]},
    "html": {"priority": "MEDIUM", "days": [3, 5, 8, 11, 15, 18, 22, 25]},
    "css": {"priority": "MEDIUM", "days": [4, 6, 10, 14, 16, 19, 23, 26]},
    "tailwind": {"priority": "LOW", "days": [17, 30]},
    "spa-ssr-ssg": {"priority": "MEDIUM", "days": [20, 34, 48]},
    "nodejs": {"priority": "CRITICAL", "days": list(range(1, 46)) + [48, 52, 56, 60]},
    "backend-services": {"priority": "MEDIUM", "days": [8, 15, 22, 29, 36, 43]},
    "storage": {"priority": "MEDIUM", "days": [11, 18, 25, 32, 39, 46]},
    "queues": {"priority": "LOW", "days": [13, 20, 27, 34, 41, 48]},
    "integrations": {"priority": "LOW", "days": [16, 23, 30, 37, 44]},
    "rest": {"priority": "CRITICAL", "days": [1, 4, 6, 7, 8, 10, 12, 14] + list(range(15, 29)) + [32, 36, 40, 44]},
    "http": {"priority": "HIGH", "days": [2, 5, 8, 11, 14] + list(range(15, 29))},
    "graphql": {"priority": "MEDIUM", "days": [9, 16, 19, 26, 33, 40]},
    "api": {"priority": "MEDIUM", "days": [3, 7, 11, 15, 19, 23, 27]},
    "https": {"priority": "MEDIUM", "days": [12, 17, 22, 27, 32, 37]},
    "ajax": {"priority": "LOW", "days": [13, 20, 27, 34]},
    "headers": {"priority": "LOW", "days": [14, 21, 28, 35]},
    "webhooks": {"priority": "LOW", "days": [18, 28, 38]},
    "bff": {"priority": "LOW", "days": [9, 19, 29]},
    "grpc": {"priority": "LOW", "days": [22, 35, 48]},
    "sql-vs-nosql": {"priority": "CRITICAL", "days": [9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45]},
    "postgresql": {"priority": "HIGH", "days": [9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42]},
    "mongodb": {"priority": "HIGH", "days": [9, 13, 17, 21, 25, 29, 33, 37, 41, 45]},
    "redis": {"priority": "MEDIUM", "days": [11, 15, 19, 23, 27, 31, 35, 39, 43]},
    "data-model": {"priority": "HIGH", "days": [10, 16, 22, 28, 34, 40, 46]},
    "sharding-replication-caching": {"priority": "MEDIUM", "days": [14, 20, 26, 32, 38, 44]},
    "mvc": {"priority": "HIGH", "days": [1, 4, 7, 10, 13] + list(range(15, 29))},
    "system-design": {"priority": "CRITICAL", "days": list(range(11, 76))},
    "clean-architecture": {"priority": "MEDIUM", "days": [15, 18, 24, 28, 32, 36, 40]},
    "onion-architecture": {"priority": "LOW", "days": [16, 20, 26, 30, 36]},
    "application-layers": {"priority": "MEDIUM", "days": [2, 9, 16, 23, 30, 37]},
    "system-architecture": {"priority": "MEDIUM", "days": [11, 15, 19, 23, 27, 31, 35, 39]},
    "project-architecture": {"priority": "LOW", "days": [14, 21, 28, 35, 42]},
    "design-patterns": {"priority": "MEDIUM", "days": [10] + list(range(15, 29))},
    "singleton": {"priority": "HIGH", "days": [10, 13, 16, 19, 22, 25, 28]},
    "factory": {"priority": "HIGH", "days": [10, 14, 17, 20, 23, 26, 29]},
    "observer": {"priority": "MEDIUM", "days": [15, 18, 21, 24, 27, 30, 33]},
    "strategy": {"priority": "MEDIUM", "days": [16, 19, 22, 25, 28, 31, 34]},
    "adapter": {"priority": "LOW", "days": [17, 20, 23, 26, 29, 32]},
    "oop": {"priority": "MEDIUM", "days": [10, 14, 18, 22, 26, 30, 34, 38]},
}

EXTRA_TOPICS = {
    "authentication-authorization": {"priority": "MEDIUM", "days": [12, 20, 28, 36, 44, 52]},
    "jwt": {"priority": "MEDIUM", "days": [12, 21, 30, 39, 48, 57]},
    "oauth": {"priority": "LOW", "days": [18, 27, 36, 45, 54]},
    "openid": {"priority": "LOW", "days": [24, 33, 42, 51, 60]},
    "secure-by-design": {"priority": "LOW", "days": [26, 35, 44, 53]},
    "security-keys": {"priority": "LOW", "days": [28, 37, 46, 55]},
    "docker": {"priority": "LOW", "days": [12, 24, 36, 48, 60]},
    "cicd": {"priority": "LOW", "days": [12, 25, 38, 51, 64]},
    "kubernetes": {"priority": "LOW", "days": [18, 30, 42, 54, 66]},
    "scaling": {"priority": "LOW", "days": [22, 34, 46, 58, 70]},
    "failover-load-balancing": {"priority": "LOW", "days": [26, 38, 50, 62, 74]},
    "observability": {"priority": "LOW", "days": [30, 42, 54, 66, 75]},
    "event-sourcing": {"priority": "LOW", "days": [46, 52, 58, 64, 70]},
    "cqrs": {"priority": "LOW", "days": [48, 54, 60, 66, 72]},
    "adrs": {"priority": "LOW", "days": [55, 65, 75]},
    "c4-model": {"priority": "LOW", "days": [56, 66, 75]},
    "qa": {"priority": "LOW", "days": [44, 50, 60, 70, 75]},
}

def get_topics_for_day(day):
    """Get all topics for a specific day"""
    core = []
    extra = []
    
    for topic, info in CORE_TOPICS.items():
        if day in info.get("days", []) or info.get("daily", False):
            core.append((topic, info["priority"]))
    
    for topic, info in EXTRA_TOPICS.items():
        if day in info.get("days", []):
            extra.append((topic, info["priority"]))
    
    return core, extra

def get_daily_tasks(day):
    """Get comprehensive daily task breakdown"""
    
    core_topics, extra_topics = get_topics_for_day(day)
    
    # Determine level
    if day <= 14:
        level = "Level 1: Interview-Ready Basics"
        week = (day - 1) // 7 + 1
    elif day <= 28:
        level = "Level 2: Solid Foundation"
        week = (day - 1) // 7 + 1
    elif day <= 45:
        level = "Level 3: Intermediate Mastery"
        week = (day - 1) // 7 + 1
    elif day <= 60:
        level = "Level 4: Advanced Skills"
        week = (day - 1) // 7 + 1
    else:
        level = "Level 5: Expert Level"
        week = (day - 1) // 7 + 1
    
    # Format topic lists
    core_list = [t[0].replace('-', ' ').title() for t in core_topics]
    extra_list = [t[0].replace('-', ' ').title() for t in extra_topics]
    
    # Count by priority
    critical_count = sum(1 for _, p in core_topics if p == "CRITICAL")
    high_count = sum(1 for _, p in core_topics if p == "HIGH")
    medium_count = sum(1 for _, p in core_topics if p == "MEDIUM")
    low_count = sum(1 for _, p in core_topics if p == "LOW")
    
    tasks = {
        'day': day,
        'level': level,
        'week': week,
        'core_practice': 'Logic + LeetCode + Data Structures (60-90 min)',
        'logic_questions': '2-5 questions',
        'leetcode': '1-3 problems',
        'data_structures': 'Practice/Review',
        'core_topics_count': len(core_topics),
        'core_critical': critical_count,
        'core_high': high_count,
        'core_medium': medium_count,
        'core_low': low_count,
        'core_topics': '; '.join(core_list[:10]),  # First 10
        'extra_topics_count': len(extra_topics),
        'extra_topics': '; '.join(extra_list[:5]),  # First 5
        'core_time': '3.5-6.4 hours (70-80%)',
        'extra_time': '1-2.4 hours (20-30%)',
        'total_time': '5-8 hours',
        'milestone': '',
        'completed': '',
        'notes': ''
    }
    
    # Milestones
    if day == 14:
        tasks['milestone'] = 'Interview-Ready!'
    elif day == 28:
        tasks['milestone'] = 'Solid Foundation Complete'
    elif day == 45:
        tasks['milestone'] = 'Intermediate Mastery Complete'
    elif day == 60:
        tasks['milestone'] = 'Advanced Skills Complete'
    elif day == 75:
        tasks['milestone'] = 'Expert Level - Ace Any Interview!'
    
    return tasks

def create_excel_checklist():
    """Create comprehensive Excel-compatible CSV checklist"""
    
    if sys.platform == 'win32':
        sys.stdout.reconfigure(encoding='utf-8')
    
    start_date = datetime(2025, 1, 1)  # Adjust start date as needed
    
    rows = []
    
    # Header row
    header = [
        'Day',
        'Date',
        'Level',
        'Week',
        'Core Practice (Daily)',
        'Logic Questions',
        'LeetCode',
        'Data Structures',
        'Core Topics Count',
        'Core - Critical',
        'Core - High',
        'Core - Medium',
        'Core - Low',
        'Core Topics (List)',
        'Extra Topics Count',
        'Extra Topics (List)',
        'Core Time (70-80%)',
        'Extra Time (20-30%)',
        'Total Time',
        'Milestone',
        'Completed',
        'Notes'
    ]
    rows.append(header)
    
    # Data rows for all 75 days
    for day in range(1, 76):
        tasks = get_daily_tasks(day)
        current_date = start_date + timedelta(days=day - 1)
        
        row = [
            day,
            current_date.strftime('%Y-%m-%d'),
            tasks['level'],
            tasks['week'],
            tasks['core_practice'],
            tasks['logic_questions'],
            tasks['leetcode'],
            tasks['data_structures'],
            tasks['core_topics_count'],
            tasks['core_critical'],
            tasks['core_high'],
            tasks['core_medium'],
            tasks['core_low'],
            tasks['core_topics'],
            tasks['extra_topics_count'],
            tasks['extra_topics'],
            tasks['core_time'],
            tasks['extra_time'],
            tasks['total_time'],
            tasks['milestone'],
            tasks['completed'],
            tasks['notes']
        ]
        rows.append(row)
    
    # Write to CSV
    filename = 'FINAL_BALANCED_CHECKLIST.csv'
    with open(filename, 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.writer(f)
        writer.writerows(rows)
    
    print(f"SUCCESS: Created {filename}")
    print(f"Total days: 75")
    print(f"Core topics: 48")
    print(f"Extra topics: 17")
    print(f"File is Excel-compatible (UTF-8 BOM encoding)")
    print(f"\nOpen {filename} in Excel to track your progress!")
    print(f"\nThis checklist is based on the rebalanced schedule:")
    print(f"- Core topics: 70-80% of time (essential for junior fullstack)")
    print(f"- Extra topics: 20-30% of time (for hightech acceptance)")

if __name__ == '__main__':
    create_excel_checklist()
