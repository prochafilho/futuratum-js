const fs = require('fs');
const dbAccess = require('./../dbAccess');


var QuoteImporter = function(assetName, exAssetName, quoteSrc, epInterval=0) {
    var idOnAsset = dbAccess.getIdOnAssetMap();
    var idOnSrc = dbAccess.getIdOnQuoteSrcMap();
    this.assetName = assetName;
    this.exAssetName = exAssetName
    this.quoteSrc = quoteSrc;
    this.assetId = idOnAsset[this.assetName];
    this.exAssetId = idOnAsset[this.exAssetName];
    this.epInterval = epInterval;
    this.quoteSrcId = idOnSrc[this.quoteSrc]
}

QuoteImporter.prototype.convertDtaToDbRows = function(fp) {
  throw Error('Not implemented in the base class.');
}

QuoteImporter.prototype.convertFileToDbRows = function(fp) {
  var dta = JSON.parse(fs.readFileSync(fp));
  return this.convertDtaToDbRows(
    dta, this.assetId, this.exAssetId, this.epInterval
  );
}

QuoteImporter.prototype.insertDbRows = function(dbRows) {
  var stmt = '\
  INSERT INTO ASSET_QUOTE\
  (assetid, ex_assetid, ep0, ep1, quotesrc_id, quotetype_id, val)\
  VALUES %L;\
  '.trim();
  dbAccess.insertMany(stmt, dbRows);
}

QuoteImporter.prototype.insertDataFromFile = function(fp) {
  var dbRows = this.convertFileToDbRows(fp);
  this.insertDbRows(dbRows);
}


module.exports.QuoteImporter = QuoteImporter;