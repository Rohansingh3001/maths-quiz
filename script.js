
    let correctCount = 0;
    let incorrectCount = 0;
    let lives = 3;
    let streak = 0;
    let bestStreak = 0;
    let highScore = 0;

    function resetGame() {
        correctCount = 0;
        incorrectCount = 0;
        lives = 3;
        streak = 0;
        bestStreak = 0;
        document.getElementById("quiz-container").classList.remove("disabled");
        document.getElementById("popup").style.display = "none";
        document.getElementById("overlay").style.display = "none";
        updateLeaderboard();
        generateQuestion();
    }

    function generateQuestion() {
        const operators = ['+', '-', '*', '/'];
        const operator = operators[Math.floor(Math.random() * operators.length)];

        let num1, num2, answer;

        if (Math.random() < 0.5) {
            // Generate two-digit numbers (10-99)
            num1 = Math.floor(Math.random() * 90) + 10;
            num2 = Math.floor(Math.random() * 90) + 10;
        } else {
            // Generate three-digit numbers (100-999)
            num1 = Math.floor(Math.random() * 900) + 100;
            num2 = Math.floor(Math.random() * 900) + 100;
        }

        if (operator === '/') {
            // Ensure division results in a whole number and num2 is not zero
            do {
                num1 = Math.floor(Math.random() * 90) + 10; // Re-generate two-digit numbers
                num2 = Math.floor(Math.random() * 90) + 10;
                answer = num1 / num2;
            } while (!Number.isInteger(answer) || num2 === 0);
        } else if (operator === '-') {
            // Ensure result is non-negative
            if (num2 > num1) [num1, num2] = [num2, num1];
            answer = num1 - num2;
        } else if (operator === '*') {
            answer = num1 * num2;
        } else {
            answer = num1 + num2;
        }

        document.getElementById("question").innerText = `${num1} ${operator} ${num2}`;
        document.getElementById("question").dataset.answer = answer.toFixed(2);
        document.getElementById("answer").value = ""; // Clear input field
    }

    function submitAnswer() {
        if (lives <= 0) return; // Prevent input if game over

        const userAnswer = parseFloat(document.getElementById("answer").value);
        const correctAnswer = parseFloat(document.getElementById("question").dataset.answer);

        if (!isNaN(userAnswer)) {
            if (userAnswer === correctAnswer) {
                correctCount++;
                streak++;
                highScore = Math.max(highScore, correctCount);
                bestStreak = Math.max(bestStreak, streak);
            } else {
                incorrectCount++;
                lives--;
                streak = 0; // Reset streak on incorrect answer
            }
        }

        updateLeaderboard();
        generateQuestion();

        if (lives <= 0) {
            document.getElementById("popup").style.display = "block";
            document.getElementById("overlay").style.display = "block";
            document.getElementById("quiz-container").classList.add("disabled");
        }
    }

    function updateLeaderboard() {
        document.getElementById("correct").innerText = correctCount;
        document.getElementById("incorrect").innerText = incorrectCount;
        document.getElementById("lives").innerText = lives;
        document.getElementById("streak").innerText = streak;
        document.getElementById("best-streak").innerText = bestStreak;
        document.getElementById("high-score").innerText = highScore;
    }

    generateQuestion(); // Initialize the first question

