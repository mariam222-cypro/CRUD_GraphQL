const Database = require("better-sqlite3");

class DB {
  constructor(dbFile = "users.db") {
    this.db = new Database(dbFile, { verbose: console.log });

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      )
    `);
  }

  static get(table, id = null) {
    const db = new Database("users.db");
    if (id) {
      return db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id);
    }
    return db.prepare(`SELECT * FROM ${table}`).all();
  }

  static create(table, name, email) {
    const db = new Database("users.db");
    const stmt = db.prepare(`INSERT INTO ${table} (name, email) VALUES (?, ?)`);
    const info = stmt.run(name, email);
    return { id: info.lastInsertRowid, name, email };
  }

  static update(table, id, name=null, email=null) {
    const db = new Database("users.db");
    let stmt;
    if(name && email) {
        stmt = db.prepare(`UPDATE ${table} SET name = ?, email = ? WHERE id = ?`);
        stmt.run(name, email, id);
    } else if(name) {
        stmt = db.prepare(`UPDATE ${table} SET name = ? WHERE id = ?`);
        stmt.run(name, id)
    } else if(email){
        stmt = db.prepare(`UPDATE ${table} SET email = ? WHERE id = ?`);
        stmt.run(email, id)
    }

    return DB.get(table, id);
  }

  static destroy(table, id) {
    const db = new Database("users.db");
    const stmt = db.prepare(`DELETE FROM ${table} WHERE id = ?`);
    stmt.run(id);
    return { message: `User ${id} deleted` };
  }
}

module.exports = DB;
