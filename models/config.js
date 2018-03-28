var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://reporteddba:reporteddba@ds229878.mlab.com:29878/reported' , { useMongoClient: true });