#.env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/admin
JWT_SECRET="this is my website"
EMAIL_USER= email id
EMAIL_PASS=app password for email

API Documentation
Overview
This API provides endpoints for managing users, posts, and comments. It uses JWT for authentication and has middleware for role-based access control.

Base URL
http://localhost:4000
Authentication
JWT Token is required for certain routes.
Add the token in the request body as token.



Endpoints-

A.User Endpoints

1.Create User
POST- /user/create
Description: Creates a new user.
Request Body:
{
  "username": "string",
  "password": "string",
  "email": "string"
}
Response: 201 Created | 400 Bad Request | 500 Internal Server Error

2.Delete User
DELETE- /user/:id
Description: Deletes a user by ID. Requires Admin privileges.
Request body:
json
{
  "token": "string"
}
Response: 200 OK | 404 Not Found | 500 Internal Server Error

3.Login User
POST- /user/login
Description: Authenticates a user and returns a JWT token.
Request Body:
json
{
  "email": "string",
  "password": "string"
}
Response: 200 OK (with token) | 404 Not Found | 401 Unauthorized

4.Get All Users
GET- /user     #only admin can access 
Description: Fetches a list of all users. Requires Admin privileges.
Request body:
json
{
  "token": "string"
}
Response: 201 OK (list of users) | 500 Internal Server Error

5.Get User Profile
GET- /user/profile
Description: Fetches the profile of the logged-in user.
Request Body:
json
{
  "email": "string"
}
Response: 200 OK (user profile) | 404 Not Found | 500 Internal Server Error

6.Send OTP
POST- /user/otp
Description: Sends an OTP to the user's email. Requires valid token.
Request body:
json
{
  "token": "string"
}
Response: 200 OK | 500 Internal Server Error

7.Verify OTP
POST- /user/verify
Description: Verifies the OTP sent to the user's email. Requires valid token.
Request Body:
json
{
  "OTP": "string",
  "token": "string"
}
Response: 200 OK | 401 Unauthorized | 500 Internal Server Error


B.Post Endpoints

1.Create Post
POST- /post
Description: Creates a new post. Requires valid token.
Request Body:
json
{
  "title": "string",
  "content": "string"
  "token": "string"
}
Response: 201 Created | 400 Bad Request | 500 Internal Server Error

2.Read Posts
GET- /post
Description: Retrieves all posts.
Response: 200 OK (list of posts) | 500 Internal Server Error

3.Read Single Post
GET- /post/:id
Description: Retrieves a single post by ID.
Response: 200 OK (post) | 404 Not Found | 500 Internal Server Error

4.Update Post
PUT- /post/:id
Description: Updates a post by ID. Requires valid token and ownership of the post.
Request Body:
json
{
  "title": "string",
  "content": "string"
  "token": "string"
}
Response: 200 OK | 400 Bad Request | 404 Not Found | 500 Internal Server Error

5.Delete Post
DELETE- /post/:id
Description: Deletes a post by ID. Requires valid token and ownership of the post.
Request body:
json
Copy code
{
  "token": "string"
}
Response: 200 OK | 404 Not Found | 500 Internal Server Error


C.Comment Endpoints

1.Create Comment
POST- /comment
Description: Creates a new comment. Requires valid token.
Request Body:
json
{
  "content": "string",
  "post_id": "string"
  "token": "string"
}
Response: 201 Created | 500 Internal Server Error

2.Read Comments
GET- /comment
Description: Retrieves comments for a specific post.
Request Body:
json
{
  "post_id": "string"
}
Response: 200 OK (list of comments) | 500 Internal Server Error

3.Read Single Comment
GET- /comment/:id
Description: Retrieves a single comment by ID.
Response: 200 OK (comment) | 404 Not Found | 500 Internal Server Error

4.Update Comment
PUT- /comment/:id
Description: Updates a comment by ID. Requires valid token and ownership of the comment.
Request Body:
json
{
  "content": "string"
  "token": "string"
}
Response: 200 OK | 400 Bad Request | 404 Not Found | 500 Internal Server Error

5.Delete Comment
DELETE- /comment/:id
Description: Deletes a comment by ID. Requires valid token and ownership of the comment.
Request body:
json
{
  "token": "string"
}
Response: 200 OK | 404 Not Found | 500 Internal Server Error


Middleware
varifyToken / authenticateToken: Verifies JWT token.
chackBelong / chackBelongPost: Checks if the user is the author of the comment/post.
varifyAdmin: Verifies if the user has admin privileges.
