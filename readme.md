
# Mongoose Express CRUD Mastery

## Objective

Develop a Node.js Express application using TypeScript as the programming language, integrating MongoDB with Mongoose for user data and order management. Ensure data integrity through validation using Zod.

## Tech Stack

**Server:** 
Node.js, MongoDB, TypeScript, Mongoose




## Run Locally

Clone the project

```bash
  git clone https://github.com/Rashidaakter1/Node-Server.git
```

Go to the project directory

```bash
  cd Node-Server
```

Install dependencies

```bash
  npm install
```

Start the server with development

```bash
  npm run start:dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT=5000`

`DATABASE__URL=<your-mongodb-connection-string>`

`BCRYPT__SALTROUND=<number>`
## Data Models
### User Model

The User model is defined using Mongoose and includes the following fields:

- userId (number): A unique identifier for the user.
- username (string): The user's unique username.
- password (string): The user's password, stored securely in hashed form using bcrypt.
- fullName (object):
  - firstName (string)
  - lastName (string)
- age (number)
- email (string): The user's email, which must be unique.
- isActive (boolean): Indicates whether the user is active. Defaults to true.
- hobbies (string[]): A list of the user's hobbies.
- address (object):
- street (string)
- city (string)
- country (string)
- orders (array): A list of orders associated with the user.

### Order Model

The Order model includes the following fields:

- productName (string): The name of the product.
- price (number): The price of the product.
- quantity (number): The quantity of the product ordered.
## API Reference

### User's API Endpoints

#### Retrieve a list of all users.

```http
  GET /api/users
```

#### Create a new user.

```http
  POST /api/users/
```
#### Retrieve a user by their ID.

```http
  GET /api/users/:userId
```
#### Update a user's information.

```http
  PUT /api/users/:userId
```
#### Soft delete a user by marking them as isDeleted.

```http
   DELETE /api/users/:userId
```

### Order's API Endpoints

#### Add New Product in Order

```http
  PUT /api/users/:userId/orders
```

#### Retrieve all orders for a specific user

```http
 GET /api/users/:userId/orders
```
#### Calculate Total Price of Orders for a Specific User

```http
  GET /api/users/:userId/orders/total-price
```




## Validation

All user input is validated using either Zod to ensure data integrity.

## Error Handling

The application uses custom error handling to provide meaningful error messages. Errors are logged and sent in a consistent format to the client.

## Conclusion

This project is a complete CRUD application with user and order management, built with Node.js, Express, TypeScript, and Mongoose. It also emphasizes data validation and secure handling of sensitive information such as passwords.

