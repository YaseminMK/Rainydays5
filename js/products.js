document.addEventListener('DOMContentLoaded', function () {
    const productListContainer = document.querySelector('.home-bestseller-wrapper');

    async function fetchProducts() {
        try {
           
            productListContainer.innerHTML = '<p>Loading...</p>';

        
            const response = await fetch('https://api.noroff.dev/api/v1/rainydays/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const products = await response.json();

            productListContainer.innerHTML = '';

           
            products.forEach(product => {
                createProductElement(product);
            });
        } catch (error) {
            console.error('Error fetching products:', error);
        
            productListContainer.innerHTML = '<p>Error fetching products. Please try again later.</p>';
        }
    }

    const products = [
        { image: 'images/products/Product1.png', productName: 'Rainy Days W JACKET fall 2022', productPrice: 1499.00 },
        { image: 'images/products/Product2.png', productName: 'Rainy Days MOUTAIN W', productPrice: 1699.00 },
        { image: 'images/products/Product6.png', productName: 'Rainy Days RUN W', productPrice: 1399.00 },
        { image: 'images/products/Product5.png', productName: 'Rainy Days ATLAS W', productPrice: 2599.00 }
    ];

    function createProductElement(product) {
        const productContainer = document.createElement('a');
        productContainer.href = 'product.html';

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.productName;
        productImage.classList.add('product-image');

        const productName = document.createElement('p');
        productName.textContent = product.productName;
        productName.classList.add('product-name');

        const productPrice = document.createElement('p');
        productPrice.textContent = `${product.productPrice} NOK`; // Assuming price is in NOK
        productPrice.classList.add('product-price');

        productContainer.appendChild(productImage);
        productContainer.appendChild(productName);
        productContainer.appendChild(productPrice);

        productListContainer.appendChild(productContainer);
    

    products.forEach(product => {
        createProductElement(product);
    });
});
