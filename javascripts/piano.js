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
for (i = 0; i<23;i++) {soundsArray[i] = new Howl({urls: ['sound/key' + i + '.wav']})}

document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 83: //they pressed s. So it is sharp
      accidentalsModifier = 1;
      break;
    case 87: //they pressed w. So it is flat
      accidentalsModifier = -1;
      break;
  }
});

document.addEventListener('keyup', function(event) {
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
    accidentalsModifier = 0;
    break;
  case 87:
    accidentalsModifier = 0;
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

  if (note + accidentalsModifier === -1 | note > 23) {} else{
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

function pianoKeyPressC() {
  showKeyPress(0);
}
function pianoKeyPressDb() {
  showKeyPress(1);
}
function pianoKeyPressD() {
  showKeyPress(2);
}
function pianoKeyPressEb() {
  showKeyPress(3);
}
function pianoKeyPressE() {
  showKeyPress(4);
}
function pianoKeyPressF() {
  showKeyPress(5);
}
function pianoKeyPressGb() {
  showKeyPress(6);
}
function pianoKeyPressG() {
  showKeyPress(7);
}
function pianoKeyPressAb() {
  showKeyPress(8);
}
function pianoKeyPressA() {
  showKeyPress(9);
}
function pianoKeyPressBb() {
  showKeyPress(10);
}
function pianoKeyPressB() {
  showKeyPress(11);
}
function pianoKeyPressC2() {
  showKeyPress(12);
}
function pianoKeyPressDb2() {
  showKeyPress(13);
}
function pianoKeyPressD2() {
  showKeyPress(14);
}
function pianoKeyPressEb2() {
  showKeyPress(15);
}
function pianoKeyPressE2() {
  showKeyPress(16);
}
function pianoKeyPressF2() {
  showKeyPress(17);
}
function pianoKeyPressGb2() {
  showKeyPress(18);
}
function pianoKeyPressG2() {
  showKeyPress(19);
}
function pianoKeyPressAb2() {
  showKeyPress(20);
}
function pianoKeyPressA2() {
  showKeyPress(21);
}
function pianoKeyPressBb2() {
  showKeyPress(22);
}
function pianoKeyPressB2() {
  showKeyPress(23);
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

    soundsArray[keyThatWasPressed].play();
    
    if (isWhite(keyThatWasPressed)) {
    setTimeout(function(){clearAnimation(keyThatWasPressed,"white");}, 2000);
    } else { //it is black
      setTimeout(function(){clearAnimation(keyThatWasPressed,"black");}, 2000);
    }

    document.getElementById("clickshower").innerHTML = "You clicked on the " + keyThatWasPressed + " key!";
}
