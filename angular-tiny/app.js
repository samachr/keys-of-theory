function pianoController($scope) {
$scope.majorScalePattern = [0,2,4,5,7,9,11];
$scope.whiteKeyList = [0,2,4,5,7,9,11,12,14,16,17,19,21,23];
$scope.blackKeyList = [1,3,6,8,10,13,15,18,20,22];
$scope.keysounds = [];
$scope.keyloadedpercent = 4;

$scope.getAudio = function () {
  for (var i = 0; i < 24; i++) {
    $scope.keysounds[i] = new Audio('sounds/key' + i + '.ogg');
    // console.log("loading key" + i);
  }
  $scope.keysounds[0].play();
};

$scope.play = function(key) {
  console.log("playing key" + key);
  $scope.keysounds[key].play();
};
}
