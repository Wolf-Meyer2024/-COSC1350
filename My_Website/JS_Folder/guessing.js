document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('guessForm');
    const result = document.getElementById('result');
    const previousGuesses = document.getElementById('previousGuesses');
    
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let guesses = [];
    let turnsLeft = 10;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const guess = parseInt(document.getElementById('guess').value);
        
        if (isNaN(guess) || guess < 1 || guess > 100) {
            result.textContent = 'Please enter a valid number between 1 and 100.';
            return;
        }
        
        guesses.push(guess);
        turnsLeft--;

        if (guess === randomNumber) {
            result.textContent = `Congratulations! You guessed the correct number: ${randomNumber}`;
            endGame();
        } else if (turnsLeft === 0) {
            result.textContent = `Game over! You've used all your turns. The correct number was ${randomNumber}.`;
            endGame();
        } else {
            if (guess < randomNumber) {
                result.textContent = 'Too low!';
            } else {
                result.textContent = 'Too high!';
            }
            previousGuesses.textContent = `Previous guesses: ${guesses.join(', ')}`;
            result.textContent += ` You have ${turnsLeft} turns left.`;
        }

        form.reset();
    });

    function endGame() {
        form.querySelector('button').disabled = true;
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Play Again';
        document.body.appendChild(restartButton);
        restartButton.addEventListener('click', () => {
            window.location.reload();
        });
    }
});
