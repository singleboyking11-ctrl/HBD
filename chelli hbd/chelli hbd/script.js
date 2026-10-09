
document.addEventListener('DOMContentLoaded', () => {
  const screens = [...document.querySelectorAll('.screen')];
  const confettiLayer = document.getElementById('confetti');

  function showScreen(id) {
    screens.forEach(screen => {
      screen.classList.toggle('active', screen.id === id);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (id === 'birthday' || id === 'final') {
      celebrate();
    }
  }

  // Open the birthday gift
  document.getElementById('openGift')?.addEventListener('click', () => {
    showScreen('birthday');
  });

  // Navigate between sections
  document.querySelectorAll('[data-next]').forEach(button => {
    button.addEventListener('click', () => {
      showScreen(button.dataset.next);
    });
  });

  // Birthday countdown: October 13
  function updateCountdown() {
    const output = document.getElementById('countdown');
    if (!output) return;

    const now = new Date();
    let birthday = new Date(now.getFullYear(), 9, 13);

    if (now > birthday) {
      birthday = new Date(now.getFullYear() + 1, 9, 13);
    }

    const days = Math.ceil((birthday - now) / 86400000);

    output.textContent = days === 0
      ? "It's your special day! 🎂"
      : `${days} day${days === 1 ? '' : 's'} until October 13 💗`;
  }

  updateCountdown();

  // Sister quiz
  const result = document.getElementById('quizResult');
  const quizNext = document.getElementById('quizNext');

  document.querySelectorAll('[data-answer]').forEach(button => {
    button.addEventListener('click', () => {
      result.textContent = button.dataset.answer === 'me'
        ? 'Correct! I’m lucky to have you as my sister. 💗'
        : 'Also correct! We’re both lucky to have each other. 🫶';

      quizNext.classList.remove('hidden');

      document.querySelectorAll('[data-answer]').forEach(option => {
        option.classList.remove('chosen');
      });

      button.classList.add('chosen');
    });
  });

  // Open the birthday letter
  const envelope = document.getElementById('envelope');
  const letter = document.getElementById('letterContent');
  const finalButton = document.getElementById('finalButton');

  envelope?.addEventListener('click', () => {
    letter.classList.remove('hidden');
    envelope.classList.add('hidden');
    finalButton.classList.remove('hidden');
  });

  // Replay the complete surprise
  document.getElementById('replay')?.addEventListener('click', () => {
    letter.classList.add('hidden');
    envelope.classList.remove('hidden');
    finalButton.classList.add('hidden');
    quizNext.classList.add('hidden');
    result.textContent = '';

    document.querySelectorAll('[data-answer]').forEach(option => {
      option.classList.remove('chosen');
    });

    showScreen('intro');
  });

  // Pink and purple confetti
  function celebrate() {
    if (!confettiLayer) return;

    const colors = [
      '#ff77c8',
      '#b58cff',
      '#ffe1a8',
      '#ffffff',
      '#d6a8ff'
    ];

    for (let i = 0; i < 42; i++) {
      const piece = document.createElement('span');

      piece.className = 'confetti-piece';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = `${Math.random() * 0.8}s`;
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;

      confettiLayer.appendChild(piece);

      setTimeout(() => piece.remove(), 3500);
    }
  }

  // Animated star background
  const canvas = document.getElementById('stars');
  const ctx = canvas?.getContext('2d');

  if (canvas && ctx) {
    let stars = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = Array.from({
        length: Math.min(110, Math.floor(window.innerWidth / 8))
      }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.25,
        a: Math.random() * 0.6 + 0.15,
        s: Math.random() * 0.18 + 0.03
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      stars.forEach(star => {
        star.a = Math.max(
          0.1,
          Math.min(0.85, star.a + (Math.random() - 0.5) * 0.025)
        );

        star.y -= star.s;

        if (star.y < -3) {
          star.y = window.innerHeight + 3;
          star.x = Math.random() * window.innerWidth;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,220,255,${star.a})`;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    draw();
  }
});
