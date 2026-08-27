/* =========================================================
   MUHAMMAD AYAAN ANSARI
   INTERACTIVE PORTFOLIO
   ========================================================= */


/* ---------------------------------------------------------
   DOM
--------------------------------------------------------- */

const body = document.body;
const navLinks = document.getElementById("navLinks");
const menuBtn = document.getElementById("menuBtn");
const themeToggle = document.getElementById("themeToggle");
const toTop = document.getElementById("toTop");
const toast = document.getElementById("toast");
const year = document.getElementById("year");

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

const canvas = document.getElementById("neuralCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;


/* ---------------------------------------------------------
   YEAR
--------------------------------------------------------- */

if (year) {
  year.textContent = new Date().getFullYear();
}


/* ---------------------------------------------------------
   MOBILE NAVIGATION
--------------------------------------------------------- */

if (menuBtn && navLinks) {

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });

  });

}


/* ---------------------------------------------------------
   THEME
--------------------------------------------------------- */

const savedTheme = localStorage.getItem("ayaan-theme");

if (savedTheme === "light") {
  body.classList.add("light");
}

if (themeToggle) {

  themeToggle.addEventListener("click", () => {

    body.classList.toggle("light");

    const theme = body.classList.contains("light")
      ? "light"
      : "dark";

    localStorage.setItem("ayaan-theme", theme);

    showToast(
      theme === "light"
        ? "Light mode enabled"
        : "Dark mode enabled"
    );

  });

}


/* ---------------------------------------------------------
   TOAST
--------------------------------------------------------- */

let toastTimer;

function showToast(message) {

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);

}


/* ---------------------------------------------------------
   SCROLL REVEAL
--------------------------------------------------------- */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});


/* ---------------------------------------------------------
   SKILL BARS
--------------------------------------------------------- */

const skillRows = document.querySelectorAll(".skill-row");

const skillObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const row = entry.target;
      const level = row.dataset.level;
      const bar = row.querySelector(".bar span");

      if (bar) {
        bar.style.width = `${level}%`;
      }

      skillObserver.unobserve(row);

    });

  },
  {
    threshold: 0.4
  }
);

skillRows.forEach(row => {
  skillObserver.observe(row);
});


/* ---------------------------------------------------------
   PROJECT FILTER
--------------------------------------------------------- */

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-empty");

filters.forEach(filter => {

  filter.addEventListener("click", () => {

    filters.forEach(button => {
      button.classList.remove("active");
    });

    filter.classList.add("active");

    const selected = filter.dataset.filter;

    projects.forEach(project => {

      const categories = project.dataset.category || "";

      const visible =
        selected === "all" ||
        categories.includes(selected);

      if (visible) {

        project.style.display = "block";

        requestAnimationFrame(() => {
          project.style.opacity = "1";
          project.style.transform = "translateY(0)";
        });

      } else {

        project.style.opacity = "0";
        project.style.transform = "translateY(15px)";

        setTimeout(() => {
          project.style.display = "none";
        }, 250);

      }

    });

  });

});


/* ---------------------------------------------------------
   BACK TO TOP
--------------------------------------------------------- */

window.addEventListener(
  "scroll",
  () => {

    if (!toTop) return;

    if (window.scrollY > 700) {
      toTop.classList.add("visible");
    } else {
      toTop.classList.remove("visible");
    }

  },
  {
    passive: true
  }
);


if (toTop) {

  toTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

}


/* ---------------------------------------------------------
   CUSTOM CURSOR
--------------------------------------------------------- */

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;

if (window.matchMedia("(pointer:fine)").matches) {

  window.addEventListener(
    "mousemove",
    event => {

      mouseX = event.clientX;
      mouseY = event.clientY;

      if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
      }

    },
    {
      passive: true
    }
  );


  function animateCursor() {

    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }

    requestAnimationFrame(animateCursor);

  }

  animateCursor();


  document.querySelectorAll("a, button, .tilt").forEach(element => {

    element.addEventListener("mouseenter", () => {

      if (cursorRing) {
        cursorRing.classList.add("hover");
      }

    });

    element.addEventListener("mouseleave", () => {

      if (cursorRing) {
        cursorRing.classList.remove("hover");
      }

    });

  });

}


/* ---------------------------------------------------------
   MAGNETIC ELEMENTS
--------------------------------------------------------- */

if (window.matchMedia("(pointer:fine)").matches) {

  document.querySelectorAll(".magnetic").forEach(element => {

    element.addEventListener("mousemove", event => {

      const rect = element.getBoundingClientRect();

      const x =
        event.clientX -
        (rect.left + rect.width / 2);

      const y =
        event.clientY -
        (rect.top + rect.height / 2);

      element.style.transform =
        `translate(${x * 0.12}px, ${y * 0.12}px)`;

    });

    element.addEventListener("mouseleave", () => {

      element.style.transform = "";

    });

  });

}


/* ---------------------------------------------------------
   3D TILT
--------------------------------------------------------- */

