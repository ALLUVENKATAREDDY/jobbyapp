# Jobby App

## Overview
Jobby App is a job search application built using React. This project implements authentication, job listing, filtering, and job details retrieval using APIs. The app provides a seamless experience for job seekers to browse and apply for jobs.

## Live Demo
Check out the live demo of the Jobby App here: [Jobby App Demo](https://venkatjob6.ccbp.tech/)

## Features
- **User Authentication:** Secure login and logout functionality.
- **Job Listings:** Browse jobs with filters such as employment type and salary range.
- **Search Functionality:** Find jobs based on keywords.
- **Profile Management:** Fetch and display user profile details.
- **Error Handling:** Displays appropriate messages for failed API requests.
- **Responsive UI:** Works across different screen sizes.

## Design Files
### Login Route
- ![Login (Small Screens)](https://assets.ccbp.in/frontend/content/react-js/jobby-app-login-sm-outputs.png)
- ![Login (Large Screens)](https://assets.ccbp.in/frontend/content/react-js/jobby-app-login-lg-output.png)

### Home Route
- ![Home (Small Screens)](https://assets.ccbp.in/frontend/content/react-js/jobby-app-home-sm-output.png)
- ![Home (Large Screens)](https://assets.ccbp.in/frontend/content/react-js/jobby-app-home-lg-output.png)

### Jobs Route
- ![Jobs (Small Screens)](https://assets.ccbp.in/frontend/content/react-js/jobby-app-jobs-sm-outputs.png)
- ![Jobs (Large Screens)](https://assets.ccbp.in/frontend/content/react-js/jobby-app-jobs-success-lg-output-v0.png)
- ![Jobs Failure](https://assets.ccbp.in/frontend/content/react-js/jobby-app-jobs-failure-lg-output-v0.png)

### Job Item Details Route
- ![Job Details Success](https://assets.ccbp.in/frontend/content/react-js/jobby-app-job-details-success-lg-output-v0.png)
- ![Job Details Failure](https://assets.ccbp.in/frontend/content/react-js/jobby-app-job-details-failure-lg-output.png)

### Not Found Route
- ![Not Found](https://assets.ccbp.in/frontend/content/react-js/jobby-app-not-found-lg-output-v0.png)

## Setup Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/ALLUVENKATAREDDY/jobbyapp.git
   ```
2. Navigate to the project directory:
   ```sh
   cd jobby-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the application:
   ```sh
   npm start
   ```

## Functionality
### Login Route
- Invalid credentials display an error message.
- Valid credentials navigate to the Home page.
- Unauthenticated users are redirected to the Login page.
- Authenticated users can access Home, Jobs, and Job Item Details routes.
- Authenticated users trying to access the Login page are redirected to Home.

### Home Route
- Clicking **Find Jobs** navigates to the Jobs page.

### Jobs Route
- Fetches and displays job listings with filters for employment type, salary range, and search queries.
- Handles API failures by displaying error messages and retry options.
- Clicking on a job navigates to the Job Item Details page.

### Job Item Details Route
- Fetches job details and displays similar job recommendations.
- Handles API failures by displaying appropriate messages.

### Not Found Route
- Displays a custom 404 page for invalid routes.

## API Endpoints
- **Login API:** `POST https://apis.ccbp.in/login`
- **Jobs API:** `GET https://apis.ccbp.in/jobs`
- **Job Details API:** `GET https://apis.ccbp.in/jobs/:id`

## Technologies Used
- React.js
- React Router
- Tailwind CSS
- Firebase Authentication
- JWT Token for Authentication
