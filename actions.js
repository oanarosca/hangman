var c = document.getElementById("hang");
var context = c.getContext("2d");
context.strokeStyle = "white";
context.lineWidth = 2;

var draw = function (x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
};

var initialDrawing = function () {
  draw(20, 180, 280, 180);
  draw(40, 180, 40, 20);
  draw(20, 30, 130, 30);
};

rope = function () {
  draw(120, 30, 120, 50);
};

head = function () {
  context.beginPath();
  context.arc(120, 60, 10, 0, 2*Math.PI);
  // coordonatele centrului, raza, unghiul de inceput si cel de sfarsit in radiani
  context.stroke();
};

body = function () {
  draw(120, 70, 120, 110);
};

arms = function () {
  draw(120, 90, 105, 75); draw(120, 90, 135, 75);
};

legs = function () {
  draw(120, 110, 105, 130); draw(120, 110, 135, 130);
};

initialDrawing();
var drawThings = [rope, head, body, arms, legs];
var categories = [["UNICORN", "DOG", "ELEPHANT", "GIRAFFE", "DOLPHIN"], ["CHICAGO", "PARIS", "SYDNEY", "BERLIN", "ROME"], ["JAWS", "TITANIC", "INCEPTION", "FROZEN", "TED"], ["FOOTBALL", "HOCKEY", "BASKETBALL", "SWIMMING", "RUNNING"]];
var index = 0, word, lettToWin, newIndex, newWord, spaces, partOne, partTwo;
var voc = "AEIOU";

function changeCategory() {
  var select = document.getElementById("select");
  var selectedValue = select.options[select.selectedIndex].value;
  index = Number(selectedValue);
  document.getElementById("wordDisplay").innerHTML = "";
  play();
};

function vowelsDisplay() {
  newWord = "";
  spaces = 0;
  for (i in word) {
    if (voc.indexOf(word.charAt(i)) != -1) {
      newWord += word.charAt(i) + " ";
      lettToWin--;
      //$().addClass("used");
    }
    else
      newWord += "_ ";
    spaces++;
  }
  spaces--;
  document.getElementById("wordDisplay").innerHTML = newWord;
}

function play() {
  word = categories[index][Math.floor(Math.random() * 5)];
  lettToWin = word.length;
  vowelsDisplay();
};

play();
index = 0;

$('li').click(function() { // check
  var letter = this.innerHTML;
  if (word.indexOf(letter) != -1) {
    for (i in word)
      if (letter == word.charAt(i)) {
        if (i == 0) {
          partOne = letter;
          var res = newWord.substring(1, newWord.length);
          partOne += res;
        }
        else {
          partOne = newWord.substring(0, 2*i);
          partTwo = newWord.substring(2*i+1, newWord.length);
          partOne += letter + partTwo;
        }
        newWord = partOne; lettToWin--;
        document.getElementById("wordDisplay").innerHTML = newWord;
      }
  }
  else {
    drawThings[index]();
    index++;
  }
  $(this).addClass("used");
  if (index == 5)
    document.getElementById("wordDisplay").innerHTML = "You lost!";
  if (lettToWin == 0)
    document.getElementById("wordDisplay").innerHTML = "You won!";
});

// de marcat vocale
// play again