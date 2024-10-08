const products = [
    {
       "image": {
            "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
            "mobile": "./assets/images/image-waffle-mobile.jpg",
            "tablet": "./assets/images/image-waffle-tablet.jpg",
            "desktop": "./assets/images/image-waffle-desktop.jpg"
       },
       "name": "Waffle with Berries",
       "category": "Waffle",
       "price": 6.50,
       "id": 1
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
            "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
            "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
            "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00,
        "id": 2
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
            "mobile": "./assets/images/image-macaron-mobile.jpg",
            "tablet": "./assets/images/image-macaron-tablet.jpg",
            "desktop": "./assets/images/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00,    
        "id": 3
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
            "mobile": "./assets/images/image-tiramisu-mobile.jpg",
            "tablet": "./assets/images/image-tiramisu-tablet.jpg",
            "desktop": "./assets/images/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50,
        "id": 4
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
            "mobile": "./assets/images/image-baklava-mobile.jpg",
            "tablet": "./assets/images/image-baklava-tablet.jpg",
            "desktop": "./assets/images/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00,
        "id": 5
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
            "mobile": "./assets/images/image-meringue-mobile.jpg",
            "tablet": "./assets/images/image-meringue-tablet.jpg",
            "desktop": "./assets/images/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00,
        "id": 6
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
            "mobile": "./assets/images/image-cake-mobile.jpg",
            "tablet": "./assets/images/image-cake-tablet.jpg",
            "desktop": "./assets/images/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50,
        "id": 7
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
            "mobile": "./assets/images/image-brownie-mobile.jpg",
            "tablet": "./assets/images/image-brownie-tablet.jpg",
            "desktop": "./assets/images/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50,
        "id": 8
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
            "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
            "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
            "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50,
        "id": 9
     }
]

let cart = []
//  show all products in the page

const ourProductsDiv = document.querySelector("#products-list")

function showProducts(arr){
    arr.forEach(product=>{
        const newDiv = document.createElement("div")
        newDiv.classList.add("product-card")
        newDiv.innerHTML = `
            <img class="mobile" src="${product.image.mobile}" alt="${product.name}" >
            <img class="tablet" src="${product.image.tablet}" alt="${product.name}" >
            <img class="desktop" src="${product.image.desktop}" alt="${product.name}" >
            <div class="action-box">
                <button class="add-to-cart" id="btn-${product.id}"  >Add To Cart</button>
            </div>
            <p> ${product.category} </p>
            <h3>${product.name}</h3>
            <p> KSH. ${new Intl.NumberFormat().format(product.price * 128)} </p>
        `
        ourProductsDiv.append(newDiv)
    })
}
showProducts(products)

const addToCartButtons = document.querySelectorAll(".add-to-cart")

addToCartButtons.forEach(btn=>{
    btn.addEventListener("click", (e)=>{
            // console.log(e.target.id.split("-")[1] );
            // console.log(e.target.getAttribute("id"));
            const clickedProductId = e.target.id.split("-")[1]
            const clickedProduct = products.find(p=>p.id==clickedProductId)
            clickedProduct.count = 1
            if(!cart.some(p=>p.id==clickedProductId)){
                cart.push(clickedProduct)
            }
            showCart(cart)
            changeButtonToCounter(e.target.parentElement, clickedProductId) // div -action box
            
    })
})

const ourCartDiv = document.querySelector(".cart-list")
function showCart(arr){
    ourCartDiv.innerHTML = "" // Clear cardDiv everytime you render cart list
    arr.forEach(product=>{
        const newDiv = document.createElement("div")
        newDiv.classList.add("cart-item")
        newDiv.innerHTML = `
            <div>
                <p> ${product.name} </p>
                <span class="item-count">${product.count}x<span>
                <span class="item-price"> ${new Intl.NumberFormat().format(product.price * 128)} <span>
                <span class="item-total"> ${new Intl.NumberFormat().format(product.count *product.price * 128)} <span>
            </div>
            <button class="remove-from-cart" id="remove-${product.id}"> x </button>
        `
        ourCartDiv.append(newDiv)
    })
    const removeFromCartButtons = document.querySelectorAll(".remove-from-cart")
    removeFromCartButtons.forEach(btn=>{       
        btn.addEventListener("click", (e)=>{
            let productToBeRemovedId = e.target.id.split("-")[1]
            cart = cart.filter(p=>p.id!=productToBeRemovedId) 
            showCart(cart)
        })
    })
}


function changeButtonToCounter(element, id){
    console.log(element);    
    element.innerHTML = ` 
        <button class="decrease" id="decrease-${id}"> - </button>
        <span class="cartcount" id="cartcount-${id}"> 1 </span>
        <button class="increase" id="increase-${id}" > + </button>
    `
    document.getElementById(`decrease-${id}`).addEventListener("click", ()=>{
        let theProduct = cart.find(p=>p.id==id )
        theProduct.count = theProduct.count - 1
        document.getElementById(`cartcount-${id}`).textContent = theProduct.count
        cart = cart.filter(p=>p.id!=id) 
        cart.push(theProduct)
        showCart(cart)
    })
    document.getElementById(`increase-${id}`).addEventListener("click", ()=>{
        let theProduct = cart.find(p=>p.id==id )
        theProduct.count = theProduct.count + 1
        document.getElementById(`cartcount-${id}`).textContent = theProduct.count
        cart = cart.filter(p=>p.id!=id) 
        cart.push(theProduct)
        showCart(cart)
    })
}







// look into  data attribute

// try remove item from cart using remove-from-cart button
