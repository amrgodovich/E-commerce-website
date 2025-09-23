const menuToggle = document.getElementById("menu-toggle");
const panel = document.querySelector(".panel");

menuToggle.addEventListener("click", () => {
    panel.classList.toggle("active");
    menuToggle.classList.toggle("open");
});

// document.addEventListener("DOMContentLoaded", async () => {
//     const hero = document.getElementById("hero");

//     const res = await fetch("https://dummyjson.com/products/5");
//     const data = await res.json();

//     const imageUrl = data.images[0];
//     hero.style.backgroundImage = `url(${imageUrl})`;
// });


// fetch('https://dummyjson.com/products/categories')
//       .then(res => res.json())
//       .then(categories => {
//         const container = document.getElementById('category');
//         categories.forEach(category => {
//           const label = document.createElement('label');
//           const checkbox = document.createElement('input');
//           checkbox.type = 'checkbox';
//           checkbox.value = category.slug;
//           checkbox.name = 'categories';
//           label.appendChild(checkbox);
//           label.appendChild(document.createTextNode(' ' + category.slug));
//           container.appendChild(label);
//           container.appendChild(document.createElement('br'));
//         });
//       })
//       .catch(error => {
//         console.error('Error fetching categories:', error);
//       });

async function loadCategories() {
      try {
        const response = await fetch('https://dummyjson.com/products/categories');
        if (!response.ok) throw new Error('Network response was not ok');
        const categories = await response.json();
        const container = document.getElementById('category');
        categories.forEach(category => {
          const label = document.createElement('label');
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.value = category.slug;
          checkbox.name = 'categories';
          label.style.color='#264653'
          label.appendChild(checkbox);
          label.appendChild(document.createTextNode(' ' + category.slug));
          container.appendChild(label);
          container.appendChild(document.createElement('br'));
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
    const products = data.products;
    const container = document.getElementById('products');

    products.forEach(product => {
      //card
      const card = document.createElement('div');
      card.style.border = '1px solid #ccc';
      card.style.borderRadius = '8px';
      card.style.padding = '16px';
      card.style.margin = '8px';
      card.style.width = '200px';
      card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
      card.style.display = 'inline-block';
      card.style.alignItems = 'center';
      card.style.justifyContent = 'center';
      card.style.verticalAlign = 'top';

      //img
      const img = document.createElement('img');
      img.src = product.thumbnail || product.images[0] || '';
      img.alt = product.title;
    //   img.style.width = '100%';
    //   img.style.borderRadius = '6px 6px 0 0';
      card.appendChild(img);

      //title
      const title = document.createElement('h3');
      title.textContent = product.title;
    //   title.style.fontSize = '16px';
    //   title.style.margin = '12px 0 4px 0';
      card.appendChild(title);

      //price
      const price = document.createElement('p');
      price.textContent = `Price: $${product.price}`;
    //   price.style.margin = '4px 0';
    //   price.style.fontWeight = 'bold';
      card.appendChild(price);

      //category
      const category = document.createElement('p');
      category.textContent = `Category: ${product.category}`;
    //   category.style.margin = '4px 0 12px 0';
    //   category.style.fontStyle = 'italic';
      card.appendChild(category);

      //container
      const btnContainer = document.createElement('div');
    //   btnContainer.style.display = 'flex';
    //   btnContainer.style.justifyContent = 'space-between';
      

      //AddCart btn
      const btnAddToCart = document.createElement('button');
      btnAddToCart.textContent = 'Add to Cart';
    //   btnAddToCart.style.padding = '6px 10px';
    //   btnAddToCart.style.cursor = 'pointer';
    //   btnAddToCart.style.border = 'none';
    //   btnAddToCart.style.borderRadius = '4px';
    //   btnAddToCart.style.backgroundColor = '#007bff';
    //   btnAddToCart.style.color = 'white';
      btnAddToCart.onclick = () => alert(`Added "${product.title}" to cart!`); // Example handler
      btnContainer.appendChild(btnAddToCart);

      //fav btn
      const btnFavourite = document.createElement('button');
      btnFavourite.textContent = 'Favourite';
    //   btnFavourite.style.padding = '6px 10px';
    //   btnFavourite.style.cursor = 'pointer';
    //   btnFavourite.style.border = 'none';
    //   btnFavourite.style.borderRadius = '4px';
    //   btnFavourite.style.backgroundColor = '#00646bff';
    //   btnFavourite.style.color = 'white';
      btnFavourite.onclick = () => alert(`Marked "${product.title}" as favourite!`); // Example handler
      btnContainer.appendChild(btnFavourite);

      card.appendChild(btnContainer);

      // Append card to container
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching:', error);
  }
}



document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadproducts();
    });