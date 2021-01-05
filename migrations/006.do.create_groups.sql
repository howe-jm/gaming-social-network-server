CREATE TABLE groups (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    group_name TEXT NOT NULL,
    slug TEXT NOT NULL
);

-- ALTER TABLE entity_post
--     ADD COLUMN
--         group_id BIGSERIAL REFERENCES groups(id)
--         ON DELETE SET NULL;