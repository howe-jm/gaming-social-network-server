const app = require('../app');
const { expect } = require('chai');
const request = require('supertest');
const { createTables, dropTables, createUser } = require('./testHelpers');

/* 
Note: Not final test code. Will refactor post-deployment. 
These tests check the basic functionalty of the app in an inefficient manner, but they work. 
*/

describe('/friends route', () => {
  it('GET should retrieve all current friends', async () => {
    await dropTables();
    await createTables();

    const { token } = await createUser({
      username: 'dom',
      email: 'dom@example.com',
      password: '123456',
    });

    const friendUser = {
      username: 'thatotherdom',
      email: 'domdom@example.com',
      password: '123456',
    };

    const { token: tokenTwo } = await createUser(friendUser);

    const newRequest = {
      user_b: '1',
    };

    await request(app)
      .post('/friends/request')
      .set({ Authorization: `Bearer ${tokenTwo}`, Accept: 'application/json' })
      .send(newRequest);

    const acceptRequest = {
      id: '1',
      sender: '2',
      user_id: '1',
    };

    await request(app)
      .delete('/friends/acceptFriend')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application' })
      .send(acceptRequest);

    const { body } = await request(app)
      .get('/friends')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .expect(200)
      .expect((res) => {
        expect(res.body.success).to.eql(true);
        expect(res.body.allCurrentFriends[0].username).to.eql(friendUser.username);
        expect(res.body.allCurrentFriends[0].friend_id).to.eql(acceptRequest.sender);
        expect(res.body.allCurrentFriends[0].user_a).to.eql('1');
      });
  });
});

describe('/friends/requests route', () => {
  it('GET should retrieve all sent (pending) friend requests', async () => {
    await dropTables();
    await createTables();

    const { token } = await createUser({
      username: 'dom',
      email: 'dom@example.com',
      password: '123456',
    });

    const friendUser = {
      username: 'thatotherdom',
      email: 'domdom@example.com',
      password: '123456',
    };

    const { token: tokenTwo } = await createUser(friendUser);

    const newRequest = {
      user_b: '1',
    };

    await request(app)
      .post('/friends/request')
      .set({ Authorization: `Bearer ${tokenTwo}`, Accept: 'application/json' })
      .send(newRequest);

    const { body } = await request(app)
      .get('/friends/requests')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .expect(200)
      .expect((res) => {
        expect(res.body.success).to.eql(true);
        expect(res.body.allPendingFriends[0].username).to.eql(friendUser.username);
        expect(res.body.allPendingFriends[0].sender).to.eql('2');
        expect(res.body.allPendingFriends[0]).to.have.property('id');
      });
  });
});

describe('/friends/sent route', () => {
  it('GET should return pending requests', async () => {
    await dropTables();
    await createTables();

    const { token } = await createUser({
      username: 'dom',
      email: 'dom@example.com',
      password: '123456',
    });

    const friendUser = {
      username: 'thatotherdom',
      email: 'domdom@example.com',
      password: '123456',
    };

    const { token: tokenTwo } = await createUser(friendUser);

    const newRequest = {
      user_b: '2',
    };

    await request(app)
      .post('/friends/request')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .send(newRequest);

    const { body } = await request(app)
      .get('/friends/sent')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application' })
      .expect(200)
      .expect((res) => {
        expect(res.body.success).to.eql(true);
        expect(res.body.allSentRequests[0].username).to.eql(friendUser.username);
        expect(res.body.allSentRequests[0].reciever).to.eql(newRequest.user_b);
        expect(res.body.allSentRequests[0]).to.have.property('id');
      });
  });
});

