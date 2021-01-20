CREATE TABLE groups (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    group_name TEXT NOT NULL UNIQUE,
    image_url TEXT NOT NULL,
    slug TEXT NOT NULL
);