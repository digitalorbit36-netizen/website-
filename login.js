import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDmCHkAqiFFCZFslAzP7une-1r47P0o4qk",
  authDomain: "video-downloader-b4bcb.firebaseapp.com",
  projectId: "video-downloader-b4bcb",
  storageBucket: "video-downloader-b4bcb.firebasestorage.app",
  messagingSenderId: "138753511187",
  appId: "1:138753511187:web:8c13c7eee6d9511459d4e6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const email = document.getElementById("email");
const password = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

// Login
loginBtn.addEventListener("click", async () => {

  try {

    await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    alert("Login Successful!");

    window.location.href = "index.html";

  } catch (error) {

    alert(error.message);

  }

});

// Signup
signupBtn.addEventListener("click", async () => {

  try {

    await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    alert("Account Created Successfully!");

  } catch (error) {

    alert(error.message);

  }

});
