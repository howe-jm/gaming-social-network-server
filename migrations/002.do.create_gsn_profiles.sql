CREATE TYPE hardware AS ENUM ('pc', 'playstation', 'xbox', 'wii', 'switch', 'mobile', 'vr');

CREATE TABLE profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    profile_url TEXT NOT NULL DEFAULT 'https://gaming-social-network.s3-us-west-2.amazonaws.com/avatar_placeholder.png',
    banner_url TEXT NOT NULL DEFAULT 'https://gaming-social-network.s3-us-west-2.amazonaws.com/banner.jpg',
    preferred_hardware hardware,
    user_bio TEXT
);
