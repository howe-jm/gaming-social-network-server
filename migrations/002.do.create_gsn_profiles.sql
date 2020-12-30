CREATE TYPE hardware AS ENUM ('pc', 'ps3', 'ps4', 'ps5', 'xb360', 'xbone', 'xbseriesx', 'wii', 'switch', 'mobile');

CREATE TABLE profiles (
    id bigserial primary key,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    profile_url TEXT NOT NULL DEFAULT 'https://gaming-social-network.s3-us-west-2.amazonaws.com/avatar_placeholder.png',
    banner_url TEXT NOT NULL DEFAULT 'https://gaming-social-network.s3-us-west-2.amazonaws.com/banner.jpg',
    user_location TEXT NOT NULL,
    external_usernames TEXT NOT NULL,
    preferred_hardware hardware,
    gamer_type BOOLEAN NOT NULL DEFAULT false,
    user_bio TEXT
);