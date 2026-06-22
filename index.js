let products = data;
const sidebar = document.getElementById("sidebar");
const sideToggle = document.getElementById("side-toggle");
let sidebarOpen;
if (localStorage.getItem("sidebar") == "closed") {
    sidebarOpen = false;
    sidebar.style.display = "none";
    sideToggle.textContent = ">";
    sideToggle.title = "Show sidebar"
}
else {
    sidebarOpen = true;
}

//Sidebar view toggle
sideToggle.addEventListener("click", ()=>{
    if(sidebarOpen){
        localStorage.setItem("sidebar", "closed")
        sidebar.style.display="none";
        sidebarOpen = false;
        sideToggle.textContent = ">";
        sideToggle.title = "Show sidebar"
    }
    else{
        localStorage.setItem("sidebar", "open")
        sidebar.style.display="flex";
        sidebar.style.padding="15px";
        sidebarOpen = true;
        sideToggle.textContent = "<";
        sideToggle.title = "Hide sidebar"
    } 
});

const mainDisplay = document.getElementById("main-display");
const itemsDisplay = document.getElementById("items");
const content = document.querySelector(".content");

function loadData(selectProducts) {
    
    itemsDisplay.innerHTML = selectProducts.map(product => 
        `
        <div class="item" id="prod_${product.name}">
            <span class="item-alt">${product.alt}</span>
            <span class="item-name">${product.name}</span>
            <span class="item-price">$${product.price}</span>
        </div>
        `
        ).join("");

    const items = document.querySelectorAll(".item");
    items.forEach((item, index) => 
        item.addEventListener("click", () => {
            setFocus(selectProducts[index]);
        })
    );
}

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
    if (searchInput.value) {
        searchItem(searchInput.value)
    }
})

document.addEventListener("keydown", event => {
    if (event.key == "Enter") {
        if (searchInput.value) {
            searchItem(searchInput.value);
        }
    }
});

function searchItem(s) {
    let fProducts = products.filter(p => p.name.toLowerCase() == s.toLowerCase())

    loadData(fProducts)

    if (fProducts.length == 0) {
        itemsDisplay.innerHTML = `<span id="itemNotFound">Item not found</span>`
    }
}

const productFocus = document.getElementById("productFocus");
const closeProductFocusBtn = document.getElementById("closeProductFocusBtn");
const focusedAlt = document.getElementById("focusedAlt");
const focusedName = document.getElementById("focusedName");
const focusedPrice = document.getElementById("focusedPrice");
const descriptionTitle = document.getElementById("descriptionTitle");
const productDescription = document.getElementById("productDescription");

closeProductFocusBtn.addEventListener("click", () => {
    productFocus.style.visibility = "hidden";
});

let focusedProduct;
function setFocus(product) {
    productFocus.style.visibility = "visible";
    focusedAlt.textContent = product.alt;
    focusedName.textContent = product.name;
    focusedPrice.textContent = `$${product.price}`;
    productDescription.textContent = product.description;
    focusedProduct = product;
}
const addToCartBtn = document.getElementById("addToCartBtn");
addToCartBtn.addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(focusedProduct);

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${focusedProduct.name} added to cart`);
});

const cartFocus = document.getElementById("cartFocus");
const cartItemsDisplay = document.getElementById("cartItemsDisplay");

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}
function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem("cart"));

    if (cartItems.length == 0) {
        cartItemsDisplay.innerHTML = "<span id='noCartItemsSpan'>No items in cart<span>"
        return
    }
 
    cartItemsDisplay.innerHTML = cartItems.map((i, index)=> 
        `
        <div class = "cartItem">
            <span class="cartItemAlt">${i.alt}</span>
            <span class="cartItemName">${i.name}</span>
            <span class="cartItemPrice">$${i.price}</span>
            <button class="cartItemBuyBtn" onclick="alert('Successfully bought ${i.name} at ${i.price}')">Buy</button>
            <button class="cartRemoveItemBtn" onclick="removeFromCart(${index})">remove</button>
        </div>
        `
    ).join("");


}

const cartToggle = document.getElementById("cartToggle");
cartToggle.addEventListener("click", () => {
    cartFocus.style.visibility = "visible";
    loadCart();
});

const closeCartFocusBtn = document.getElementById("closeCartFocusBtn");
closeCartFocusBtn.addEventListener("click", () => {
    cartFocus.style.visibility = "hidden";
});

loadData(products);
loadCart()




