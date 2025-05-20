function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = 5 + Math.random() * 5 + 's';
  heart.innerText = '💖';
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 10000);
}
setInterval(createHeart, 500);

function showPopup() {
  const popup = document.getElementById('popup');
  const audio = document.getElementById('bgMusic');
  popup.classList.add('active');
  document.getElementById('intro').classList.add('hide');
  audio.volume = 0;
  audio.play();
  let fadeIn = setInterval(() => {
    if (audio.volume < 1) {
      audio.volume = Math.min(1, audio.volume + 0.05);
    } else {
      clearInterval(fadeIn);
    }
  }, 100);
}

function hidePopup() {
  const popup = document.getElementById('popup');
  const audio = document.getElementById('bgMusic');
  popup.classList.remove('active');
  document.getElementById('intro').classList.remove('hide');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  let fadeOut = setInterval(() => {
    if (audio.volume > 0) {
      audio.volume = Math.max(0, audio.volume - 0.05);
    } else {
      clearInterval(fadeOut);
      audio.pause();
    }
  }, 100);
}

function revealPhotos() {
  const section = document.getElementById('morePhotos');
  section.classList.remove('hidden');
  void section.offsetWidth;
  section.classList.add('show');
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("bgCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width, height;
    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    }));
    function drawDots() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fill();
        dot.x += dot.dx;
        dot.y += dot.dy;
        if (dot.x < 0 || dot.x > width) dot.dx *= -1;
        if (dot.y < 0 || dot.y > height) dot.dy *= -1;
      });
      requestAnimationFrame(drawDots);
    }
    drawDots();
  }

  const startDate = new Date("2024-05-21T00:00:00");
  function updateCountdown() {
    const now = new Date();
    const diff = now - startDate;
    const years = now.getFullYear() - startDate.getFullYear();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24)) % 365;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const seconds = Math.floor(diff / 1000) % 60;
    document.getElementById("years").textContent = years;
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();

  function showSlide(index) {
    const slides = document.getElementById("slides");
    const total = slides.children.length;
    slideIndex = (index + total) % total;
    slides.style.transform = `translateX(-${slideIndex * 100}%)`;
  }
  let slideIndex = 0;
  window.nextSlide = () => showSlide(slideIndex + 1);
  window.prevSlide = () => showSlide(slideIndex - 1);
  setInterval(() => nextSlide(), 5000);

  const slides = document.getElementById("slides");
  let startX = 0;
  slides.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  slides.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextSlide();
    if (startX - endX < -50) prevSlide();
  });

  const longQuote = `Hello my love, Happy Anniversary! 💖

First of all, I just want to thank you for being a green flag and a total wife material for me. Thank you kaayo sa imong perme magpaubos HAHAHAH, grabe imong patience nako ba. Thank you for showing me the kind of love that no one else ever has, and no one ever will. Bisan pag jejemonan ko ani nga long message, I realized nga when it’s genuine, you just want to express it all even if words aren't enough.

Daghan na kaayo ta og naagian together ba mga kalipay, mga luha, mga katawa, mga sabotay inig human sa gamayng lalis but what’s beautiful is, we’ve grown through it all. And honestly, sa tibuok tuig nga kuyog ta love, wala jud ko ka experience sa atoa nga grabe nga away (kanang pasakitay na bitaw verbally or kanang away nga padung bulag) sulod sa usa ka tuig HAHAHAHA. That says a lot sa atoang connection and how we respect each other.

I know nga naa pa tay parts sa atong kaugalingon nga wala pa jud kaayo gipakita, but that’s okay. Love man gud isn’t about perfection, it’s about choosing each other every single day, maskin lisod or dili.

I’m beyond thankful that God gave us another chance to reconnect, to rebuild this love with a stronger and more mature foundation. Kanang version nato karon, mas buo, mas aware, mas grateful. 😭

Thank you for being my safe place, my peace, my chismosang partner, my best friend, and most importantly, my answered prayer. I promise to keep choosing you, supporting you, growing with you, and loving you the best way I can for as long as He allows.

Here’s to more years of laughter, growth, adventures, and love. Happy 1st Anniversary, love! 🌸

I love you so much.`;

function typeWriterByParagraph(elementId, text, speed = 75) {
  const el = document.getElementById(elementId);
  el.innerHTML = "";
  const paragraphs = text.split(/\n\s*\n/); // Splits by paragraphs
  let pIndex = 0;

  function typeParagraph() {
    if (pIndex >= paragraphs.length) return;
    const p = document.createElement("p");
    el.appendChild(p);
    let i = 0;
    function typeChar() {
      if (i < paragraphs[pIndex].length) {
        p.innerHTML += paragraphs[pIndex].charAt(i);
        i++;
        setTimeout(typeChar, speed);
      } else {
        pIndex++;
        setTimeout(typeParagraph, 400);
      }
    }
    typeChar();
  }
  typeParagraph();
}

// Example usage:
typeWriterByParagraph("typewriter", longQuote, 20);

});