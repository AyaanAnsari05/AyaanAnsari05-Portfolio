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
/* =========================================================
   AYAAN AI - PERSONAL PORTFOLIO CHATBOT
   No API key required
   ========================================================= */

(() => {

  /* -------------------------------------------------------
     CHATBOT KNOWLEDGE
  ------------------------------------------------------- */

  const ayaanKnowledge = {
    name: "Muhammad Ayaan Ansari",

    title: "Aspiring AI Engineer",

    location: "Pakistan",

    about:
      "Muhammad Ayaan Ansari is an aspiring AI Engineer who is highly curious about how Artificial Intelligence is made. He wants to understand how AI models work and eventually build AI models himself. He is also motivated toward personal and environmental improvement.",

    education: [
      "Orchids Primary School, Pune, Maharashtra, India. Completed in 2023 with 76.20%.",
      "Poona College of Arts, Science and Commerce, Pune, Maharashtra, India. Completed Intermediate in Commerce in 2025 with 51%."
    ],

    experience:
      "Muhammad worked at IBEX Global as a Customer Service Representative on the Walmart campaign. It was a contract-based role lasting two months from November to December. His work involved helping customers solve problems relating to products, websites, applications and other customer concerns. He was one of the top performers.",

    skills: [
      "Python, beginner level",
      "Prompt Engineering, currently learning",
      "AI and emerging technologies",
      "Problem solving",
      "Critical thinking",
      "Customer support",
      "Microsoft Excel, beginner",
      "Microsoft Word",
      "Microsoft PowerPoint"
    ],

    tools: [
      "VS Code",
      "ChatGPT",
      "Claude",
      "Other AI models and AI tools"
    ],

    certification:
      "Muhammad completed the MS-CIT course and achieved 91 marks out of 100.",

    future:
      "Muhammad's goal is to build a strong career in Artificial Intelligence, gain valuable experience, and eventually become a freelancer after developing strong professional skills. He is planning to enroll at Virtual University and study BSCS while taking additional AI courses.",

    linkedin:
      "https://www.linkedin.com/in/muhammad-ayaan-ansari-04451629b",

    github:
      "https://github.com/ayaan-PrObOt",

    email:
      "ayaanansariorchid@gmail.com"
  };


  /* -------------------------------------------------------
     CREATE CHATBOT HTML
  ------------------------------------------------------- */

  const chatbotHTML = `
    <div class="ayaan-chatbot">

      <button
        class="ayaan-chat-button"
        id="ayaanChatButton"
        aria-label="Open Ayaan AI"
      >
        <span class="ayaan-chat-icon">✦</span>
        <span class="ayaan-chat-label">Ask Ayaan AI</span>
      </button>


      <div
        class="ayaan-chat-window"
        id="ayaanChatWindow"
        aria-hidden="true"
      >

        <div class="ayaan-chat-header">

          <div class="ayaan-ai-avatar">
            ✦
          </div>

          <div class="ayaan-ai-heading">
            <strong>Ayaan AI</strong>
            <span>
              <i></i>
              Online · Knows about Ayaan
            </span>
          </div>

          <button
            class="ayaan-close"
            id="ayaanClose"
            aria-label="Close chatbot"
          >
            ×
          </button>

        </div>


        <div
          class="ayaan-messages"
          id="ayaanMessages"
        >

          <div class="ayaan-message ayaan-bot-message">
            <div class="ayaan-message-avatar">✦</div>

            <div class="ayaan-bubble">
              Hey! I'm <strong>Ayaan AI</strong>. 👋
              <br><br>
              Ask me anything about Muhammad Ayaan Ansari,
              his background, skills, experience, education,
              goals or what he's learning.
            </div>
          </div>

        </div>


        <div
          class="ayaan-suggestions"
          id="ayaanSuggestions"
        >

          <button data-question="Who is Ayaan?">
            Who is Ayaan?
          </button>

          <button data-question="What are his skills?">
            His skills
          </button>

          <button data-question="What is his experience?">
            Experience
          </button>

          <button data-question="What are his future goals?">
            Future goals
          </button>

        </div>


        <form
          class="ayaan-input-area"
          id="ayaanChatForm"
        >

          <input
            type="text"
            id="ayaanChatInput"
            placeholder="Ask about Ayaan..."
            autocomplete="off"
            maxlength="500"
          >

          <button
            type="submit"
            aria-label="Send message"
          >
            ↑
          </button>

        </form>

        <div class="ayaan-powered">
          PERSONAL PORTFOLIO AI · NO API REQUIRED
        </div>

      </div>

    </div>
  `;


  document.body.insertAdjacentHTML(
    "beforeend",
    chatbotHTML
  );


  /* -------------------------------------------------------
     CHATBOT CSS
     Injected here so you don't have to edit style.css
  ------------------------------------------------------- */

  const chatbotCSS = `
    .ayaan-chatbot {
      position: fixed;
      right: 25px;
      bottom: 25px;
      z-index: 500;
      font-family: "Inter", sans-serif;
    }

    .ayaan-chat-button {
      height: 52px;
      padding: 0 18px;
      border: 1px solid var(--line-strong);
      background: var(--surface);
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      box-shadow: 0 15px 50px rgba(0,0,0,.25);
      transition:
        transform .3s cubic-bezier(.2,.8,.2,1),
        border-color .3s ease,
        background .3s ease;
    }

    .ayaan-chat-button:hover {
      transform: translateY(-4px);
      border-color: var(--white);
    }

    .ayaan-chat-icon {
      width: 25px;
      height: 25px;
      border: 1px solid var(--line-strong);
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 12px;
      animation: ayaanStarPulse 2.5s ease-in-out infinite;
    }

    @keyframes ayaanStarPulse {
      0%,100% {
        transform: rotate(0deg) scale(1);
      }
      50% {
        transform: rotate(180deg) scale(1.12);
      }
    }

    .ayaan-chat-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: .12em;
    }

    .ayaan-chat-window {
      position: absolute;
      right: 0;
      bottom: 65px;
      width: min(390px, calc(100vw - 28px));
      height: 590px;
      max-height: calc(100vh - 105px);
      background: rgba(12,12,12,.96);
      border: 1px solid var(--line-strong);
      box-shadow: 0 25px 100px rgba(0,0,0,.45);
      backdrop-filter: blur(25px);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px) scale(.97);
      transform-origin: bottom right;
      transition:
        opacity .3s ease,
        visibility .3s ease,
        transform .4s cubic-bezier(.2,.8,.2,1);
    }

    body.light .ayaan-chat-window {
      background: rgba(248,248,248,.97);
    }

    .ayaan-chat-window.open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }

    .ayaan-chat-header {
      min-height: 75px;
      padding: 15px 16px;
      border-bottom: 1px solid var(--line);
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }

    .ayaan-ai-avatar {
      width: 42px;
      height: 42px;
      border: 1px solid var(--line-strong);
      display: grid;
      place-items: center;
      font-size: 17px;
      border-radius: 50%;
      animation: ayaanAvatarFloat 3s ease-in-out infinite;
    }

    @keyframes ayaanAvatarFloat {
      0%,100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-3px);
      }
    }

    .ayaan-ai-heading {
      flex: 1;
    }

    .ayaan-ai-heading strong {
      display: block;
      font-family: "Space Grotesk", sans-serif;
      font-size: 15px;
    }

    .ayaan-ai-heading span {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--muted);
      font-size: 9px;
      margin-top: 3px;
    }

    .ayaan-ai-heading i {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--white);
      display: inline-block;
      animation: ayaanOnline 1.5s infinite;
    }

    @keyframes ayaanOnline {
      50% {
        opacity: .3;
      }
    }

    .ayaan-close {
      width: 34px;
      height: 34px;
      border: 1px solid var(--line);
      background: transparent;
      color: var(--text);
      cursor: pointer;
      font-size: 20px;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }

    .ayaan-close:hover {
      background: var(--white);
      color: var(--black);
    }

    .ayaan-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px 16px;
      scroll-behavior: smooth;
    }

    .ayaan-message {
      display: flex;
      gap: 9px;
      margin-bottom: 18px;
      animation: ayaanMessageIn .4s cubic-bezier(.2,.8,.2,1);
    }

    .ayaan-user-message {
      justify-content: flex-end;
    }

    @keyframes ayaanMessageIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .ayaan-message-avatar {
      flex-shrink: 0;
      width: 25px;
      height: 25px;
      border: 1px solid var(--line);
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 9px;
    }

    .ayaan-bubble {
      max-width: 82%;
      padding: 11px 13px;
      border: 1px solid var(--line);
      background: var(--surface);
      color: var(--text);
      font-size: 12px;
      line-height: 1.55;
    }

    .ayaan-user-bubble {
      background: var(--white);
      color: var(--black);
      border-color: var(--white);
    }

    .ayaan-bubble a {
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    .ayaan-typing {
      display: flex;
      gap: 4px;
      align-items: center;
      height: 20px;
    }

    .ayaan-typing span {
      width: 5px;
      height: 5px;
      background: var(--muted);
      border-radius: 50%;
      animation: ayaanTyping 1s infinite;
    }

    .ayaan-typing span:nth-child(2) {
      animation-delay: .15s;
    }

    .ayaan-typing span:nth-child(3) {
      animation-delay: .3s;
    }

    @keyframes ayaanTyping {
      0%,60%,100% {
        transform: translateY(0);
        opacity: .4;
      }
      30% {
        transform: translateY(-5px);
        opacity: 1;
      }
    }

    .ayaan-suggestions {
      display: flex;
      gap: 7px;
      padding: 10px 15px;
      overflow-x: auto;
      border-top: 1px solid var(--line);
      scrollbar-width: none;
      flex-shrink: 0;
    }

    .ayaan-suggestions::-webkit-scrollbar {
      display: none;
    }

    .ayaan-suggestions button {
      white-space: nowrap;
      background: transparent;
      border: 1px solid var(--line);
      color: var(--muted);
      padding: 8px 10px;
      font-size: 9px;
      cursor: pointer;
      transition: .25s ease;
    }

    .ayaan-suggestions button:hover {
      color: var(--text);
      border-color: var(--line-strong);
    }

    .ayaan-input-area {
      padding: 12px;
      border-top: 1px solid var(--line);
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }

    .ayaan-input-area input {
      min-width: 0;
      flex: 1;
      height: 43px;
      border: 1px solid var(--line);
      background: var(--surface);
      color: var(--text);
      outline: none;
      padding: 0 12px;
      font-size: 12px;
    }

    .ayaan-input-area input:focus {
      border-color: var(--line-strong);
    }

    .ayaan-input-area input::placeholder {
      color: var(--muted);
    }

    .ayaan-input-area button {
      width: 43px;
      height: 43px;
      border: 1px solid var(--white);
      background: var(--white);
      color: var(--black);
      cursor: pointer;
      font-size: 17px;
      transition: transform .2s ease;
    }

    .ayaan-input-area button:hover {
      transform: translateY(-2px);
    }

    .ayaan-powered {
      padding: 0 12px 10px;
      color: var(--muted);
      font-size: 7px;
      letter-spacing: .13em;
      text-align: center;
    }

    @media (max-width: 560px) {

      .ayaan-chatbot {
        right: 14px;
        bottom: 14px;
      }

      .ayaan-chat-button {
        height: 48px;
        padding: 0 14px;
      }

      .ayaan-chat-window {
        position: fixed;
        left: 14px;
        right: 14px;
        bottom: 74px;
        width: auto;
        height: min(600px, calc(100vh - 95px));
        max-height: none;
        transform-origin: bottom center;
      }

      .ayaan-chat-label {
        font-size: 9px;
      }

    }
  `;


  const styleElement =
    document.createElement("style");

  styleElement.id = "ayaan-chatbot-styles";
  styleElement.textContent = chatbotCSS;

  document.head.appendChild(styleElement);


  /* -------------------------------------------------------
     ELEMENTS
  ------------------------------------------------------- */

  const chatButton =
    document.getElementById("ayaanChatButton");

  const chatWindow =
    document.getElementById("ayaanChatWindow");

  const closeButton =
    document.getElementById("ayaanClose");

  const messages =
    document.getElementById("ayaanMessages");

  const form =
    document.getElementById("ayaanChatForm");

  const input =
    document.getElementById("ayaanChatInput");

  const suggestions =
    document.getElementById("ayaanSuggestions");


  /* -------------------------------------------------------
     OPEN / CLOSE
  ------------------------------------------------------- */

  function openChat() {

    chatWindow.classList.add("open");

    chatWindow.setAttribute(
      "aria-hidden",
      "false"
    );

    setTimeout(() => {
      input.focus();
    }, 300);

  }


  function closeChat() {

    chatWindow.classList.remove("open");

    chatWindow.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  chatButton.addEventListener(
    "click",
    () => {

      if (
        chatWindow.classList.contains("open")
      ) {
        closeChat();
      } else {
        openChat();
      }

    }
  );


  closeButton.addEventListener(
    "click",
    closeChat
  );


  /* -------------------------------------------------------
     ADD MESSAGE
  ------------------------------------------------------- */

  function addMessage(text, user = false) {

    const message =
      document.createElement("div");

    message.className =
      user
        ? "ayaan-message ayaan-user-message"
        : "ayaan-message ayaan-bot-message";


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


  /* -------------------------------------------------------
     TYPING INDICATOR
  ------------------------------------------------------- */

  function showTyping() {

    const typing =
      document.createElement("div");

    typing.className =
      "ayaan-message ayaan-typing-message";

    typing.id =
      "ayaanTypingMessage";

    typing.innerHTML = `
      <div class="ayaan-message-avatar">
        ✦
      </div>

      <div class="ayaan-bubble">
        <div class="ayaan-typing">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;

    messages.appendChild(typing);

    scrollMessages();

  }


  function hideTyping() {

    const typing =
      document.getElementById(
        "ayaanTypingMessage"
      );

    if (typing) {
      typing.remove();
    }

  }


  function scrollMessages() {

    messages.scrollTop =
      messages.scrollHeight;

  }


  /* -------------------------------------------------------
     RESPONSE ENGINE
  ------------------------------------------------------- */

  function getResponse(question) {

    const q =
      question
        .toLowerCase()
        .replace(/[?!.]/g, "")
        .trim();


    /* GREETINGS */

    if (
      /^(hi|hello|hey|yo|sup|hiya|good morning|good evening|good afternoon)$/.test(q)
    ) {

      return `
        Hey! 👋 I'm <strong>Ayaan AI</strong>.
        <br><br>
        I'm here to tell you about Muhammad Ayaan Ansari.
        Ask me something!
      `;

    }


    /* WHO */

    if (
      q.includes("who is ayaan") ||
      q.includes("who is ayaan ansari") ||
      q.includes("tell me about ayaan") ||
      q.includes("about ayaan") ||
      q.includes("who are you")
    ) {

      return `
        <strong>Muhammad Ayaan Ansari</strong> is an aspiring
        AI Engineer from Pakistan.
        <br><br>
        He's curious about how Artificial Intelligence is made
        and wants to eventually build AI models himself.
        He's currently developing his skills in Python,
        Prompt Engineering and AI technologies.
      `;

    }


    /* NAME */

    if (
      q.includes("your name") ||
      q.includes("his name") ||
      q === "name"
    ) {

      return `
        His name is <strong>Muhammad Ayaan Ansari</strong>.
      `;

    }


    /* AGE / PERSONAL UNKNOWN */

    if (
      q.includes("how old") ||
      q.includes("age")
    ) {

      return `
        His portfolio doesn't currently list his age.
        I'd rather not make up information that isn't provided.
      `;

    }


    /* LOCATION */

    if (
      q.includes("where is he") ||
      q.includes("where does he live") ||
      q.includes("location") ||
      q.includes("country") ||
      q.includes("where is ayaan from")
    ) {

      return `
        He's based in <strong>Pakistan</strong>.
      `;

    }


    /* EDUCATION */

    if (
      q.includes("education") ||
      q.includes("study") ||
      q.includes("studied") ||
      q.includes("school") ||
      q.includes("college") ||
      q.includes("degree") ||
      q.includes("qualification")
    ) {

      return `
        <strong>Education</strong>
        <br><br>
        • Orchids Primary School, Pune, Maharashtra, India
        <br>
        Completed in 2023 with <strong>76.20%</strong>.
        <br><br>
        • Poona College of Arts, Science and Commerce,
        Pune, Maharashtra, India
        <br>
        Completed Intermediate in Commerce in 2025 with
        <strong>51%</strong>.
        <br><br>
        He's planning to enroll at Virtual University and
        study BSCS while taking additional AI courses.
      `;

    }


    /* SKILLS */

    if (
      q.includes("skill") ||
      q.includes("what can he do") ||
      q.includes("programming") ||
      q.includes("technical")
    ) {

      return `
        <strong>Current skills:</strong>
        <br><br>
        • Python, beginner level
        <br>
        • Prompt Engineering, currently learning
        <br>
        • AI & emerging technologies
        <br>
        • Problem solving
        <br>
        • Critical thinking
        <br>
        • Customer support
        <br>
        • Microsoft Excel, beginner
        <br>
        • Microsoft Word
        <br>
        • Microsoft PowerPoint
      `;

    }


    /* PYTHON */

    if (
      q.includes("python")
    ) {

      return `
        Muhammad currently knows <strong>Python at a beginner
        le
