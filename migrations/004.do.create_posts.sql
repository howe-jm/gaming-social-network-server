CREATE TABLE entity (
    id BIGSERIAL PRIMARY KEY
);

CREATE TABLE entity_comment (
    id BIGSERIAL PRIMARY KEY,
    entity_id BIGINT REFERENCES entity(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    parent_comment_id BIGINT DEFAULT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    comment_text TEXT NOT NULL
);

CREATE TABLE entity_post (
    id BIGSERIAL PRIMARY KEY,
    entity_id BIGINT REFERENCES entity(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    post_text TEXT NOT NULL
);

CREATE TABLE entity_like (
    id BIGSERIAL PRIMARY KEY,
    entity_id BIGINT REFERENCES entity(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE
);