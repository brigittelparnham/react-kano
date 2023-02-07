
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS users (
    user_id CHAR(32) NOT NULL,
    username TEXT NOT NULL CHECK(length(username) <= 32),
    firstname TEXT NOT NULL CHECK(length(firstname) <= 32),
    surname TEXT NOT NULL CHECK(length(surname) <= 32),
    email TEXT NOT NULL CHECK(length(email) <= 32),
    password TEXT NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS user_creations (
    creation_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT DEFAULT "untitled",
    user_id CHAR(32) NOT NULL,
    thumbnail TEXT NOT NULL,
    creation_type TEXT NOT NULL CHECK(creation_type IN ('pixel-motion','kano-code','make-art')),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS creation_reactions (
    reaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id CHAR(32) NOT NULL,
    creation_id INTEGER NOT NULL,
    reaction_type TEXT NOT NULL CHECK(reaction_type IN ('like','love','congrats')),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (creation_id) REFERENCES user_creations(creation_id)
);

COMMIT;

