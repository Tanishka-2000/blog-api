# Blog API
A backend that serves REST APIs for my blog.

## Table of Contents
+ [General Info](#general-info)
+ [Technologies](#technologies)
+ [Setup](#setup)
+ [How to Use](#how-to-use)
+ [Features](#features)
+ [Demo](#demo)

## General Info
This project serves as backend for my blog website. This project provides data for two different sites (one of them is for the readers of the blog while other is for the author of the blog). The routes that serves the author (admin route) require authentication while other (index route) doesn't.

## Technologies
+ Node
+ Express
+ Mongoose
+ Passport.js

## Setup
To run this project locally
```
# clone this repository
git clone https://github.com/Tanishka-2000/blog-api.git

# Go into the repository
cd blog-api

# Install dependencies
npm install
```
You need to add two environment variables to run this project
1. MONGODB_URL - Its value must be equal to your database URL (either local or cloud database).
2. SECRETKEY - Its value can be any random string, it is used to encrypt you json web tokens.

Once they are added
```
# Start your project
npm start

# Or start using nodemon
npm run dev 
```
## How to Use
+ You can access index routes (routes in blog-api/api/index.js) without any authentication.
+ To access admin route you need a JWT token which is provided to you on login. You will notice that there is no api for sign-in in but only for log-in. This behaviour is on purpose. To be able to log-in, you need to create a document in your database manually in 'users' collection with two fields i.e. username and password (you will find 'User' model in blog-api/models/user.js).

## Features
+ One backend for two frontend sites.
+ Authentication for admin routes.
+ Reader of blog can access a list of blogs, request a particular blog using blog id, see all comments, post comments.
+ Admin or author of blogs can access a list of all blogs (published and unpublished), publish or unpublish any blog, edit any blog, post new blog, access all comments and delete any comment.

## Demo
You can see the implementation of blog APIs in [blog website](https://github.com/Tanishka-2000/blog-website) and [blog website admin](https://github.com/Tanishka-2000/blog-website-admin).