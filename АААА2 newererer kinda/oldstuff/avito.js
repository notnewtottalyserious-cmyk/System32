const movingObject = document.getElementById('moving-object');

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY; // это позиция объекта по Y
    const newPosition = scrollPosition * 1; // тут боковое меню будет перемещаться вместе с экраном, со скоростью равной "1"

    movingObject.style.transform = `translateY(${newPosition}px)`; //это само перемещение по Y
  });
// Скрипт для загрузки товаров
async function fetchProducts() {
try {
console.log('Загрузка товаров...');
const response = await fetch('https://fakestoreapi.com/products?limit=8');

if (!response.ok) {
throw new Error(`HTTP error! status: ${response.status}`);
}

const products = await response.json();
console.log('Товары загружены:', products);

return products.map(product => ({
id: product.id,
title: product.title.length > 50 ? product.title.substring(0, 50) + '...' : product.title,
price: Math.floor(product.price * 100),
image: product.image,
link: '#',
category: product.category,
rating: product.rating?.rate || 4.0
}));
} catch (error) {
console.error('Ошибка при загрузке товаров:', error);
return getMockProducts();
}
}

function getMockProducts() {
console.log('Используем тестовые данные');
return [
{
id: 1,
title: "Смартфон Xiaomi Redmi Note 12 128GB",
price: 19999,
image: "https://via.placeholder.com/300x300/FF6B6B/white?text=Xiaomi",
link: "#",
rating: 4.5
},
{
id: 2,
title: "Ноутбук Lenovo IdeaPad 3 15.6\"",
price: 45999,
image: "https://via.placeholder.com/300x300/4ECDC4/white?text=Lenovo",
link: "#",
rating: 4.3
},
{
id: 3,
title: "Беспроводные наушники JBL Tune 510BT",
price: 3499,
image: "https://via.placeholder.com/300x300/45B7D1/white?text=JBL",
link: "#",
rating: 4.7
},
{
id: 4,
title: "Умные часы Samsung Galaxy Watch 4",
price: 12999,
image: "https://via.placeholder.com/300x300/96CEB4/white?text=Samsung",
link: "#",
rating: 4.4
},
{
id: 5,
title: "Планшет Huawei MatePad T10",
price: 15999,
image: "https://via.placeholder.com/300x300/FECA57/white?text=Huawei",
link: "#",
rating: 4.2
},
{
id: 6,
title: "Игровая консоль PlayStation 5",
price: 49999,
image: "https://via.placeholder.com/300x300/FF9FF3/white?text=PS5",
link: "#",
rating: 4.8
}
];
}

function displayProducts(products) {
const productsContainer = document.querySelector('.products');

if (!productsContainer) {
console.error('Контейнер для товаров не найден');
return;
}

productsContainer.innerHTML = '';

products.forEach(product => {
const productItem = document.createElement('div');
productItem.className = 'products-item';

const formattedPrice = new Intl.NumberFormat('ru-RU', {
style: 'currency',
currency: 'RUB',
minimumFractionDigits: 0
}).format(product.price);

productItem.innerHTML = `
<img src="${product.image}" alt="${product.title}"
onerror="this.src='https://via.placeholder.com/300x300/CCCCCC/666666?text=Нет+фото'">
<h3>${product.title}</h3>
<p class="price">${formattedPrice}</p>
<div class="rating">★ ${product.rating.toFixed(1)}</div>
`;

productsContainer.appendChild(productItem);
});

console.log('Товары отображены');
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', async function() {
console.log('Страница загружена, начинаем загрузку товаров...');
try {
const products = await fetchProducts();
displayProducts(products);
} catch (error) {
console.error('Ошибка инициализации:', error);
}
});

// Обработчик ошибок для изображений
document.addEventListener('error', function(e) {
if (e.target.tagName === 'IMG' && e.target.parentElement.classList.contains('products-item')) {
e.target.src = 'https://via.placeholder.com/300x300/CCCCCC/666666?text=Нет+фото';
}
}, true);