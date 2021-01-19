# Gaming Social Network Server

<a href="https://thegsn.xyz/">Link to live app{' '}</a>
<a href="https://github.com/domcodesjs/gaming-social-network-client">Link to client code</a>

<h1>API Documentation</h1>

<h2><i>'/auth'</i></h2>
<h3>POST <i>'/auth/login'</i></h3>
<span>Hitting the login route will post the users email and password and compare it to what is in the database</span>
<h3>GET <i>'/auth/verifyJWT'</i></h3>
<span>This route will verify the JWT that is in the user's browser, and if it is authenticated then it will return a users information</span>

| GET '/auth/verifyJWT'                                                     | POST '/auth/login'                                                                                                                      |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `{ "email": "tester@tester.com", "username": "testing1", "role": false }` | `{ "success": true, "user": { "id": "3", "email": "tester@tester.com", "username": "testing1", "role": false }, "token": "sometoken" }` |

<br/>

<h2><i>'/users'</i></h2>
<h3>POST <i>'/users/'</i></h3>
<span>Hitting this route users will be signed up needing a username, email, password in the body.</span>
<h3>GET <i>'/users/:username'</i></h3>
<span>A verified user can access their profile by hitting this route</span>

| POST '/users/'                                                                                                                           | GET '/users/:username'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `{ "success": true, "user": { "id": "4", "email": "tester2@tester.com", "username": "testing2", "role": false }, "token": "sometoken" }` | `{ "success": true, "profile": { "id": "4", "user_id": "4", "profile_url": "https://gaming-social-network.s3-us-west-2.amazonaws.com/avatar_placeholder.png", "banner_url": "https://gaming-social-network.s3-us-west-2.amazonaws.com/banner.jpg", "preferred_hardware": null, "user_bio": null, "email": "tester2@tester.com", "username": "testing2", "password": "$2b$10$UezLzEivN3KXgBjhqdBCKuGrcOfU1dBWnHeC7TTNd9ei9i8iE2ENi", "role": false, "created_at": "2021-01-19T18:52:04.605Z", "updated_at": "2021-01-19T18:52:04.605Z" } }` |
