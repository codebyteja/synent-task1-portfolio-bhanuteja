const canvas = document.getElementById('stars-canvas');
const ctx    = canvas.getContext('2d');

let W, H, stars = [], mouse = { x: 0, y: 0 };

const STAR_COUNT   = 220;
const MAX_RADIUS   = 2.0;
const SPEED        = 0.004;
const CONNECT_DIST = 120;
const LINE_OPACITY = 0.08;
const MOUSE_PUSH   = 80;
const DOT_COLOR    = '0, 245, 255';   // cyan — change to '180,220,255' for white-blue

function initStars() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    (Math.random() - 0.5) * 0.25,
      vy:    (Math.random() - 0.5) * 0.25,
      r:     Math.random() * MAX_RADIUS + 0.4,
      alpha: Math.random(),
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * SPEED + 0.002,
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, W, H);

  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];

    s.phase += s.speed;
    const a = s.alpha * (0.5 + 0.5 * Math.sin(s.phase));

    s.x += s.vx;
    s.y += s.vy;

    const dx   = s.x - mouse.x;
    const dy   = s.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < MOUSE_PUSH) {
      const force = (MOUSE_PUSH - dist) / MOUSE_PUSH;
      s.x += dx / dist * force * 1.5;
      s.y += dy / dist * force * 1.5;
    }

    if (s.x < 0) s.x = W;
    if (s.x > W) s.x = 0;
    if (s.y < 0) s.y = H;
    if (s.y > H) s.y = 0;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${DOT_COLOR}, ${a})`;
    ctx.fill();

    for (let j = i + 1; j < stars.length; j++) {
      const s2    = stars[j];
      const dx2   = s.x - s2.x;
      const dy2   = s.y - s2.y;
      const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      if (dist2 < CONNECT_DIST) {
        const lineA = LINE_OPACITY * (1 - dist2 / CONNECT_DIST);
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s2.x, s2.y);
        ctx.strokeStyle = `rgba(${DOT_COLOR}, ${lineA})`;
        ctx.lineWidth   = 0.6;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

window.addEventListener('resize', initStars);
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

initStars();
draw();















const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');      // scrolling down — show
    } else {
      entry.target.classList.remove('reveal');   // scrolling up — hide again
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.about-left, .about-right, .role-pill, .about-desc, .about-btns, .about-heading .word')
  .forEach(el => observer.observe(el));













































  // ===== BLUR TO CLEAR SCROLL ANIMATION =====
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible'); // reverse on scroll up
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.flip-card').forEach(card => {
  cardObserver.observe(card);
});

































/*this is for tools clicable*/


function showTab(tab, btn) {
  document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('skills-grid').style.display = tab === 'skills' ? 'grid' : 'none';
  document.getElementById('tools-grid').style.display  = tab === 'tools'  ? 'grid' : 'none';
}