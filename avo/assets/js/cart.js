let div = document.getElementById("bskcontainer")

function clearNull() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let updatedCart = cart.filter(item => item !== null);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
}

function getProducts() {
  div.innerHTML = ``;
  clearNull()
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cart)
  cart.map((item, index) => {
    const box = document.createElement("div");
    box.className = "myCard"
    console.log(item)
    box.innerHTML = ` 
    <img src="${item.image}" alt="">
    <h6>${item.name}</h6>
    <button onclick="removeItem(${index})">Remove</button>
    `;

    div.appendChild(box);
  });
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  getProducts();
}
getProducts()