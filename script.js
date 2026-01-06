// Year
document.getElementById("year").textContent = new Date().getFullYear();

// ---------------------------
// Theme (Dark/Light)
// ---------------------------
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");

function setTheme(theme) {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
    themeBtn.textContent = "☀️";
    themeBtn.setAttribute("aria-label", "Switch to light mode");
  } else {
    root.removeAttribute("data-theme");
    themeBtn.textContent = "🌙";
    themeBtn.setAttribute("aria-label", "Switch to dark mode");
  }
  localStorage.setItem("theme", theme);
}

// Auto theme on first load
if (savedTheme) {
  setTheme(savedTheme);
} else {
  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
}

themeBtn.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  setTheme(isDark ? "light" : "dark");
  showToast(isDark ? "Light mode enabled" : "Dark mode enabled");
});

// ---------------------------
// Toast helper
// ---------------------------
const toastEl = document.getElementById("toast");
let toastTimer = null;

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1800);
}

// ---------------------------
// Copy form link
// ---------------------------
const formLink = "https://forms.gle/rspNBQ8CWEijUEkU6";
document.getElementById("copyLinkBtn").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(formLink);
    showToast("Form link copied!");
  } catch (e) {
    // Fallback
    const tmp = document.createElement("textarea");
    tmp.value = formLink;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand("copy");
    document.body.removeChild(tmp);
    showToast("Form link copied!");
  }
});

// ---------------------------
// Share (mobile friendly)
// ---------------------------
document.getElementById("shareBtn").addEventListener("click", async () => {
  const shareData = {
    title: "Student Helpdesk",
    text: "Submit your query here:",
    url: formLink
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (e) {
      // user canceled
    }
  } else {
    showToast("Share not supported. Copy the link instead.");
  }
});

// ---------------------------
// Reveal animation on scroll
// ---------------------------
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      io.unobserve(entry.target);
    }
  }
}, { threshold: 0.12 });

reveals.forEach(el => io.observe(el));
