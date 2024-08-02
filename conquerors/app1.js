const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "SUNKTA",
    price: 19999,
    colors: [
      {
        code: "black",
        img: "./img/sunkta1.png",
      },
      {
        code: "green",
        img: "./img/sunkta2.png",
      },
    ],
  },
  {
    id: 2,
    title: "INVICTA",
    price: 18000,
    colors: [
      {
        code: "yellow",
        img: "./img/invicta1.png",
      },
      {
        code: "yellow",
        img: "./img/invicta2.png",
      },
    ],
  },
  {
    id: 3,
    title: "CURREN",
    price: 15000,
    colors: [
      {
        code: "blue",
        img: "./img/curren1.png",
      },
      {
        code: "yellow",
        img: "./img/curren2.png",
      },
    ],
  },
  {
    id: 4,
    title: "QUARTZ",
    price: 19999,
    colors: [
      {
        code: "black",
        img: "./img/quartz1.png",
      },
      {
        code: "black",
        img: "./img/quartz2.png",
      },
    ],
  },
  {
    id: 5,
    title: "ROLEX",
    price: 29999,
    colors: [
      {
        code: "yellow",
        img: "./img/rolex1.png",
      },
      {
        code: "gray",
        img: "./img/rolex2.png",
      },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    
    choosenProduct = products[index];

    
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "₹" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});

function addToCart(productId) {
  // Select the element with the specified data-id
  const productElement = document.querySelector(`.sliderItem[data-id="${productId}"]`);
  
  // Extract the data attributes
  const productName = productElement.getAttribute('data-name');
  const productPrice = parseFloat(productElement.getAttribute('data-price'))
  const productImage = productElement.getAttribute('data-image');
  
  // Create the product object
  const product = {
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage
  };
  
  // Example: Log the product object to the console
  console.log('Product:', product);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartItem = cart.find(item => item.id === productId);

if (cartItem) {
  cartItem.quantity++;
} else {
  cart.push({ 
     ...product, 
      quantity: 1, 
      price: parseFloat(product.price) // Convert price back to number
  });
}

localStorage.setItem('cart', JSON.stringify(cart));

  alert(`${productName} has been added to your cart.`);
}



