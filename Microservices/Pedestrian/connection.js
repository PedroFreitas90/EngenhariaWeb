var mysql = require('mysql')


/****************************
 * MYSQL Connection 
 ****************************/


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : "SPWS"
});

connection.connect(error => {
  if (error){
    console.log("ERRO NA CONEXÃO À BD")
  }
  else
  console.log("Successfully connected to the database.");
})

module.exports = connection;