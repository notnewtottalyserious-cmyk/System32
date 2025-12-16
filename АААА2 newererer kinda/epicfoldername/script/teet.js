// Глобальные переменные
        let allProducts = [];
        let currentSearchQuery = '';

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена, начинаем инициализацию...');
    
    // Инициализация поиска
    initSearch();
    
    // Инициализация скролла
    initScroll();
    
    // Загрузка товаров
    loadProducts();
});

// Инициализация поиска
function initSearch() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', performAISearch);
        
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                performAISearch();
            }
        });
    }
    
    // Добавляем кнопку для показа товаров со скидкой
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
        const saleButton = document.createElement('button');
        saleButton.className = 'search-button';
        saleButton.innerHTML = 'Товары со скидкой';
        saleButton.style.marginLeft = '10px';
        saleButton.style.background = '#e74c3c';
        saleButton.onclick = showDiscountedProducts;
        
        const searchBox = searchContainer.querySelector('.search-box');
        if (searchBox) {
            searchBox.appendChild(saleButton);
        }
    }
}

        function initScroll() {
    const movingObject = document.getElementById('moving-object');
    if (movingObject) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const newPosition = scrollPosition;
            movingObject.style.transform = `translateY(${newPosition}px)`;
        });
    }
}
async function loadProducts() {
    try {
        console.log('Загрузка товаров...');
        allProducts = await fetchProducts();
        displayProducts(allProducts);
        console.log('Товары успешно загружены');
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
    }
}

        // Имитация ИИ поиска через внешний API
        async function performAISearch() {
            const searchInput = document.getElementById('searchInput');
            const searchButton = document.getElementById('searchButton');
            const searchText = document.getElementById('searchText');
            const searchLoader = document.getElementById('searchLoader');
            const query = searchInput.value.trim();

            if (!query) {
                alert('Введите запрос для поиска');
                return;
            }

            currentSearchQuery = query;
            
            // Показываем загрузку
            searchText.textContent = 'Выполняется поиск...';
            searchLoader.style.display = 'inline-block';
            searchButton.disabled = true;

            try {
                console.log('поиск:', query);
                
                // Имитация запроса к API
                const aiResults = await simulateAISearch(query);
                
                // Показываем рекомендации
                showAISuggestions(aiResults.suggestions);
                
                // Фильтруем товары на основе анализа
                const filteredProducts = filterProductsWithAI(allProducts, query, aiResults);
                
                // Отображаем результаты
                displayProducts(filteredProducts, query);
                
            } catch (error) {
                console.error('Ошибка поиска:', error);
                // При ошибке используем простой текстовый поиск
                const filteredProducts = simpleTextSearch(allProducts, query);
                displayProducts(filteredProducts, query);
            } finally {
                // Скрываем загрузку
                searchText.textContent = 'Найти';
                searchLoader.style.display = 'none';
                searchButton.disabled = false;
            }
        }

        // Имитация работы с API
        async function simulateAISearch(query) {
            // Имитация задержки сети
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Анализ запроса и генерация рекомендаций
            const queryLower = query.toLowerCase();
            let category = 'all';
            let priceRange = { min: 0, max: 10000 };
            let features = [];

            // Анализ категорий из API
            if (queryLower.includes('электроник') || queryLower.includes('техник') || queryLower.includes('гаджет') || queryLower.includes('elect') || queryLower.includes('мобильн')) {
                category = 'Electronics';
            } else if (queryLower.includes('одежд') || queryLower.includes('футболк') || queryLower.includes('платье')) {
                category = 'Clothes';
            } else if (queryLower.includes('обув') || queryLower.includes('туфл') || queryLower.includes('кроссовк')) {
                category = 'Shoes';
            } else if (queryLower.includes('мебель') || queryLower.includes('стол') || queryLower.includes('стул')) {
                category = 'Furniture';
            } else if (queryLower.includes('косметик') || queryLower.includes('крем') || queryLower.includes('парфюм')) {
                category = 'Beauty';
            } else if (queryLower.includes('оруж') || queryLower.includes('пистол') || queryLower.includes('gun') || queryLower.includes('пушк')) {
                category = 'Weapons';
            }

            // Анализ цены
            const priceMatch = query.match(/(\d+)\s*руб|до\s*(\d+)/i);
            if (priceMatch) {
                const price = parseInt(priceMatch[1] || priceMatch[2]);
                if (price) {
                    priceRange.max = price;
                }
            }

            // Анализ характеристик
            if (queryLower.includes('новин') || queryLower.includes('новый')) {
                features.push('new');
            }
            if (queryLower.includes('скидк') || queryLower.includes('распродаж')) {
                features.push('sale');
            }
            if (queryLower.includes('премиум') || queryLower.includes('люкс')) {
                features.push('premium');
            }
            if (queryLower.includes('бюджет') || queryLower.includes('дешев')) {
                features.push('budget');
            }

            // Генерация рекомендаций
            const suggestions = generateAISuggestions(query, category, features);

            return {
                category,
                priceRange,
                features,
                suggestions,
                confidence: 0.85
            };
        }

        // Генерация умных рекомендаций
        function generateAISuggestions(query, category, features) {
            const baseSuggestions = [
                "популярные товары",
                "со скидкой",
                "высокий рейтинг",
                "новинки",
                "бестселлеры"
            ];

            const categorySuggestions = {
                'Electronics': ["гаджеты", "техника для дома", "смартфоны и аксессуары"],
                'Clothes': ["модная одежда", "сезонные коллекции", "стильные вещи"],
                'Shoes': ["спортивная обувь", "классические туфли", "удобные кеды"],
                'Furniture': ["для гостиной", "офисная мебель", "компактные решения"],
                'Beauty': ["уход за кожей", "парфюмерия", "декоративная косметика"],
                'all': ["все категории", "разные товары", "широкий выбор"]
            };

            const featureSuggestions = {
                'new': ["новые поступления", "последние модели"],
                'sale': ["со скидкой", "акционные товары"],
                'premium': ["премиум класс", "люкс товары"],
                'budget': ["бюджетные варианты", "недорогие товары"]
            };

            let suggestions = [...baseSuggestions];
            
            if (categorySuggestions[category]) {
                suggestions = suggestions.concat(categorySuggestions[category]);
            }
            
            features.forEach(feature => {
                if (featureSuggestions[feature]) {
                    suggestions = suggestions.concat(featureSuggestions[feature]);
                }
            });

            // Убираем дубликаты и возвращаем 6 случайных suggestions
            return [...new Set(suggestions)]
                .sort(() => Math.random() - 0.5)
                .slice(0, 6);
        }

        // Умная фильтрация товаров с помощью ИИ анализа
        function filterProductsWithAI(products, query, aiAnalysis) {
            return products.filter(product => {
                let score = 0;
                const titleLower = product.title.toLowerCase();
                const descriptionLower = product.description.toLowerCase();
                const queryLower = query.toLowerCase();

                // Базовое совпадение по названию
                if (titleLower.includes(queryLower)) {
                    score += 10;
                }

                // Совпадение по описанию
                if (descriptionLower.includes(queryLower)) {
                    score += 5;
                }

                // Совпадение по словам запроса
                const queryWords = queryLower.split(' ').filter(word => word.length > 2);
                queryWords.forEach(word => {
                    if (titleLower.includes(word)) score += 3;
                    if (descriptionLower.includes(word)) score += 1;
                });

                // Совпадение с категорией ИИ
                if (aiAnalysis.category !== 'all' && product?.category === aiAnalysis.category) {
                    score += 8;
                }

                // Фильтрация по цене
                if (product.price >= aiAnalysis.priceRange.min && product.price <= aiAnalysis.priceRange.max) {
                    score += 3;
                } else {
                    score -= 2;
                }

                // Учет характеристик
                aiAnalysis.features.forEach(feature => {
                    if (feature === 'new' && product.creationAt) {
                        // Предполагаем, что новые товары имеют более поздние даты
                        score += 2;
                    }
                    if (feature === 'sale' && product.price < 500) {
                        score += 3;
                    }
                    if (feature === 'premium' && product.price > 800) {
                        score += 2;
                    }
                    if (feature === 'budget' && product.price < 300) {
                        score += 2;
                    }
                });

                return score > 5;
            }).sort((a, b) => {
                const aScore = calculateRelevanceScore(a, query, aiAnalysis);
                const bScore = calculateRelevanceScore(b, query, aiAnalysis);
                return bScore - aScore;
            });
        }

        function calculateRelevanceScore(product, query, aiAnalysis) {
            let score = 0;
            const titleLower = product.title.toLowerCase();
            const descriptionLower = product.description.toLowerCase();
            const queryLower = query.toLowerCase();

            // Простой алгоритм релевантности
            if (titleLower.includes(queryLower)) score += 20;
            if (descriptionLower.includes(queryLower)) score += 10;
            
            const words = queryLower.split(' ').filter(word => word.length > 2);
            words.forEach(word => {
                if (titleLower.includes(word)) score += 5;
                if (descriptionLower.includes(word)) score += 2;
            });

            // Совпадение категории
            if (aiAnalysis.category !== 'all' && product?.category === aiAnalysis.category) {
                score += 15;
            }

            // Соответствие цене
            if (product.price <= aiAnalysis.priceRange.max) score += 3;

            return score;
        }

        // Простой текстовый поиск (fallback)
        function simpleTextSearch(products, query) {
            const queryLower = query.toLowerCase();
            return products.filter(product => 
                product.title.toLowerCase().includes(queryLower) ||
                product.description.toLowerCase().includes(queryLower) ||
                product?.category.toLowerCase().includes(queryLower)
            );
        }
