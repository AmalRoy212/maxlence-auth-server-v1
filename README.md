# maxlence-auth-server-v1

### Steps to Run the Server

1. **Clone the repository**:
   Clone the repository to your local machine using the following command:

   ```bash
   git clone https://github.com/AmalRoy212/maxlence-auth-server-v1.git
   ```

2. **Navigate to the project directory**:
   After cloning the repository, go into the project folder:

   ```bash
   cd maxlence-auth-server-v1
   ```

3. **Install dependencies**:
   Run the following command to install all necessary dependencies from `package.json`:

   ```bash
   npm install
   ```

4. **Start the server**:
   Once the dependencies are installed, you can start the server with:

   ```bash
   npm run dev
   ```

   This will start the Node.js server, and you should see output like the following in the terminal:

   ```
   Server is running on http://localhost:5000
   ```

5. ### requests

   ```
   http://localhost:5000/api/auth/register
   ```

6. *** payload ***

    ```
        {
        "email": "emaple@example.com",
        "password": "password123",
        "first_name": "Example",
        "last_name": "Example"
        }
    ```

    ```
    http://localhost:5000/api/auth/login
    ```

7. *** payload ***

    ```
        {
        "email": "emaple@example.com",
        "password": "password123",
        }
    ```
