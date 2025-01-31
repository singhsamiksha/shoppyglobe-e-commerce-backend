# ShoppyGlobe - Node.js Backend API

ShoppyGlobe is an e-commerce backend built with Node.js, Express, and MongoDB. This project provides APIs for managing products, authentication, and shopping cart functionality.

## Prerequisites

- **Node.js** (v16+ recommended)
- **MongoDB** (Local or Cloud-based like MongoDB Atlas)
- **npm** (or **yarn** for package management)

## Installation

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/singhsamiksha/shoppyglobe-e-commerce-backend.git
   cd shoppyglobe-backend
   ```

2. **Install Dependencies:**

   ```sh
   npm install
   ```

3. **Setup Environment Variables:**

   - Copy `.env.example` to `.env`:
     ```sh
     cp .env.example .env
     ```
   - Open `.env` and update the **MongoDB URL**:
     ```env
     MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/shoppyglobe
     JWT_SECRET=your_secret_key
     ```

## Running the Server

To start the server on **port 5000**, run:

```sh
npm start
```

For development mode with live reload:

```sh
npm run dev
```

## API Endpoints

### Authentication

- **POST /register** - Register a new user
- **POST /login** - Authenticate user and receive a JWT token

### Products

- **GET /products** - Fetch all products
- **GET /products/\*\*\*\*****:id** - Fetch product details by ID

### Cart (Protected Routes - Requires Authentication)

- **POST /cart** - Add a product to the cart
- **PUT /cart/\*\*\*\*****:id** - Update quantity of a product in the cart
- **DELETE /cart/\*\*\*\*****:id** - Remove a product from the cart

## Testing

Use [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) or **Postman** to test API endpoints.

## Linting & Formatting

Run ESLint to check for code issues:

```sh
npm run lint
```

## Deployment

- Deploy on **Render, Vercel, or DigitalOcean**.
- Ensure the environment variables are set in the hosting provider.

## License

This project is licensed under the MIT License.
