// console.log("hello");

// var Twit = require("node_modules/twit");

// var config = require('./config');
// var T = new Twit(config);

// var stream = T.stream('user');

// stream.on('follow', followed);


// var trashTalk = ['Get your scores up son',
//                  'You will be destroyed!!',
//                  "Let's see your skills",
//                  'Where you at',
//                  "Bet you can't make it past level 1",
//                  "Why are you even playing?",
//                  "What are you new?!",
//                  "I remember my first game",
//                  "My grandmother plays better and she's blind!!"
//                  ];


//***********************************************************************


// var config = {
//     apiKey: "AIzaSyCeEdbptSgwYvaauKF0rXygmJslgz60IMo",
//     authDomain: "gametest-30d24.firebaseapp.com",
//     databaseURL: "https://gametest-30d24.firebaseio.com",
//     projectId: "gametest-30d24",
//     storageBucket: "gametest-30d24.appspot.com",
//     messagingSenderId: "653895862521"
//   };

//   firebase.initializeApp(config);

//   var database = firebase.database();
//   var ref = database.ref('users');

//   var currentUser = $('#currentUser');

//   var clickButton = $('#click');
//   var submitScore = $('#submitScore');

//   var score = $('#score');

//   var clickCounter = 0;

//   var userId;

//   var data;

//   $('#click').on('click', newScore);
//   $('#submitScore').on('click', storeData);
//   $('#logIn').on('click', logIn);
//   $('#signUp').on('click', signUp);
//   $('#logOut').on('click', logOut);
 

//   getScores();

//   function newScore(){
//   	clickCounter++;
//   	score.html(clickCounter);
//   }

//   function logIn(){
//   	email = $('#emailInput').val();
//   	pass = $('#passwordInput').val();

//   	var auth = firebase.auth();
//   	var promise = auth.signInWithEmailAndPassword(email, pass);
//   	promise.catch(e => console.log(e.message));

//   	clickCounter = 0;

//   }

//   function signUp(){
//   	var email = $('#emailInput').val();
//   	var pass = $('#passwordInput').val();
//   	var auth = firebase.auth();
//   	var promise = auth.createUserWithEmailAndPassword(email, 
//   		pass);
//   	promise.catch(e => console.log(e.message));

//   	data = {
//   		user: $('#emailInput').val(),
  		
  		
//   	};
//   	console.log("sign up");
//   	console.log(data);
  	

//   }

//   function setUserId(){

//   		firebase.database().ref('users/' + userId).set(data);

//   }


//   function logOut(){
  	
//   	score.html(0);
//   	firebase.auth().signOut();
//   	$("#currentUser").html('');
//   	storeData();
//   	userId = '';

//   }

//   function storeData(){

//   	console.log(clickCounter);

//   	firebase.database().ref('users/' + userId + '/scores')
//   		.push({userScore: clickCounter});
//   	userCount++;
//   	console.log(userId);

//   }

//   firebase.auth().onAuthStateChanged(firebaseUser =>{

// 	if(firebaseUser){

		
// 		console.log("state change fired");
		
// 		// console.log(firebaseUser);
// 		$('#logOut').css("display", "block");
// 		currentEmail = $('#emailInput').val();
//   		currentPassword = $('#passwordInput').val();
//   		userId = firebaseUser.uid;

//   		$("#currentUser").html(firebaseUser.email);

//   		database.ref("/users").child(userId).once("value", function(snapshot) {
//         // storing the snapshot.val() in a variable for convenience
//         console.log("equalTo fired");
//         console.log(snapshot.val());
//         if(snapshot.val() == null){

//         	firebase.database().ref('users/' + userId).set(data);
//   			console.log(userId);
//           //SET
//         }
        
//       });

// 	} else {

// 		console.log("not logged in ");
// 		$('#logOut').css("display", "none");
// 		$('#emailInput').val('');
//   		$('#passwordInput').val('');

// 	}

// })

//   function getScores(){
	
//     firebase.database().ref('users/' + userId + '/scores').orderByChild("userScore").
//     limitToLast(1).once('value', function (snapshot) {


//      var dataObj = snapshot.val();
//               console.log(dataObj)

//             }); 
//   }

 
//   ref.on("value", function(snapshot) {	
//   		getScores();
//   })

//   //******************************************************************************



// //follow stream event: tweet on follow

//   function followed(eventMsg){
//   var random = Math.floor(Math.random() * trashTalk.length);

//   console.log(eventMsg.source);
  

//   var name = eventMsg.source.name;
//   var screenName = eventMsg.source.screen_name;
//   sendTweet("@" + screenName + " " + trashTalk[random]);
//   console.log("follow event: " + screenName);
// }
  
// //send tweet function

// function sendTweet(txt){
//   var tweet = {
//     status: txt
//   }

//   T.post('statuses/update', tweet, tweeted);

//   function tweeted(err, data, response){
//     console.log(data);
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log("it worked!");
//     }

//   }
// }

//******************************************************************************
var formDiv = $("<div>")
var emailField = $("<input>");
var passField = $("<input>");
var emailLbl = $("<label>");
var passLbl = $("<label>");
var logInBtn = $("<button>");
var logOutBtn = $("<button>");
var signUpBtn = $("<button>");


function createForm(){

  
  

  emailField.attr("type", "email");
  emailField.attr("id", "emailInput");
  passField.attr("type", "pass");
  passField.attr("id", "passwordInput");

  emailLbl.html("Email ");
  passLbl.html("Password ");

  logInBtn.attr("id", "logInBtn");
  logInBtn.text("Log In");
  logOutBtn.attr("id", "logOutBtn");
  logOutBtn.text("Log Out");
  signUpBtn.attr("id", "signUpBtn");
  signUpBtn.text("Sign Up");

  var formDiv = document.createElement("<div>");

  formDiv.attr("class", "form");

  formDiv.append(emailLbl);
  formDiv.append(emailField);

  formDiv.append(passLbl);
  formDiv.append(passField);

  formDiv.append(logInBtn);
  formDiv.append(signUpBtn);
  formDiv.append(logOutBtn);


}

createForm();






























