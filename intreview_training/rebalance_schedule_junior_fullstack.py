"""
Rebalance daily schedule to prioritize core fullstack topics for junior interviews
Core topics get 70-80% of time, DevOps/Advanced get 20-30% as "extra"
"""

from pathlib import Path

# CORE TOPICS (70-80% of time) - Essential for junior fullstack
CORE_TOPICS = {
    # Algorithms (HIGHEST PRIORITY - Daily practice)
    "logic-questions": {"priority": "CRITICAL", "daily": True, "days": list(range(1, 76))},
    "leetcode": {"priority": "CRITICAL", "daily": True, "days": list(range(1, 76))},
    "data-structures": {"priority": "CRITICAL", "daily": True, "days": list(range(1, 76))},
    "time-complexity": {"priority": "HIGH", "days": [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60]},
    "binary-trees": {"priority": "HIGH", "days": [8, 12, 16, 20, 24, 28, 32, 36, 40, 44]},
    "hash-tables": {"priority": "HIGH", "days": [3, 5, 9, 13, 17, 21, 25, 29, 33, 37]},
    
    # Frontend (HIGH PRIORITY)
    "javascript": {"priority": "CRITICAL", "days": list(range(1, 29)) + [32, 36, 40, 44, 48, 52, 56, 60]},
    "react": {"priority": "CRITICAL", "days": list(range(1, 29)) + [32, 36, 40, 44, 48, 52, 56, 60]},
    "es6": {"priority": "HIGH", "days": [3, 6, 9, 12, 15, 18, 21, 24, 27]},
    "html": {"priority": "MEDIUM", "days": [3, 5, 8, 11, 15, 18, 22, 25]},
    "css": {"priority": "MEDIUM", "days": [4, 6, 10, 14, 16, 19, 23, 26]},
    "tailwind": {"priority": "LOW", "days": [17, 30]},
    "spa-ssr-ssg": {"priority": "MEDIUM", "days": [20, 34, 48]},
    
    # Backend (HIGH PRIORITY)
    "nodejs": {"priority": "CRITICAL", "days": list(range(1, 46)) + [48, 52, 56, 60]},
    "backend-services": {"priority": "MEDIUM", "days": [8, 15, 22, 29, 36, 43]},
    "storage": {"priority": "MEDIUM", "days": [11, 18, 25, 32, 39, 46]},
    "queues": {"priority": "LOW", "days": [13, 20, 27, 34, 41, 48]},
    "integrations": {"priority": "LOW", "days": [16, 23, 30, 37, 44]},
    
    # APIs (HIGH PRIORITY)
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
    
    # Databases (HIGH PRIORITY)
    "sql-vs-nosql": {"priority": "CRITICAL", "days": [9, 12, 15, 18, 21, 24, 27] + list(range(30, 46, 3))},
    "postgresql": {"priority": "HIGH", "days": [9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42]},
    "mongodb": {"priority": "HIGH", "days": [9, 13, 17, 21, 25, 29, 33, 37, 41, 45]},
    "redis": {"priority": "MEDIUM", "days": [11, 15, 19, 23, 27, 31, 35, 39, 43]},
    "data-model": {"priority": "HIGH", "days": [10, 16, 22, 28, 34, 40, 46]},
    "sharding-replication-caching": {"priority": "MEDIUM", "days": [14, 20, 26, 32, 38, 44]},
    
    # Architecture (HIGH PRIORITY)
    "mvc": {"priority": "HIGH", "days": [1, 4, 7, 10, 13] + list(range(15, 29))},
    "system-design": {"priority": "CRITICAL", "days": list(range(11, 76))},
    "clean-architecture": {"priority": "MEDIUM", "days": [15, 18, 24, 28, 32, 36, 40]},
    "onion-architecture": {"priority": "LOW", "days": [16, 20, 26, 30, 36]},
    "application-layers": {"priority": "MEDIUM", "days": [2, 9, 16, 23, 30, 37]},
    "system-architecture": {"priority": "MEDIUM", "days": [11, 15, 19, 23, 27, 31, 35, 39]},
    "project-architecture": {"priority": "LOW", "days": [14, 21, 28, 35, 42]},
    "design-patterns": {"priority": "MEDIUM", "days": [10] + list(range(15, 29))},
    
    # Design Patterns (HIGH PRIORITY)
    "singleton": {"priority": "HIGH", "days": [10, 13, 16, 19, 22, 25, 28]},
    "factory": {"priority": "HIGH", "days": [10, 14, 17, 20, 23, 26, 29]},
    "observer": {"priority": "MEDIUM", "days": [15, 18, 21, 24, 27, 30, 33]},
    "strategy": {"priority": "MEDIUM", "days": [16, 19, 22, 25, 28, 31, 34]},
    "adapter": {"priority": "LOW", "days": [17, 20, 23, 26, 29, 32]},
    
    # OOP (MEDIUM PRIORITY)
    "oop": {"priority": "MEDIUM", "days": [10, 14, 18, 22, 26, 30, 34, 38]},
}

