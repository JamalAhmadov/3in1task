let container = document.getElementById("container");
let loadBtn = document.getElementById("loadBtn");
let search = document.getElementById("search");

let page = 1;
let limit = 4;

const renderData = async () => {
  const res = await fetch(
    `https://65745c66f941bda3f2afa6af.mockapi.io/products?page=${page}&limit=${limit}`
  );
  const data = await res.json();
  db = data;
  db.forEach((item) => {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="${item.image}" alt=""> 
        <div class="title">
        <h6>${item.name}</h6>
        <p>$: ${item.price}</p>

        </div>
        <button onclick="addToBasket(${item.id})">$ ${item.price}</button>
        `;
    container.append(card);
  });
  page++;
};

loadBtn.addEventListener("click", renderData);
renderData();

const searchByName = async (name) => {
  const res = await fetch(
    `https://65745c66f941bda3f2afa6af.mockapi.io/products`
  );
  const data = await res.json();
  let flteddata = data.filter((item) => item.name.toLowerCase().includes(name));
  container.innerHTML = " ";
  flteddata.forEach((item) => {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="${item.image}" alt="">
        <h6>${item.name}</h6>
        <button onclick="addToBasket(${item.id})">$ ${item.price}</button>
        `;
    container.append(card);
  });
};
search.addEventListener("input", (e) => {
  searchByName(e.target.value);
});

function addToBasket(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(db.find((item) => item.id == id));
  localStorage.setItem("cart", JSON.stringify(cart));
}

window.addEventListener("scroll", function () {
  let header = document.getElementById("header");
  let navlink = document.querySelectorAll(".nav-link");
  let scrollPosition = window.scrollY;

  if (scrollPosition > 100) {
    header.style.backgroundColor = "white";
    navlink.style.color = "black";

  } else {
      header.style.backgroundColor = "transparent";
      navlink.style.color = "white";
  }
});
