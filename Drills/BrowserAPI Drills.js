const image = document.getElementById("hero-image");
image.src = "night-view.jpg";
image.alt = "A city at night";

const subBtn = document.getElementById("sub-btn");
subBtn.addEventListener("click", ()=>{
    subBtn.textContent = "Subscribed";
})

const loginBtn = document.getElementById("login-btn");
const input = document.getElementById("username-input");
loginBtn.addEventListener("click", ()=>{
    const inputText = input.value; 
    console.log(inputText);
})

const themeBtn = document.getElementById("theme-btn");
const body = document.getElementById("app-body");

themeBtn.addEventListener("click",()=>{
    body.classList.toggle("dark-mode")
})

const toDoList = document.getElementById("todo-list")
const listItem = document.createElement("li");
listItem.textContent = "Buy Milk";
toDoList.appendChild(listItem);

const productCard = document.getElementById("product-card");
const price = productCard.dataset.price;
console.log(price);

const toast = document.getElementById("toast");
setTimeout(()=>{
    toast.remove();
},3000)

