CREATE TABLE entity (
    entity_id BIGINT PRIMARY KEY
);

CREATE TABLE entity_comment (
    entity_id BIGINT PRIMARY KEY REFERENCES entity(entity_id) ON DELETE CASCADE,
    comment_id BIGINT REFERENCES entity(entity_id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    comment TEXT NOT NULL
);

CREATE TABLE entity_post (
    entity_id BIGINT PRIMARY KEY REFERENCES entity(entity_id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    post_text TEXT NOT NULL
);

CREATE TABLE entity_like (
    entity_id BIGINT PRIMARY KEY REFERENCES entity(entity_id) ON DELETE CASCADE,
    like_id BIGINT REFERENCES entity(entity_id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE
)