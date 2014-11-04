// var aud = document.getElementById("myVideo");
// aud.oncanplay = function() {
//     alert("Can start playing video");
// };

var currentKey = 0;
var playByNum = true;
var majorScalePattern = [0,2,4,5,7,9,11];
var whiteKeyList = [0,2,4,5,7,9,11,12,14,16,17,19,21,23];
var blackKeyList = [1,3,6,8,10,13,15,18,20,22];
//                   0   1    2   3    4   5   6    7   8    9   10   11
var noteLettersS = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
var noteLettersB = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B","C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"]
var sharpKeys    = [2,4,6,7,9,11];
var flatKeys     = [0,1,3,5,8,10];
var noteNames    = ["C","D","E","F","G","A","B"];

var accidentalsModifier = 0;

var soundsArray = [];
//for (i = 0; i<23;i++) {soundsArray[i] = new Howl({urls: ['sound/key' + i + '.wav']});}

function newLoadFunctionFunction(i) {
return function() { console.log("key " + i + " is loaded");}
}
function newFunctionStartHover(i) {
return function() { console.log("Mouse entered key " + i); document.getElementById("key"+i).style.background = "Blue";};
}
function newFunctionUndoHover(i) {
return function() { console.log("Mouse left key " + i);
document.getElementById("key"+i).style.background = (document.getElementById("key" + i).className === "whiteKey") ? "white" : "black"};
}
function newKeyBoardFunction(i) {
return function() { showKeyPress(i); console.log("Key pressed " + i);}
}

for (i = 0; i<24;i++) {

  document.write("<audio preload=\"auto\" id=\"keySound" + i + "\"><source src=\"sound/key" + i + ".wav\" type=\"audio/wav\"></audio>");
  //console.log("Loading audio " + i);

  document.getElementById("keySound"+i).oncanplay = newLoadFunctionFunction(i);

  soundsArray[i] = document.getElementById("keySound"+i);
}


function prepareHover () {
  //console.log("Preparing the hovering functionality");
  for (i = 0; i<24;i++) {
    //console.log("adding hover for " + i);
    temp = document.getElementById("key"+i);

    temp.onmouseover = newFunctionStartHover(i);
    temp.onmouseout = newFunctionUndoHover(i);
    temp.onclick = newKeyBoardFunction(i);
  }
}

document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 83: //they released s. So it is sharp
      accidentalsModifier = 0;
      break;
    case 87: //they released w. So it is flat
      accidentalsModifier = 0;
      break;
  }
});

document.addEventListener('keydown', function(event) {
  var note = -1
switch (event.keyCode) {
  case 67:
      note = 0;
      break;
  case 68:
      note = 2;
      break;
  case 69:
      note = 4;
      break;
  case 70:
      note = 5;
      break;
  case 71:
      note = 7;
      break;
  case 65:
      note = 9;
      break;
  case 66:
      note = 11;
      break;
  case 83:
    accidentalsModifier = 1;
    return;
    break;
  case 87:
    accidentalsModifier = -1;
    return;
    break;
  }

  if (playByNum) {
    switch (event.keyCode) {
      case 49:
        note = currentKey + majorScalePattern[0];
        break;
      case 97:
        note = currentKey + majorScalePattern[0];
        break;
      case 50:
        note = currentKey + majorScalePattern[1];
        break;
      case 98:
        note = currentKey + majorScalePattern[1];
        break;
      case 51:
        note = currentKey + majorScalePattern[2];
        break;
      case 99:
        note = currentKey + majorScalePattern[2];
        break;
      case 52:
        note = currentKey + majorScalePattern[3];
        break;
      case 100:
        note = currentKey + majorScalePattern[3];
        break;
      case 53:
        note = currentKey + majorScalePattern[4];
        break;
      case 101:
        note = currentKey + majorScalePattern[4];
        break;
      case 54:
        note = currentKey + majorScalePattern[5];
        break;
      case 102:
        note = currentKey + majorScalePattern[5];
        break;
      case 55:
        note = currentKey + majorScalePattern[6];
        break;
      case 103:
        note = currentKey + majorScalePattern[6];
        break;
    }
  }

  if (note + accidentalsModifier === -1 | note > 23) {

  }
    else {
    if (note < currentKey) {
      note += 12;
    }
    showKeyPress(note + accidentalsModifier);
  }

});

function isWhite(keyNum) {
  for (i=0; i<whiteKeyList.length; i++) {
      if (keyNum === whiteKeyList[i]) {
        return true;
      }
    }
  return false;
}

function isBlack(keyNum) {
  for (i=0;i<blackKeyList.length;i++) {
      if (keyNum === blackKeyList[i]) {
        return true;
      }
    }
  return false;
}

function isSharp(keyNum) {
  for (i=0;i<sharpKeys.length;i++) {
      if (keyNum === sharpKeys[i]) {
        return true;
      }
    }
  return false;
}

function changeKey() {
  currentKey = document.getElementById("keyChooser").selectedIndex;
  document.getElementById("keyChooser").blur();
  //document.getElementById("key" + document.getElementById("keyChooser").selectedIndex).disabled=true;
  //for (num in whiteKeyList) {
  //    document.getElementById("key" + num).innerHTML = "<br><br><br><br><br>" + num;
  //}
}

function showKeyLetters() {
  for (num in whiteKeyList) {
    document.getElementById("key" + num).innerHTML = "<br><br><br><br><br>" + noteLettersS[num];
  }
  // for (i = 0; i < 24; i++) {
  //   var prepText = key
  //
  //   document.getElementById("key" + i).innerHTML = ""
  // }
}

function clearAnimation(keyPressed, color) {
  keyDOMRef = document.getElementById("key"+keyPressed);
  keyDOMRef.style.background = color;
  keyDOMRef.innerHTML = "";
  }

function showKeyPress(keyThatWasPressed){

    theKey = document.getElementById("key"+keyThatWasPressed);

    if (isSharp(currentKey)) {
      theKey.innerHTML = "<br><br><br><br><br>" + noteLettersS[keyThatWasPressed];
    } else {
      theKey.innerHTML = "<br><br><br><br><br>" + noteLettersB[keyThatWasPressed];
    }
    theKey.innerHTML = "<br><br><br><br><br>" + noteLettersB[keyThatWasPressed];

    theKey.style.background = "gray";
    //console.log("playing key " + keyThatWasPressed);
    soundsArray[keyThatWasPressed].currentTime = 0
    soundsArray[keyThatWasPressed].play();

    if (isWhite(keyThatWasPressed)) {
      console.log("it was white");
      setTimeout(function(){clearAnimation(keyThatWasPressed,"white");}, 2000);
    } else { //it is black
      setTimeout(function(){clearAnimation(keyThatWasPressed,"black");}, 2000);
    }

    document.getElementById("clickshower").innerHTML = "You clicked on the " + keyThatWasPressed + " key!";
}