function showDiscountedProducts() {
    const discountedProducts = allProducts.filter(product => 
        product.originalPrice && product.originalPrice > product.price
    );
    displayProducts(discountedProducts, 'Товары со скидкой');
}
        // Показ рекомендаций ИИ
        function showAISuggestions(suggestions) {
            const suggestionsContainer = document.getElementById('aiSuggestions');
            const tagsContainer = document.getElementById('suggestionTags');

            if (suggestions.length > 0) {
                tagsContainer.innerHTML = suggestions.map(suggestion => 
                    `<div class="suggestion-tag" onclick="applySuggestion('${suggestion}')">${suggestion}</div>`
                ).join('');
                suggestionsContainer.style.display = 'block';
            } else {
                suggestionsContainer.style.display = 'none';
            }
        }

        // Применение suggestion
        function applySuggestion(suggestion) {
            const searchInput = document.getElementById('searchInput');
            searchInput.value = `${currentSearchQuery} ${suggestion}`;
            performAISearch();
        }

        // Поиск по нажатию Enter
        function handleSearchKeypress(event) {
            if (event.key === 'Enter') {
                performAISearch();
            }
        }
        // Загрузка товаров из нового API
        async function fetchProducts() {
    try {
        const response = await fetch('producttest.json');
        const rawData = await response.json();
        
        const formattedData = rawData.map(item => {
            // Обработка изображения с проверкой
            let imageUrl;
            if (Array.isArray(item.image) && item.image.length > 0) {
                imageUrl = item.image[0];
            } else if (item.image) {
                imageUrl = item.image;
            } else {
                imageUrl = 'images/default-image.png'; // изображение по умолчанию
            }
            
            return {
                id: item.id,
                title: item.title || 'Без названия',
                price: item.price || 0,
                originalPrice: item.originalPrice || 0,
                image: imageUrl,
                description: item.description || '',
                category: item.category || 'other',
                rating: item.rating.rate,
                features: item.features,
                creationAt: item.creationAt || new Date().toISOString()
            };
        });
        
        return formattedData;
        
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        return [];
    } 
}

