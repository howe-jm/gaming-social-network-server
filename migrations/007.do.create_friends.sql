CREATE TABLE friends (
    friends_id BIGSERIAL PRIMARY KEY,
    created TIMESTAMPTZ default now(),
    user_a INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    user_b INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    pending BOOLEAN NOT NULL DEFAULT true
);