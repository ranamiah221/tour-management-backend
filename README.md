  <h1>🧳 Tour Management Backend</h1>
    <p>This is the <strong>backend service</strong> for the Tour Management System. It provides a RESTful API to support an online tour booking platform including authentication, tour CRUD, and user management.</p>

  <h2>🌐 Live API</h2>
  <p><strong>Base URL:</strong> <a href="https://tour-management-backend-ivory.vercel.app" target="_blank">https://tour-management-backend-ivory.vercel.app</a></p>

  <h2>📦 Tech Stack</h2>
  <ul>
    <li><strong>Backend:</strong> Node.js, Express.js</li>
    <li><strong>Database:</strong> MongoDB with Mongoose</li>
    <li><strong>Authentication:</strong> JWT & Google OAuth</li>
    <li><strong>Language:</strong> TypeScript</li>
    <li><strong>Hosting:</strong> Vercel</li>
  </ul>

  <h2>📁 Project Structure</h2>
  <pre>
tour-management-backend/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── app.ts
├── server.ts
└── .env
  </pre>

  <h2>🚀 Features</h2>
  <ul>
    <li>✅ User Registration and Login (Email/Password + Google OAuth)</li>
    <li>🔐 JWT-based Authentication</li>
    <li>👥 Role-Based Access (<code>USER</code>, <code>GUIDE</code>, <code>ADMIN</code>)</li>
    <li>📌 Tour Management (Create, Update, Delete, View)</li>
    <li>📅 Booking System</li>
    <li>🧪 Error Handling & Middleware</li>
    <li>🌍 REST API design</li>
  </ul>

  <h2>⚙️ Getting Started</h2>

  <h3>1. Clone the Repository</h3>
  <pre><code>git clone https://github.com/ranamiah221/tour-management-backend.git
cd tour-management-backend</code></pre>

  <h3>2. Install Dependencies</h3>
  <pre><code>npm install</code></pre>

  <h3>3. Setup Environment Variables</h3>
  <p>Create a <code>.env</code> file in the root with the following content:</p>
  <pre><code>
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:3000
  </code></pre>

  <h3>4. Run the Server (Development)</h3>
  <pre><code>npm run dev</code></pre>

  <h3>5. Build & Run (Production)</h3>
  <pre><code>npm run build
npm start</code></pre>

  <h2>📬 API Endpoints</h2>

  <h3>🔑 Auth Routes</h3>
  <table border="1" cellpadding="5" cellspacing="0">
    <tr><th>Method</th><th>Endpoint</th><th>Description</th><th>Auth</th></tr>
    <tr><td>POST</td><td>/api/auth/register</td><td>Register a new user</td><td>❌</td></tr>
    <tr><td>POST</td><td>/api/auth/login</td><td>Login existing user</td><td>❌</td></tr>
    <tr><td>POST</td><td>/api/auth/google</td><td>Google login</td><td>❌</td></tr>
  </table>

  <h3>🧑‍💼 User Routes</h3>
  <table border="1" cellpadding="5" cellspacing="0">
    <tr><th>Method</th><th>Endpoint</th><th>Description</th><th>Auth</th></tr>
    <tr><td>GET</td><td>/api/users/me</td><td>Get logged-in user info</td><td>✅</td></tr>
  </table>

  <h3>🌍 Tour Routes</h3>
  <table border="1" cellpadding="5" cellspacing="0">
    <tr><th>Method</th><th>Endpoint</th><th>Description</th><th>Auth</th></tr>
    <tr><td>GET</td><td>/api/tours</td><td>Get all tours</td><td>❌</td></tr>
    <tr><td>GET</td><td>/api/tours/:id</td><td>Get a single tour</td><td>❌</td></tr>
    <tr><td>POST</td><td>/api/tours</td><td>Create a new tour (Admin)</td><td>✅</td></tr>
    <tr><td>PUT</td><td>/api/tours/:id</td><td>Update a tour (Admin/Guide)</td><td>✅</td></tr>
    <tr><td>DELETE</td><td>/api/tours/:id</td><td>Delete a tour (Admin only)</td><td>✅</td></tr>
  </table>
    <h3>🧾 Booking Routes</h3>
  <table border="1" cellpadding="5" cellspacing="0">
    <tr><th>Method</th><th>Endpoint</th><th>Description</th><th>Auth</th></tr>
    <tr><td>POST</td><td>/api/bookings</td><td>Book a tour</td><td>✅</td></tr>
    <tr><td>GET</td><td>/api/bookings</td><td>Get bookings for user/admin</td><td>✅</td></tr>
  </table>

  <h2>🧪 Testing</h2>
  <p>You can test the API using <a href="https://www.postman.com/" target="_blank">Postman</a> or <a href="https://insomnia.rest/" target="_blank">Insomnia</a>. Use the Bearer token in headers to access protected routes:</p>
  <pre><code>Authorization: Bearer &lt;your_jwt_token&gt;</code></pre>

  <h2>🧑‍💻 Author</h2>
  <p><strong>Md Rana Rasul</strong><br>
  🔗 GitHub: <a href="https://github.com/ranamiah221" target="_blank">@ranamiah221</a></p>