# EXTRA TOPICS (20-30% of time) - For higher acceptance in hightech
EXTRA_TOPICS = {
    # Security (MEDIUM - Important but not core for junior)
    "authentication-authorization": {"priority": "MEDIUM", "days": [12, 20, 28, 36, 44, 52]},
    "jwt": {"priority": "MEDIUM", "days": [12, 21, 30, 39, 48, 57]},
    "oauth": {"priority": "LOW", "days": [18, 27, 36, 45, 54]},
    "openid": {"priority": "LOW", "days": [24, 33, 42, 51, 60]},
    "secure-by-design": {"priority": "LOW", "days": [26, 35, 44, 53]},
    "security-keys": {"priority": "LOW", "days": [28, 37, 46, 55]},
    
    # DevOps (LOW - Extra for hightech)
    "docker": {"priority": "LOW", "days": [12, 24, 36, 48, 60]},
    "cicd": {"priority": "LOW", "days": [12, 25, 38, 51, 64]},
    "kubernetes": {"priority": "LOW", "days": [18, 30, 42, 54, 66]},
    "scaling": {"priority": "LOW", "days": [22, 34, 46, 58, 70]},
    "failover-load-balancing": {"priority": "LOW", "days": [26, 38, 50, 62, 74]},
    "observability": {"priority": "LOW", "days": [30, 42, 54, 66, 75]},
    
    # Advanced Patterns (LOW - Extra)
    "event-sourcing": {"priority": "LOW", "days": [46, 52, 58, 64, 70]},
    "cqrs": {"priority": "LOW", "days": [48, 54, 60, 66, 72]},
    
    # Documentation (LOW - Extra)
    "adrs": {"priority": "LOW", "days": [55, 65, 75]},
    "c4-model": {"priority": "LOW", "days": [56, 66, 75]},
    
    # QA (LOW - Extra)
    "qa": {"priority": "LOW", "days": [44, 50, 60, 70, 75]},
}

def get_topics_for_day(day):
    """Get all topics for a specific day, prioritized"""
    topics = {}
    
    # Add core topics
    for topic_name, topic_info in CORE_TOPICS.items():
        if day in topic_info["days"]:
            topics[topic_name] = {
                **topic_info,
                "category": "CORE",
                "path": get_topic_path(topic_name)
            }
    
    # Add extra topics (only if day is in their schedule)
    for topic_name, topic_info in EXTRA_TOPICS.items():
        if day in topic_info["days"]:
            topics[topic_name] = {
                **topic_info,
                "category": "EXTRA",
                "path": get_topic_path(topic_name)
            }
    
    return topics

