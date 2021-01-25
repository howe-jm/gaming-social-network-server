const app = require('../app');
const { expect } = require('chai');
const request = require('supertest');
const { createTables, dropTables, createUser } = require('./testHelpers');

/* 
Note: Not final test code. Will refactor post-deployment. 
These tests check the basic functionalty of the app in an inefficient manner, but they work. 
*/

describe('/post', () => {
  it('POST Should create and return a comment', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'dom',
      email: 'dom@example.com',
      password: '123456',
    });
    const newPost = {
      user_id: '1',
      post_text: 'Test post text',
    };
    const { body } = await request(app)
      .post('/posts')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .send(newPost)
      .expect(200)
      .expect((res) => {
        expect(res.body.post.post_text).to.eql(newPost.post_text);
        expect(res.body.post.user_id).to.eql(newPost.user_id);
        expect(res.body.post).to.have.property('id');
      });
  });

  it('POST Should create and return a comment', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'dom',
      email: 'dom@example.com',
      password: '123456',
    });
    const newPost = {
      user_id: '1',
      post_text: 'Test post text',
    };
    await request(app)
      .post('/posts')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .send(newPost);

    const { body } = await request(app)
      .get('/posts')
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .send(newPost)
      .expect(200)
      .expect((res) => {
        expect(res.body.posts[0].post_text).to.eql(newPost.post_text);
        expect(res.body.posts[0].user_id).to.eql(newPost.user_id);
      });
  });
});

describe('/posts/comments/:entityId', async () => {
  it('GET Returns the comments for a specific post', async () => {
    await dropTables();
    await createTables();
    const { token } = await createUser({
      username: 'dom',
      email: 'dom@example.com',
      password: '123456',
    });
    const newPost = {
      user_id: 1,
      post_text: 'Test post text',
    };
    await request(app)
      .post('/posts')
      .send(newPost)
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' });

    const newComment = {
      comment_text: 'Test text',
      entity_id: '1',
      user_id: '1',
    };
    await request(app)
      .post('/comments')
      .send(newComment)
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' });
  });

  const { body } = await request(app)
    .get('/posts/comments/1')
    .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
    .expect(200)
    .expect((res) => {
      expect(res.body.comment.comment_text).to.eql(newComment.comment_text);
      expect(res.body.comment.entity_id).to.eql(newComment.entity_id);
      expect(res.body.comment.user_id).to.eql(newComment.user_id);
      expect(res.body.comment).to.have.property('id');
    });
});
