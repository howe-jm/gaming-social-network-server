CREATE TABLE user_images(
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    image_url text NOT NULL
)