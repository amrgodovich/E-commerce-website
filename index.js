const primarycolor= '#5f3de7'
const secondarycolor= '#ec512f'
const hovercolor='#555edbff'
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadproducts();
    const searchForm = document.querySelector('.searching form');
    const searchInput = document.getElementById('p-n');
    
    searchInput.addEventListener('input', filterProducts);
});

const menuToggle = document.getElementById("menu-toggle");
const panel = document.querySelector(".panel");
menuToggle.addEventListener("click", () => {
    panel.classList.toggle("active");
    menuToggle.classList.toggle("open");
});

let allProducts = [];

async function loadCategories() {
    try {
        const response = await fetch('https://dummyjson.com/products/categories');
        if (!response.ok) throw new Error('Network response was not ok');
        const categories = await response.json();
        const container = document.getElementById('category');
        
        categories.forEach(category => {
            const label = document.createElement('label');
            label.classList.add('label-cat');

            const checkbox = document.createElement('input');
            checkbox.classList.add('chk-cat');
            checkbox.type = 'checkbox';
            checkbox.value = category.slug;
            checkbox.name = 'categories';
            checkbox.addEventListener('change', filterProducts);

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(' ' + category.name));
            container.appendChild(label);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}


async function loadproducts() {
    try {
        const response = await fetch('https://dummyjson.com/products/');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        allProducts = data.products;
        displayProducts(allProducts);
    } catch (error) {
        console.error('Error fetching:', error);
    }
}
function displayProducts(products) {
    const container = document.getElementById('products');
    container.innerHTML = '';

    products.forEach(product => {
        // Main card container
        const card = document.createElement('div');
        card.classList.add('product-card');

        // Image container
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');

        const img = document.createElement('img');
        img.src = product.thumbnail || product.images[0] || '';
        img.alt = product.title;
        img.classList.add('product-img');
        imgContainer.appendChild(img);

        // Favourite button
        const btnFavourite = document.createElement('button');
        btnFavourite.classList.add('btn-fav');

        const heart=document.createElement('img')
        heart.classList.add('heartfav')
        heart.src='assets/fav.png'

        btnFavourite.appendChild(heart)

        btnFavourite.onclick = (e) => {
            e.stopPropagation();
            addtofav(product);
        };
        imgContainer.appendChild(btnFavourite);

        // Category label
        const categoryLabel = document.createElement('span');
        categoryLabel.textContent = product.category;
        categoryLabel.classList.add('category-label');
        imgContainer.appendChild(categoryLabel);

        card.appendChild(imgContainer);

        // Content container
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('content-container');

        // Title
        const titlecontainer = document.createElement('div');
        titlecontainer.classList.add('title-container');

        const title = document.createElement('h4');
        title.textContent = product.title;
        title.classList.add('product-title');

        titlecontainer.appendChild(title);
        contentContainer.appendChild(titlecontainer);

        // Price + Add to Cart
        const priceCartContainer = document.createElement('div');
        priceCartContainer.classList.add('price-cart-container');

        const price = document.createElement('h2');
        price.textContent = `$${product.price}`;
        price.classList.add('product-price');
        priceCartContainer.appendChild(price);

        const btnAddToCart = document.createElement('button');
        btnAddToCart.classList.add('btn-cart');

        const carticon=document.createElement('img')
        carticon.classList.add('carticon')
        carticon.src='assets/cart.webp'

        btnAddToCart.appendChild(carticon)

        btnAddToCart.onclick = (e) => {
            e.stopPropagation();
            addtocart(product);
        };
        priceCartContainer.appendChild(btnAddToCart);

        contentContainer.appendChild(priceCartContainer);
        card.appendChild(contentContainer);

        // Add card to container
        container.appendChild(card);
    });
}


function filterProducts() {
    let filteredProducts = allProducts;
    const checkedCategories = Array.from(document.querySelectorAll('input[name="categories"]:checked'))
        .map(checkbox => checkbox.value);
        
    if (checkedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            checkedCategories.includes(product.category)
        );
    }
        
    const searchTerm = document.getElementById('p-n').value.toLowerCase().trim();
        
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm)
        );
    }
    
    displayProducts(filteredProducts);
}

fav=[]
cart=[]

function addtofav(product) {
    console.log(product.title);
    console.log(fav);
    if(!fav.includes(product)){
        fav.push(product)
    }
}

function addtocart(product) {
    console.log(product.title);
    console.log(cart);
    if (!cart.includes(product)) {
        cart.push(product)
    }
}