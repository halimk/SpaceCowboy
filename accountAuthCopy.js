$(document).ready(logOut);

var config = {
    apiKey: "AIzaSyCeEdbptSgwYvaauKF0rXygmJslgz60IMo",
    authDomain: "gametest-30d24.firebaseapp.com",
    databaseURL: "https://gametest-30d24.firebaseio.com",
    projectId: "gametest-30d24",
    storageBucket: "gametest-30d24.appspot.com",
    messagingSenderId: "653895862521"
  };

  firebase.initializeApp(config);

  var database = firebase.database();
  var ref = database.ref('users');


  var clickButton = $('#click');
  var submitScore = $('#submitScore');

  var score = $('#score');

  var clickCounter = 0;

  var userId;

  var data;

  $('#click').on('click', newScore);
  $('#submitScore').on('click', storeData);
  $('#logIn').on('click', logIn);
  $('#signUp').on('click', signUp);
  $('#logOut').on('click', logOut);
 $('#play').on('click', launchGame);
 $('#play').css("display", "none");

  getScores();

  function launchGame(){
    window.location.href = "gameIndex.html";
  }

  function newScore(){
  	clickCounter++;
  	score.html(clickCounter);
  }

  function logIn(){
  	email = $('#emailInput').val();
  	pass = $('#passwordInput').val();

  	var auth = firebase.auth();
  	var promise = auth.signInWithEmailAndPassword(email, pass);

  	promise.catch(e => console.log(e.message));
      
    
     	clickCounter = 0;

    getScores();
    
    

  }

  function signUp(){
  	var email = $('#emailInput').val();
  	var pass = $('#passwordInput').val();
  	var auth = firebase.auth();
  	var promise = auth.createUserWithEmailAndPassword(email, 
  		pass);
  	promise.catch(e => console.log(e.message));

  	data = {
  		user: $('#emailInput').val(),
  		
  		
  	};
    
  	console.log("sign up");
  	console.log(data);
  	

  }

  function setUserId(){

  		firebase.database().ref('users/' + userId).set(data);

  }


  function logOut(){
  	
  	score.html(0);
  	firebase.auth().signOut();
  	$("#currentUser").html('');
  	storeData();
  	userId = '';
    $('#play').css("display", "none");

  }

  function storeData(){

  	console.log(clickCounter);

  	firebase.database().ref('users/' + userId + '/scores')
  		.push({userScore: clickCounter});
  	
  	console.log(userId);

  }

  firebase.auth().onAuthStateChanged(firebaseUser =>{

	if(firebaseUser){

		$('#play').css("display", "block");
		console.log("state change fired");
		$("#emailInput").val(firebaseUser.email);
		// console.log(firebaseUser);
		$('#logOut').css("display", "block");
		currentEmail = $('#emailInput').val();
  		currentPassword = $('#passwordInput').val();
  		userId = firebaseUser.uid;

  		$("#currentUser").html(firebaseUser.email);

  		database.ref("/users").child(userId).once("value", function(snapshot) {
        // storing the snapshot.val() in a variable for convenience
        console.log("equalTo fired");
        console.log(snapshot.val());
        if(snapshot.val() == null){

        	firebase.database().ref('users/' + userId).set(data);
  			console.log(userId);
          //SET
        }
        
      });

	} else {

		console.log("not logged in ");
		$('#logOut').css("display", "none");
		$('#emailInput').val('');
  		$('#passwordInput').val('');

	}

})



  function getScores(){
	
    firebase.database().ref('users/' + userId + '/scores').orderByChild("userScore").
    limitToLast(1).once('value', function (snapshot) {


     var dataObj = snapshot.val();
              console.log(dataObj)

            }); 
  }

 
  ref.on("value", function(snapshot) {	
  		getScores();
  })

