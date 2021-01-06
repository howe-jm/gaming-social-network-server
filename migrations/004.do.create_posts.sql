CREATE TABLE entity (
    entity_id BIGSERIAL PRIMARY KEY
);

CREATE TABLE entity_comment (
    id BIGSERIAL PRIMARY KEY,
    entity_id BIGSERIAL REFERENCES entity(entity_id) ON DELETE CASCADE,
    user_id BIGSERIAL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    comment_text TEXT NOT NULL
);

CREATE TABLE entity_post (
    id BIGSERIAL PRIMARY KEY,
    entity_id BIGSERIAL REFERENCES entity(entity_id) ON DELETE CASCADE,
    user_id BIGSERIAL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    post_text TEXT NOT NULL
);

CREATE TABLE entity_like (
    id BIGSERIAL PRIMARY KEY,
    entity_id BIGSERIAL REFERENCES entity(entity_id) ON DELETE CASCADE,
    user_id BIGSERIAL REFERENCES users(id) ON DELETE CASCADE
);