var sqlite3 = require("sqlite3").verbose();               // sqlite kütüphanesini yükledi,
const DBSOURCE = "db.sqlite";                             //sqliteın yolunu gösteriyor

let db = new sqlite3.Database(DBSOURCE, (err) => {        //sqlite a bağlandı
  if (err) {

    console.error("hello", err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");     //databese bağlanırsa submissions tablosu oluşturuyor
    db.run(
      `CREATE TABLE submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            form JSON NOT NULL,          
            status INTEGER NOT NULL
            )`,
      (err) => {
      }
    );

    // Admin bilgileri ekliyorum
    db.run(
      `CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            password TEXT NOT NULL
            )`,
      (err) => {
        if (err) {
          console.log("Table already created");
        } else {
          console.log("user table created");
          // Veritabanında admin bilgileri yoksa ekleniyor.
          var insert = "INSERT INTO users (email, password) VALUES (?, ?)";
          db.run(insert, ["admin@gmail.com", "admin"]);
        }
      }
    );
  }
});

module.exports = db;
