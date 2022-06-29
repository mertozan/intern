var sqlite3 = require("sqlite3").verbose();
var md5 = require("md5"); // for hash

const DBSOURCE = "db.sqlite";

const form = {
  company_address: "Kızılay Ankara",
  company_area: "yazilim",
  company_email: "aytam@info.com",
  company_faks: "1231",
  company_finish_data: "123",
  company_name: "Aytam",
  company_phone: "5544232",
  company_service: "Bilisim",
  company_start_data: "123",
  company_total_week: "4",
  company_website: "aytam.com",
  employer_date: "123131",
  employer_email: "mert@gmail.cm",
  employer_name: "mert ozan",
  employer_position: "boss",
  employer_sgk_no: "31231231",
  student_class: "4",
  student_email: "furkan.m1907@gmail.com",
  student_name: "furkan mavılı",
  student_number: "150255017",
  student_phone: "05374964711",
};

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error("hello", err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            form JSON NOT NULL,
            status INTEGER NOT NULL
            )`,
      (err) => {
        if (err) {
          // Table already created
          var insert = "INSERT INTO submissions (form, status) VALUES (?, ?)";
          db.run(insert, [JSON.stringify(form), 0]);
        } else {
          // Table just created, creating some rows
          var insert = "INSERT INTO submissions (form, status) VALUES (?, ?)";
          db.run(insert, [JSON.stringify(form), 0]);
        }
      }
    );

    // create user table
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
          // Table just created, creating some rows
          var insert = "INSERT INTO users (email, password) VALUES (?, ?)";
          db.run(insert, ["admin@gmail.com", "admin"]);
        }
      }
    );
  }
});

module.exports = db;
