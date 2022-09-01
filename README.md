# Nodejs Project

### Introduction
---
This is a course project I've been working on. A Backend project made using (Express, Nodejs, MongoDB). With this application you can do all the CRUD operations on all the given models user/customer/movie/genre/rental. You start by sign up as a user and there is a validation token (JWT) generated for you. You can access all the other operations using only this JWT


### Key Features
---
* Create/Update/Delete user/customer/movie/genre/rental
* Multiple user registeration
* Authentication and protecting routes using (JWT) in middlewares
* Encrypting password using (Bcrypt)
* Validation of input using (Joi)
* Unit, Integeration and TDD testing applied using (Jest,Supertest)
* Using (Compression) and (Helmet) in preparing the application for deployment

### Technologies used
---
  Server
  * Express
  * Nodejs
  * Mongoose
  * JWT (For authentication)
  * bcryptjs (For data encryption)
  * Joi (Input validation)
  * Jest (For testing)
  * Heroku (For deployment)

Database
* MongoDB (MongoDB Atlas)

### Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.
 * Open the project in your prefered code editor.
 * Go to terminal -> New terminal (If you are using VS code)
 * Run the server using ```node index.js```

Open the terminal inside your project
 * Set the following env variables to

```javascript
export vidly_jwtwebtoken= 1234
export vidly_db= your URL connection
```
### Here is the endpoints you can test in postman
 BaseURL ```https://arcane-chamber-39243.herokuapp.com/```
* POST new User ```api/users```.
* POST new Genre ```api/genres```.
* PUT genre ```api/genres/:id```.
* DELETE genre ```api/genres/:id```.
* GET genre ```api/genres/:id```.


