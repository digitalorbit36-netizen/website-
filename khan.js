// =====================================
// DIGITAL ORBIT - FIREBASE SETUP
// =====================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmCHkAqiFFCZFslAzP7une-1r47P0o4qk",
  authDomain: "video-downloader-b4bcb.firebaseapp.com",
  projectId: "video-downloader-b4bcb",
  storageBucket: "video-downloader-b4bcb.firebasestorage.app",
  messagingSenderId: "138753511187",
  appId: "1:138753511187:web:8c13c7eee6d9511459d4e6",
  measurementId: "G-QJNPSBSPXT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =====================================
// DARK / LIGHT MODE
// =====================================

const modeBtn = document.getElementById("mode");

modeBtn.addEventListener("click", () => {

  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    modeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    modeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }

});

// =====================================
// DOWNLOAD BUTTON
// =====================================

const input = document.getElementById("videoURL");
const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", startDownload);

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    startDownload();
  }
});

async function startDownload() {

  let url = input.value.trim();

  if (url === "") {
    alert("Please paste a video URL.");
    return;
  }

  if (!url.startsWith("http")) {
    alert("Please enter a valid URL.");
    return;
  }

  downloadBtn.disabled = true;
  downloadBtn.innerHTML =
    '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

  try {

    await addDoc(collection(db, "downloads"), {
      url: url,
      createdAt: new Date().toISOString()
    });

    downloadBtn.disabled = false;
    downloadBtn.innerHTML =
      '<i class="fa-solid fa-download"></i> Download';

    alert("URL Saved Successfully!");

  } catch (error) {

    console.error(error);

    downloadBtn.disabled = false;
    downloadBtn.innerHTML =
      '<i class="fa-solid fa-download"></i> Download';

    alert(error.message);

  }

}
// ======================
// SMOOTH SCROLL
// ======================

document.querySelectorAll("nav a").forEach(link => {

  link.addEventListener("click", function (e) {

    const target = this.getAttribute("href");

    if (target.startsWith("#")) {

      e.preventDefault();

      document.querySelector(target).scrollIntoView({
        behavior: "smooth"
      });

    }

  });

});

// ======================
// HEADER SHADOW
// ======================

window.addEventListener("scroll", () => {

  const header = document.querySelector("header");

  if (window.scrollY > 50) {
    header.style.boxShadow = "0 10px 25px rgba(255,0,0,.25)";
  } else {
    header.style.boxShadow = "none";
  }

});

// ======================
// CARD ANIMATION
// ======================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-12px) scale(1.03)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });

});

// ======================
// FEATURE ANIMATION
// ======================

const features = document.querySelectorAll(".feature-box");

features.forEach(box => {

  box.addEventListener("mouseenter", () => {
    box.style.transform = "translateY(-10px)";
  });

  box.addEventListener("mouseleave", () => {
    box.style.transform = "translateY(0)";
  });

});
// ======================
// SCROLL ANIMATION
// ======================

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }

  });

}, {
  threshold: 0.2
});

document.querySelectorAll(".card,.feature-box,.faq-item,.contact,.about").forEach(el => {
  observer.observe(el);
});

// ======================
// CONTACT FORM
// ======================

const form = document.querySelector(".contact-form");

if (form) {

  form.addEventListener("submit", function (e) {

    e.preventDefault();

    const btn = form.querySelector("button");

    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {

      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent';

      setTimeout(() => {

        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        btn.disabled = false;
        form.reset();

      }, 2000);

    }, 1500);

  });

}

// ======================
// TYPEWRITER EFFECT
// ======================

const title = document.querySelector(".hero h1 span");

const words = [
  "Without Watermark",
  "Fast Download",
  "HD Quality",
  "Unlimited"
];

let wordIndex = 0;

setInterval(() => {

  wordIndex++;

  if (wordIndex >= words.length) {
    wordIndex = 0;
  }

  if (title) {
    title.textContent = words[wordIndex];
  }

}, 2500);

// ======================
// BUTTON RIPPLE EFFECT
// ======================

document.querySelectorAll("button").forEach(btn => {

  btn.addEventListener("click", function (e) {

    const circle = document.createElement("span");

    const diameter = Math.max(btn.clientWidth, btn.clientHeight);

    circle.style.width = diameter + "px";
    circle.style.height = diameter + "px";
    circle.style.left = (e.offsetX - diameter / 2) + "px";
    circle.style.top = (e.offsetY - diameter / 2) + "px";

    circle.classList.add("ripple");

    btn.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 600);

  });

});

// ======================
// AUTO YEAR
// ======================

const copy = document.querySelector(".copyright");

if (copy) {
  copy.innerHTML = `© ${new Date().getFullYear()} Digital Orbit. All Rights Reserved.`;
}

// ======================
// PAGE LOADED
// ======================

window.addEventListener("load", () => {
  console.log("Digital Orbit Website Loaded Successfully.");
});
