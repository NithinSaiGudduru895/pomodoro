
    let timer = 1500; // 25 minutes in seconds
    const defaultTime = 1500;
    let interval = null;
    let streak = localStorage.getItem('streak') || 0;
    document.getElementById('streak-count').textContent = streak;

    function updateDisplay() {
      const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
      const seconds = (timer % 60).toString().padStart(2, '0');
      document.getElementById('timer').textContent = `${minutes}:${seconds}`;
    }

    function startTimer() {
      if (!interval) {
        interval = setInterval(() => {
          timer--;
          updateDisplay();
          if (timer <= 0) {
            clearInterval(interval);
            interval = null;
            showMotivation();
            streak++;
            localStorage.setItem('streak', streak);
            document.getElementById('streak-count').textContent = streak;
            timer = defaultTime;
            updateDisplay();
          }
        }, 1000);
      }
    }

    function pauseTimer() {
      clearInterval(interval);
      interval = null;
    }

    function resetTimer() {
      timer = defaultTime;
      updateDisplay();
      pauseTimer();
    }

    function showMotivation() {
      const motivator = document.getElementById('motivator');
      const options = [
        { type: 'quote', text: "Keep going, you're crushing it! 💪" },
        { type: 'quote', text: "One session at a time. You got this!" },
        { type: 'meme', img: "https://i.imgur.com/U3vTGjX.jpeg" },
        { type: 'meme', img: "https://i.imgur.com/jX2j5sJ.jpeg" },
        { type: 'quote', text: "Discipline > Motivation." },
        { type: 'meme', img: "https://i.imgur.com/Z2gC4Qa.jpeg" }
      ];
      const random = options[Math.floor(Math.random() * options.length)];
      motivator.innerHTML = '';
      if (random.type === 'quote') {
        motivator.innerHTML = `<p>"${random.text}"</p>`;
      } else if (random.type === 'meme') {
        motivator.innerHTML = `<img src="${random.img}" alt="Motivational Meme" />`;
      }
      motivator.style.display = 'block';
    }

    updateDisplay();

