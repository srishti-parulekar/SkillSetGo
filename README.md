# SkillSetGo

SkillSetGo is a dedicated NGO hiring portal with roles for Applicants, Interviewers, Hiring Managers, HR, and Admin. Applicants upload CVs screened by an ATS-friendly tool, ensuring optimal fit. Each role accesses relevant stages of the hiring process, promoting clear and efficient recruitment from application to hire.


## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Steps](#steps)
- [Future Enhancements](#future-enhancements)

## Features

- **Role-Based Access**:
   Dedicated user roles (Applicant, Interviewer, Hiring Manager, HR, Admin) for streamlined workflows and access to relevant hiring stages.

- **CV Screening**:
   Automated ATS-friendly CV screening filters applicants for better candidate alignment with the NGO’s needs.

- **Application Tracking**:
   Real-time status updates on each application step, visible to designated team members, ensuring transparency.

- **Applicant Dashboard**:
   A personalized dashboard for applicants to upload CVs, manage profiles, and track application status.

- **Collaborative Hiring**:
   Seamless sharing of applicant information across roles, supporting efficient decision-making throughout the hiring process.

## Tech Stack
- SkillSetGo leverages the MERN stack (MongoDB, Express, React, Node.js) to deliver a dynamic and responsive hiring portal.

### Steps:

1. Clone the repository:
   ```
   git clone https://github.com/srishti-parulekar/SkillSetGo.git
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Set up environment variables in the backend (`.env` file):
   ```
   MONGO_PASSWORD=<Your MongoDB Password>
   ```

4. Run the backend:
   ```
   cd backend
   node server.js
   ```

5. Run the frontend:
   ```
   cd frontend
   npm run dev
   ```

## Future Enhancements

- Automated Interview Scheduling: Integrate calendar functionality to enable candidates and interviewers to schedule and manage interview slots directly through the platform.

- Enhanced Analytics Dashboard: Provide insights into hiring trends, applicant demographics, and time-to-hire metrics to help the NGO make data-driven recruitment decisions.

- Role-Based Notifications: Add automated email or in-app notifications to keep applicants and hiring team members updated at each stage of the hiring process.

- Customizable Screening Criteria: Enable HR to define and adjust ATS screening parameters based on the role requirements to refine applicant filtering.
