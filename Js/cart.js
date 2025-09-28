document.addEventListener('DOMContentLoaded', () => {
    getcart()
});

async function getcart() {
    let cart_txt= localStorage.getItem('cart')
    let cart_ls = null    
    if (cart_txt){
        cart_ls = JSON.parse(cart_txt)
        cart_json = JSON.stringify(cart_ls)
        if (cart_ls.length==0){
            console.log("No cart to display");
            display_empty_cart();
            return
        }
        console.log(cart_ls)
        display_cart(cart_ls)
    }else{
        display_empty_cart();
    }
}

async function remove_cart(product_id){
    let cart_txt= localStorage.getItem('cart')
    let cart_ls = null
    if (cart_txt){
        cart_ls = JSON.parse(cart_txt)
        cart_ls = cart_ls.filter(product => product.id !== product_id);
        localStorage.setItem('cart', JSON.stringify(cart_ls));
        location.reload();
    }
}


function display_empty_cart(){
    const tot=document.getElementById('total')
    tot.innerHTML=""

    const cart_container = document.getElementById('cart-container')
    cart_container.innerHTML=''

    const message = document.createElement('h2')
    message.innerText=`No Items to display.
    Add some products to your cart list to see them here.`
    message.classList.add('empty-cart-message')

    const x = document.createElement('img')
    x.src='assets/x.png'
    x.classList.add('x-image')

    const empty_container = document.createElement('div')
    empty_container.style.height='20vh'
    empty_container.appendChild(x)
    empty_container.appendChild(message)

    cart_container.appendChild(empty_container)
    empty_container.classList.add('empty-container')
    cart_container.style.height='60vh'
    
}

async function remove_cart(product_id){
    let cart_txt= localStorage.getItem('cart')
    let cart_ls = null
    if (cart_txt){
        cart_ls = JSON.parse(cart_txt)
        cart_ls = cart_ls.filter(product => product.id !== product_id);
        localStorage.setItem('cart', JSON.stringify(cart_ls));
        location.reload();
    }
}

function display_cart(cart_ls) {
    const cart_container = document.getElementById('cart-container');
    cart_container.innerHTML = ''; // clear existing cart

    // Header row
    const header = document.createElement('div');
    header.classList.add( 'table-header');
    header.innerHTML = `
        <div>Product</div>
        <div>Brand</div>
        <div>Category</div>
        <div>Price</div>
        <div>Qty</div>
        <div>Total</div>
        <div> </div>
    `;
    cart_container.appendChild(header);

    // const final_hr =document.createElement('hr');
    // final_hr.classList.add('final_hr')
    // const total = document.getElementById('total')

    // const total_price = 0

    // Product rows
    cart_ls.forEach(product => {
        const row = document.createElement('div');
        row.classList.add('cart-row','cart-row-content');

        // Product info (image & title)
        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');

        const img = document.createElement('img');
        img.src = product.thumbnail || product.images?.[0] || '';
        img.alt = product.title;
        img.classList.add('cart-img');

        const title = document.createElement('span');
        title.innerText = product.title;
        title.classList.add('cart-title');

        productInfo.appendChild(img);
        productInfo.appendChild(title);

        // Brand, category, price
        const brand = document.createElement('div');
        brand.innerText = product.brand || '-';

        const category = document.createElement('div');
        category.innerText = product.category || '-';

        const price = document.createElement('div');
        price.innerText = `$${product.price}`;

        // Quantity input
        const qtyContainer = document.createElement('div');
        const qtyInput = document.createElement('input');
        qtyInput.type = 'number';
        qtyInput.min = 1;
        qtyInput.value = product.quantity || 1;
        qtyInput.classList.add('quantity-input');
        qtyInput.addEventListener('change', () => {
            product.quantity = parseInt(qtyInput.value);
            totalDiv.innerText = `$${(product.price * product.quantity).toFixed(2)}`;
            save_cart(cart_ls);
            update_total(cart_ls);
        });
        qtyContainer.appendChild(qtyInput);

        // Total price per product
        const totalDiv = document.createElement('div');
        totalDiv.innerText = `$${(product.price * (product.quantity || 1)).toFixed(2)}`;

        // Remove button
        const remove = document.createElement('img');
        remove.classList.add('remove-icon');
        remove.src='assets/bin.png'

        const removecontainer = document.createElement('div')
        removecontainer.classList.add('remove-btn')
        removecontainer.appendChild(remove)
        remove.onclick = () => {remove_cart(product.id);
        }



        // Append all columns to row
        row.appendChild(productInfo);
        row.appendChild(brand);
        row.appendChild(category);
        row.appendChild(price);
        row.appendChild(qtyContainer);
        row.appendChild(totalDiv);
        row.appendChild(removecontainer);
        
        cart_container.appendChild(row);

    }
    
);
    // cart_container.appendChild(total);
    update_total(cart_ls);
    // total.appendChild(final_hr)
}


function save_cart(cart_ls) {
    localStorage.setItem('cart', JSON.stringify(cart_ls));
}

function update_total(cart_ls) {
    const total_price = cart_ls.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0);

    const total_price_div = document.getElementById('total-price');
    total_price_div.innerText = `$${total_price.toFixed(2)}`;
}


function get_cart_data(cart_ls) {
    return cart_ls.map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        quantity: p.quantity || 1,
        brand: p.brand,
        category: p.category
    }));
}

async function remove_cart(product_id){
    let cart_txt= localStorage.getItem('cart')
    let cart_ls = null
    if (cart_txt){
        cart_ls = JSON.parse(cart_txt)
        cart_ls = cart_ls.filter(product => product.id !== product_id);
        localStorage.setItem('cart', JSON.stringify(cart_ls));
        location.reload();
    }
}
