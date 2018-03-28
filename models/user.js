var mongoose = require('mongoose');
var newSchema = mongoose.Schema;
var userCollectionSchema = new newSchema ({
	firstName : String,
	lastName : String,
	userName : { type : String , unique: true },
	email : { type : String , unique: true },
	passWord : String
});
var userCollection = mongoose.model('userCollection' , userCollectionSchema);
module.exports = mongoose.model('userCollection');


