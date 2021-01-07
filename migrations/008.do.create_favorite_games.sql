CREATE TABLE fav_games (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    game_id TEXT NOT NULL,
    game_json TEXT NOT NULL
);