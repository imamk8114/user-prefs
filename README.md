# User Preference Management System
This is a sample React application that allows users to manage their preferences, including selecting a color theme and securely signing in. The application utilizes Material UI for styling and implements a secure sign-in mechanism using JWT (JSON Web Tokens).

## Features

- Choose from predefined color themes.
- Option to set a custom theme color.
#### Secure Sign-In:
- Sign in with a username and password.
- JWT token-based authentication with HttpOnly cookies for enhanced security.

## Prerequisites
Before running the application, you need to have the following installed:

- Node.js: Download and Install Node.js
- npm (Node Package Manager): npm is included with Nodejs installation

## To run locally,

Install packages from npm for both backend and frontend
```bash 
npm i
```
To run your server locally run below command from root:  
```bash 
npm run both
```

## Backend
The services are written in:
- Node.js

- Express.js

- MongoDb 


> I have made sure most of the heavy-lifting is done, and you can start off by simply cloning the repo and writing business logic.

The backed logic has been deployed on render - https://user-prefs-management.onrender.com

- Database can be created locally using MongoAtlas. 

## Schema:

User preferences has been saved in this schema itself. In case if me have many preference other than color, a seperate prefs schema can be created.
```js
	const UserSchema = new Schema({
    _id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    color: {
        type: String,
        default: 'Default'
    }
  });
```

## APIs

    BaseUrl -
        localhost: http://127.0.0.1:5000
        hosted: https://user-prefs-management.onrender.com/api/auth

### Auth Controller:

1. Route:  BaseUrl + /login


    Description: 

    Authenticates user with proper validation and sets oauth token in cookies handled by the browser.

    curl:

    ```bash
        curl --location 'https://user-prefs-management.onrender.com/api/auth/login' \

    --header 'Content-Type: application/json' \

    --data-raw '{

        "email":"naruto@gmail.com",

        "password":"naruto123"

    }'

### User Controller
    
Routes:  
        1. BaseUrl + /create-user \
        2. BaseUrl + /get-user \
        3. BaseUrl + /update-color

Description: 

    The auth token recieved after creating user/login is used authenticate users.

curl create-use:

```bash
    curl --location 'https://user-prefs-management.onrender.com/api/auth/create-user' \

    --header 'Content-Type: application/json' \

    --data-raw '{

        "email":"sasuke@gmail.com",

        "password":"sasuke123",

        "name": "sasuke"

    }'
```

curl get-user:

```bash
curl --location --request GET 'https://user-prefs-management.onrender.com/api/auth/get-user' \

--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6Im5hcnV0b0BnbWFpbC5jb20ifSwiaWF0IjoxNjk1MTU0MDY0fQ.0EEMZMS91nKueP35a4aYUnXUTzaLNkVtkw29Z3JohRk' \

```
curl update-color:

```bash
curl --location --request PUT 'hhttps://user-prefs-management.onrender.com/api/auth/update-color' \

--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6Im5hcnV0b0BnbWFpbC5jb20ifSwiaWF0IjoxNjk1MTU0MDY0fQ.0EEMZMS91nKueP35a4aYUnXUTzaLNkVtkw29Z3JohRk' \

--header 'Content-Type: application/json' \

--data '{

    "color":"dark"

}'
```
# Libraries/Tools used for authentication/encryption

- jsonwebtoken - Library for generating JSON Web Tokens (JWT) in Node.js.
- bcrypt - A library for securely hashing passwords.

