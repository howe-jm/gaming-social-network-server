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
