document.addEventListener('DOMContentLoaded', function() {
  const image = document.getElementById('preview-image');
  const viewer = new Viewer(image, {
    inline: false,
    viewed() {
    },
    title: false,
    toolbar: {
      zoomIn: 1,
      zoomOut: 1,
      oneToOne: 1,
      reset: 1,
      rotateLeft: 1,
      rotateRight: 1,
      flipHorizontal: 0,
      flipVertical: 0,
    },
    navbar: false,
    transition: true,
    keyboard: true,
  });
});

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');

function playAudio() {
  audio.play().catch(() => {
    console.log('Audio play was prevented');
  });
  playBtn.disabled = true;
  pauseBtn.disabled = false;
}

function pauseAudio() {
  audio.pause();
  playBtn.disabled = false;
  pauseBtn.disabled = true;
}

playBtn.addEventListener('click', playAudio);
pauseBtn.addEventListener('click', pauseAudio);

function startFromOverlay() {
  const overlay = document.getElementById('intro-overlay');
  overlay.classList.add('intro-hide');
  
  setTimeout(() => {
    overlay.remove();
  }, 650);
  
  setTimeout(() => {
    playAudio();
  }, 300);
}

const introOverlay = document.getElementById('intro-overlay');
introOverlay.addEventListener('click', startFromOverlay);

document.addEventListener('keydown', (e) => {
  const overlay = document.getElementById('intro-overlay');
  if (overlay && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    startFromOverlay();
  }
});

const btnYes = document.querySelector('.btn-yes');
const btnNo = document.querySelector('.btn-no');
const responseMessage = document.getElementById('response-message');

function createConfetti() {
  const colors = ['#ff6aa2', '#ffc8dd', '#ffe3ef', '#ff4d93'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.opacity = '1';
    confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
    confetti.style.transition = 'all 3s ease-out';
    confetti.style.zIndex = '9999';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.pointerEvents = 'none';
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      confetti.style.top = '100vh';
      confetti.style.opacity = '0';
      confetti.style.transform = 'rotate(' + (Math.random() * 720) + 'deg)';
    }, 10);
    
    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}

btnYes.addEventListener('click', () => {
  responseMessage.innerHTML = `
    🎉 <strong>YEAYYY!</strong> 🎉<br>
    Ayooo sayangggggg! 💕<br>
    Uwaa tunggu di lobby yah✨
  `;
  responseMessage.className = 'response-message success';
  responseMessage.classList.remove('hidden');
  
  createConfetti();
  
  btnYes.disabled = true;
  btnNo.disabled = true;
  
  const gameCard = document.querySelector('.game-card');
  gameCard.style.animation = 'celebration 0.5s ease-in-out';
  
  setTimeout(() => {
    gameCard.style.animation = '';
  }, 500);
});

btnNo.addEventListener('click', () => {
  const messages = [
    '😢 Ayolah sayang... yayayaya!',
    '🥺 Yakin ga mau? aku mau dicarry sunnyyy!',
    '💔 Aku sedih kalau ga main bareng sunnyy...',
    '🙏 Please please please... main yuaaaaa!',
    '😭 Oke deh... aku tunggu sunnnyyy mauu yaaa! 💕'
  ];
  
  const currentAttempt = parseInt(btnNo.dataset.attempt || '0');
  
  if (currentAttempt < messages.length - 1) {
    responseMessage.innerHTML = messages[currentAttempt];
    responseMessage.className = 'response-message waiting';
    responseMessage.classList.remove('hidden');
    
    btnNo.dataset.attempt = (currentAttempt + 1).toString();
    
    const currentScale = parseFloat(btnYes.dataset.scale || '1');
    const newScale = currentScale + 0.1;
    btnYes.style.transform = `scale(${newScale})`;
    btnYes.dataset.scale = newScale.toString();
    
    const gameCard = document.querySelector('.game-card');
    gameCard.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
      gameCard.style.animation = '';
    }, 500);
  } else {
    responseMessage.innerHTML = messages[messages.length - 1];
    responseMessage.className = 'response-message waiting';
    responseMessage.classList.remove('hidden');
    btnNo.disabled = true;
  }
});

const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
  
  @keyframes celebration {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;
document.head.appendChild(style);

audio.addEventListener('ended', () => {
  playBtn.disabled = false;
  pauseBtn.disabled = true;
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden && !audio.paused) {
  }
});

const allButtons = document.querySelectorAll('.btn, .control-btn');
allButtons.forEach(btn => {
  btn.addEventListener('touchstart', function() {
    this.style.opacity = '0.8';
  });
  
  btn.addEventListener('touchend', function() {
    this.style.opacity = '1';
  });
});
