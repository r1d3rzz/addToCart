const cartBtn = document.querySelectorAll(".cartBtn");
const cartNumberText = document.querySelector(".cartNumber");

for (let i = 0; i < cartBtn.length; i++) {
  cartBtn[i].addEventListener("click", function () {
    cartNumber();
  });
}

function cartNumber() {
  let cartNumber = localStorage.getItem("cartNumber");
  cartNumber = Number(cartNumber);
  if (cartNumber) {
    localStorage.setItem("cartNumber", cartNumber + 1);
    cartNumberText.textContent = cartNumber + 1;
  } else {
    localStorage.setItem("cartNumber", 1);
    cartNumberText.textContent = 1;
  }
}

function initFunction() {
  let cartNumber = localStorage.getItem("cartNumber");
  if (cartNumber) {
    cartNumberText.textContent = cartNumber;
  }
}

initFunction();
