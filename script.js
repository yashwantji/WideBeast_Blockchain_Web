const canvas = document.getElementById("bg-particles");
const ctx = canvas ? canvas.getContext("2d") : null;

let particles = [];
const PARTICLE_COUNT = window.matchMedia("(max-width: 640px)").matches ? 90 : 180;

function resize() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const dx = this.x - cx;
    const dy = this.y - cy;
    const angle = Math.atan2(dy, dx);
    const speed = Math.random() * 0.8 + 0.2;

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.size = Math.random() * 2 + 0.5;
    this.alpha = Math.random() * 0.6 + 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha *= 0.995;

    if (
      this.x < 0 || this.x > canvas.width ||
      this.y < 0 || this.y > canvas.height ||
      this.alpha < 0.05
    ) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 200, 50, ${this.alpha})`;
    ctx.fill();
  }
}

if (canvas && ctx) {
  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("mobileMenu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}

const features = [
  {
    icon: "assets/icons/10.png",
    title: "Fast & Scalable",
    desc: "High TPS and low latency for seamless transactions."
  },
  {
    icon: "assets/icons/20.png",
    title: "Secure Network",
    desc: "Powered by Proof-of-Stake and validator security."
  },
  {
    icon: "assets/icons/30.png",
    title: "Smart Contracts",
    desc: "EVM Compatible. Build without limitations."
  },
  {
    icon: "assets/icons/40.png",
    title: "Future Ready",
    desc: "Designed for mass adoption and global scale."
  }
];

const container = document.getElementById("perfGrid");

if (container) {
  features.forEach(item => {
    const card = document.createElement("div");
    card.className = "perf-card";

    card.innerHTML = `
      <div class="perf-icon">
        <img src="${item.icon}" alt="${item.title}">
      </div>
      <div class="perf-text">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

const donut = document.querySelector(".donut");

if (donut) {
  const donutObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        donut.style.animation = "none";
        donut.offsetHeight;
        donut.style.animation = "donutFill 1.8s ease forwards";
      }
    });
  });

  donutObserver.observe(donut);
}

document.addEventListener("DOMContentLoaded", () => {
  const roadmap = document.querySelector(".roadmap");
  const phases = document.querySelectorAll(".phase");
  const progress = document.querySelector(".road-progress");

  if (!roadmap || !progress || !phases.length) {
    return;
  }

  const roadmapObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      if (window.matchMedia("(max-width: 900px)").matches) {
        progress.style.height = "100%";
      } else {
        progress.style.width = "100%";
      }

      phases.forEach((phase, index) => {
        setTimeout(() => {
          phase.classList.add("show");
          phase.classList.add("active");
        }, index * 400);
      });

      roadmapObserver.disconnect();
    }
  }, { threshold: 0.3 });

  roadmapObserver.observe(roadmap);
});
