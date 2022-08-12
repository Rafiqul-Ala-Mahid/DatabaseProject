const mysql = require("mysql");
const dotenv = require("dotenv");
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "personal",
  password: "test123",
  database: "create_app",
  port: 3306,
});

connection.connect((err) => {
   if (err) {
     console.log(err.message);
   }
  console.log("db " + connection.state);
  
 });

class DbService {
  // static getDbServiceInstance() {
  //   return instance ? instance : new DbService();
  // }
  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM books;";
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      //console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async insertNewName(name, book_author,publication_name,category,available_book) {
    try {
      //console.log(publication_name)
      const dateAdded = new Date();
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO books (name,book_author,publication_name,category,available_book,date_added) VALUES(?,?,?,?,?,?); ";

        connection.query(query, [name, book_author, publication_name,category,available_book,dateAdded], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          //console.log("insert", result.insertId);
          resolve(result);
        });
      });
      return {
        id: insertId,
        name: name,
        book_author: book_author,
        publication_name: publication_name,
        category: category,
        available_book: available_book,
        dateAdded: dateAdded,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async deleteRowById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM books WHERE id=?";

        connection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          // console.log(result);
          resolve(result.affectedRows);
        });
      });
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async updateNameById(id, available_book) {
    try {
      var id = parseInt(id, 10);
      // console.log(id);
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE books SET available_book=? WHERE id=?";

        connection.query(query, [available_book, id], (err, result) => {
          if (err) reject(new Error(err.message));
          // console.log(result);
          resolve(result);
        });
      });
      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  
  async searchByName(name) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM books WHERE name=?;";
        connection.query(query, name, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      //console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DbService;
