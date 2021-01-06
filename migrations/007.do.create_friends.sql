CREATE TABLE friends (
    friends_id BIGSERIAL PRIMARY KEY,
    created TIMESTAMPTZ default now(),
    user_a BIGINT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    user_b BIGINT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    pending BOOLEAN NOT NULL DEFAULT true
);