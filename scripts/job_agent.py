#!/usr/bin/env python3
"""
Harshit Mishra Autonomous Job & Internship Search Script
Zero external dependencies required (uses standard library: urllib, json, smtplib).

Usage:
    python scripts/job_agent.py
"""

import json
import urllib.request
import urllib.parse
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Candidate Profile
CANDIDATE = {
    "name": "Harshit Mishra",
    "email": "harshitmishra1208@gmail.com",
    "degree": "B.Tech Information Technology (IIMT College of Engineering)",
    "skills": ["Python", "Machine Learning", "Deep Learning", "CNN", "OpenCV", "RAG", "LLM", "SQL", "Web Development"],
    "github": "https://github.com/harshit-001-it",
    "linkedin": "https://linkedin.com/in/harshit-mishra-51275b219"
}

def fetch_python_ai_jobs():
    """Fetch live Python/AI job & internship postings from public API."""
    url = "https://remoteok.com/api?tag=python"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    
    try:
        with urllib.request.urlopen(req) as response:
            if response.status == 200:
                data = json.loads(response.read().decode())
                # Skip first item if metadata
                jobs = [item for item in data if isinstance(item, dict) and 'position' in item]
                return jobs[:10]
    except Exception as e:
        print(f"[!] Error fetching jobs: {e}")
        return []
    return []

def filter_matching_jobs(jobs):
    """Filter jobs matching Harshit's skill set."""
    matched = []
    for job in jobs:
        desc = (job.get('description', '') + ' ' + job.get('position', '') + ' ' + ' '.join(job.get('tags', []))).lower()
        score = 0
        for skill in CANDIDATE['skills']:
            if skill.lower() in desc:
                score += 1
        
        if score >= 1:
            matched.append({
                "company": job.get('company', 'Unknown Company'),
                "position": job.get('position', 'Python/AI Engineer'),
                "url": job.get('url', ''),
                "score": score
            })
    return matched

def main():
    print("=" * 60)
    print("Harshit Mishra Autonomous Job & Internship Search Agent")
    print("=" * 60)
    print(f"Candidate: {CANDIDATE['name']} ({CANDIDATE['email']})")
    print(f"Degree: {CANDIDATE['degree']}")
    print("Fetching active job listings...")

    jobs = fetch_python_ai_jobs()
    print(f"Found {len(jobs)} raw listings from Remote OK API.")

    matched_jobs = filter_matching_jobs(jobs)
    print(f"Filtered {len(matched_jobs)} jobs matching Harshit's skill matrix!\n")

    for i, job in enumerate(matched_jobs, 1):
        print(f"[{i}] {job['position']} @ {job['company']}")
        print(f"    Match Score: {job['score']} skills matched")
        print(f"    Apply URL: {job['url']}")
        print("-" * 50)

    print("\nExecution complete!")
    print("To auto-send recruiter emails, connect your SMTP server settings in scripts/job_agent.py")

if __name__ == "__main__":
    main()
