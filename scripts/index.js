//---------------------------------ПАГИНАЦИЯ----------------------------------
let currentPage = 0;
const limit = 10;

document.addEventListener("DOMContentLoaded", () => {
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const productsContainer = document.querySelector('.products');

    async function fetchItems(page) {
        const skip = page * limit;
        const response = await fetch(`http://localhost:8000/api/v1/products/?skip=${skip}&limit=${limit}`);
        if (!response.ok) {
            console.error("Failed to fetch items");
            return;
        }
        
        const items = await response.json();

        
        if (items.length === 0 && page > 0) {
            // Если товаров нет и это не первая страница, вернуться на предыдущую страницу
            currentPage--;
            updateButtons(0);
        } else {
            productsContainer.innerHTML = '';
            renderItems(items);
            updateButtons(items.length);
        }
    }

    function renderItems(items) {
        items.forEach(item => {
            displayProduct(item);
        });
    }

    function updateButtons(itemsCount) {
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = itemsCount < limit;
    }

    prevBtn.addEventListener("click", () => {
        if (currentPage > 0) {
            fetchItems(--currentPage);
        }
    });

    nextBtn.addEventListener("click", () => {
        fetchItems(++currentPage);
    });

    // Изначальная загрузка товаров
    fetchItems(currentPage);
});

//--------------------------ПОИСК------------------------------------------
const searchForm = document.querySelector(".search");
    searchInput = document.querySelector(".search__input");
    information = document.querySelectorAll(".searching");
    
    // Функция для поиска подстроки, введенной в строке поиска, в товарах
    function search(text) {
        information.forEach((element) => {
            if(element.textContent.toLowerCase().indexOf(text.toLowerCase()) != -1)
                element.style.display = 'block';
            else
                element.style.display = 'none';            
        })  
    }

    function filter(className) {
        
    }

console.log(searchForm)

searchInput.addEventListener('input', (e) => {
    search(searchInput.value);
    console.log('change');
    e.preventDefault();
})

searchForm.addEventListener('submit', (e) => {
    console.log("submit");
    search(searchInput.value);
    e.preventDefault();
}); 

// let filters = document.querySelectorAll(".filters__item");
// console.log(filters);
// filters[0].addEventListener("mousedown", (e) => {
//     console.log("click");
// })

document.querySelectorAll(".filters__item").forEach(element => {
    element.addEventListener("click", e => {
        console.log("click");
        information.forEach(element => {
            if (element.dataset.filter == e.target.dataset.filter)
                element.style.display = "block";
            else
                element.style.display = "none";
        })
    })
})

let sendRequest = function(method, url, body = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);
        xhr.responseType = 'json';

        xhr.setRequestHeader('Content-Type', 'appliccation/json');

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        }

        xhr.onerror = () => {
            reject(xhr.response);
        }

        xhr.send(JSON.stringify(body));
    })
}


// Function to fetch product data from the server
async function fetchProduct(productId) {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/products/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const productData = await response.json();
        displayProduct(productData);
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

// Function to display product information
function displayProduct(productData) {
    const productsContainer = document.querySelector('.products');
    const product = document.createElement('div')
    product.className = 'product-card'

    imageSrc = `data:image/jpeg;base64,${productData.image_data}`;
    

    product.innerHTML = `
        <div class="product-card__image">
            <img src="${imageSrc}" alt="${productData.name}">
        </div>
        <div class="product-card__title">
            <h2>${productData.name}</h2>
        </div>
        <div class="product-card__price">
            <p class="price">
                <span class="old-price">50</span>
                ${productData.price}
            </p>
        </div>
        <div class="product-card__description">
            <p class="description">${productData.description }</p>
        </div>
        <div class="product-card__button">
            <button>Добавить в корзину</button>
        </div>
    `

    productsContainer.appendChild(product)
}