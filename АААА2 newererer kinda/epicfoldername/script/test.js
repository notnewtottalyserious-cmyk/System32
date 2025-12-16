// Глобальные переменные
let allProducts = [];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
    initSearch();
    initScroll();
});

let userProfile = JSON.parse(localStorage.getItem('userProfile')) || {
            name: "Гость",
            email: "",
            phone: "",
            password: "",
            joinDate: new Date().toLocaleDateString('ru-RU'),
            ordersCount: 0,
            totalSpent: 0,
            loginto: false,
        };

// Загрузка товаров
async function loadProducts() {
    // Здесь был очень крутой код
} // Я убрал всё, т.к. оно пока не нужно

// Инициализация поиска
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') performSearch();
        });
    }

    // Добавляем кнопку "Товары со скидкой"
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        const saleBtn = document.createElement('button');
        saleBtn.className = 'search-button';
        saleBtn.textContent = 'Товары со скидкой';
        saleBtn.style.marginLeft = '10px';
        saleBtn.style.background = '#e74c3c';
        saleBtn.onclick = showDiscountedProducts;
        searchBox.appendChild(saleBtn);
    }
}

// Простой поиск
function performSearch() {
    const query = document.getElementById('searchInput')?.value.trim().toLowerCase();
    if (!query) {
        displayProducts(allProducts);
        return;
    }

    const filtered = allProducts.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );

    displayProducts(filtered);
}

// Показ товаров со скидкой
function showDiscountedProducts() {
    const discounted = allProducts.filter(p => 
        p.originalPrice && p.originalPrice > p.price
    );
    displayProducts(discounted);
}

// Отображение товаров
function displayProducts(products) {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h3>Не найдено</h3>
                <p>Попробуйте другой запрос</p>
                <button class="search-button" onclick="displayProducts(allProducts)">
                    Показать все
                </button>
            </div>
        `;
        return;
    }

    container.innerHTML = products.map(p => {
        const priceStr = new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'}).format(p.price);
        let discountBadge = '';
        let originalPriceEl = '';

        if (p.originalPrice && p.originalPrice > p.price) {
            const disc = Math.round((1 - p.price / p.originalPrice) * 100); /*100 минус отношение цены на оригинальную*/
            const origStr = new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'}).format(p.originalPrice);

            originalPriceEl = `<p class="original-price" style="color:#e74c3c;text-decoration:line-through">${origStr}</p>`;
            discountBadge = `<div class="discount-badge">-${disc}%</div>`;
        }

        return `
            <div class="products-item" onclick="openProductModal(${p.id})" style="position:relative;cursor:pointer">
                ${discountBadge}
                <img src="${p.image}" alt="${p.title}"
                     onerror="this.src='https://scan-interfax.ru/wp-content/uploads/2024/10/1640x840_700.png'"> 
                <h3>${p.title}</h3>
                ${originalPriceEl}
                <p class="price">${priceStr + (p.type?.includes("many")? ' за шт (м)' : '')}</p>
                <div class="rating">★ ${p.rating.toFixed(1)}</div>
            </div>
        `; // можно сказать это и есть стандартное изображение
    }).join('');
}

// поп-ап, а по человечески "Модальное окно"

function openProductModal(productId) {
    
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.id = 'productModal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; 
        width: 100%; 
        height: 100%; 
        background: rgba(0,0,0,0.8); 
        display: flex; align-items: 
        center; 
        justify-content: center; 
        z-index: 10000;
    `; // просто стили для "Модального окна"
    
    if (!product.creationAt) return;
    modal.innerHTML = `
        <div style="background:white; padding:30px; border-radius:15px; max-width:500px; width:90%; max-height:90vh; overflow-y:auto; position:relative">
            <button onclick="this.parentElement.parentElement.remove()" style="position:absolute; top:15px; right:15px; background:none; border:none; font-size:24px; cursor:pointer">×</button>
            <img src="${product.image}" alt="${product.title}" 
                 style="width:100%; height:300px; object-fit:contain; border-radius:10px; margin-bottom:20px"
                 onerror="this.src='https://via.placeholder.com/500x300/CCCCCC/666666?text=Нет+фото'">
            <h2>${product.title}</h2>
            ${product.originalPrice && product.originalPrice > product.price ? ` 
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px">
                    <span style="color:#e74c3c; text-decoration:line-through">
                        ${new Intl.NumberFormat('ru-RU', {style:'currency',currency:'RUB'}).format(product.originalPrice)}
                    </span>
                    <span style="background:#e74c3c; color:white; padding:2px 8px; border-radius:10px">
                        -${Math.round((1 - product.price / product.originalPrice) * 100) /*100 минус отношение цены на оригинальную*/}%
                    </span>
                </div>
            ` /* если цена ниже оригинальной, то оригинальная становится красной и появляется черта */ : ''}
            <p style="font-size:24px; font-weight:bold; margin-bottom:15px">
                ${ new Intl.NumberFormat('ru-RU', {style:'currency',currency:'RUB'}).format(product.price) + (product.type?.includes("many")?' за шт (метр)':'')}
            </p>
            <div class="rating" style="margin-bottom:20px">★ ${product.rating.toFixed(1)} / 5.0</div>
            <div style="margin-bottom:20px">
                <h4>Описание:</h4>
                <p>${product.description}</p>
            </div>
            ${product.features?.length ? `
                <div style="margin-bottom:20px">
                    <h4>Особенности:</h4>
                    <ul>${product.features.map(f => `<li>${f}</li>`).join('')+ (product.type?.includes("bread")? `<li>${"осталось: " + product.count + " метров"}</li>`:'')}</ul>
                </div>
            ` : ''}
            ${product.creationAt ? `
                <div style="margin-bottom:20px">
                    <h4>Дата производства:</h4>
                    <ul>${product.creationAt}</ul>
                </div>
            ` : ''}
            <button onclick="buyProduct(${product.id})" style="
                width:100%; padding:15px; background:#27ae60; color:white; border:none; 
                border-radius:8px; font-weight:bold; cursor:pointer"
                onmouseover="this.style.background='#219a52'"
                onmouseout="this.style.background='#27ae60'">
                КУПИТЬ
            </button>
        </div>
    `; // в моих силах нет делать корзину товаров
    document.body.appendChild(modal);
    console.log(modal+" exists"); 
    setTimeout(addID, 1000, "RemovableModal"); // задержка перед тем как добавить класс 
 
}

  function addID(ID) {
      const modal = document.getElementById('productModal')
      if (modal) {
        console.log("Working..?") // если работает выдаёт это сообщение
        modal.className = ID // выдает ему класс, называется ID потому что изначально он выдавал ID, но это мешает 
      }
    }

    
