
// generate all characters
const alphabet = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i)
).join("");

// select the dom elements
const matrixContainer = document.getElementById("matrix-container");
const scoreContainer = document.getElementById("score");

// get score either from localstorage or start with zero first time
let score = JSON.parse(localStorage.getItem("score")) || 0;

// update score on ui on first load
scoreContainer.textContent = score;

// function to create rain of random characters
function matrix() {
  const randomSelection = alphabet[Math.floor(Math.random() * alphabet.length)];
  const rainDrop = document.createElement("div");
  
  rainDrop.textContent = randomSelection;
  rainDrop.classList.add("matrix");
  
  rainDrop.style.left = Math.random() * window.innerWidth + "px";
  matrixContainer.append(rainDrop);
  rainDrop.addEventListener("animationend", () => rainDrop.remove());
}

// check if preesed key is same as one of falling characters
function check(e) {
  const pressedKey = e.key;
  const drops = matrixContainer.querySelectorAll("div");

  drops.forEach((l) => {
    if (l.textContent === pressedKey.toLowerCase()) {
      l.style.backgroundColor = "#0f0";
      l.style.color = "#fff";
      score += 1;
      localStorage.setItem("score", JSON.stringify(score));
      scoreContainer.textContent = score;
      new Audio("/typing-checker/correct.mp3").play();
    }
  });
}

// update the dom tree on page visiblity change
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    // Clear all old drops when coming back to tab
    matrixContainer.innerHTML = "";
  }
});

// fire event listerner on event
document.addEventListener("keydown", check);

// call function matrix repetadly after 500ms
setInterval(() => {
  matrix();
}, 500);
