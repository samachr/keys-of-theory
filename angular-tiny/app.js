function pianoController($scope) {
$scope.majorScalePattern = [0,2,4,5,7,9,11];
$scope.whiteKeyList = [0,2,4,5,7,9,11,12,14,16,17,19,21,23];
$scope.blackKeyList = [1,3,6,8,10,13,15,18,20,22];
$scope.keysounds = [];

function playKey(event, i) {
	alert("routing touch event for key play " + i);
	return function() {play(i)};
}

for (var i=0; i < 24; i++) {
	document.getElementById('key' + i).addEventListener('touchstart', playKey(event, i));
}

function isWhite(keyNum) {
  for (var i=0; i<$scope.whiteKeyList.length; i++) {
    if (keyNum === $scope.whiteKeyList[i]) {
      return true;
    }
  }
  return false;
}

$scope.getAudio = function () {
  for (var i = 0; i < 24; i++) {
    $scope.keysounds[i] = new Audio('sounds/key' + i + '.ogg');
    // console.log("loading key" + i);
  }
  $scope.keysounds[0].play();
};

$scope.play = function(key) {
  console.log("playing key" + key);
  $scope.keysounds[key].currentTime = 0;
  $scope.keysounds[key].play();
  document.getElementById("key"+key).style.background = "#2e3436";;
  if (isWhite(key)) {
    // console.log("it was white");
    setTimeout(function(){clearAnimation(key,"white");}, 2000);
  } else { //it is black
    setTimeout(function(){clearAnimation(key,"black");}, 2000);
  }
};

function clearAnimation(keyPressed, color) {
  keyDOMRef = document.getElementById("key"+keyPressed);
  keyDOMRef.style.background = color;
  keyDOMRef.innerHTML = "";
}

}
