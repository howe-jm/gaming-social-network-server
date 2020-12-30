CREATE TABLE messages (
    id bigserial primary key,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    frienduser_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    content TEXT,
    date_sent TIMESTAMPTZ NOT NULL DEFAULT now()
)