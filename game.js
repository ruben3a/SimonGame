var userClickedPattern = [];
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var keyPress = false ; // var that makes the starting function only be played once

var gameOver = new Audio("sounds/wrong.mp3");

// function that starts the game

$("body").keypress(function() {
    if (keyPress === false) {
        $("h1").text("level "+ level);
        nextSequence();
        keyPress = true;  
    } 
});

// function that reacts to the clicking 

$(".btn").click(function(event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    

    checkSequence(userClickedPattern.length-1);
});

// function that checks click by click if the users pattern matches the game pattern and ends the game if its game over reloading it 

function checkSequence(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("nice");
        console.log(userClickedPattern);
        console.log(gamePattern);
        
        if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      gameOver.play();
      $("body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");

      setTimeout( function() {
        $("body").removeClass("game-over");
      }, 200);

      $("body").keyPress(StartOver());

    }
}

// main function 

function nextSequence() {

    userClickedPattern=[];
    level++;
    $("#level-title").text("level "+ level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
 
}

// function that allows the game to start again without refreshing the page

function StartOver() {
    level = 0;
    gamePattern = [];
    keyPress = false;
}

//functions that give the animation and sound to the buttons

function playSound(name) {
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");

    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}



