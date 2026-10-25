const root = document.documentElement;
const languageToggle = document.querySelector("#language-toggle");
const themeToggle = document.querySelector("#theme-toggle");
const menuToggle = document.querySelector("#menu-toggle");
const navigation = document.querySelector(".top-nav");
const navLinks = [...document.querySelectorAll('.top-nav a[href^="#"]')];
const sections = [...document.querySelectorAll("main > section[id]")];
const filterButtons = [...document.querySelectorAll(".publication-filter button")];
const publications = [...document.querySelectorAll(".publication-item")];

const storedLanguage = localStorage.getItem("shaowen-site-language");
const initialLanguage = storedLanguage === "zh" ? "zh" : "en";

function setLanguage(language) {
  const isChinese = language === "zh";
  root.lang = isChinese ? "zh-CN" : "en";
  languageToggle.textContent = isChinese ? "EN" : "中文";
  languageToggle.setAttribute("aria-label", isChinese ? "Switch to English" : "切换为中文");
  document.querySelectorAll(".lang-en").forEach((element) => element.setAttribute("aria-hidden", String(isChinese)));
  document.querySelectorAll(".lang-zh").forEach((element) => element.setAttribute("aria-hidden", String(!isChinese)));
  localStorage.setItem("shaowen-site-language", language);
}

setLanguage(initialLanguage);

languageToggle.addEventListener("click", () => {
  setLanguage(root.lang === "zh-CN" ? "en" : "zh");
});

const storedTheme = localStorage.getItem("shaowen-site-theme");
const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.dataset.theme = storedTheme || (preferredDark ? "dark" : "light");

themeToggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("shaowen-site-theme", root.dataset.theme);
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("open", !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("open");
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    publications.forEach((publication) => {
      publication.hidden = filter !== "all" && publication.dataset.type !== filter;
    });
  });
});

document.querySelector(".back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
