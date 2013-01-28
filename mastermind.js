function addGuesses() {
   for (i=1; i<=12; i++) {
   	$("#guessed").append("<div id='guess"+i+"'>#"+i+":</div>");
   }
}

function resetGame () {
	$("#guessInput").removeAttr("disabled");
    $("#guessButton").removeAttr("disabled");
	guesses = 0;
	$('#guessed').text('');
	$('#guessInput').val('');
	code = "";
	numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
	for (var i=0; i<4; i++) {
		number = Math.floor(Math.random() * (9-i));
		code += numbers[number];
		numbers.splice(number, 1);
	}
	addGuesses();
}

function correctPos (guess, code) {
	count = 0;
	for (var i=0; i<guess.length; i++) {
		if (guess.charAt(i) == code.charAt(i)) {
			count++;
		}
	}
	return count;
}

function wrongPos (guess, code) {
	count = 0;
	for (var i=0; i<guess.length; i++) {
		if ((guess.charAt(i) != code.charAt(i)) && (code.indexOf(guess.charAt(i)) != -1)) {
			count++;
		}
	}
	return count;
}

function gameOver () {
	$("#guessInput").attr("disabled", "disabled");
    $("#guessButton").attr("disabled", "disabled");
}

function checkGuess () {
	guesses++;
	guess = $('#guessInput').val();
	if (guess.length != 4) {
		alert('Please enter a 4 digit number');
		guesses--;
	}
	else if (guess == code) {
		alert('You won!');
		$('#guess'+guesses).text('#'+guesses+': '+guess+' : You won!');
		guesses--;
		gameOver();
	}
	else {
		m = correctPos(guess, code);
		n = wrongPos(guess, code);
		$('#guess'+guesses).text('#'+guesses+': '+guess+' : '+m+' correct, '+n+' wrong');
	}
	if (guesses == 12) {
		alert('You lost! The code was ' + code);
		gameOver();
	}
	$('#guessInput').val('');
}

function showCode () {
	alert('The code was: '+code+'. A new game will start.');
	resetGame();
}

$('document').ready(function() {
	resetGame();
	$('#guessButton').click(checkGuess);
	$('#codeButton').click(showCode);
	$('#gameButton').click(resetGame);
	jQuery('#guessInput').keyup(function () { 
    this.value = this.value.replace(/[^1-9\.]/g,'');
	});
});