document.addEventListener( 'click', (e) => {
    
    const modal = document.getElementById('productModal')

    if (modal?.classList.contains('RemovableModal')){
    if (!modal) return
    const withinBoundaries = e.composedPath().includes(modal.firstElementChild); // само окно занимает весь экран, поэтому нужно брать первого потомка (div)
	if ( ! withinBoundaries ) {
		modal.remove() // удаление Модального окна, если нажать вне его границ и если оно имеет сей класс.. 
	}
}
})
function buyProduct(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('productModal')?.remove();
if(userProfile.loginto == true){
    const msg = document.createElement('div');
    msg.id = 'thankYouMessage';
    msg.style.cssText = `
        position: fixed; 
        top:50%; 
        left:50%; 
        transform:translate(-50%,-50%);
        background: 
        white; padding: 40px; 
        border-radius: 0; 
        text-align:center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3); 
        z-index:10001; 
        border:3px solid black;
        color: black;
    `;
    msg.innerHTML = `
        <div style="font-size:48px">Спасибо за покупку!</div>
        <h2 style="color:#27ae60">Мы очень благодарны</h2>
        <p>Вы купили <strong>${product.title}</strong><br>
           На сумму: <strong>${new Intl.NumberFormat('ru-RU', {style:'currency',currency:'RUB'}).format(product.price)}</strong></p>
        <button onclick="this.parentElement.remove()" style="padding:12px 30px; 
        background:#3498db; 
        color:white; 
        border:none; 
        border-radius:8px; 
        cursor:pointer;
        margin-top: 15px;
        ">
            Продолжить
        </button>
    `;
    product.count -= 1;
    document.body.appendChild(msg); // добавит благодарное сообщение, не знаю с чего бы :)
}else{
    alert("Войдите чтобы преобрести товар хахахах")
}
}
async function fetchProducts() {
    try {
        var options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timezone: 'UTC'
};
        const response = await fetch('producttest.json');
        const rawData = await response.json();
        const formattedData = rawData.map(item => {            
            return {
                id: item.id,
                title: item.title || 'Без названия',
                price: item.price || 0,
                originalPrice: item.originalPrice || 0,
                image: Array.isArray(item.image) ? item.image[0] 
                   : item.image || 'images/default-image.png',
                description: item.description || '',
                category: item.category || 'other',
                rating: item.rating.rate,
                count: item.rating.count,
                features: item.features,
                creationAt: item.creationAt ? new Date(item.creationAt).toLocaleDateString('ru-RU', options) : "Неизвестно",
                type: item.type,
            };
        });
        return formattedData;
    }
 catch (error) {
        console.error('Ошибка загрузки данных:', error);
        return [];
    } 
}

        document.addEventListener('DOMContentLoaded', async function() {
            try {
                allProducts = await fetchProducts();
                displayProducts(allProducts);

                const resultsInfo = document.getElementById('resultsInfo');
                if (resultsInfo) {
                    resultsInfo.textContent = `Загружено ${allProducts.length} товаров`;
                }
            } catch (error) {
                console.error('Ошибка инициализации:', error);
            }
        }); // Если всё загрузилось, то надеюсь появится число 30 или больше на момент написания
// По названию понятно, что этот кусок кода отвечает за перемещение боковой панели
function initScroll() {
    const obj = document.getElementById('moving-object');
    if (obj) {
        window.addEventListener('scroll', () => {
            obj.style.transform = `translateY(${window.scrollY}px)`;
        });
    }
}