def get_topic_path(topic_name):
    """Get the path to topic's questions.md file"""
    path_mapping = {
        # Algorithms
        "logic-questions": "algorithms/logic-questions/questions.md",
        "leetcode": "algorithms/leetcode/questions.md",
        "data-structures": "algorithms/data-structures/questions.md",
        "time-complexity": "algorithms/time-complexity/questions.md",
        "binary-trees": "algorithms/binary-trees/questions.md",
        "hash-tables": "algorithms/hash-tables/questions.md",
        
        # Frontend
        "javascript": "frontend/javascript/questions.md",
        "react": "frontend/react/questions.md",
        "es6": "frontend/es6/questions.md",
        "html": "frontend/html/questions.md",
        "css": "frontend/css/questions.md",
        "tailwind": "frontend/tailwind/questions.md",
        "spa-ssr-ssg": "frontend/spa-ssr-ssg/questions.md",
        
        # Backend
        "nodejs": "backend/nodejs/questions.md",
        "backend-services": "backend/services/questions.md",
        "storage": "backend/storage/questions.md",
        "queues": "backend/queues/questions.md",
        "integrations": "backend/integrations/questions.md",
        
        # APIs
        "rest": "apis/rest/questions.md",
        "http": "apis/http/questions.md",
        "graphql": "apis/graphql-vs-rest/questions.md",
        "api": "apis/api/questions.md",
        "https": "apis/https/questions.md",
        "ajax": "apis/ajax/questions.md",
        "headers": "apis/headers/questions.md",
        "webhooks": "apis/webhooks/questions.md",
        "bff": "apis/bff/questions.md",
        "grpc": "apis/grpc/questions.md",
        
        # Databases
        "sql-vs-nosql": "databases/sql-vs-nosql/questions.md",
        "postgresql": "databases/postgresql/questions.md",
        "mongodb": "databases/mongodb/questions.md",
        "redis": "databases/redis/questions.md",
        "data-model": "databases/data-model/questions.md",
        "sharding-replication-caching": "databases/sharding-replication-caching/questions.md",
        
        # Architecture
        "mvc": "architecture/mvc/questions.md",
        "system-design": "architecture/system-design/questions.md",
        "clean-architecture": "architecture/clean-architecture/questions.md",
        "onion-architecture": "architecture/onion-architecture/questions.md",
        "application-layers": "architecture/application-layers/questions.md",
        "system-architecture": "architecture/system-architecture/questions.md",
        "project-architecture": "architecture/project-architecture/questions.md",
        "design-patterns": "architecture/design-patterns/questions.md",
        
        # Design Patterns
        "singleton": "design-patterns/creational/singleton/questions.md",
        "factory": "design-patterns/creational/factory/questions.md",
        "observer": "design-patterns/behavioral/observer/questions.md",
        "strategy": "design-patterns/behavioral/strategy/questions.md",
        "adapter": "design-patterns/structural/adapter/questions.md",
        
        # OOP
        "oop": "oop/questions.md",
        
        # Security
        "authentication-authorization": "security/authentication-authorization/questions.md",
        "jwt": "security/jwt/questions.md",
        "oauth": "security/oauth/questions.md",
        "openid": "security/openid/questions.md",
        "secure-by-design": "security/secure-by-design/questions.md",
        "security-keys": "security/security-keys/questions.md",
        
        # DevOps
        "docker": "devops/docker/questions.md",
        "cicd": "devops/cicd/questions.md",
        "kubernetes": "devops/kubernetes/questions.md",
        "scaling": "devops/scaling/questions.md",
        "failover-load-balancing": "devops/failover-load-balancing/questions.md",
        "observability": "devops/observability/questions.md",
        
        # Advanced
        "event-sourcing": "advanced-patterns/event-sourcing/questions.md",
        "cqrs": "advanced-patterns/cqrs/questions.md",
        
        # Documentation
        "adrs": "documentation/adrs/questions.md",
        "c4-model": "documentation/c4-model/questions.md",
        
        # QA
        "qa": "qa/questions.md",
    }
    return path_mapping.get(topic_name, "")

