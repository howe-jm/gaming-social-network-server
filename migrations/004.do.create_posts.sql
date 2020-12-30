CREATE TABLE posts (
    id bigserial primary key,
    content TEXT NOT NULL,
    youtube_url TEXT,
    image_url TEXT,
    public BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
)