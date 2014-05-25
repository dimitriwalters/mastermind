function MastermindCntl($scope, $location) {
	$scope.resetGame  = function () {
		$scope.number = '';
		$scope.errorMessage = '';
		$scope.bottomMessage = '';
		$scope.done = false;
		numberOfGuesses = 0;
		secretCode = "";
		numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
		for (var i=0; i<4; i++) {
			number = Math.floor(Math.random() * (9-i));
			secretCode += numbers[number];
			numbers.splice(number, 1);
		}
		$scope.guesses = [];
		for (var i=1; i<=$scope.limit; i++)
			$scope.guesses.push({'code': '#'+i+':'});
	}

	$scope.checkGuess = function () {
		$scope.errorMessage = '';
		numberOfGuesses++;
		var guess = $scope.number;
		if (guess.length != 4) {
			$scope.errorMessage = 'Please enter a 4 digit number';
			numberOfGuesses--;
		}
		else if (guess == secretCode) {
			$scope.guesses[numberOfGuesses-1].code = '#'+numberOfGuesses+': '+guess+' : You won!';
			numberOfGuesses--;
			gameOver();
		}
		else {
			c = correctPoints(guess, secretCode);
			w = wrongPoints(guess, secretCode);
			$scope.guesses[numberOfGuesses-1].code = '#'+numberOfGuesses+': '+guess+' : '+c+' correct, '+w+' wrong';
		}
		if (numberOfGuesses == $scope.limit) {
			$scope.bottomMessage = 'You lost! The code was '+secretCode+'.';
			gameOver();
		}
		$scope.number = '';
	}

	$scope.showCode = function () {
		$scope.bottomMessage = 'The code was '+secretCode;
		gameOver();
	}

	$scope.validNumber = function () {
		$scope.number = $scope.number.replace(/[^1-9\.]/g,'');
	}

	function init () {
		var numberOfGuesses = 0;
		var secretCode = "";
		var numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
		$scope.limit = 12;
		$scope.resetGame();
	}

	function correctPoints (guessedCode, actualCode) {
		count = 0;
		for (var i=0; i<guessedCode.length; i++)
			if (guessedCode.charAt(i) == actualCode.charAt(i))
				count++;
		return count;
	}

	function wrongPoints (guessedCode, actualCode) {
		count = 0;
		for (var i=0; i<guessedCode.length; i++)
			if ((guessedCode.charAt(i) != actualCode.charAt(i)) && (actualCode.indexOf(guessedCode.charAt(i)) != -1))
				count++;
		return count;
	}

	function gameOver () {
		$scope.done = true;
	}

	init();
}