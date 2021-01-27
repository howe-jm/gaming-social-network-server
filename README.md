# Gaming Social Network Server

<a href="https://gaming-social-network.vercel.app">Link to live app{' '}</a>
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

<br/>

<h1><i>'/posts'</i> REQUIRES A VALID JWT TOKEN</h1>
<h3>GET <i>'/'</i></h3>
<span>Get all of the users posts</span>
<h3>POST <i>'/'</i></h3>
<span>Create posts under a valid JWT token</span>
<h3>GET <i>'/comments/:entityId'</i></h3>
<span>Get comments that were made under posts</span>

<br/>

<h1><i>'/comments'</i> REQUIRES A VALID JWT TOKEN</h1>
<h3>POST <i>'/'</i></h3>
<span>Create comments under a post</span>

<br/>

<h1><i>'/groups'</i> REQUIRES A VALID JWT TOKEN</h1>
<h3>GET <i>'/'</i></h3>
<span>Get all groups</span>
<h3>POST <i>'/'</i></h3>
<span>Creating a group and posting an image for the group</span>
<h3>POST <i>'/:slug/join'</i></h3>
<span>Join a specific group</span>
<h3>DELETE <i>'/:slug/leave'</i></h3>
<span>Leave a specific group</span>
<h3>GET <i>'/:slug'</i></h3>
<span>Search a specific group</span>

<br/>

<h1><i>'/favorites'</i> REQUIRES A VALID JWT TOKEN</h1>
<h3>GET <i>'/'</i></h3>
<span>Get user favorited games</span>
<h3>GET <i>'/count'</i></h3>
<span>Get total favorites for a specific game</span>
<h3>GET <i>'/:gameId'</i></h3>
<span>Gets the information for a specific game</span>
<h3>POST <i>'/'</i></h3>
<span>Add a favorite game to the user's profile</span>
<h3>DELETE<i>'/:gameId'</i></h3>
<span>Unfavorite a game from user's profile</span>

<br/>

<h1><i>'/friends'</i> REQUIRES A VALID JWT TOKEN</h1>
<h3>GET <i>'/'</i></h3>
<span>Get all current friends</span>
<h3>GET <i>'/requests'</i></h3>
<span>Get all pending friend requests</span>
<h3>DELETE <i>'/deleteFriend'</i></h3>
<span>Remove friend from user's friends list</span>
<h3>PATCH <i>'/acceptFriend'</i></h3>
<span>Accept a friend request</span>
<h3>POST <i>'/request'</i></h3>
<span>Send a friend request to another user</span>

<br/>

<h1><i>'/profiles'</i></h1>
<h3>PATCH <i>'/:username'</i></h3>
<span>Update the user's bio</span>
<h3>PATCH <i>'/:username/banner'</i></h3>
<span>Update the user's profile banner</span>
<h3>PATCH <i>'/:username/profileImage'</i></h3>
<span>Update the user's profile image</span>
<h3>GET <i>'/:username/images'</i></h3>
<span>Get all images the user has posted</span>
<h3>POST <i>'/:username/images'</i></h3>
<span>Post a new image to the user's profile</span>
<h3>PATCH <i>'/update/image'</i></h3>
<span>Send an image to the AWS server to retrieve back a valid image url</span>
