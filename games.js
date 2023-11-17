var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

var jokes = [
  "What is the difference between Jesus and a picture of Jesus? You can hang the picture with just one nail.",
  "What is the difference between acne and a Catholic priest? Acne usually comes on a boy's face after he turns 12.",
  "A blind man walked into a fish market and said, 'Hello ladies!'",
  "Q: What do you call a cheap circumcision? A: A rip off.",
  "People visiting the zoo,Americans- Oh! Esther come look at a Monkey. Nigerians- Faith Come see your papa. ",
  "My wife is mad that I have no sense of direction. So I packed up my stuff and right",
"When does a joke become a dad joke? When it leaves you and never comes back.",
"I have a stepladder because my real ladder left when I was 5.",
"What is the difference between Iron man and Iron Woman? One is a superhero and the other is a simple command",
" Why is it that if you donate a kidney, people love you. But if you donate five kidneys, they call the police.",
 "I’m dating a feminist Israeli. She insists I call her a Shebrew",
  "What do you call a letter from a feminist? Hate male.",
  "How many feminists does it take to screw in a light bulb? None. They just hold it in the socket and expect the world to revolve around them.",
  "I went to a feminist picnic the other day. It was great, apart from the fact no one made any sandwiches.",
  "What’s a feminist’s favorite fruit? A mango.",
  "Why did the feminist fail algebra? She couldn’t solve inequalities.",
  "What do you call a letter from a feminist? Hate male.",
  " When you sit down for an interview and the interviewer greets you by your Facebook name Good day 'Miss slay queen hottest bae.'",
  "Why did the feminist fail algebra? She couldn’t solve inequalities.",
];

var randomSentence = "";

function joker() {
  var randomIndex = Math.floor(Math.random() * jokes.length);
  randomSentence = jokes[randomIndex];
  $("#randomText").text("- " + randomSentence);
}

function startGame() {
  if (!started) {
    $("#level-title").html("Level " + level + '<span id="joke-text"></span>');
    nextSequence();
    started = true;
  }
}

$(document).on("keypress touchstart", function (event) {
  if (!started) {
    $("#level-title").html("Level " + level + '<span id="joke-text"></span>');
    nextSequence();
    started = true;
  }
});

$(".btn").on("click touchstart", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 2000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Damn Bro, You dumb as hell!");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  joker();
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 300);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Initialize the game
$(document).ready(function () {
  startGame();
});
