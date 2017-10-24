const importBase = require('./importBase');


var PoloniexImporter = function(assetName, exAssetName, quoteSrc, epInterval) {
  importBase.QuoteImporter.call(this, assetName, exAssetName, quoteSrc, epInterval);
}
PoloniexImporter.prototype = Object.create(importBase.QuoteImporter.prototype);

PoloniexImporter.prototype.convertDtaToDbRows = function(dta) {
  quoteTypeMap = {
    'volume':0,
    'quoteVolume':1,
    'high':3,
    'low':4,
    'open':5,
    'close':6,
    'weightedAverage':7
  };
  var rows = [];
  for (var i = 0; i < dta.length; i += 1) {
    var ep0 = dta[i]['date'];
    var ep1 = ep0 + this.epInterval;
    var keys = Object.keys(quoteTypeMap);
    for (var j = 0; j < keys.length; j += 1) {
      row = [
        this.assetId,
        this.exAssetId,
        ep0,
        ep1,
        this.quoteSrcId,
        quoteTypeMap[keys[j]],
        dta[i][keys[j]],
      ];
      rows.push(row);
    }
  }
  return rows;
}


module.exports.PoloniexImporter = PoloniexImporter;

/*
function insertDataFromFile(fp, assetId, exAssetId, epInterval) {
  var rows = convertFileToDbRows(fp, assetId, exAssetId, epInterval);
  var stmt = '\
  INSERT INTO ASSET_QUOTE\
  (assetid, ex_assetid, ep0, ep1, quotesrc_id, quotetype_id, val)\
  VALUES %L;\
  '.trim();
  dbAccess.insertMany(stmt, rows);
}
*/
/*
function convertDtaToDbRows(dta, assetId, exAssetId, epInterval) {
  quoteTypeMap = {
    'volume':0,
    'quoteVolume':1,
    'high':3,
    'low':4,
    'open':5,
    'close':6,
    'weightedAverage':7
  };
  var rows = [];
  for (var i = 0; i < dta.length; i += 1) {
    var ep0 = dta[i]['date'];
    var ep1 = ep0 + epInterval;
    var keys = Object.keys(quoteTypeMap);
    for (var j = 0; j < keys.length; j += 1) {
      row = [
        assetId,
        exAssetId,
        ep0,
        ep1,
        1,
        quoteTypeMap[keys[j]],
        dta[i][keys[j]],
      ];
      rows.push(row);
    }
  }
  return rows;
}


function convertFileToDbRows(fp, assetId, exAssetId, epInterval) {
  var dta = JSON.parse(fs.readFileSync(fp));
  return convertDtaToDbRows(dta, assetId, exAssetId, epInterval);
}


function insertDataFromFile(fp, assetId, exAssetId, epInterval) {
  var rows = convertFileToDbRows(fp, assetId, exAssetId, epInterval);
  var stmt = '\
  INSERT INTO ASSET_QUOTE\
  (assetid, ex_assetid, ep0, ep1, quotesrc_id, quotetype_id, val)\
  VALUES %L;\
  '.trim();
  dbAccess.insertMany(stmt, rows);
}


module.exports.convertDtaToDbRows = convertDtaToDbRows;
module.exports.convertFileToDbRows = convertFileToDbRows;
module.exports.insertDataFromFile = insertDataFromFile;
*/
