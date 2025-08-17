🏨 Hotel Booking Website

<img width="609" height="289" alt="image" src="https://github.com/user-attachments/assets/daa04f1e-2a13-49a2-bd5c-e0a10c6220ad" />

<img width="609" height="289" alt="image" src="https://github.com/user-attachments/assets/9542af33-de45-4af8-a070-bb8f2a784dc5" />

<img width="607" height="289" alt="image" src="https://github.com/user-attachments/assets/1dae208d-c860-4555-a99a-f69dbf5ba47c" />

Welcome to the Hotel Booking Website project—a full-stack web application designed to provide a fast and convenient hotel booking experience.

🌟 Project Overview
This is a comprehensive web application that allows users to search for, view, and book rooms at various hotels. Additionally, it includes management functionalities for privileged users to add, edit, or delete hotel information.

✨ Technologies Used
Front-end:

HTML, CSS, JavaScript: Used for building the structure, styling, and user interactions.

EJS (Embedded JavaScript): A templating engine for rendering dynamic data from the server.

Back-end:

Node.js: The server-side JavaScript runtime environment.

Express.js: A web framework for building efficient RESTful APIs.

RESTful API: Provides the endpoints for communication between the client and the server.

Database:

MongoDB: A flexible NoSQL database suitable for storing data in a JSON-like format.

Authentication & Authorization:

JSON Web Tokens (JWT): Used for secure user authentication and protecting API endpoints.

🚀 Key Features
Registration & Login: Allows users to create new accounts and log in securely.

Hotel Listings: Displays a list of hotels with detailed information (name, location, price, images, etc.).

Booking: Enables users to select a hotel and book a room online.

Hotel Management: Provides administrator-level users with functionalities to add, edit, and delete hotel information.

⚙️ How to Set Up and Run the Project
To run this project on your local machine, follow these steps:

1. Clone the Repository:

git clone <Your_repository_URL>
cd <Your_project_folder_name>

2. Install Dependencies:

npm install

3. Configure Environment Variables:
Create a .env file in the project's root directory and add the following information (replace <...> with your details):

MONGODB_URI = <Your_MongoDB_connection_string>
JWT_SECRET = <A_random_secret_string>
PORT = 3000

4. Start the Application:

npm start

The application will now be running at http://localhost:3000.

🤝 Contributing
Contributions to improve this project are welcome. If you would like to contribute, please follow these steps:

Fork this repository.

Create a new branch (git checkout -b feature/your-feature-name).

Make your changes and commit them (git commit -m 'Add new feature').

Push to your branch (git push origin feature/your-feature-name).

Create a new Pull Request
