CREATE TABLE IF NOT EXISTS conversations (
    id BIGSERIAL PRIMARY KEY,
    metadata TEXT
);

CREATE TABLE IF NOT EXISTS conv_participants (
    id BIGSERIAL PRIMARY KEY,
    conv_id BIGSERIAL REFERENCES conversations(id) ON DELETE CASCADE,
);

CREATE TABLE IF NOT EXISTS messages (
    id BIGSERIAL PRIMARY KEY,
    conv_id BIGSERIAL REFERENCES conversation(id) ON DELETE CASCADE,
    message_text TEXT NOT NULL
)