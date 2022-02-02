const cartBtn = document.querySelectorAll(".cartBtn");
const cartNumberText = document.querySelector(".cartNumber");
const itemContainer = document.querySelector(".itemContainer");
const alertBox = document.querySelector(".alertBox");

const products = [
  {
    name: "Addidas Hoddie",
    tag: "adidasHoddie",
    price: 25,
    inCart: 0,
  },
  {
    name: "Black Hoddie",
    tag: "blackHoddie",
    price: 20,
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
    totalPrices(products[i]);
  });
}

function totalPrices(prodcut) {
  let totalPrices = localStorage.getItem("totalPrices");
  totalPrices = Number(totalPrices);
  if (totalPrices) {
    totalPrices += prodcut.price;
  } else {
    totalPrices = prodcut.price;
  }

  localStorage.setItem("totalPrices", totalPrices);
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

function showProductItem() {
  let showProductItem = localStorage.getItem("setItemsProducts");
  let totalPrices = localStorage.getItem("totalPrices");
  showProductItem = JSON.parse(showProductItem);
  if (showProductItem && itemContainer && alertBox) {
    itemContainer.innerHTML = "";
    alertBox.innerHTML = `
    <div class="alertBox alert alert-primary alert-dismissible fade show"
          role="alert">
          <h3 class="text-center">Total Prices : $${totalPrices}.00</h3>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>`;
    Object.values(showProductItem).map((item) => {
      itemContainer.innerHTML += `
      <div class="col-md my-5 d-flex justify-content-center">
          <div class="card text-center p-2" style="width: 18rem">
            <img src="./img/${item.tag}.jpg" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p>price $${item.price}.00</p>
              <h5>Total item : ${item.inCart}</h5>
              <h5>Total Prices : $${item.price * item.inCart}.00</h5>
              <p class="card-text"></p>
              <button class="btn btn-outline-danger cartBtn">Remove</button>
              <button class="btn btn-outline-primary cartBtn">Order Now</button>
            </div>
          </div>
        </div>
      `;
    });
  }
}

function initFunction() {
  let cartNumber = localStorage.getItem("cartNumber");
  if (cartNumber) {
    cartNumberText.textContent = cartNumber;
  }
}

showProductItem();
initFunction();
