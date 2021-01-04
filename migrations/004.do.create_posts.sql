CREATE TABLE entity (
    entity_id BIGSERIAL PRIMARY KEY
);

CREATE TABLE entity_comment (
    entity_id BIGSERIAL PRIMARY KEY REFERENCES entity(entity_id) ON DELETE CASCADE,
    comment_id BIGSERIAL REFERENCES entity(entity_id) ON DELETE CASCADE,
    user_id BIGSERIAL REFERENCES users(id) ON DELETE CASCADE,
    comment TEXT NOT NULL
);

CREATE TABLE entity_post (
    entity_id BIGSERIAL PRIMARY KEY REFERENCES entity(entity_id) ON DELETE CASCADE,
    user_id BIGSERIAL REFERENCES users(id) ON DELETE CASCADE,
    post_text TEXT NOT NULL
);

CREATE TABLE entity_like (
    entity_id BIGSERIAL PRIMARY KEY REFERENCES entity(entity_id) ON DELETE CASCADE,
    like_id BIGSERIAL REFERENCES entity(entity_id) ON DELETE CASCADE,
    user_id BIGSERIAL REFERENCES users(id) ON DELETE CASCADE
)