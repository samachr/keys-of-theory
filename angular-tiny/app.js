function pianoController($scope) {
  $scope.majorScalePattern = [0, 2, 4, 5, 7, 9, 11];
  $scope.whiteKeyList = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23];
  $scope.blackKeyList = [1, 3, 6, 8, 10, 13, 15, 18, 20, 22];
  $scope.commonLetterNames = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
  $scope.keysounds = [];
  $scope.keyText = [];
	$scope.time = 0;
	$scope.timer = setInterval(function(){
		$scope.time++;
	},1000);

	$scope.currentScaleDegree = 1;
  $scope.infoText = "Select a key to begin.."

  //                      0    1     2    3     4    5    6     7    8     9    10    11   12   13    14   15   16    17   18    19   20    21   22   23
  $scope.noteLettersS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  $scope.noteLettersB = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
  $scope.sharpKeys = [2, 4, 6, 7, 9, 11];
  $scope.flatKeys = [0, 1, 3, 5, 8, 10];
  $scope.noteNames = ["C", "D", "E", "F", "G", "A", "B"];

  $scope.updateKeyLabels = function() {
		// console.log("changing key to", $scope.currentKey)
		$scope.totalAnswers = 0;
		$scope.correctAnswers = 0;
		$scope.time = 0;
		$scope.infoText = "Time is ticking!"

    for (var i = 0; i < 24; i++) {
			if(isInKey($scope.currentKey, i)) {
				$scope.keyText[i] = (isSharpKey($scope.currentKey)) ? $scope.noteLettersS[i] : $scope.noteLettersB[i];
			} else {
				$scope.keyText[i] = "";
			}
    }
  };

	function isInKey(key, note) {
		for(var i = 0; i < 7; i++) {
			if(($scope.majorScalePattern[i] + parseInt(key)) % 12 == note % 12) return true;
		}
		return false;
	}

  function isSharpKey(key) {
		for(var i = 0 ; i < 6; i++) {
			if($scope.sharpKeys[i] == key) return true;
		}
		return false;
  }

  function isWhite(keyNum) {
    for (var i = 0; i < $scope.whiteKeyList.length; i++) {
      if (keyNum === $scope.whiteKeyList[i]) {
        return true;
      }
    }
    return false;
  }

  $scope.getAudio = function() {
    for (var i = 0; i < 24; i++) {
      $scope.keysounds[i] = new Audio('sounds/key' + i + '.ogg');
      // console.log("loading key" + i);
    }

    $scope.keysounds[4].play();
		setTimeout(function(){
			$scope.keysounds[2].play();
			setTimeout(function(){
				$scope.keysounds[5].play();
				setTimeout(function(){
					$scope.keysounds[0].play();
					setTimeout(function(){
						$scope.keysounds[12].play();
					},1500);
				},750);
			},750);
		},750);

  };

	$scope.getNextNumber = function() {
		var nextRand = Math.floor((Math.random() * 10) + 1) % 7 + 1;
		while(nextRand == $scope.currentScaleDegree) {
			nextRand = Math.floor((Math.random() * 10) + 1) % 7 + 1;
		}
		$scope.currentScaleDegree = nextRand;
	};

  $scope.play = function(key) {
    // console.log("playing key" + key);
		if($scope.keyText[key]=="") return;
    $scope.keysounds[key].currentTime = 0;
    $scope.keysounds[key].play();


		// console.log($scope.majorScalePattern[$scope.currentScaleDegree-1]+parseInt($scope.currentKey), key);
		if(($scope.majorScalePattern[$scope.currentScaleDegree-1]+parseInt($scope.currentKey)) % 12 == key % 12) {
			$scope.infoText = "Got it Right!";
			$scope.getNextNumber();
	    document.getElementById("key" + key).style.background = "green";
			$scope.correctAnswers += 1;
		} else {
			if($scope.currentKey >= 0) {
				$scope.infoText = "Try Again";
				document.getElementById("key" + key).style.background = "red";
			} else {
				document.getElementById("key" + key).style.background = "#2e3436";
			}
		}

		$scope.totalAnswers += 1;
		$scope.speed = $scope.correctAnswers / $scope.time * 60;

		lock[key]++;
    document.getElementById("key" + key).style.color = "white";
		setTimeout(function() {
			clearAnimation(key, (isWhite(key)) ? "white" : "black");
		}, 2000);

  };

	var lock = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  function clearAnimation(keyPressed, color) {
		if(lock[keyPressed] == 1) {
			keyDOMRef = document.getElementById("key" + keyPressed);
			keyDOMRef.style.background = color;
			keyDOMRef.style.color = color;
		}
		lock[keyPressed]--;
  }

}
