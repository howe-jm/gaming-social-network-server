CREATE TYPE hardware AS ENUM ('pc', 'playstation', 'xbox', 'wii', 'switch', 'mobile', 'vr');

CREATE TABLE profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    profile_url TEXT NOT NULL DEFAULT 'https://gaming-social-network.s3-us-west-2.amazonaws.com/avatar_placeholder.png',
    banner_url TEXT NOT NULL DEFAULT 'https://gaming-social-network.s3-us-west-2.amazonaws.com/banner.jpg',
    preferred_hardware hardware,
    user_bio TEXT
);
INSERT INTO profiles(user_id, user_location, external_usernames, preferred_hardware, gamer_type, user_bio) VALUES (1, 'Bentonville', '@dr0wzie', 'pc', true, 'I am a hardcore Mario Cart player, I love drinking seltzer water with a hint of caramelized bacon. I have 124 pet lizards, all named after the extras in Lord of the Ring.');