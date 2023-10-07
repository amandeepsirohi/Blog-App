# Blog App using MERN Stack

This is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to create, edit, and publish blog posts.

## Features

> - User authentication (signup, login, logout)
> - Create, edit, and delete blog posts with a rich text editor
> - Browse and read published blog posts
> - Responsive design for mobile and desktop

## Installation
clone the repo
```console
git clone https://github.com/amandeepsirohi/Blog-App.git
```

## Install server dependencies
```console
cd api
npm install
```

## Install client dependencies
```console
cd client
npm install
```

## Set up environment variables
```console
MONGO_URI=your_mongo_db_connection_string
SECRET_KEY=your_secret_key_for_jwt
```

## Start the server and client

### Start the server
```console
cd api
nodemon index.js
```
### Start the client
```console
cd clinet
npm start
```

## Usage
> - Open your web browser and go to http://localhost:3000
> - Sign up or log in to start creating and reading blog posts.

## Dependencies

### Server (Node.js / Express.js)
> - Express.js
> - Mongoose
> - jsonwebtoken
> - bcryptjs
> - dotenv
> - multer
> - cookieParser
> - cors

## Client (React.js)
> - React
> - React Router
> - Axios
> - Tailwind

## Contributing
Feel free to open issues or pull requests for any improvements or features you'd like to add. Your contributions are always welcome!

