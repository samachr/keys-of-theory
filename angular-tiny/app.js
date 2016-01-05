function pianoController($scope) {
  $scope.majorScalePattern = [0, 2, 4, 5, 7, 9, 11];
  $scope.whiteKeyList = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23];
  $scope.blackKeyList = [1, 3, 6, 8, 10, 13, 15, 18, 20, 22];
  $scope.commonLetterNames = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
  $scope.keySounds = [];
  $scope.keyText = [];
  $scope.time = 0;
  $scope.timer = setInterval(function() {
		$scope.$apply(function() {
			$scope.time++;
	    $scope.speed = $scope.correctAnswers / $scope.time * 60;
		});
  }, 1000);

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
      if (isInKey($scope.currentKey, i)) {
        $scope.keyText[i] = (isSharpKey($scope.currentKey)) ? $scope.noteLettersS[i] : $scope.noteLettersB[i];
      } else {
        $scope.keyText[i] = "";
      }
    }
  };

  function isInKey(key, note) {
    for (var i = 0; i < 7; i++) {
      if (($scope.majorScalePattern[i] + parseInt(key)) % 12 == note % 12) return true;
    }
    return false;
  }

  function isSharpKey(key) {
    for (var i = 0; i < 6; i++) {
      if ($scope.sharpKeys[i] == key) return true;
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

  var context;

  $scope.getAudio = function() {
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();

    var soundSources = [];
    for (var i = 0; i < 24; i++) {
      soundSources[i] = './sounds/key' + i + '.ogg';
    }

    $scope.infoText = "loading..";

		var loaded = false;

		var addDots = function(){
			if(!loaded) {
					$scope.$apply(function() {
						$scope.infoText += ".";
					});
					setTimeout(addDots,1000);
			}
		}
	  setTimeout(addDots,200);

    new BufferLoader(
      context,
      soundSources,
      function(bufferList) {
				loaded = true;
				$scope.$apply(function() {
					$scope.infoText = "Sound Ready!";
				});
        var sounds = [];

        for (var i = 0; i < 24; i++) {
          $scope.keySounds[i] = bufferList[i];
        }
        $scope.play(4);
        setTimeout(function() {
          $scope.play(2);
          setTimeout(function() {
            $scope.play(5);
            setTimeout(function() {
              $scope.play(0);
              setTimeout(function() {
                $scope.$apply(function() {
                  $scope.infoText =  "Select a key to begin..";
                });
                $scope.play(12);
              }, 1500);
            }, 750);
          }, 750);
        }, 750);
      }
    ).load();
  };

  $scope.playKey = function(key) {
    var source = context.createBufferSource();
    source.buffer = $scope.keySounds[key];
    source.connect(context.destination);
    source.start(0);
  }

  $scope.getNextNumber = function() {
    var nextRand = Math.floor((Math.random() * 10) + 1) % 7 + 1;
    while (nextRand == $scope.currentScaleDegree) {
      nextRand = Math.floor((Math.random() * 10) + 1) % 7 + 1;
    }
    $scope.currentScaleDegree = nextRand;
  };

  $scope.play = function(key) {
    // console.log("playing key" + key);
    if ($scope.keyText[key] == "") return;
    // $scope.keysounds[key].currentTime = 0;
    $scope.playKey(key);


    // console.log($scope.majorScalePattern[$scope.currentScaleDegree-1]+parseInt($scope.currentKey), key);
    if (($scope.majorScalePattern[$scope.currentScaleDegree - 1] + parseInt($scope.currentKey)) % 12 == key % 12) {
      $scope.infoText = "Got it Right!";
      $scope.getNextNumber();
      document.getElementById("key" + key).style.background = "green";
      $scope.correctAnswers += 1;
    } else {
      if ($scope.currentKey >= 0) {
        $scope.infoText = "Try Again";
        document.getElementById("key" + key).style.background = "red";
      } else {
        document.getElementById("key" + key).style.background = "#2e3436";
      }
    }

    $scope.totalAnswers += 1;

    lock[key]++;
    document.getElementById("key" + key).style.color = "white";
    setTimeout(function() {
      clearAnimation(key, (isWhite(key)) ? "white" : "black");
    }, 2000);

  };

  var lock = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  function clearAnimation(keyPressed, color) {
    if (lock[keyPressed] == 1) {
      keyDOMRef = document.getElementById("key" + keyPressed);
      keyDOMRef.style.background = color;
      keyDOMRef.style.color = color;
    }
    lock[keyPressed]--;
  }

}

function BufferLoader(o, r, e) { this.context = o, this.urlList = r, this.onload = e, this.bufferList = new Array, this.loadCount = 0 } BufferLoader.prototype.loadBuffer = function(o, r) { var e = new XMLHttpRequest; e.open("GET", o, !0), e.responseType = "arraybuffer"; var t = this; e.onload = function() { t.context.decodeAudioData(e.response, function(e) { return e ? (t.bufferList[r] = e, void(++t.loadCount == t.urlList.length && t.onload(t.bufferList))) : void alert("error decoding file data: " + o) }, function(o) { console.error("decodeAudioData error", o) }) }, e.onerror = function() { alert("BufferLoader: XHR error") }, e.send() }, BufferLoader.prototype.load = function() { for (var o = 0; o < this.urlList.length; ++o) this.loadBuffer(this.urlList[o], o) };
