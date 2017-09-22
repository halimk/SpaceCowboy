
$(document).ready(function(){ 

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


  //************************************************************************




    var windowX = window.innerWidth;
    var windowY = window.innerHeight;
    // x-axis -> 800px, y-axis -> 600px, Canvas or WebGL -> Phaser.AUTO chooses the best
    var game = new Phaser.Game(windowX, windowY, Phaser.Auto, '',{
        preload: preload, 
        create: create, 
        update: update
    });
    var enemy1;
    var enemy2;
    var enemy3;
    var boss1;
    var enemy2wpn = false;
    var enemy3wpn = false;
    var enemyBullet1;
    var enemyBullet2;
    var enemyBullet3;
    var liveEnemylvl1=[];
    var liveEnemylvl2=[];
    var liveEnemylvl3=[];
    var hero;
    var bank;
    var projectile;
    var projectileTime = 0;
    var fireBtn;
    var weaponLevel = 1;
    var scoreCounter = 0;
    var planet;
    var cursors;
    var starBackGround;
    var boosters;
    var explosion;
    var firingTimer = 0;
    var stateText;
    var bank;
    var shipHealth;
    var scoreDisplay;
    var weaponUpgrade;
    var weaponLabel;
    var boss1hp;
    var textlvl2 = null;
    var textlvl3 = null;
    var textboss = null;
    var textwin = null;
    var textlose = null;
    var wincondition = false;
    var gotPlanetInfo = false;

    // star wars variables
    var hothUrl = "https://swapi.co/api/planets/4/";
    var tatooineUrl = "https://swapi.co/api/planets/1/";
    var kaminoUrl = "https://swapi.co/api/planets/10/";
    var mustafarUrl = "https://swapi.co/api/planets/13/";
    var rodiaUrl = "https://swapi.co/api/planets/23/";

    // variables for Kamino display
    var kaminoName;
    var kaminoClimate;
    var kaminoDiameter;
    var kaminoPopulation;
    var kaminoRotation;
    var kaminoTerrain
    var kamNameDes;
    var kamCimateDes;
    var kamDiameterDes;
    var kamPopDes;
    var kamRotationDes;
    var kamTerrainDes;

    // variables for Mustafar display
    var mustafarName;
    var mustafarClimate;
    var mustafarDiameter;
    var mustafarPopulation;
    var mustafarRotation;
    var mustafarTerrain
    var musNameDes;
    var musCimateDes;
    var musDiameterDes;
    var musPopDes;
    var musRotationDes;
    var musTerrainDes;

    // variables for Hoth display
    var hothName;
    var hothClimate;
    var hothDiameter;
    var hothPopulation;
    var hothRotation;
    var hothTerrain
    var hothNameDes;
    var hothCimateDes;
    var hothDiameterDes;
    var hothPopDes;
    var hothRotationDes;
    var hothTerrainDes;

    // variables for Rodia display
    var rodiaName;
    var rodiaClimate;
    var rodiaDiameter;
    var rodiaPopulation;
    var rodiaRotation;
    var rodiaTerrain
    var rodiaNameDes;
    var rodiaCimateDes;
    var rodiaDiameterDes;
    var rodiaPopDes;
    var rodiaRotationDes;
    var rodiaTerrainDes;

    // variables for Tatooine display
    var tatooineName;
    var tatooineClimate;
    var tatooineDiameter;
    var tatooinePopulation;
    var tatooineRotation;
    var tatooineTerrain
    var tatooineNameDes;
    var tatooineCimateDes;
    var tatooineDiameterDes;
    var tatooinePopDes;
    var tatooineRotationDes;
    var tatooineTerrainDes;

    var planetId;
    var blaster;

    var planet;
    var isGameStarted = false;
    var diameter;
    var population;
    var rotation;
    var terrain

    // this loads assets
    function preload() {
        // did this because og origin error
        game.load.crossOrigin = "anonymous";
        game.load.image("background", "https://ctabones.github.io/projectOne-images/new-background-2.png")
        game.load.atlas('hero', "https://krnaegis.github.io/sprites/PlayerShip.png","https://krnaegis.github.io/sprites/PlayerShip.json")
        game.load.atlas('laser', "https://krnaegis.github.io/sprites/Herolaser/Laser.png","https://krnaegis.github.io/sprites/Herolaser/Laser.json")
        game.load.atlas('explosion', "https://krnaegis.github.io/sprites/explosion/Explosion.png","https://krnaegis.github.io/sprites/explosion/Explosion.json")
        game.load.atlas('boss1', "https://krnaegis.github.io/sprites/Boss1/Boss1.png","https://krnaegis.github.io/sprites/Boss1/Boss1.json")
        game.load.image("planet","https://ctabones.github.io/projectOne-images/coldPlanet.png");
        game.load.image("enemy1", "https://krnaegis.github.io/sprites/EnemyShips/Enemy%20ship%20lvl%201.png");
        game.load.image("enemy2", "https://krnaegis.github.io/sprites/EnemyShips/Enemy%20lvl%202.png");
        game.load.image("enemy3", "https://krnaegis.github.io/sprites/EnemyShips/Enemy%20lvl%203.png")
        game.load.image("enemyBullet1", "https://krnaegis.github.io/sprites/enemyBullet1.png");
        game.load.image("flames", "https://ctabones.github.io/projectOne-images/flame_new.png");
        game.load.image("upgradeLbl", "https://ctabones.github.io/projectOne-images/weaponUpgrade.png");
        game.load.image("black-Background","https://ctabones.github.io/projectOne-images/black_screen.jpg");
        game.load.image("startBtn","https://ctabones.github.io/projectOne-images/start_button.png");
        game.load.image("gameOverImg", "https://ctabones.github.io/projectOne-images/gameover3.png")

        //planets
        game.load.image("kamioBg","https://ctabones.github.io/projectOne-images/kamioBackground.jpg");
        game.load.image("mustafarBg","https://ctabones.github.io/projectOne-images/mustafarBackground.jpg");
        game.load.image("hothBg","https://ctabones.github.io/projectOne-images/hothBackground.jpg");
        game.load.image("rodiaBg","https://ctabones.github.io/projectOne-images/rodiaBackground.png");
        game.load.image("tatBg","https://ctabones.github.io/projectOne-images/tatooineBackGround.jpeg");

        game.load.image("cold-planet","https://ctabones.github.io/projectOne-images/coldPlanet.png");
        game.load.image("hot-planet","https://ctabones.github.io/projectOne-images/hotPlanet.png");
        game.load.image("frozen-planet","https://ctabones.github.io/projectOne-images/frozenPlanet.png");
        game.load.image("mild-planet","https://ctabones.github.io/projectOne-images/mildPlanet.png");
        game.load.image("warm-planet","https://ctabones.github.io/projectOne-images/warmPlanet2.png");


        //Audio 
        game.load.audio("blaster", "https://ctabones.github.io/projectOne-images/panlaser.mp3")
        game.load.audio("game_over", "https://ctabones.github.io/projectOne-images/game_over.wav")
        game.load.audio("backGround-music", "https://ctabones.github.io/projectOne-images/kick_shock.wav")
        game.load.audio("booster", "https://ctabones.github.io/projectOne-images/booster.wav")
        game.load.audio("enemyExp", "https://ctabones.github.io/projectOne-images/enemyExplode.wav")
        game.load.audio("showPlanets", "https://ctabones.github.io/projectOne-images/showPlanets.mp3")        

    }
    // runs on one frame and places 
     function create() {

        starBackGround = game.add.tileSprite(0, 0, windowX, windowY, 'background');
        starBackGround.z = 0;
         // planet = createPlanet(game.world.centerX, 0)
        hero = createHero(0, 750);


        makeBoosters();
        makeProjectile();
        createEnemyBullet1();
        createEnemyBullet2();
        createEnemyBullet3();
        //  An explosion pool
        //makeExplosion();
        game.input.addPointer();
        blaster = game.add.audio("blaster");
        gameOverMp3 = game.add.audio("game_over");
        gameMusic = game.add.audio("backGround-music");
        booster = game.add.audio("booster");
        enemyExplode = game.add.audio("enemyExp");
        showPlanets = game.add.audio("showPlanets");
        
        //  shipHealth stat
        shipHealth = game.add.text(game.world.width - 120, 100, 'Shields: ' + hero.health +'%', { font: '20px Geostar Fill', fill: 'lightblue' });
        shipHealth.render = function () {
            shipHealth.text = 'Shields: ' + Math.max(hero.health, 0) +'%';
        };
        
        // Score
        scoreDisplay = game.add.text(game.world.width - 120, 130, 'Score: ' + scoreCounter, { font: '20px Geostar Fill', fill: 'lightblue' });
        scoreDisplay.render = function () {
            scoreDisplay.text = 'Score: ' + scoreCounter;
        };
        // Weapon Upgrade Label
        weaponUpgrade = game.add.text(game.world.centerX, game.world.centerY, "Weapon Upgraded!", { font: '50px Geostar Fill', fill: 'lightblue' })
        weaponUpgrade.anchor.setTo(0.5, 0.5);
        weaponUpgrade.visible = false;
    

     
        //  Text
        stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;

        //Start Screen
        blackScreen = game.add.tileSprite(0, 0, windowX, windowY, 'black-Background');
        blackScreen.alpha = .7;
        startBtn = game.add.button(game.world.centerX - 210, game.world.centerY - 120, 'startBtn', startMenu, this)
        gameMusic.loopFull();
        game.time.events.add(Phaser.Timer.SECOND * .5, boosterPlay, this);
        function boosterPlay() {
            booster.play();
        }


        //Menu Screen
        coldPlanet = game.add.sprite(game.world.centerX-500, -100, "cold-planet")
        coldPlanet.anchor.setTo(0.5, 0.5);
        coldPlanet.scale.setTo(.4, .4)
        coldPlanet.alpha = 0;
        coldPlanet.inputEnabled = true;
        coldPlanet.events.onInputDown.add(setColdplanetId,  this);
        function setColdplanetId() {
            planetId = "C";
            startGame();
              console.log(planetId)
        }

        // //GameOver -100
        // gameOverImg = game.add.sprite(game.world.centerX, game.world.centerY, "gameOverImg")
        // gameOverImg.anchor.setTo(0.5, 0.5)
        // gameOverImg.alpha = 0


        hotPlanet = game.add.sprite(game.world.centerX-250, -100, "hot-planet")
        hotPlanet.anchor.setTo(0.5, 0.5);
        hotPlanet.scale.setTo(.4, .4)
        hotPlanet.alpha = 0;
        hotPlanet.inputEnabled = true;
        hotPlanet.events.onInputDown.add(setHotplanetId,  this);
        function setHotplanetId() {
            planetId = "H";
            startGame();
              console.log(planetId)
        }
        frozenPlanet = game.add.sprite(game.world.centerX, -100, "frozen-planet")
        frozenPlanet.anchor.setTo(0.5, 0.5);
        frozenPlanet.scale.setTo(.4, .4)
        frozenPlanet.alpha = 0;
        frozenPlanet.inputEnabled = true;
        frozenPlanet.events.onInputDown.add(setFrozenplanetId, this);
        function setFrozenplanetId() {
            planetId = "F";
            startGame();
              console.log(planetId)
        }

        mildPlanet = game.add.sprite(game.world.centerX +250, -100, "mild-planet")
        mildPlanet.anchor.setTo(0.5, 0.5);
        mildPlanet.scale.setTo(.4, .4)
        mildPlanet.alpha = 0;
        mildPlanet.inputEnabled = true;
        mildPlanet.events.onInputDown.add(setMildplanetId, this);
        function setMildplanetId() {
            planetId = "M";
            startGame();
              console.log(planetId)
        }

        warmPlanet = game.add.sprite(game.world.centerX +500, -100, "warm-planet")
        warmPlanet.anchor.setTo(0.5, 0.5);
        warmPlanet.scale.setTo(.4, .4)
        warmPlanet.alpha = 0;
        warmPlanet.inputEnabled = true;
        warmPlanet.events.onInputDown.add(setWarmplanetId, this);
        function setWarmplanetId() {
            planetId = "W";
            startGame();
              console.log(planetId)
        }


        
        // Descriptions backgrounds for planets
        kamioDes = game.add.sprite(game.world.centerX, game.world.centerY+300, "kamioBg")
        kamioDes.anchor.setTo(0.5, 0.5);
        kamioDes.scale.setTo(.4, .4)
        kamioDes.alpha = 0;

        mustDes = game.add.sprite(game.world.centerX, game.world.centerY+300, "mustafarBg")
        mustDes.anchor.setTo(0.5, 0.5);
        mustDes.scale.setTo(.59, .4)
        mustDes.alpha = 0;

        hothDes = game.add.sprite(game.world.centerX, game.world.centerY+300, "hothBg")
        hothDes.anchor.setTo(0.5, 0.5);
        hothDes.scale.setTo(1.5, 1.3)
        hothDes.alpha = 0;

        rodiaDes = game.add.sprite(game.world.centerX, game.world.centerY+300, "rodiaBg")
        rodiaDes.anchor.setTo(0.5, 0.5);
        rodiaDes.scale.setTo(1.25, 1.5)
        rodiaDes.alpha = 0;

        tatDes = game.add.sprite(game.world.centerX, game.world.centerY+300, "tatBg")
        tatDes.anchor.setTo(0.5, 0.5);
        tatDes.scale.setTo( .7, .8)
        tatDes.alpha = 0;
        //********************************************** For Planet Display **********************************************************//



        // Ajax for Kamino    
            $.ajax({
                url: kaminoUrl,
                method: "GET",
                async: false,
                success: function(results) {
                     kaminoName = results.name;
                     kaminoClimate = results.climate;
                     kaminoDiameter = results.diameter;
                     kaminoPopulation = results.population;
                     kaminoRotation = results.rotation_period;
                     kaminoTerrain = results.terrain;
                     console.log(results.name);
                }
            })
        

        console.log(kaminoName)
        kamNameDes = game.add.text(game.world.centerX -350, game.world.centerY + 115, "Name: " + kaminoName)
        kamNameDes.alpha = 0;
        kamCimateDes = game.add.text(game.world.centerX -350, game.world.centerY + 165, "Climate: " + kaminoClimate)
        kamCimateDes.alpha = 0;
        kamDiameterDes = game.add.text(game.world.centerX -350, game.world.centerY + 215, "Diameter: " + kaminoDiameter)
        kamDiameterDes.alpha = 0;
        kamPopDes = game.add.text(game.world.centerX -350, game.world.centerY + 265, "Population: " + kaminoPopulation)
        kamPopDes.alpha = 0;
        kamRotationDes = game.add.text(game.world.centerX -350, game.world.centerY + 315, "Rotation: " + kaminoRotation)
        kamRotationDes.alpha = 0;      
        kamTerrainDes = game.add.text(game.world.centerX -350, game.world.centerY + 365, "Terrain: " + kaminoTerrain)
        kamTerrainDes.alpha = 0;



        // Ajax for Mustafar    
            $.ajax({
                url: mustafarUrl,
                method: "GET",
                async: false,
                success: function(results) {
                     mustafarName = results.name;
                     mustafarClimate = results.climate;
                     mustafarDiameter = results.diameter;
                     mustafarPopulation = results.population;
                     mustafarRotation = results.rotation_period;
                     mustafarTerrain = results.terrain;
                     console.log(results.name);
                }
            })

        musNameDes = game.add.text(game.world.centerX -350, game.world.centerY + 115, "Name: " + mustafarName)
        musNameDes.alpha = 0;
        musCimateDes = game.add.text(game.world.centerX -350, game.world.centerY + 165, "Climate: " + mustafarClimate)
        musCimateDes.alpha = 0;
        musDiameterDes = game.add.text(game.world.centerX -350, game.world.centerY + 215, "Diameter: " + mustafarDiameter)
        musDiameterDes.alpha = 0;
        musPopDes = game.add.text(game.world.centerX -350, game.world.centerY + 265, "Population: " + mustafarPopulation)
        musPopDes.alpha = 0;
        musRotationDes = game.add.text(game.world.centerX -350, game.world.centerY + 315, "Rotation: " + mustafarRotation)
        musRotationDes.alpha = 0;      
        musTerrainDes = game.add.text(game.world.centerX -350, game.world.centerY + 365, "Terrain: " + mustafarTerrain)
        musTerrainDes.alpha = 0;



        // Ajax for Mustafar    
            $.ajax({
                url: hothUrl,
                method: "GET",
                async: false,
                success: function(results) {
                     hothName = results.name;
                     hothClimate = results.climate;
                     hothDiameter = results.diameter;
                     hothPopulation = results.population;
                     hothRotation = results.rotation_period;
                     hothTerrain = results.terrain;
                     console.log(results);
                }
            })

        hothNameDes = game.add.text(game.world.centerX -350, game.world.centerY + 115, "Name: " + hothName)
        hothNameDes.alpha = 0;
        hothCimateDes = game.add.text(game.world.centerX -350, game.world.centerY + 165, "Climate: " + hothClimate)
        hothCimateDes.alpha = 0;
        hothDiameterDes = game.add.text(game.world.centerX -350, game.world.centerY + 215, "Diameter: " + hothDiameter)
        hothDiameterDes.alpha = 0;
        hothPopDes = game.add.text(game.world.centerX -350, game.world.centerY + 265, "Population: " + hothPopulation)
        hothPopDes.alpha = 0;
        hothRotationDes = game.add.text(game.world.centerX -350, game.world.centerY + 315, "Rotation: " + hothRotation)
        hothRotationDes.alpha = 0;      
        hothTerrainDes = game.add.text(game.world.centerX -350, game.world.centerY + 365, "Terrain: " + hothTerrain)
        hothTerrainDes.alpha = 0; 



        // Ajax for Mustafar    
            $.ajax({
                url: rodiaUrl,
                method: "GET",
                async: false,
                success: function(results) {
                     rodiaName = results.name;
                     rodiaClimate = results.climate;
                     rodiaDiameter = results.diameter;
                     rodiaPopulation = results.population;
                     rodiaRotation = results.rotation_period;
                     rodiaTerrain = results.terrain;
                     console.log(results);
                }
            })

        rodiaNameDes = game.add.text(game.world.centerX -350, game.world.centerY + 115, "Name: " + rodiaName)
        rodiaNameDes.alpha = 0;
        rodiaCimateDes = game.add.text(game.world.centerX -350, game.world.centerY + 165, "Climate: " + rodiaClimate)
        rodiaCimateDes.alpha = 0;
        rodiaDiameterDes = game.add.text(game.world.centerX -350, game.world.centerY + 215, "Diameter: " + rodiaDiameter)
        rodiaDiameterDes.alpha = 0;
        rodiaPopDes = game.add.text(game.world.centerX -350, game.world.centerY + 265, "Population: " + rodiaPopulation)
        rodiaPopDes.alpha = 0;
        rodiaRotationDes = game.add.text(game.world.centerX -350, game.world.centerY + 315, "Rotation: " + rodiaRotation)
        rodiaRotationDes.alpha = 0;      
        rodiaTerrainDes = game.add.text(game.world.centerX -350, game.world.centerY + 365, "Terrain: " + rodiaTerrain)
        rodiaTerrainDes.alpha = 0;             



        // Ajax for Tatooine    
            $.ajax({
                url: tatooineUrl,
                method: "GET",
                async: false,
                success: function(results) {
                     tatooineName = results.name;
                     tatooineClimate = results.climate;
                     tatooineDiameter = results.diameter;
                     tatooinePopulation = results.population;
                     tatooineRotation = results.rotation_period;
                     tatooineTerrain = results.terrain;
                     console.log(results);
                }
            })

        tatooineNameDes = game.add.text(game.world.centerX -350, game.world.centerY + 115, "Name: " + tatooineName)
        tatooineNameDes.alpha = 0;
        tatooineCimateDes = game.add.text(game.world.centerX -350, game.world.centerY + 165, "Climate: " + tatooineClimate)
        tatooineCimateDes.alpha = 0;
        tatooineDiameterDes = game.add.text(game.world.centerX -350, game.world.centerY + 215, "Diameter: " + tatooineDiameter)
        tatooineDiameterDes.alpha = 0;
        tatooinePopDes = game.add.text(game.world.centerX -350, game.world.centerY + 265, "Population: " + tatooinePopulation)
        tatooinePopDes.alpha = 0;
        tatooineRotationDes = game.add.text(game.world.centerX -350, game.world.centerY + 315, "Rotation: " + tatooineRotation)
        tatooineRotationDes.alpha = 0;      
        tatooineTerrainDes = game.add.text(game.world.centerX -350, game.world.centerY + 365, "Terrain: " + tatooineTerrain)
        tatooineTerrainDes.alpha = 0; 
    }   

    
    // updates every frame
    function update() {
        coldPlanet.angle += .8
        hotPlanet.angle += 3
        frozenPlanet.angle += .3
        mildPlanet.angle += 2
        warmPlanet.angle += .3

        if(isGameStarted === false) {
           hoverChecker();
        }

        if(planet) {
            planet.y -= .07;
        }

        starBackGround.tilePosition.y += 2;
        cursors = game.input.keyboard.createCursorKeys();
        controlHero(hero);
        boosters.x = hero.x
        boosters.y = hero.y + 30;
        //oveerlap projectile
        game.physics.arcade.overlap(enemy1, projectile, hitEnemy, null, this);
        game.physics.arcade.overlap(enemy2, projectile, hitEnemy, null, this);
        game.physics.arcade.overlap(enemy3, projectile, hitEnemy, null, this);
        game.physics.arcade.overlap(boss1, projectile, hitBoss, null, this);
        //overlap enemybulleet
        game.physics.arcade.overlap(hero, enemyBullet1, hitHero, null, this);
        game.physics.arcade.overlap(hero, enemyBullet2, hitHero, null, this);
        game.physics.arcade.overlap(hero, enemyBullet3, hitHero, null, this);
        //overlap enemies
        game.physics.arcade.overlap(hero, enemy1, shipCollide, null, this);
        game.physics.arcade.overlap(hero, enemy2, shipCollide, null, this);
        game.physics.arcade.overlap(hero, enemy3, shipCollide, null, this);
        if (game.time.now > firingTimer)
        {
            if (isGameStarted === true){
            enemyFires();
            };
            if (enemy2wpn === true){
                enemyFires2();
            }
            if (enemy3wpn === true){
                enemyFires3();
            }
            if (boss1hp > 1) {
                bossFires();
            }
        }
        if (boss1hp < 1 && hero.alive && wincondition === false) {
            boss1.destroy();
            wincondition = true;
        }
        if (wincondition === true) {
            youwintext();
            wincondition = null;
        }
    }
    function render() {
        for (var i = 0; i < enemy1.length; i++)
        {
        game.debug.body(enemy1.children[i]);
        }
        game.debug.body(hero);
        game.debug.body(enemyBullet1);
        game.debug.body(enemyBullet2);
        game.debug.body(enemyBullet3);
        game.debug.body(boss1);
        game.debug.body(projectile);
    }
//*************************************************************************************************
    function starWars(url) {    
        $.ajax({
            url: url,
            method: "GET",
            async: false,
            success: function(results) {
                planetName = results.name;
                climate = results.climate;
                diameter = results.diameter;
                population = results.population;
                rotation = results.rotation_period;
                terrain = results.terrain;
            }
        })
    }

    function startMenu() {
        startBtn.kill();
        showPlanets.play();

        coldPlanet.y = game.world.centerY-200;
        hotPlanet.y = game.world.centerY-200;
        frozenPlanet.y = game.world.centerY-200;
        mildPlanet.y = game.world.centerY-200;
        warmPlanet.y = game.world.centerY-200;

        game.add.tween(coldPlanet).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
        game.add.tween(hotPlanet).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
        game.add.tween(frozenPlanet).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
        game.add.tween(mildPlanet).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
        game.add.tween(warmPlanet).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
    }
    function startGame() {
        game.time.events.add(90000, launchboss1, this);
        game.time.events.add(30000, createEnemy2, this);
        game.time.events.add(60000, createEnemy3, this);
        game.time.events.add(27000, createtextlvl2, this);
        game.time.events.add(57000, createtextlvl3, this);
        game.time.events.add(87000, createtextboss, this);
        console.log(starBackGround.z)
        isGameStarted = true;
        blackScreen.visible = false;
        coldPlanet.kill();
        hotPlanet.kill();
        frozenPlanet.kill();
        mildPlanet.kill();
        warmPlanet.kill();
        kamioDes.kill();
        mustDes.kill();
        hothDes.kill();
        rodiaDes.kill();
        tatDes.kill();
        tatooineNameDes.kill();
        tatooineCimateDes.kill();
        tatooineDiameterDes.kill();
        tatooinePopDes.kill();
        tatooineRotationDes.kill();
        tatooineTerrainDes.kill();
        rodiaNameDes.kill();
        rodiaCimateDes.kill();
        rodiaDiameterDes.kill();
        rodiaPopDes.kill();
        rodiaRotationDes.kill();
        rodiaTerrainDes.kill();
        hothNameDes.kill();
        hothCimateDes.kill();
        hothDiameterDes.kill();
        hothPopDes.kill();
        hothRotationDes.kill();
        hothTerrainDes.kill();
        musNameDes.kill();
        musCimateDes.kill();
        musDiameterDes.kill();
        musPopDes.kill();
        musRotationDes.kill();
        musTerrainDes.kill();
        kamNameDes.kill();
        kamCimateDes.kill();
        kamDiameterDes.kill();
        kamPopDes.kill();
        kamRotationDes.kill();
        kamTerrainDes.kill();

        console.log(hotPlanet)
        createPlanet(game.world.centerX, 0)

    }
function hoverChecker() {
        coldPlanet.inputEnabled = true;
        if (coldPlanet.input.pointerOver()) {           
            if (gotPlanetInfo === false) {
                gotPlanetInfo = true
                game.add.tween(kamioDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(kamNameDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(kamCimateDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(kamDiameterDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(kamPopDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(kamRotationDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(kamTerrainDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);      
            }   
        } else if (hotPlanet.input.pointerOver()) {
            if(gotPlanetInfo === false) {
                starWars(mustafarUrl);
                gotPlanetInfo = true
                game.add.tween(mustDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(musNameDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(musCimateDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(musDiameterDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(musPopDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(musRotationDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(musTerrainDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
            }
        } else if (frozenPlanet.input.pointerOver()) {
            if(gotPlanetInfo === false) {
                starWars(hothUrl);
                gotPlanetInfo = true
                game.add.tween(hothDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(hothNameDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(hothCimateDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(hothDiameterDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(hothPopDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(hothRotationDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(hothTerrainDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
            }       
        } else if (mildPlanet.input.pointerOver()) {
            if(gotPlanetInfo === false) {
                starWars(rodiaUrl);
                gotPlanetInfo = true
                game.add.tween(rodiaDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(rodiaNameDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(rodiaCimateDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(rodiaDiameterDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(rodiaPopDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(rodiaRotationDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(rodiaTerrainDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
            }    
        } else if (warmPlanet.input.pointerOver()) {
            if(gotPlanetInfo === false) {
                starWars(tatooineUrl);
                gotPlanetInfo = true
                game.add.tween(tatDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(tatooineNameDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(tatooineCimateDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(tatooineDiameterDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(tatooinePopDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(tatooineRotationDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(tatooineTerrainDes).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true);
            }
        } else {
                gotPlanetInfo = false
            }





            if(gotPlanetInfo === false) {
                game.add.tween(kamioDes).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
                game.add.tween(kamNameDes).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
                game.add.tween(kamCimateDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(kamDiameterDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(kamPopDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(kamRotationDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(kamTerrainDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);

                game.add.tween(mustDes).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
                game.add.tween(musNameDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(musCimateDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(musDiameterDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(musPopDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(musRotationDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(musTerrainDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);

                game.add.tween(hothDes).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
                game.add.tween(hothNameDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(hothCimateDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(hothDiameterDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(hothPopDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(hothRotationDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(hothTerrainDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);

                game.add.tween(rodiaDes).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
                game.add.tween(rodiaNameDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(rodiaCimateDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(rodiaDiameterDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(rodiaPopDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(rodiaRotationDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(rodiaTerrainDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);

                game.add.tween(tatDes).to( { alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
                game.add.tween(tatooineNameDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(tatooineCimateDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(tatooineDiameterDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(tatooinePopDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(tatooineRotationDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
                game.add.tween(tatooineTerrainDes).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
            }
            
        }
    function youwintext(){
        textwin = game.add.text(game.world.centerX, game.world.centerY, "YOU WIN!!");
        textwin.anchor.setTo(0.5);
        textwin.font = 'Revalia';
        textwin.fontSize = 120;
    }
    function killyouwintext(){
        textwin.destroy();
    }
    // function youlosetext(){
    //  textlose = game.add.text(game.world.centerX, game.world.centerY, "YOU LOSE!!");
    //  textlose.anchor.setTo(0.5);
    //     textlose.font = 'Revalia';
    //     textlose.fontSize = 120;
    //}
    function createtextlvl2(){
        textlvl2 = game.add.text(game.world.centerX, game.world.centerY, "LEVEL 2");
        textlvl2.anchor.setTo(0.5);
        textlvl2.font = 'Revalia';
        textlvl2.fontSize = 60;
    }
    function killtextlvl2(){
        textlvl2.destroy();
    }
    function createtextlvl3(){
        textlvl3 = game.add.text(game.world.centerX, game.world.centerY, "LEVEL 3");
        textlvl3.anchor.setTo(0.5);
        textlvl3.font = 'Revalia';
        textlvl3.fontSize = 60;
    }
    function killtextlvl3(){
        textlvl3.destroy();
    }
    function createtextboss(){
        textboss = game.add.text(game.world.centerX, game.world.centerY, "HERE COMES THE BOSS!!");
        textboss.anchor.setTo(0.5);
        textboss.font = 'Revalia';
        textboss.fontSize = 80;
    }
    function killtextboss(){
        textboss.destroy();
    }
    function launchenemy1() {
        var minSpawnRate = 1000;
        var maxSpawnRate = 1000;
        var ENEMY_SPEED = 150;
        var enemylvl1 = enemy1.getFirstExists(false);

        if (enemylvl1) {
            enemylvl1.reset(game.rnd.integerInRange(0, game.width), -20);
            enemylvl1.body.velocity.x = game.rnd.integerInRange(-300, 300);
            enemylvl1.body.velocity.y = ENEMY_SPEED;
            enemylvl1.body.drag.x = 100;

            enemylvl1.update = function(){
            enemylvl1.angle = 0 - game.math.radToDeg(Math.atan2(enemylvl1.body.velocity.x, enemylvl1.body.velocity.y));
            };
        }
        //  Send another enemy soon
        game.time.events.add(game.rnd.integerInRange(minSpawnRate, maxSpawnRate), launchenemy1);
    };
    function launchenemy2() {
        var minSpawnRate = 2000;
        var maxSpawnRate = 2000;
        var ENEMY_SPEED = 300;
        var enemylvl2 = enemy2.getFirstExists(false);

        if (enemylvl2) {
            enemylvl2.reset(game.rnd.integerInRange(0, game.width), -20);
            enemylvl2.body.velocity.x = game.rnd.integerInRange(-300, 300);
            enemylvl2.body.velocity.y = ENEMY_SPEED;
            enemylvl2.body.drag.x = 100;

            enemylvl2.update = function(){
            enemylvl2.angle = 0 - game.math.radToDeg(Math.atan2(enemylvl2.body.velocity.x, enemylvl2.body.velocity.y));
            };
        }
        //  Send another enemy soon
        game.time.events.add(game.rnd.integerInRange(minSpawnRate, maxSpawnRate), launchenemy2);
    };
    function launchenemy3() {
        var minSpawnRate = 2500;
        var maxSpawnRate = 2500;
        var ENEMY_SPEED = 50;
        var enemylvl3 = enemy3.getFirstExists(false);

        if (enemylvl3) {
            enemylvl3.reset(game.rnd.integerInRange(0, game.width), -20);
            enemylvl3.body.velocity.x = game.rnd.integerInRange(-300, 300);
            enemylvl3.body.velocity.y = ENEMY_SPEED;
            enemylvl3.body.drag.x = 100;

            enemylvl3.update = function(){
            enemylvl3.angle = 0 - game.math.radToDeg(Math.atan2(enemylvl3.body.velocity.x, enemylvl3.body.velocity.y));
            };
        }
        //  Send another enemy soon
        game.time.events.add(game.rnd.integerInRange(minSpawnRate, maxSpawnRate), launchenemy3);
    };
    function launchboss1() {
        killtextboss();
        createBoss1();
        boss1hp = 600;
        var bosslvl1 = boss1.create(800, 150, 'boss1');
            bosslvl1.anchor.setTo(0.5, 0.5);
            bosslvl1.body.moves = false;
            boss1.setAll('scale.x', 2);
            boss1.setAll('scale.y', 2);
            boss1.callAll('animations.add', 'animations', 'boss', [0,1], 4, true);
            boss1.callAll('play', null, 'boss');

    };
    function hitEnemy(enemy, projectile) {
        var explosion = explosions.getFirstExists(false);
        explosion.reset(projectile.body.x + projectile.body.halfWidth, projectile.body.y + projectile.body.halfHeight);
        explosion.body.velocity.y = enemy.body.velocity.y;
        explosion.alpha = 0.7;
        explosion.play('explosion', 10, false, true);
        projectile.kill();
        enemy.kill();
        enemyExplode.play();
        scoreCounter += 100; 
        if(scoreCounter === 500) {
                weaponLevel = 2;
                makeUpgradeLbl();
        } 
        scoreDisplay.render();
    };
    function hitBoss (boss, projectile){
        var explosion = explosions.getFirstExists(false);
        explosion.reset(projectile.body.x + projectile.body.halfWidth, projectile.body.y + projectile.body.halfHeight);
        explosion.body.velocity.y = boss.body.velocity.y;
        explosion.alpha = 0.7;
        explosion.play('explosion', 10, false, true);
        projectile.kill();
        boss1hp -= 10
        scoreCounter += 100; 
        console.log(boss1hp)
    }

    function hitHero(player, enemyBullet1) {
        var explosion = explosions.getFirstExists(false);
        explosion.reset(enemyBullet1.body.x + enemyBullet1.body.halfWidth, enemyBullet1.body.y + enemyBullet1.body.halfHeight);
        explosion.body.velocity.y = hero.body.velocity.y;
        explosion.alpha = 0.7;
        explosion.play('explosion', 10, false, true);
        enemyBullet1.kill()
        hero.damage(enemyBullet1.damageAmount)
        shipHealth.render();
        // console.log(enemyBullet1.damageAmount);
     //    console.log(shipHealth.text)
     //    console.log(hero.health);

    };
    function shipCollide(player, enemy) {
        var explosion = explosions.getFirstExists(false);
        explosion.reset(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
        explosion.body.velocity.y = enemy.body.velocity.y;
        explosion.alpha = 0.7;
        explosion.play('explosion', 30, false, true);
        enemy.kill();
        enemyExplode.play();
        hero.damage(enemy.damageAmount)
        shipHealth.render();
        // console.log(enemy1.damageAmount)
        // console.log(shipHealth.text)
        // console.log(hero.health);       
    }
    function makeExplosion() {
        explosions = game.add.group();
        explosions.enableBody = true;
        explosions.physicsBodyType = Phaser.Physics.ARCADE;
        explosions.createMultiple(30, 'explosion');
        explosions.setAll('anchor.x', 0.5);
        explosions.setAll('anchor.y', 0.5);
        explosions.setAll('scale.x', 3.5);
        explosions.setAll('scale.y', 3.5);
        explosions.forEach( function(explosion) {
            explosion.animations.add('explosion');
        });
    }
    function makeProjectile() {
         projectile = game.add.group();
         projectile.enableBody = true;
         projectile.physicsBodyType = Phaser.Physics.ARCADE;
         projectile.createMultiple(30, "laser");
         projectile.setAll("anchor.x", 0.5);
         projectile.setAll("anchor.y", 1);
         projectile.setAll("scale.x", 1);
         projectile.setAll("scale.y", 1);
         projectile.setAll("outOfBoundsKill", true);
         projectile.setAll("checkWorldBounds", true);
         projectile.callAll('animations.add', 'animations', 'fire', [0,1,2], 10, true);
         projectile.callAll('play', null, 'fire');
         projectile.forEach(function(projectile){
         projectile.damageAmount = 10;
        });
         fireBtn = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }
    function makeUpgradeLbl() {
        weaponLabel = game.add.sprite(game.world.centerX, game.world.centerY, "upgradeLbl")
        weaponLabel.anchor.setTo(0.5, 0.5);
        game.time.events.add(Phaser.Timer.SECOND * 4, fadePicture, this);
        fadePicture()
    }
    function fadePicture() {
    game.add.tween(weaponLabel).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    }
    function makeBoosters() {
        boosters = game.add.emitter(hero.x, hero.y + 10, 400);
        boosters.width = 10;
        boosters.makeParticles('flames');
        boosters.setXSpeed(30, -30);
        boosters.setYSpeed(200, 180);
        boosters.setRotation(50,-50);
        boosters.setAlpha(.5, 0.001, 400);
        boosters.setScale(0.08, 1.4, 0.08, 0.4, 2000, Phaser.Easing.Quintic.Out);
        boosters.start(false, 5000, 10);
    }

    function createPlanet (x, y) {

        if(planetId === "C") {
             planet = game.add.sprite(x, y, "cold-planet")
        } else if(planetId === "H") {
            planet = game.add.sprite(x, y, "hot-planet")
        } else if(planetId === "F") {
            planet = game.add.sprite(x, y, "frozen-planet")
        } else if(planetId === "M") {
            planet = game.add.sprite(x, y, "mild-planet")
        } else if(planetId === "W") {
            planet = game.add.sprite(x, y, "warm-planet")
        }

        planet.anchor.setTo(0.5, 0.5);
        //planet.z = 0;
        game.add.tween(planet.scale).to( { x: 5, y: 5 }, 180000, Phaser.Easing.Linear.None, true);
        planet.angle = 270;
        createEnemy1();
        makeProjectile();
        //  An explosion pool 
        makeExplosion(); 
        //GameOver -100
        gameOverImg = game.add.sprite(game.world.centerX, game.world.centerY, "gameOverImg")
        gameOverImg.anchor.setTo(0.5, 0.5)
        gameOverImg.scale.setTo(.7, .7);
        gameOverImg.alpha = 0    
    }

    function createHero(x, y) {
        var hero = game.add.sprite(x,y, "hero") // x and y are loactions to place by anchor point
        hero.anchor.setTo(0.5, 0.5);  
        game.physics.arcade.enable(hero, Phaser.Physics.ARCADE);
        hero.health = 100;
        hero.body.collideWorldBounds = true;
        hero.scale.setTo(.9, .9);
        hero.events.onKilled.add(function(){
            game.add.tween(gameOverImg).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);
            gameMusic.stop();
            boosters.kill();
            gameOverMp3.play();
            projectile.destroy();
            // if (wincondition === false){
            //     youlosetext();
            // }
        })
        //console.log(hero)
        return hero;
    }
    function createEnemy1() {
        enemy1 = game.add.group();
        enemy1.enableBody = true;
        enemy1.physicsBodyType = Phaser.Physics.ARCADE;
        enemy1.createMultiple(30, 'enemy1');
        enemy1.setAll('anchor.x', 0.5);
        enemy1.setAll('anchor.y', 0.5);
        enemy1.setAll('scale.x', 1.5);
        enemy1.setAll('scale.y', 1.5);
        enemy1.setAll('angle', 0);
        enemy1.setAll('outOfBoundsKill', true);
        enemy1.setAll('checkWorldBounds', true);
        enemy1.forEach(function(enemy){
        enemy.body.setSize(enemy.width * 3 / 4, enemy.height * 3 / 4);
        enemy.damageAmount = 20;
        })
        launchenemy1();
    }
    function createEnemy2() {
        killtextlvl2();
        enemy2 = game.add.group();
        enemy2.enableBody = true;
        enemy2.physicsBodyType = Phaser.Physics.ARCADE;
        enemy2.health = 100;
        enemy2.createMultiple(15, 'enemy2');
        enemy2.setAll('anchor.x', 0.5);
        enemy2.setAll('anchor.y', 0.5);
        enemy2.setAll('scale.x', 2);
        enemy2.setAll('scale.y', 2);
        enemy2.setAll('angle', 0);
        enemy2.setAll('outOfBoundsKill', true);
        enemy2.setAll('checkWorldBounds', true);
        enemy2.forEach(function(enemy){
        enemy.body.setSize(enemy.width * 3 / 4, enemy.height * 3 / 4);
        enemy.damageAmount = 30;
        })
        launchenemy2();
        enemy2wpn = true;
    }
    function createEnemy3() {
        killtextlvl3();
        enemy3 = game.add.group();
        enemy3.enableBody = true;
        enemy3.physicsBodyType = Phaser.Physics.ARCADE;
        enemy3.health = 200;
        enemy3.createMultiple(15, 'enemy3');
        enemy3.setAll('anchor.x', 0.5);
        enemy3.setAll('anchor.y', 0.5);
        enemy3.setAll('scale.x', 2);
        enemy3.setAll('scale.y', 2);
        enemy3.setAll('angle', 0);
        enemy3.setAll('outOfBoundsKill', true);
        enemy3.setAll('checkWorldBounds', true);
        enemy3.forEach(function(enemy){
        enemy.body.setSize(enemy.width * 3 / 4, enemy.height * 3 / 4);
        enemy.damageAmount = 40;
        })
        launchenemy3();
        enemy3wpn = true;
    }
    function createBoss1(){
        boss1 = game.add.group();
        boss1.enableBody = true;
        boss1.physicsBodyType = Phaser.Physics.ARCADE;
        boss1.health = 600;
        boss1.createMultiple(30, 'boss1');
        boss1.setAll('anchor.x', 0.5);
        boss1.setAll('anchor.y', 0.5);
        boss1.setAll('scale.x', 3);
        boss1.setAll('scale.y', 3);
        boss1.setAll('angle', 0);
        boss1.setAll('outOfBoundsKill', true);
        boss1.setAll('checkWorldBounds', true);
        boss1.callAll('animations.add', 'animations', 'boss', [0,1], 4, true);
        boss1.callAll('play', null, 'boss');


    }
    function createEnemyBullet1 (){
        enemyBullet1 = game.add.group();
        enemyBullet1.enableBody = true;
        enemyBullet1.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullet1.createMultiple(150, 'enemyBullet1');
        enemyBullet1.setAll('anchor.x', 0.5);
        enemyBullet1.setAll('anchor.y', 1);
        enemyBullet1.setAll('outOfBoundsKill', true);
        enemyBullet1.setAll('checkWorldBounds', true);
        enemyBullet1.forEach(function(enemyBullet1){
        enemyBullet1.body.setSize(enemyBullet1.width * 3 / 4, enemyBullet1.height * 3 / 4);
        enemyBullet1.damageAmount = 5;
        });
    }
    function createEnemyBullet2 (){
        enemyBullet2 = game.add.group();
        enemyBullet2.enableBody = true;
        enemyBullet2.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullet2.createMultiple(20, 'enemyBullet1');
        enemyBullet2.setAll('anchor.x', 0.5);
        enemyBullet2.setAll('anchor.y', 1);
        enemyBullet2.setAll('scale.x', 2);
        enemyBullet2.setAll('scale.y', 2);
        enemyBullet2.setAll('outOfBoundsKill', true);
        enemyBullet2.setAll('checkWorldBounds', true);
        enemyBullet2.forEach(function(enemyBullet1){
        enemyBullet1.body.setSize(enemyBullet1.width * 3 / 4, enemyBullet1.height * 3 / 4);
        enemyBullet1.damageAmount = 5;
        });
    }
    function createEnemyBullet3 (){
        enemyBullet3 = game.add.group();
        enemyBullet3.enableBody = true;
        enemyBullet3.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullet3.createMultiple(10, 'enemyBullet1');
        enemyBullet3.setAll('anchor.x', 0.5);
        enemyBullet3.setAll('anchor.y', 1);
        enemyBullet3.setAll('scale.x', 3);
        enemyBullet3.setAll('scale.y', 3);
        enemyBullet3.setAll('outOfBoundsKill', true);
        enemyBullet3.setAll('checkWorldBounds', true);
        enemyBullet3.forEach(function(enemyBullet1){
        enemyBullet1.body.setSize(enemyBullet1.width * 3 / 4, enemyBullet1.height * 3 / 4);
        enemyBullet1.damageAmount = 5;
        });
    }
   function controlHero(hero) {
        //  Reset the players velocity (movement)
        hero.body.velocity.x = 0;
        hero.body.velocity.y = 0;
        hero.animations.add('left', [1], 10, true);
        hero.animations.add('right', [2], 10, true);

        if (cursors.up.isDown) {
            hero.body.velocity.y = -400;
            hero.animations.play('up');
        } else if (cursors.down.isDown) {
            hero.body.velocity.y = 400;
            hero.animations.play('down');
        } else {
            hero.animations.stop();  //  Stand still
            hero.frame = 4;
        };
        if (cursors.left.isDown) {
            hero.body.velocity.x = -500; //  Move to the left
            hero.animations.play('left');
        } else if (cursors.right.isDown) {
            hero.body.velocity.x = 500;  //  Move to the right
            hero.animations.play('right');
        } else {
            hero.animations.stop();  //  Stand still
            hero.frame = 4;
        };
     //Move ship towards mouse pointer
        if (game.input.x < game.width - 20 &&
            game.input.x > 20 &&
            game.input.y > 20 &&
            game.input.y < game.height - 20) {
                var minDist = 200;
                var distx = game.input.x - hero.x;
                var disty = game.input.y - hero.y;
                hero.body.velocity.x = 500 * game.math.clamp(distx / minDist, -1, 1);
                hero.body.velocity.y = 500 * game.math.clamp(disty / minDist, -1, 1);
                if(isGameStarted === true) {
                    fireButton();
                }

        }        
        // Fire laser
        if(fireBtn.isDown && hero.alive) {
            if(isGameStarted === true) {
                fireButton();
            }
        }
    }

function fireButton() {   
        switch(weaponLevel) {
            case 1:
                if(game.time.now > projectileTime) {
                    laser = projectile.getFirstExists(false);
                    if(laser) {
                        blaster.play();
                        laser.reset(hero.x,hero.y);
                        laser.body.velocity.y = -700;
                        projectileTime = game.time.now + 200;
                    }
                }
            case 2:
                if(game.time.now > projectileTime) {
                    var BULLET_SPEED = 700;
                    var BULLET_SPACING = 300;
                    for (var i = 0; i < 3; i++) {
                        var bullet = projectile.getFirstExists(false);
                        if (bullet) {
                            blaster.play();
                            //  Make bullet come out of tip of ship with right angle
                            var bulletOffset = 20 * Math.sin(game.math.degToRad(hero.angle));
                            bullet.reset(hero.x, hero.y);
                            //  "Spread" angle of 1st and 3rd bullets
                            var spreadAngle;
                            if (i === 0) spreadAngle = -20;
                            if (i === 1) spreadAngle = 0;
                            if (i === 2) spreadAngle = 20;
                            bullet.angle = spreadAngle;
                            game.physics.arcade.velocityFromAngle(spreadAngle - 90, BULLET_SPEED, bullet.body.velocity);
                        }
                        projectileTime = game.time.now + BULLET_SPACING;
                    }
                }
                
        }   
    }           

    function enemyFires () {
        //  Grab the first bullet we can from the pool
        enemyBulletlvl1 = enemyBullet1.getFirstExists(false);
        liveEnemylvl1.length=0;
        enemy1.forEachAlive(function(enemylvl1){
            // put every living enemy in an array
            liveEnemylvl1.push(enemylvl1);
            });
        if (enemyBulletlvl1 && liveEnemylvl1.length > 0) {
            var random=game.rnd.integerInRange(0,liveEnemylvl1.length-1);
            // randomly select one of them
            var shooter=liveEnemylvl1[random];
            // And fire the bullet from this enemy
            enemyBulletlvl1.reset(shooter.body.x, shooter.body.y);
            game.physics.arcade.moveToObject(enemyBulletlvl1, hero, 200);
            firingTimer = game.time.now + 1000;
        }
    };
    function enemyFires2 () {
        
        //  Grab the first bullet we can from the pool
        enemyBulletlvl2 = enemyBullet2.getFirstExists(false);
        liveEnemylvl2.length=0;
        enemy2.forEachAlive(function(enemylvl2){
            // put every living enemy in an array
            liveEnemylvl2.push(enemylvl2);
            });
        if (enemyBulletlvl2 && liveEnemylvl2.length > 0) {
            var random=game.rnd.integerInRange(0,liveEnemylvl2.length-1);
            // randomly select one of them
            var shooter=liveEnemylvl2[random];
            // And fire the bullet from this enemy
            enemyBulletlvl2.reset(shooter.body.x, shooter.body.y);
            game.physics.arcade.moveToObject(enemyBulletlvl2, hero, 100);
            firingTimer = game.time.now + 1500;
        }
    };
    function enemyFires3 () {
        //  Grab the first bullet we can from the pool
        enemyBulletlvl3 = enemyBullet3.getFirstExists(false);
        liveEnemylvl3.length=0;
        enemy3.forEachAlive(function(enemylvl3){
            // put every living enemy in an array
            liveEnemylvl3.push(enemylvl3);
            });
        if (enemyBulletlvl3 && liveEnemylvl3.length > 0) {
            var random=game.rnd.integerInRange(0,liveEnemylvl3.length-1);
            // randomly select one of them
            var shooter=liveEnemylvl3[random];
            // And fire the bullet from this enemy
            enemyBulletlvl3.reset(shooter.body.x, shooter.body.y);
            game.physics.arcade.moveToObject(enemyBulletlvl3, hero, 50);
            firingTimer = game.time.now + 2000;
        }
    };
    function bossFires () {

     var BULLET_SPEED = 150;
     var BULLET_SPACING = 200;
            for (var i = 0; i < 7; i++) {
            var bullet = enemyBullet1.getFirstExists(false);
            if (bullet) {
            //  Make bullet come out of tip of ship with right angle
            var bulletOffset = 20 * Math.sin(game.math.degToRad(boss1.angle));
            bullet.reset(800, 220);
                            //  "Spread" angle of 1st and 3rd bullets
            var spreadAngle;
            var degree;
            if (i === 0) spreadAngle = -240, degree = game.rnd.integerInRange(0, 180);
            if (i === 1) spreadAngle = -220, degree = game.rnd.integerInRange(0, 180);
            if (i === 2) spreadAngle = -200, degree = game.rnd.integerInRange(0, 180);
            if (i === 3) spreadAngle = 180, degree = game.rnd.integerInRange(0, 180);
            if (i === 4) spreadAngle = 200, degree = game.rnd.integerInRange(0, 180);
            if (i === 5) spreadAngle = 220, degree = game.rnd.integerInRange(0, 180);
            if (i === 6) spreadAngle = 240, degree = game.rnd.integerInRange(0, 180);
            bullet.angle = spreadAngle;
            game.physics.arcade.velocityFromAngle(spreadAngle - degree, BULLET_SPEED, bullet.body.velocity);

            }
            firingTimer = game.time.now + 1000;
            }
    

    }
});