describe('/friends/deleteFriend route', () => {
  it('DELETE should delete a friend request', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'dom',
      email: 'dom@example.com',
      password: '123456',
    });
    const friendUser = {
      username: 'thatotherdom',
      email: 'domdom@example.com',
      password: '123456',
    };
    const { token: tokenTwo } = await createUser(friendUser);
    const newRequest = {
      user_b: '1',
    };
    await request(app)
      .post('/friends/request')
      .set({ Authorization: `Bearer ${tokenTwo}`, Accept: 'application/json' })
      .send(newRequest);
    const acceptRequest = {
      id: '1',
      sender: '2',
      user_id: '1',
    };
    await request(app)
      .delete('/friends/acceptFriend')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application' })
      .send(acceptRequest);

    const deleteFriend = {
      user_a: '1',
      friend_id: '2',
    };

    const { body } = await request(app)
      .delete('/friends/deleteFriend')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application' })
      .send(deleteFriend)
      .expect(200)
      .expect((res) => {
        expect(res.body.success).to.eql(true);
        expect(res.body.message).to.eql('Friend has been deleted');
      });
  });
});

describe('/friends/acceptFriend route', () => {
  it('DELETE should delete a pending friend request and add a new friend to the users friends list', async () => {
    await dropTables();
    await createTables();

    const { token } = await createUser({
      username: 'dom',
      email: 'dom@example.com',
      password: '123456',
    });

    const friendUser = {
      username: 'thatotherdom',
      email: 'domdom@example.com',
      password: '123456',
    };

    const { token: tokenTwo } = await createUser(friendUser);

    const newRequest = {
      user_b: '1',
    };

    await request(app)
      .post('/friends/request')
      .set({ Authorization: `Bearer ${tokenTwo}`, Accept: 'application/json' })
      .send(newRequest);

    const acceptRequest = {
      id: '1',
      sender: '2',
      user_id: '1',
    };

    const { body } = await request(app)
      .delete('/friends/acceptFriend')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application' })
      .send(acceptRequest)
      .expect(200)
      .expect((res) => {
        console.log(res.body);
        expect(res.body.success).to.eql(true);
        expect(res.body.acceptSelectedFriend.insertIntoFriends.user_a).to.eql(acceptRequest.sender);
        expect(res.body.acceptSelectedFriend.insertIntoFriends.friend_id).to.eql(acceptRequest.user_id);
        expect(res.body.acceptSelectedFriend.insertUserIntoFriends.friend_id).to.eql(acceptRequest.sender);
        expect(res.body.acceptSelectedFriend.insertUserIntoFriends.user_a).to.eql(acceptRequest.user_id);
      });
  });
});

describe('/friends/declineFriend route', () => {
  it('DELETE should delete a pending friend request', async () => {
    await dropTables();
    await createTables();

    const { token } = await createUser({
      username: 'dom',
      email: 'dom@example.com',
      password: '123456',
    });

    const friendUser = {
      username: 'thatotherdom',
      email: 'domdom@example.com',
      password: '123456',
    };

    const { token: tokenTwo } = await createUser(friendUser);

    const newRequest = {
      user_b: '1',
    };

    await request(app)
      .post('/friends/request')
      .set({ Authorization: `Bearer ${tokenTwo}`, Accept: 'application/json' })
      .send(newRequest);

    const declineRequest = {
      id: 1,
    };

    const { body } = await request(app)
      .delete('/friends/declineFriend')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application' })
      .send(declineRequest)
      .expect(200)
      .expect((res) => {
        expect(res.body.success).to.eql(true);
        expect(res.body.declinedFriend).to.eql(declineRequest.id);
      });
  });
});

describe('/friends/request route', () => {
  it('POST should send a new friend request', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'dom',
      email: 'dom@example.com',
      password: '123456',
    });

    await createUser({
      username: 'testuser',
      email: 'test@example.com',
      password: '123456',
    });

    const newRequest = {
      user_b: '2',
    };

    const { body } = await request(app)
      .post('/friends/request')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .send(newRequest)
      .expect(200)
      .expect((res) => {
        expect(res.body.success).to.eql(true);
        expect(res.body.request).to.have.property('id');
        expect(res.body.request.sender).to.eql('1');
        expect(res.body.request.reciever).to.eql('2');
      });
  });
});