def create_rebalanced_day_folder(day):
    """Create rebalanced day folder with priority-based organization"""
    day_folder = Path(f"daily-schedule/day-{day:02d}")
    day_folder.mkdir(parents=True, exist_ok=True)
    
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
    
    # Get topics for this day
    topics = get_topics_for_day(day)
    
    # Separate by category
    core_topics = {k: v for k, v in topics.items() if v["category"] == "CORE"}
    extra_topics = {k: v for k, v in topics.items() if v["category"] == "EXTRA"}
    
    # Create README
    readme = f"""# Day {day}: Study Plan (Rebalanced for Junior Fullstack)

## Level: {level} | Week: {week}

## 🎯 Priority Distribution

**Core Topics (70-80% of time)**: {len(core_topics)} topics - Essential for junior fullstack interviews  
**Extra Topics (20-30% of time)**: {len(extra_topics)} topics - For higher acceptance in hightech companies

## ✅ Daily Checklist

### 🔥 CORE PRACTICE (Every Day - 60-90 min)
- [ ] **Logic Questions**: 2-5 questions → `algorithms/logic-questions/questions.md`
- [ ] **LeetCode**: 1-3 problems → `algorithms/leetcode/questions.md`
- [ ] **Data Structures**: Practice/Review → `algorithms/data-structures/`

### 📚 CORE TOPICS - Focus Here First ({len(core_topics)} topics)

"""
    
    # Group core topics by category
    core_categories = {
        "Frontend": [],
        "Backend": [],
        "APIs": [],
        "Databases": [],
        "Architecture": [],
        "Design Patterns": [],
        "Algorithms": [],
        "Other": []
    }
    
    for topic_name, topic_info in core_topics.items():
        if topic_name in ["javascript", "react", "es6", "html", "css", "tailwind", "spa-ssr-ssg"]:
            core_categories["Frontend"].append((topic_name, topic_info))
        elif topic_name in ["nodejs", "backend-services", "storage", "queues", "integrations"]:
            core_categories["Backend"].append((topic_name, topic_info))
        elif topic_name in ["rest", "http", "graphql", "api", "https", "ajax", "headers", "webhooks", "bff", "grpc"]:
            core_categories["APIs"].append((topic_name, topic_info))
        elif topic_name in ["sql-vs-nosql", "postgresql", "mongodb", "redis", "data-model", "sharding-replication-caching"]:
            core_categories["Databases"].append((topic_name, topic_info))
        elif topic_name in ["mvc", "system-design", "clean-architecture", "onion-architecture", "application-layers", "system-architecture", "project-architecture", "design-patterns"]:
            core_categories["Architecture"].append((topic_name, topic_info))
        elif topic_name in ["singleton", "factory", "observer", "strategy", "adapter"]:
            core_categories["Design Patterns"].append((topic_name, topic_info))
        elif topic_name in ["logic-questions", "leetcode", "data-structures", "time-complexity", "binary-trees", "hash-tables"]:
            core_categories["Algorithms"].append((topic_name, topic_info))
        else:
            core_categories["Other"].append((topic_name, topic_info))
    
    # Add core topics to README
    for category, topic_list in core_categories.items():
        if topic_list:
            readme += f"\n#### {category}\n\n"
            for topic_name, topic_info in topic_list:
                display_name = topic_name.replace('-', ' ').title()
                priority_emoji = "🔥" if topic_info["priority"] == "CRITICAL" else "⭐" if topic_info["priority"] == "HIGH" else "📌"
                readme += f"- [ ] {priority_emoji} **{display_name}** ({topic_info['priority']})\n"
                readme += f"  - Path: `../../{topic_info['path']}`\n"
                readme += "\n"
    
    # Add extra topics
    if extra_topics:
        readme += f"""
### ⚡ EXTRA TOPICS - For Higher Acceptance ({len(extra_topics)} topics)

*These topics are extra learning for higher acceptance opportunities in hightech companies. Focus on core topics first!*

"""
        for topic_name, topic_info in extra_topics.items():
            display_name = topic_name.replace('-', ' ').title()
            readme += f"- [ ] **{display_name}** ({topic_info['priority']})\n"
            readme += f"  - Path: `../../{topic_info['path']}`\n"
            readme += "\n"
    
    readme += f"""
## 📊 Time Allocation (Recommended)

### Core Topics: 70-80% of time ({len(core_topics)} topics)
- Logic + LeetCode + Data Structures: 60-90 min (daily)
- Frontend/Backend/Database/Architecture: 120-180 min
- Design Patterns: 30-60 min

### Extra Topics: 20-30% of time ({len(extra_topics)} topics)
- Security/DevOps/Advanced: 30-60 min (if time permits)

**Total Study Time**: 5-8 hours (adjustable)

## 📚 Study Materials

Navigate to each topic's folder to find:
- `README.md` - Definitions and concepts
- `questions.md` - Interview questions with answers

## 📝 Notes
Add your notes here:




## ✅ Completion
- [ ] Core topics completed
- [ ] Extra topics reviewed (if time permits)
- [ ] Notes added
- [ ] Ready for next day
"""
    
    (day_folder / "README.md").write_text(readme, encoding='utf-8')
    
    # Create topics summary
    topics_summary = f"""# Day {day} - Topic Summary (Rebalanced)

## Core Topics ({len(core_topics)} topics) - 70-80% Focus

"""
    for topic_name, topic_info in core_topics.items():
        display_name = topic_name.replace('-', ' ').title()
        topics_summary += f"### {display_name}\n"
        topics_summary += f"- **Path**: `../../{topic_info['path']}`\n"
        topics_summary += f"- **Priority**: {topic_info['priority']}\n"
        topics_summary += f"- **Category**: CORE\n"
        topics_summary += f"- **Status**: [ ] Not Started | [ ] In Progress | [ ] Completed\n"
        topics_summary += "\n"
    
    if extra_topics:
        topics_summary += f"""
## Extra Topics ({len(extra_topics)} topics) - 20-30% Focus (Optional)

"""
        for topic_name, topic_info in extra_topics.items():
            display_name = topic_name.replace('-', ' ').title()
            topics_summary += f"### {display_name}\n"
            topics_summary += f"- **Path**: `../../{topic_info['path']}`\n"
            topics_summary += f"- **Priority**: {topic_info['priority']}\n"
            topics_summary += f"- **Category**: EXTRA (For hightech acceptance)\n"
            topics_summary += f"- **Status**: [ ] Not Started | [ ] In Progress | [ ] Completed\n"
            topics_summary += "\n"
    
    (day_folder / "topics.md").write_text(topics_summary, encoding='utf-8')

def rebalance_all_days():
    """Rebalance all 75 days"""
    base_dir = Path("daily-schedule")
    base_dir.mkdir(exist_ok=True)
    
    for day in range(1, 76):
        create_rebalanced_day_folder(day)
        if day % 10 == 0:
            print(f"Rebalanced days 1-{day}...")
    
    print(f"\nSUCCESS: Rebalanced all 75 days!")
    print(f"Core topics: {len(CORE_TOPICS)} topics (70-80% focus)")
    print(f"Extra topics: {len(EXTRA_TOPICS)} topics (20-30% focus)")
    print(f"\nSchedule now prioritizes core fullstack topics for junior interviews!")

if __name__ == '__main__':
    rebalance_all_days()
