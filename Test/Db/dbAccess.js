const dbAccess = require('./../../Db/dbAccess.js');


function testMkInsertManyStmt() {
  var stmt = 'INSERT INTO X (c0, c1) VALUES %L;';
  var rows = [[1,2], [2,3], [3,4]];
  var resStmt = dbAccess.mkInsertManyStmt(stmt, rows);
  var exStmt = "\
  INSERT INTO X (c0, c1) VALUES ('1', '2'), ('2', '3'), ('3', '4');\
  ".trim();
  if (resStmt == exStmt) {
    return true;
  }
  return false;
}


console.log(testMkInsertManyStmt())