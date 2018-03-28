/* Requiring password-hash-and-salt for password encryption and verification*/
var password = require('md5');
/* Requiring password-hash-and-salt for password encryption and verification*/

/* Requiring moment.js for time and date handling in the entire applocation */
var moment = require('moment');
var startDate = moment(new Date()).format("YYYY-M-DD HH:mm:ss");
/* Requiring moment.js for time and date handling in the entire applocation */

/* Required for token encryption and decryption */
var crypto = require('crypto');
var EncryptionAlgorithm = 'aes-256-ctr';
var Encryptionpassword = 'bttRw';
/* Required for token encryption and decryption */


//encrypt token
exports.encryptToken = function (text){
  var cipher = crypto.createCipher(EncryptionAlgorithm,Encryptionpassword)
  var crypted = cipher.update(text+'_'+startDate,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

//decrypt token
exports.decryptToken = function (text){
  var decipher = crypto.createDecipher(EncryptionAlgorithm,Encryptionpassword)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

//encrypt Password
exports.encryptPassword = function(subject) {
   return password(subject);
}

//verifyPassword
exports.verifyPassword = function(sentPassword, storedPassword ) {

  if( password(sentPassword) === storedPassword){
     return true;
  }else{
  	return false;
  }

}	
