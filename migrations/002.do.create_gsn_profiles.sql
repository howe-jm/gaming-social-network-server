CREATE TYPE hardware AS ENUM ('pc', 'ps3', 'ps4', 'ps5', 'xb360', 'xbone', 'xbseriesx', 'wii', 'switch', 'mobile');

CREATE TABLE profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    profile_url TEXT NOT NULL DEFAULT 'PLACEHOLDER FOR DEFAULT URL',
    banner_url TEXT NOT NULL DEFAULT 'PLACEHOLDER FOR DEFAULT URL',
    user_location TEXT NOT NULL,
    external_usernames TEXT NOT NULL,
    preferred_hardware hardware,
    gamer_type BOOLEAN NOT NULL DEFAULT false,
    user_bio TEXT
);