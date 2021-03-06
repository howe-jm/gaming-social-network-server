CREATE TABLE messages (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    friend_user_id BIGINT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    content TEXT,
    date_sent TIMESTAMPTZ NOT NULL DEFAULT now()
);