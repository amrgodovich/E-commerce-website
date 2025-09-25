document.addEventListener('DOMContentLoaded', () => {
    getfav()
});

async function getfav() {
    let fav_txt= localStorage.getItem('fav')
    let fav_ls = null
    if (fav_txt){
        fav_ls = JSON.parse(fav_txt)
        fav_json = JSON.stringify(fav_ls)
        if (fav_ls.length==0){
            console.log("No favourites to display");
            display_empty_fav();
            return
        }
        display_favourite(fav_ls)
        console.log(fav_ls)
    }
}

async function remove_fav(product_id){
    let fav_txt= localStorage.getItem('fav')
    let fav_ls = null
    if (fav_txt){
        fav_ls = JSON.parse(fav_txt)
        fav_ls = fav_ls.filter(product => product.id !== product_id);
        localStorage.setItem('fav', JSON.stringify(fav_ls));
        location.reload();
    }
}


function display_empty_fav(){
    const fav_container = document.getElementById('fav-container')
    const message = document.createElement('h2')
    message.innerText=`No favourites to display
    Add some products to your favourites list to see them here.`
    message.classList.add('empty-fav-message')

    const x = document.createElement('img')
    x.src='assets/x.png'
    x.classList.add('x-image')

    const empty_container = document.createElement('div')
    empty_container.style.height='20vh'
    empty_container.appendChild(x)
    empty_container.appendChild(message)

    fav_container.appendChild(empty_container)
    empty_container.classList.add('empty-container')
    fav_container.style.height='60vh'
    
}

function display_favourite(fav_ls){
    fav_ls.forEach(product => {
            console.log(product);
            // display_favourite(product)
            const fav_container = document.getElementById('fav-container')
            const card = document.createElement('div')
            card.classList.add('fav-card')
            
            const title = document.createElement('h3')
            title.innerText=product.title
            title.classList.add('fav-title')

            const price = document.createElement('h5')
            price.innerText="$"+product.price
            price.classList.add('fav-price')

            const titlecontainer = document.createElement('div')
            titlecontainer.classList.add('title-container')

            titlecontainer.appendChild(title)
            titlecontainer.appendChild(price)

            const imgContainer = document.createElement('div');
            imgContainer.classList.add('fav-img-container');

            const img = document.createElement('img');
            img.classList.add('fav-img');
            img.src = product.thumbnail || product.images[0] || '';
            img.alt = product.title;
            imgContainer.appendChild(img);

            const remove = document.createElement('img');
            remove.classList.add('remove-icon');
            remove.src='assets/bin.png'

            const removecontainer = document.createElement('div')
            removecontainer.classList.add('remove-btn')
            removecontainer.appendChild(remove)

            removecontainer.onclick = (e) => {
                e.stopPropagation();
                remove_fav(product.id);
            }
            
            card.appendChild(titlecontainer)
            card.appendChild(imgContainer)
            card.appendChild(removecontainer)
            fav_container.appendChild(card)
        });
}