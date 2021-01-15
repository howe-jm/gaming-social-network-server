const app = require('../app');
const { expect } = require('chai');
const request = require('supertest');
const { createTables, dropTables, createUser } = require('./testHelpers');

describe('/comments', () => {
  it('/comments should create and return a comment', async () => {
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
    const { body } = await request(app)
      .post('/posts')
      .send(newPost)
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' });

    const newComment = {
      comment_text: 'Test text',
      entity_id: '1',
      user_id: '1',
    };
    const { bodyComment } = await request(app)
      .post('/comments')
      .send(newComment)
      .set({ Authorization: `Bearer ${token}`, Accept: 'application/json' })
      .expect(200)
      .expect((res) => {
        expect(res.body.comment.comment_text).to.eql(newComment.comment_text);
        expect(res.body.comment.entity_id).to.eql(newComment.entity_id);
        expect(res.body.comment.user_id).to.eql(newComment.user_id);
        expect(res.body.comment).to.have.property('id');
      });
  });
});
