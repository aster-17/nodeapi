var db = require('../models/config'); // Requiring for mongoDB connection
var userModel = require('../models/user'); //  Requiring user model, contains schema and schema model
var Auth = require('../controllers/auth'); //  Requiring auth controller for token handling, password verification and other user related authorizations
var validator = require('validator'); // Requiring for Request validations
var message; var status; var userRecord; var currentUserRecord;
var schemaError;

exports.add = function(req, res) {

	if( req.body.firstName != '' && req.body.email != '' && req.body.passWord != ''  && req.body.userName != '' ){

        if( !validator.isEmail(req.body.email)){
            message = 'Email address is not valid'; // overriding the return message 
            status = false; // status change stage
            returnResponse(res);
        }else if( req.body.passWord.length < 6 ){
 			message = 'Password must be greater than 6 characters'; // overriding the return message 
 			status = false; // status change stage
 			returnResponse(res);
        }else{
            //console.log(Auth.encryptPassword(req.body.passWord));
        	var insertUser = new userModel({
				firstName : req.body.firstName,
				lastName : req.body.lastName,
				userName : req.body.userName,
				email : req.body.email,
				passWord : Auth.encryptPassword(req.body.passWord)
			});
		   insertUser.save(function(err){
		   	  if(err){
                schemaError = err.errmsg.split('"');  
                status = false; // status change stage
			    message = schemaError[1]+' already exists';

		   	  }else{
		   	  	userRecord = { id : insertUser._id , token : Auth.encryptToken(insertUser._id)};
			    status = true; // status change stage
			    message = 'You have been registered';
		   	  }
		   	  returnResponse(res);
					   	     
		   });	
		    // overriding the return message 
        }

	}else{
	     
	      if( req.body.firstName == '' ){
	      	message = 'First name cannot be empty'; // overriding the return message 
	      }else if( req.body.userName == '' ){
	      	message = 'Username cannot be empty'; // overriding the return message 
	      }else if( req.body.email == '' ){
	      	message = 'Email address cannot be empty'; // overriding the return message 
	      }else if( req.body.passWord == '' ){
	      	message = 'Password cannot be empty and it must be greater than 6 characters'; // overriding the return message 
	      }
	      	
	   
          status = false; // status change stage

	      returnResponse(res);
	} 
   
};

exports.login = function(req, res) {
    
   
	if( req.body.email != '' && req.body.passWord != '' ){
            var currentEncryptPassword =  Auth.encryptPassword(req.body.passWord);
            userModel.find({email: req.body.email} , function(err, user) {

            	   if( err ){
            	   	   	message = 'Something went wrong, we could not find the user.'; // overriding the return message 
                        status = false;// status change stage
                        returnResponse(res);

            	   }else if( user.length ){
                       var fetchedUser = user[0];
                       if( Auth.verifyPassword(req.body.passWord , fetchedUser.passWord) ){
                            message = 'Login successful, redirecting to home page.'; // overriding the return message 
                            status = true;// status change stage
                            userRecord = { id : fetchedUser._id , token : Auth.encryptToken(fetchedUser._id)};
                            returnResponse(res);

            	       }else{
                            message = 'Email and password do not match.'; // overriding the return message 
                            status = false;// status change stage
                            returnResponse(res); 
            	       }
            	       


                   }else{
                    	message = 'Email address does not exist.'; // overriding the return message 
                        status = false;// status change stage
                        returnResponse(res);
                   }
                  
			});
    }else{

    	  if( req.body.email == '' ){
	      	message = 'Email address cannot be empty'; // overriding the return message 
	      }else if( req.body.passWord == '' ){
	      	message = 'Password cannot be empty'; // overriding the return message 
	      }
	      
          status = false; // status change stage

	      returnResponse(res);
    }	
}	

function returnResponse(res){
   res.send(JSON.stringify({
		message : message,
		status : status,
		userRecord : userRecord
	}));
}
