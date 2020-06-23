
var buttonColours = ["red", "blue", "green", "yellow"];

//2step-5,6
var gamePattern = [];

//4step-3
var userClickedPattern = [];

//5step-1
//playSound(userChosenColour);


//7step-1,2,3
var started = false;
var level=0;

$(document).keypress(function(){
  if(!started){

    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});

//4step-1
$(".btn").click(function() {

  //4step-2
  var userChosenColour = $(this).attr("id");

  //4step-4
  userClickedPattern.push(userChosenColour);


  playSound(userChosenColour);

  animatePress(userChosenColour);

//8step-2
  checkAnswer(userClickedPattern.length-1);

});

//2step-1,2
function nextSequence() {

userClickedPattern = [];

//7step-4,5
level++;
$("#level-title").text("Level "+level);


  var randomNumber = Math.floor(Math.random() * 4);
  //2step-4
  var randomChosenColour = buttonColours[randomNumber];
  //2step-6
  gamePattern.push(randomChosenColour);

  //3step-1,2
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  //3step-3 and 5step-4(refactored)
  playSound(randomChosenColour);


};



//5step-2,3
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

//6step-1
 function animatePress(currentColor){

   //6step-2,3
   $("#"+currentColor).addClass("pressed");

   //6step-4
   setTimeout(function () {
     $("#" + currentColor).removeClass("pressed");
   }, 100);
 }

 //8step-1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
 function checkAnswer(currentLevel) {

     //8step-3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

       //8step-4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
       if (userClickedPattern.length === gamePattern.length){

         //8step-5. Call nextSequence() after a 1000 millisecond delay.
         setTimeout(function () {
           nextSequence();
         }, 1000);
      }

    } else {

      //9step-1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
      playSound("wrong");

      //9step-2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");

      //9step-3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");


      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

    //10step-2. Call startOver() if the user gets the sequence wrong.
    startOver();
}
}

//10step-1. Create a new function called startOver().
function startOver() {

  //10step-3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
