# My List - OTT Platform Backend Feature

This project implements the **"My List"** feature for an OTT platform, where users can save movies and TV shows to a personal list. It includes API endpoints to add, remove, and fetch saved content, built using **Node.js**, **Express**, **MongoDB**, and **TypeScript**, following an MVC architecture.

---

## Features

- Add content (Movie or TV Show) to a user’s list
- Prevent duplicates (same content can’t be added twice)
- Remove content from the list
- Paginated retrieval of "My List" items
- Basic content-type validation using enums
- Unit and integration tests using Jest and Supertest
- Dockerized for easy setup

---

## 🛠 Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **MongoDB** (Mongoose ODM)
- **Jest** for testing
- **Docker** + **Docker Compose**

---

##  Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/) installed and running
- Optional: [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed if you want to run it without Docker

---

##  Getting Started

### 1. Clone the repo

git clone https://github.com/your-username/my-list.git
cd my-list

### 2. Start with Docker

docker-compose build
docker-compose up

_____________________________________________________________________________

#### My List Feature - Backend for OTT Platform

Welcome to the My List feature backend! This is a simple API that lets users manage their personal list of movies and TV shows on the platform. You can add, remove, and view items in your list, all through a straightforward set of API endpoints.

# Design Choices
1. MVC Architecture
I’ve organized the code using the Model-View-Controller (MVC) pattern:

Models: Handle the database schema (in this case, MongoDB).

Controllers: Manage the request-response cycle and call the business logic.

Services: Contain the core business logic for operations like adding, removing, and listing items.

Routes: Define the HTTP routes that map to the controllers.

2. Performance & Scalability
To ensure fast performance and scalability:

MongoDB indexes are used on userId and contentId for quick lookups.

Pagination is implemented, so only 10 items are returned per request by default, reducing the load.

The data model is designed to be lightweight. Each list item only stores essential data about the movie or TV show, making reads fast.

3. Enum Usage
To avoid errors, I’ve used an enum for ContentType (either movie or tv_show). This ensures type safety and prevents invalid data from entering the system.

4. Testing
I’ve used Jest and Supertest for testing the API endpoints. The tests simulate real API calls to ensure everything works as expected. For testing the database, mongodb-memory-server is used to create an in-memory database that mimics MongoDB without affecting the actual production database.

5. Dockerized Deployment
The backend and MongoDB are both containerized using Docker. You can easily start the whole application stack with just a few commands.

A seed script is included to populate the database with test data after the containers start up.

✅ Assumptions
Here are the assumptions I’ve made while building this feature:

1. Authentication
The project assumes user authentication is already implemented, so no login system or session management is part of this feature.

For testing, I’ve used a mock user ID (user_123).

No features for user registration or deletion are included.

3. Movies and TV Shows
I’ve used some mock data for testing purposes.

4. My List Logic
A user can add one unique movie or TV show to their list using its contentId.

If the user tries to add the same content again, a 409 Conflict is returned.

The API supports three main operations: GET, POST, and DELETE.

5. Pagination
If no pagination parameters are provided, the default values are used: limit = 10 and page = 1.

The API uses skip to paginate results, ensuring only the required records are returned.

6. Database
MongoDB is the database used, with indexes created on userId, contentId, and contentType for efficient querying.

7. Testing
Tests are written to ensure basic functionality, like adding, listing, and removing items.

In-memory MongoDB is used for testing so that no real data is affected during test runs.

8. Deployment
The backend run in Docker containers using Docker Compose.

9. No Frontend
This implementation is backend-only, meaning no UI is included. The API responses are ready for integration with a frontend.

🚀 Getting Started
To set up and run the application locally, follow these steps:

Once the backend should now be running, and you can test it by making requests to:

POST /api/mylist to add items to the list.

GET /api/mylist to retrieve the list.

DELETE /api/mylist/:id to remove items.

Running Tests
To run tests locally (if you have Jest set up):

bash
Copy
Edit
docker-compose exec backend npm test
📄 Folder Structure
src/: All source code (models, controllers, services, routes).

test/: Tests for the feature.

docker/: Docker-related files (Dockerfile, docker-compose.yml).

README.md: This file.


# Possible Improvements

## I did not have free could access so gave docker file
## I did not implement caching as go less time for the assingment
## Used my free mongodb server rather than hosting it separately for this project
## Included env in docker file which is public on git. I should have shared via email but for simplicity I have shared here.
## In delete my list api I should have done soft delete
## Using collections for movies, tvshows and users. I used mocked json
