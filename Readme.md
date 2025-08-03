# NirogGyan - Doctors Appointment Booking App

## Tools/libraries used

React.js  
React Router DOM  
Bootstrap   
Node.js  
Express.js  

## Improvements with more time

Create time slot picker UI for appointment booking
Add database support for doctors and appointments  
Add user authentication for admin panel  
Add form validation and error messages    

## Challenges faced and solutions

appointment failure  
The booking form submitted data, but the backend silently failed.  
Added validation and error handling on both frontend and backend to fix it.

doctor data management  
Initially planned to store doctor data in React, but scalability was limited.  
Shifted to a backend API using JSON files for dynamic and maintainable data flow.

route-level errors  
Navigation caused occasional blank pages due to incorrect route structure.  
Refactored routing using react-router-dom v6 and ensured fallback-safe navigation.