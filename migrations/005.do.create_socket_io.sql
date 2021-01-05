CREATE TABLE conversations (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGSERIAL REFERENCES users(id) ON DELETE CASCADE,
    metadata TEXT
);

CREATE TABLE conv_participants (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGSERIAL REFERENCES users(id) ON DELETE CASCADE,
    conv_id BIGSERIAL REFERENCES conversations(id) ON DELETE CASCADE
);

CREATE TABLE conv_messages (
    id BIGSERIAL PRIMARY KEY,
    conv_id BIGSERIAL REFERENCES conversations(id) ON DELETE CASCADE,
    user_id BIGSERIAL REFERENCES users(id) ON DELETE CASCADE,
    message_text TEXT NOT NULL
);