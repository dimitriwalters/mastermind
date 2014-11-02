angular
    .module('app', [])
    .controller('MainCtrl', ['$scope', 'Game', function ($scope, Game) {
        'use strict';

        $scope.guess = '';

        $scope.startGame  = function () {
            var i = 0;
            $scope.errorMessage = '';
            $scope.bottomMessage = '';
            $scope.done = false;
            $scope.guesses = [];

            for (i = 1; i <= 12; i += 1) {
                $scope.guesses.push({'code': '#' + i + ':'});
            }

            Game.initializeGame();
        };

        $scope.makeGuess = function () {
            $scope.errorMessage = '';

            if ($scope.guess.length !== 4) {
                $scope.errorMessage = 'Please enter a 4 digit number.';
            } else {
                Game.incrementNumberOfGuesses();
                $scope.guesses[Game.getNumberOfGuesses() - 1].code = Game.stringifyGuess($scope.guess);

                if (Game.isCorrectCode($scope.guess)) {
                    $scope.done = true;
                } else if (Game.isGameOver()) {
                    $scope.bottomMessage = 'You lost! The code was ' + Game.getCode() + '.';
                    $scope.done = true;
                }
            }

            $scope.guess = '';
        };

        $scope.showCode = function () {
            $scope.bottomMessage = 'The code was ' + Game.getCode() + '.';
            $scope.done = true;
        };

        $scope.validateNumber = function () {
            $scope.guess = $scope.guess.replace(/[^1-9\.]/g, '');
        };

        $scope.startGame();
    }])
    .service('Game', function () {
        'use strict';

        var code = '',
            numberOfGuesses = 0;

        this.getCode = function () {
            return code;
        };

        this.getNumberOfGuesses = function () {
            return numberOfGuesses;
        };

        this.incrementNumberOfGuesses = function () {
            numberOfGuesses += 1;
        };

        this.initializeGame = function () {
            var digit = 0,
                numbers = _.range(1, 10),
                i = 0;
            _(numbers).forEach(function (number) { number.toString(); });
            code = '';
            numberOfGuesses = 0;

            for (i = 0; i < 4; i += 1) {
                digit = Math.floor(Math.random() * (9 - i));
                code += numbers[digit];
                numbers.splice(digit, 1);
            }
        };

        this.isCorrectCode = function (attempt) {
            return attempt === code;
        };

        this.isGameOver = function () {
            return numberOfGuesses === 12;
        };

        function getCorrectPoints(attempt) {
            var correct = 0,
                i = 0;

            for (i = 0; i < attempt.length; i += 1) {
                if (attempt.charAt(i) === code.charAt(i)) {
                    correct += 1;
                }
            }

            return correct;
        }

        function getWrongPoints(attempt) {
            var wrong = 0,
                i = 0;

            for (i = 0; i < attempt.length; i += 1) {
                if ((attempt.charAt(i) !== code.charAt(i)) && (code.indexOf(attempt.charAt(i)) !== -1)) {
                    wrong += 1;
                }
            }

            return wrong;
        }

        this.stringifyGuess = function (attempt) {
            var stringOfGuess = '#' + numberOfGuesses + ': ' + attempt + ' : ';

            if (this.isCorrectCode(attempt)) {
                stringOfGuess += 'You won!';
            } else {
                stringOfGuess += getCorrectPoints(attempt) + ' correct, ' + getWrongPoints(attempt) + ' wrong';
            }

            return stringOfGuess;
        };
    });