if (window.matchMedia("(pointer:fine)").matches) {

  document.querySelectorAll(".tilt").forEach(element => {

    element.addEventListener("mousemove", event => {

      const rect = element.getBoundingClientRect();

      const x =
        event.clientX -
        (rect.left + rect.width / 2);

      const y =
        event.clientY -
        (rect.top + rect.height / 2);

      const rotateX =
        -(y / (rect.height / 2)) * 3;

      const rotateY =
        (x / (rect.width / 2)) * 3;

      element.style.transform =
        `perspective(800px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-3px)`;

    });

    element.addEventListener("mouseleave", () => {

      element.style.transform = "";

    });

  });

}


/* ---------------------------------------------------------
   NEURAL NETWORK BACKGROUND
--------------------------------------------------------- */

let particles = [];
let animationFrame;
let canvasWidth = 0;
let canvasHeight = 0;

function resizeCanvas() {

  if (!canvas || !ctx) return;

  const pixelRatio =
    Math.min(window.devicePixelRatio || 1, 2);

  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;

  canvas.width = canvasWidth * pixelRatio;
  canvas.height = canvasHeight * pixelRatio;

  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  ctx.setTransform(
    pixelRatio,
    0,
    0,
    pixelRatio,
    0,
    0
  );

  createParticles();

}


function createParticles() {

  const mobile =
    window.innerWidth < 700;

  const count =
    mobile ? 28 : 55;

  particles = [];

  for (let i = 0; i < count; i++) {

    particles.push({

      x: Math.random() * canvasWidth,

      y: Math.random() * canvasHeight,

      vx: (Math.random() - 0.5) * 0.25,

      vy: (Math.random() - 0.5) * 0.25,

      radius:
        Math.random() * 1.5 + 0.5

    });

  }

}


function drawNetwork() {

  if (!canvas || !ctx) return;

  ctx.clearRect(
    0,
    0,
    canvasWidth,
    canvasHeight
  );


  const isLight =
    body.classList.contains("light");


  const pointColor =
    isLight
      ? "rgba(0,0,0,.25)"
      : "rgba(255,255,255,.25)";


  const lineColor =
    isLight
      ? "rgba(0,0,0,.07)"
      : "rgba(255,255,255,.07)";


  particles.forEach(particle => {

    particle.x += particle.vx;
    particle.y += particle.vy;


    if (
      particle.x < 0 ||
      particle.x > canvasWidth
    ) {
      particle.vx *= -1;
    }


    if (
      particle.y < 0 ||
      particle.y > canvasHeight
    ) {
      particle.vy *= -1;
    }


    ctx.beginPath();

    ctx.arc(
      particle.x,
      particle.y,
      particle.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = pointColor;

    ctx.fill();

  });


  for (let i = 0; i < particles.length; i++) {

    for (
      let j = i + 1;
      j < particles.length;
      j++
    ) {

      const a = particles[i];
      const b = particles[j];

      const dx = a.x - b.x;
      const dy = a.y - b.y;

      const distance =
        Math.sqrt(dx * dx + dy * dy);


      if (distance < 150) {

        const opacity =
          (1 - distance / 150) * 0.6;

        ctx.beginPath();

        ctx.moveTo(a.x, a.y);

        ctx.lineTo(b.x, b.y);

        ctx.strokeStyle =
          isLight
            ? `rgba(0,0,0,${opacity * .12})`
            : `rgba(255,255,255,${opacity * .12})`;

        ctx.lineWidth = 1;

        ctx.stroke();

      }

    }

  }


  animationFrame =
    requestAnimationFrame(drawNetwork);

}


if (canvas && ctx) {

  resizeCanvas();

  drawNetwork();

  window.addEventListener(
    "resize",
    resizeCanvas
  );

}


/* ---------------------------------------------------------
   ACTIVE NAVIGATION
--------------------------------------------------------- */

const sections =
  document.querySelectorAll("main section[id]");

const navAnchors =
  document.querySelectorAll(".nav-links a");


const sectionObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const id =
          entry.target.getAttribute("id");

        navAnchors.forEach(anchor => {

          anchor.classList.remove("active");

          if (
            anchor.getAttribute("href") ===
            `#${id}`
          ) {
            anchor.classList.add("active");
          }

        });

      });

    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );


sections.forEach(section => {
  sectionObserver.observe(section);
});


/* ---------------------------------------------------------
   CLOSE MOBILE MENU WHEN RESIZING
--------------------------------------------------------- */

window.addEventListener("resize", () => {

  if (
    window.innerWidth > 900 &&
    navLinks
  ) {
    navLinks.classList.remove("open");
  }

});


/* ---------------------------------------------------------
   INITIAL LOAD
--------------------------------------------------------- */

window.addEventListener("load", () => {

  setTimeout(() => {

    document
      .querySelectorAll(".hero .reveal")
      .forEach(element => {
        element.classList.add("visible");
      });

  }, 150);

});


/* ---------------------------------------------------------
   CLEANUP
--------------------------------------------------------- */

window.addEventListener("beforeunload", () => {

  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }

});
         

    
      
      


    if (user) {

      message.innerHTML = `
        <div class="ayaan-bubble ayaan-user-bubble">
          ${escapeHTML(text)}
        </div>
      `;

    } else {

      message.innerHTML = `
        <div class="ayaan-message-avatar">
          ✦
        </div>

        <div class="ayaan-bubble">
          ${text}
        </div>
      `;

    }


    messages.appendChild(message);

    scrollMessages();

  }
