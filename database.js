const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./database.db");

db.run(
  `CREATE TABLE IF NOT EXISTS "users" (
	"email"	TEXT NOT NULL UNIQUE,
	"password"	TEXT NOT NULL,
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);`
);

db.run(
  `CREATE TABLE IF NOT EXISTS "posts" (
	"id"	INTEGER NOT NULL UNIQUE,
	"title"	TEXT NOT NULL,
	"body"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);`
);
