document.addEventListener('DOMContentLoaded', async function () {
    const isHtmlStructureCorrect = validateHtmlStructure();

    if (isHtmlStructureCorrect) {
        fetchProducts();
    } else {
        console.error('HTML structure is not correct. Please check your HTML code.');
    }

    async function fetchProducts() {
        try {
            const productId = getProductIdFromQueryString();
            const productResponse = await fetch(`https://docs.noroff.dev/ecom-endpoints/rainy-days`);
            const productData = await productResponse.json();

            updateProductDetails(productData);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }

    function updateProductDetails(productData) {
        const seeDetailsElement = document.querySelector('.secondary-text');
        const productNameElement = document.querySelector('.bold-text.product-name');
        const priceElement = document.querySelector('.bold-text.product-price');
        const sizeBoxes = document.querySelectorAll('.box');
        const productImageElement = document.querySelector('.product-image-big');
        const productInfoTextElement = document.querySelector('.info-text');

        seeDetailsElement.textContent = 'SEE DETAILS';

        const priceValue = productData.price;
        priceElement.textContent = `PRICE ${priceValue} NOK`;

        const sizes = productData.sizes;
        sizeBoxes.forEach((box, index) => {
            box.querySelector('p').textContent = sizes[index];
        });

        productImageElement.src = productData.image;
        productImageElement.alt = productData.name;
        productNameElement.textContent = productData.name;
        productInfoTextElement.textContent = productData.description;
    }

   
    function validateHtmlStructure() {
        const requiredSelectors = [
            '.secondary-text',
            '.bold-text.product-name',
            '.bold-text.product-price',
            '.box',
            '.product-image-big',
            '.info-text',
        ];

        return requiredSelectors.every(selector => document.querySelector(selector) !== null);
    }

    function getProductIdFromQueryString() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get('id');
    }
});