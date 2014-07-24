function MastermindCntl($scope, $location) {
	$scope.number = '';
	var numberOfGuesses = 0;
	var secretCode = "";
	var GUESSING_LIMIT = 12;

	$scope.newGame  = function() {
		$scope.errorMessage = '';
		$scope.bottomMessage = '';
		$scope.done = false;
		numberOfGuesses = 0;
		secretCode = "";
		var numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
		var i;
		for (i=0; i<4; i++) {
			var digit = Math.floor(Math.random() * (9-i));
			secretCode += numbers[digit];
			numbers.splice(digit, 1);
		}
		$scope.guesses = [];
		for (i=1; i<=GUESSING_LIMIT; i++) {
			$scope.guesses.push({'code': '#' + i + ':'});
		}
	};

	$scope.makeGuess = function() {
		$scope.errorMessage = '';
		numberOfGuesses++;
		var guess = $scope.number;
		if (guess.length != 4) {
			$scope.errorMessage = 'Please enter a 4 digit number';
			numberOfGuesses--;
		}
		else if (guess == secretCode) {
			$scope.guesses[numberOfGuesses-1].code = '#' + numberOfGuesses + ': ' + guess + ' : You won!';
			numberOfGuesses--;
			gameOver();
		}
		else {
			var correct = correctPoints(guess, secretCode);
			var wrong = wrongPoints(guess, secretCode);
			$scope.guesses[numberOfGuesses-1].code = '#' + numberOfGuesses + ': ' + guess + ' : ' + correct +' correct, ' + wrong + ' wrong';
		}
		if (numberOfGuesses == GUESSING_LIMIT) {
			$scope.bottomMessage = 'You lost! The code was ' + secretCode + '.';
			gameOver();
		}
		$scope.number = '';
	};

	$scope.showCode = function() {
		$scope.bottomMessage = 'The code was ' + secretCode;
		gameOver();
	};

	$scope.validateNumber = function() {
		$scope.number = $scope.number.replace(/[^1-9\.]/g,'');
	};

	function init() {
		$scope.newGame();
	}

	function correctPoints(guessedCode, actualCode) {
		var correct = 0;
		var i;
		for (i=0; i<guessedCode.length; i++) {
			if (guessedCode.charAt(i) == actualCode.charAt(i)) {
				correct++;
			}
		}
		return correct;
	}

	function wrongPoints(guessedCode, actualCode) {
		var wrong = 0;
		var i;
		for (i=0; i<guessedCode.length; i++) {
			if ((guessedCode.charAt(i) != actualCode.charAt(i)) && (actualCode.indexOf(guessedCode.charAt(i)) != -1)) {
				wrong++;
			}
		}
		return wrong;
	}

	function gameOver() {
		$scope.done = true;
	}

	init();
}