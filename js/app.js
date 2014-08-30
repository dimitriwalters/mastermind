'use strict';

var app = angular.module('app', []);

app.service('GameService', function() {
	var code = '';
	var numberOfGuesses = 0;

	this.getCode = function() {
		return code;
	};

	this.getNumberOfGuesses = function() {
		return numberOfGuesses;
	};

	this.incrementNumberOfGuesses = function() {
		numberOfGuesses++;
	};

	this.initializeGame = function() {
		var digit = 0;
		var numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
		code = '';
		numberOfGuesses = 0;

		for (var i=0; i<4; i++) {
			digit = Math.floor(Math.random() * (9-i));
			code += numbers[digit];
			numbers.splice(digit, 1);
		}
	};

	this.isCorrectCode = function(attempt) {
		return attempt === code;
	};

	this.isGameOver = function() {
		return numberOfGuesses === 12;
	};

	this.stringifyGuess = function(attempt) {
		var stringOfGuess = '#' + numberOfGuesses + ': ' + attempt + ' : ';

		if (this.isCorrectCode(attempt)) {
			stringOfGuess += 'You won!';
		}
		else {
			stringOfGuess += getCorrectPoints(attempt) + ' correct, ' + getWrongPoints(attempt) + ' wrong';
		}

		return stringOfGuess;
	};

	function getCorrectPoints(attempt) {
		var correct = 0;

		for (var i=0; i<attempt.length; i++) {
			if (attempt.charAt(i) === code.charAt(i)) {
				correct++;
			}
		}

		return correct;
	}

	function getWrongPoints(attempt) {
		var wrong = 0;

		for (var i=0; i<attempt.length; i++) {
			if ((attempt.charAt(i) !== code.charAt(i)) && (code.indexOf(attempt.charAt(i)) !== -1)) {
				wrong++;
			}
		}

		return wrong;
	}
});

app.controller('MastermindController', ['$scope', 'GameService',
function($scope, GameService) {
	$scope.guess = '';

	$scope.newGame  = function() {
		$scope.errorMessage = '';
		$scope.bottomMessage = '';
		$scope.done = false;
		$scope.guesses = [];

		for (var i=1; i<=12; i++) {
			$scope.guesses.push({'code': '#' + i + ':'});
		}

		GameService.initializeGame();
	};

	$scope.makeGuess = function() {
		$scope.errorMessage = '';

		if ($scope.guess.length !== 4) {
			$scope.errorMessage = 'Please enter a 4 digit number.';
		}
		else {
			GameService.incrementNumberOfGuesses();
			$scope.guesses[GameService.getNumberOfGuesses()-1].code = GameService.stringifyGuess($scope.guess);
			
			if (GameService.isCorrectCode($scope.guess)) {
				$scope.done = true;
			}
			else if (GameService.isGameOver()) {
				$scope.bottomMessage = 'You lost! The code was ' + GameService.getCode() + '.';
				$scope.done = true;
			}
		}

		$scope.guess = '';
	};

	$scope.showCode = function() {
		$scope.bottomMessage = 'The code was ' + GameService.getCode() + '.';
		$scope.done = true;
	};

	$scope.validateNumber = function() {
		$scope.guess = $scope.guess.replace(/[^1-9\.]/g,'');
	};
	
	$scope.newGame();
}]);