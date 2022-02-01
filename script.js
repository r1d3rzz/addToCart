const cartBtn = document.querySelectorAll(".cartBtn");
const cartNumberText = document.querySelector(".cartNumber");

const products = [
  {
    name: "Addidas Hoddie",
    tag: "addidasHoddie",
    price: 25,
    inCart: 0,
  },
  {
    name: "Black Hoddie",
    tag: "blackHoddie",
    price: 25,
    inCart: 0,
  },
  {
    name: "Forest Hoddie",
    tag: "forestHoddie",
    price: 30,
    inCart: 0,
  },
  {
    name: "White Hoddie",
    tag: "whiteHoddie",
    price: 10,
    inCart: 0,
  },
];

for (let i = 0; i < cartBtn.length; i++) {
  cartBtn[i].addEventListener("click", function () {
    cartNumber(products[i]);
  });
}

function cartNumber(product) {
  let cartNumber = localStorage.getItem("cartNumber");
  cartNumber = Number(cartNumber);
  if (cartNumber) {
    localStorage.setItem("cartNumber", cartNumber + 1);
    cartNumberText.textContent = cartNumber + 1;
  } else {
    localStorage.setItem("cartNumber", 1);
    cartNumberText.textContent = 1;
  }

  setItemsProducts(product);
}

function setItemsProducts(product) {
  let setItemsProducts = localStorage.getItem("setItemsProducts");
  setItemsProducts = JSON.parse(setItemsProducts);

  if (setItemsProducts != null) {
    if (setItemsProducts[product.tag] == undefined) {
      setItemsProducts = {
        ...setItemsProducts,
        [product.tag]: product,
      };
    }
    setItemsProducts[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    setItemsProducts = {
      [product.tag]: product,
    };
  }
  localStorage.setItem("setItemsProducts", JSON.stringify(setItemsProducts));
}

function initFunction() {
  let cartNumber = localStorage.getItem("cartNumber");
  if (cartNumber) {
    cartNumberText.textContent = cartNumber;
  }
}

initFunction();