// Обработка данных по вашему шаблону
function processProducts(products) {
    return products.map(product => ({
        id: product.id,
        title: product.title,
        price: Math.floor(product.price),
        originalPrice: Math.floor(item.originalPrice),
        image: product.images[0] || product.images,
        description: product.description,
        category: product.category,
        rating: product.rating.rate, 
        features: product.features,
        creationAt: product.creationAt
    }));
}

// Использование
// loadProducts().then(products => {
//     // Делайте что-то с обработанными товарами
//     displayProducts(products);
// });
        function getMockProducts() {
            console.log('Используем тестовые данные');
            return [
                {
                    id: 1,
                    title: "Базовый продукт",
                    price: 12345,
                    originalPrice: 123456,
                    image: "images/default-image.png",
                    description: "Описание этого продукта",
                    category: { name: "Electronics" },
                    rating: 4.5,
                    features: ["Характеристика 1", "Характеристика 2"]
                }
            ];
        }

        function displayProducts(products, searchQuery = '') {
    const productsContainer = document.getElementById('productsContainer');
    
    if (!productsContainer) {
        console.error('Контейнер товаров не найден');
        return;
    }
    
    if (products.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-results">
                <h3>Товары не найдены</h3>
                <p>Попробуйте изменить запрос</p>
                <button class="search-button" onclick="resetSearch()" style="margin-top: 15px;">
                    Показать все товары
                </button>
            </div>
        `;
        return;
    }
    
    productsContainer.innerHTML = products.map(product => {
        const formattedPrice = new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        }).format(product.price);
        
        let originalPriceHTML = '';
        let discountBadge = '';
        
        // Если есть старая цена, показываем скидку
        if (product.originalPrice && product.originalPrice > product.price) {
            const discount = Math.round((1 - product.price / product.originalPrice) * 100);
            const formattedOriginalPrice = new Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency: 'RUB',
                minimumFractionDigits: 0
            }).format(product.originalPrice);
            
            originalPriceHTML = `
                <p class="original-price" style="color: #e74c3c; text-decoration: line-through; font-size: 14px; margin: 5px 0;">
                    ${formattedOriginalPrice}
                </p>
            `;
            
            discountBadge = `
                <div class="discount-badge" style="position: absolute; top: 10px; right: 10px; background: #e74c3c; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px; font-weight: bold;">
                    -${discount}%
                </div>
            `;
        }
        
        return `
            <div class="products-item" style="position: relative; cursor: pointer;" onclick="openProductModal(${product.id})">
                ${discountBadge}
                <img src="${product.image}" alt="${product.title}" 
                     onerror="this.src='https://via.placeholder.com/300x300/CCCCCC/666666?text=Нет+фото'">
                <h3>${product.title}</h3>
                ${originalPriceHTML}
                <p class="price">${formattedPrice}</p>
                <div class="rating">★ ${product.rating.toFixed(1)}</div>
            </div>
        `;
    }).join('');
}
            // Открытие модального окна товара
function openProductModal(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    const modalHTML = `
        <div id="productModal" style="
            position: fixed; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100%; 
            background: rgba(0,0,0,0.8); 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            z-index: 10000;
        ">
            <div style="
                background: white; 
                padding: 30px; 
                border-radius: 15px; 
                max-width: 500px; 
                width: 90%; 
                max-height: 90vh; 
                overflow-y: auto;
                position: relative;
            ">
                <button onclick="closeProductModal()" style="
                    position: absolute; 
                    top: 15px; 
                    right: 15px; 
                    background: none; 
                    border: none; 
                    font-size: 24px; 
                    cursor: pointer; 
                    color: #666;
                ">×</button>
                
                <img src="${product.image}" alt="${product.title}" 
                     style="width: 100%; height: 300px; object-fit: contain; border-radius: 10px; margin-bottom: 20px;"
                     onerror="this.src='https://via.placeholder.com/500x300/CCCCCC/666666?text=Нет+фото'">
                
                <h2 style="margin-bottom: 15px; color: #2c3e50;">${product.title}</h2>
                
                ${product.originalPrice && product.originalPrice > product.price ? `
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                        <span style="color: #e74c3c; text-decoration: line-through; font-size: 18px;">
                            ${new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'}).format(product.originalPrice)}
                        </span>
                        <span style="background: #e74c3c; color: white; padding: 2px 8px; border-radius: 10px; font-size: 14px;">
                            -${Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                    </div>
                ` : ''}
                
                <p class="price" style="font-size: 24px; font-weight: bold; color: #2c3e50; margin-bottom: 15px;">
                    ${new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'}).format(product.price)}
                </p>
                
                <div class="rating" style="margin-bottom: 20px;">
                    ★ ${product.rating.toFixed(1)} / 5.0
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h4 style="margin-bottom: 10px; color: #2c3e50;">Описание:</h4>
                    <p style="line-height: 1.6; color: #666;">${product.description}</p>
                </div>
                
                ${product.features ? `
                    <div style="margin-bottom: 25px;">
                        <h4 style="margin-bottom: 10px; color: #2c3e50;">Особенности:</h4>
                        <ul style="color: #666; padding-left: 20px;">
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <button onclick="buyProduct(${product.id})" style="
                    width: 100%; 
                    padding: 15px; 
                    background: #27ae60; 
                    color: white; 
                    border: none; 
                    border-radius: 8px; 
                    font-size: 18px; 
                    font-weight: bold; 
                    cursor: pointer; 
                    transition: background 0.3s;
                " onmouseover="this.style.background='#219a52'" 
                   onmouseout="this.style.background='#27ae60'">
                    КУПИТЬ
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Закрытие модального окна
function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.remove();
    }
}

// Покупка товара
function buyProduct(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    // Показываем сообщение о покупке
    const thankYouHTML = `
        <div id="thankYouMessage" style="
            position: fixed; 
            color: black;
            top: 50%; 
            left: 50%; 
            transform: translate(-50%, -50%); 
            background: white; 
            padding: 40px; 
            border-radius: 0px; 
            text-align: center; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.3); 
            z-index: 10001;
            border: 3px solid black;
        ">
            <div style="font-size: 48px; margin-bottom: 20px;">Поздравляем</div>
            <h2 style="color: #27ae60; margin-bottom: 15px;">Спасибо за покупку!</h2>
            <p style="margin-bottom: 25px; font-size: 16px;">
                Вы успешно приобрели <strong>${product.title}</strong><br>
                На сумму: <strong>${new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'}).format(product.price)}</strong>
            </p>
            <button onclick="closeThankYouMessage()" style="
                padding: 12px 30px; 
                background: #3498db; 
                color: white; 
                border: none; 
                border-radius: 8px; 
                cursor: pointer; 
                font-size: 16px;
            ">
                Продолжить покупки
            </button>
        </div>
    `;
    
    // Закрываем модальное окно товара
    closeProductModal();
    
    // Показываем сообщение
    document.body.insertAdjacentHTML('beforeend', thankYouHTML);
}

// Закрытие сообщения о покупке
function closeThankYouMessage() {
    const message = document.getElementById('thankYouMessage');
    if (message) {
        message.remove();
    }
}
            console.log(`Отображено ${allProducts.length} товаров`);
        

        function resetSearch() {
            document.getElementById('searchInput').value = '';
            displayProducts(allProducts);
            document.getElementById('aiSuggestions').style.display = 'none';
            document.getElementById('resultsInfo').textContent = `Всего товаров: ${allProducts.length}`;
        }

        // Инициализация при загрузке страницы
        document.addEventListener('DOMContentLoaded', async function() {
            console.log('Страница загружена, начинаем загрузку товаров...');
            try {
                allProducts = await fetchProducts();
                displayProducts(allProducts);
                
                // Показываем информацию о загрузке
                const resultsInfo = document.getElementById('resultsInfo');
                if (resultsInfo) {
                    resultsInfo.textContent = `Загружено ${allProducts.length} товаров`;
                }
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
        const additionalStyles = `
    <style>
        .products-item {
            transition: all 0.3s ease;
        }
        
        .products-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .discount-badge {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { 
            transform: scale(1);
            transform: rotate(-2deg); }
            50% { 
            transform: rotate(2deg) scale(1.02);
             
            }
            100% { 
            transform: scale(1);
            transform: rotate(-2deg); } //очень крутая анимация
        }
        
        #productModal {
            animation: fadeIn 0.3s ease;
        }
        
        #thankYouMessage {
            animation: bounceIn 0.75s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes bounceIn {
            0% { transform: translate(-50%, 100%) scale(0.3); }
            50% { transform: translate(-50%, -50%) scale(1.05); }
            100% { transform: translate(-50%, -50%) scale(1); }
        }
    </style>
`;
document.head.insertAdjacentHTML('beforeend', additionalStyles);
    