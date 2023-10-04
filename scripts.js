
const productsApi = `https://dummyjson.com/products/`;


async function dataFetcher() {
    const response = await fetch(productsApi);
    const data = await response.json();
    // console.log(data);
    productsDisplay(data.products);
    categoryFilter(data.products);
}


// (async function categoriesFetcher() {
//     const response = await fetch("https://dummyjson.com/products/categories");
//     const data = await response.json();
//     // console.log(data, 'og');
//     categoryFilter(data);
// })()

dataFetcher(productsApi);


function changeTheme() {
    const currentTheme = document.querySelector("html").getAttribute("data-theme")
    const newTheme = currentTheme === "light" ? "dark" : "light"
    document.querySelector("html").setAttribute("data-theme", newTheme)
}

const domConstructor = (product) => {
    const productsContainer = document.querySelector(".products-container");

    const cardDiv = document.createElement("div");
    const productImageDiv = document.createElement("div");
    const productDescriptionDiv = document.createElement("div");

    const productBrandParagraph = document.createElement("p");
    const productNameParagraph = document.createElement("p");
    const productPriceParagraph = document.createElement("p");

    const productImg = document.createElement("img");

    cardDiv.classList.add("card");
    productImageDiv.classList.add("product-img");
    productDescriptionDiv.classList.add("product-description");
    productBrandParagraph.classList.add("product-brand");
    productNameParagraph.classList.add("product-name");
    productPriceParagraph.classList.add("product-price");

    cardDiv.appendChild(productImageDiv);
    cardDiv.appendChild(productDescriptionDiv);
    productImageDiv.appendChild(productImg);
    productDescriptionDiv.appendChild(productBrandParagraph);
    productDescriptionDiv.appendChild(productNameParagraph);
    productDescriptionDiv.appendChild(productPriceParagraph);


    productsContainer.appendChild(cardDiv);
    productImg.src = product.thumbnail;
    productBrandParagraph.textContent = product.brand;
    productNameParagraph.textContent = product.title;
    productPriceParagraph.textContent = `$ ${product.price}`;
}


function clearDom() {
    const productsContainer = document.querySelector(".products-container");
    productsContainer.innerHTML = '';
}


// const productsSearch = (products) => {
//     const searchValue = document.querySelector('.search-input').value.toLowerCase();
//     return products.filter((product) => product.title.toLowerCase().includes(searchValue))
// }

const productsSearch = (products) => {
    const searchValue = document.querySelector('.search-input').value.toLowerCase();
    if (products && products.length > 0) {
        return products.filter((product) => product.title.toLowerCase().includes(searchValue))
    } else {
        return [];
    }
}


function categoryValueModifier(e) {
    console.log(e.target.id)
    //access the id of the element that was clicked



    const targetValue = e.target.id
    const productsApiCat = `https://dummyjson.com/products/${targetValue}`;
    console.log(productsApiCat)
    clearDom();
    (async function dataFetcher() {
        const response = await fetch(productsApiCat);
        const data = await response.json();
        // console.log('cat', data);
        // productsDisplay(data.products);
        clearDom();
        domConstructor(data);
        // categoryFilter(data.products);
    })()
}



const categoryFilter = (data) => {
    const filterContent = document.querySelector(".filter-content");

    // console.log('test',data)

    data.map((product) => {
        const anchorTag = document.createElement("a");
        const anchorTagId = document.createAttribute("id");
        anchorTagId.value = product.id;
        anchorTag.setAttributeNode(anchorTagId);
        filterContent.appendChild(anchorTag);
        // console.log(product.title, 'testtt')
        anchorTag.textContent = product.title;
        anchorTag.addEventListener('click', (e) => {
            categoryValueModifier(e)
        })

    })

}



const productsDisplay = (data) => {


    const filterdData = productsSearch(data);

    // console.log(filterdData)


    if (filterdData.length !== 0) {
        // console.log('hello')
        clearDom();
        filterdData.map((product) => domConstructor(product));
    } else {
        clearDom();
        data.map((product) => domConstructor(product));
    }


}

// console.log(productsDisplay('hello'))