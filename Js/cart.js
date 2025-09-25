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
        // display_cart(cart_ls)
        console.log(cart_ls)
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
    const cart_container = document.getElementById('cart-container')
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

