
document.addEventListener('DOMContentLoaded', function() {
    const programmersContainer = document.getElementById('programmersContainer');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    // Предопределенный список известных программистов для главной страницы
    const defaultProgrammers = [
        'Алан Тьюринг',
        'Ада Лавлейс', 
        'Линус Торвальдс',
        'Билл Гейтс',
        'Стив Джобс',
        'Марк Цукерберг'
    ];
    
    // Расширенные ключевые слова для поиска программистов
    const programmingKeywords = [ 
        'Программирование', 'Билл Гейтс', 'Programming', 'Программист', 'Programmer', 'Разработчик', 'Developer', 'Код', 'Code', 'Кодирование', 'Coding', 'Алгоритм', 'Algorithm', 'Алгоритмизация', 'Algorithmization', 'Синтаксис', 'Syntax', 'Компилятор', 'Compiler', 'Интерпретатор', 'Interpreter', 'Отладка', 'Debugging', 'Дебаггер', 'Debugger', 'Ошибка', 'Bug', 'Error', 'Исключение', 'Exception', 'База данных', 'Database', 'SQL', 'NoSQL', 'Сервер', 'Server', 'Клиент', 'Client', 'Фронтенд', 'Frontend', 'Бэкенд', 'Backend', 'Фуллстек', 'Fullstack', 'Веб-разработка', 'Web development', 'Мобильная разработка', 'Mobile development', 'Игровая разработка', 'Game development', 'Операционная система', 'Operating System', 'Windows', 'Linux', 'macOS', 'Android', 'iOS', 'Переменная', 'Variable', 'Константа', 'Constant', 'Тип данных', 'Data type', 'Массив', 'Array', 'Список', 'List', 'Объект', 'Object', 'Класс', 'Class', 'Функция', 'Function', 'Метод', 'Method', 'Цикл', 'Loop', 'Условие', 'Condition', 'Интерфейс', 'Interface', 'API', 'Модуль', 'Module', 'Библиотека', 'Library', 'Фреймворк', 'Framework', 'Стек технологий', 'Technology stack', 'Система контроля версий', 'Version Control System', 'Git', 'GitHub', 'GitLab', 'Рефакторинг', 'Refactoring', 'Оптимизация', 'Optimization', 'Асинхронность', 'Asynchrony', 'Поток', 'Thread', 'Процесс', 'Process', 'Память', 'Memory', 'Кэш', 'Cache', 'Хостинг', 'Hosting', 'Деплой', 'Deploy', 'Доменное имя', 'Domain name', 'Сертификат SSL', 'SSL certificate', 'Браузер', 'Browser', 'Верстка', 'Markup', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Kotlin', 'Swift', 'SQL', 'Машинное обучение', 'Machine Learning', 'Искусственный интеллект', 'Artificial Intelligence', 'Нейронная сеть', 'Neural Network', 'Большие данные', 'Big Data', 'Облачные вычисления', 'Cloud Computing', 'Контейнеризация', 'Containerization', 'Docker', 'Kubernetes', 'Микросервисы', 'Microservices', 'Монолит', 'Monolith', 'Agile', 'Scrum', 'Спринт', 'Sprint', 'Гибкая методология', 'Agile methodology', 'Техническое задание', 'Technical specification', 'Требования', 'Requirements', 'Архитектура', 'Architecture', 'Паттерн проектирования', 'Design pattern', 'Компиляция', 'Compilation', 'Интерпретация', 'Interpretation', 'Исходный код', 'Source code', 'Исполняемый файл', 'Executable file', 'Байт-код', 'Bytecode', 'Журналирование', 'Logging', 'Мониторинг', 'Monitoring', 'Безопасность', 'Security', 'Уязвимость', 'Vulnerability', 'Шифрование', 'Encryption', 'Хэширование', 'Hashing', 'Тестирование', 'Testing', 'Юнит-тест', 'Unit test', 'Интеграционный тест', 'Integration test', 'Стек вызовов', 'Call stack', 'Куча', 'Heap', 'Стек', 'Stack', 'Указатель', 'Pointer', 'Ссылка', 'Reference', 'Рекурсия', 'Recursion', 'Итерация', 'Iteration', 'Парадигма', 'Paradigm', 'ООП', 'OOP', 'Функциональное программирование', 'Functional programming', 'Императивное программирование', 'Imperative programming', 'Декларативное программирование', 'Declarative programming', 'Коммит', 'Commit', 'Ветка', 'Branch', 'Мёрж', 'Merge', 'Конфликт', 'Conflict', 'Пул-реквест', 'Pull Request', 'Репозиторий', 'Repository', 'Сниппет', 'Snippet', 'Плагин', 'Plugin', 'Расширение', 'Extension', 'Инженерия', 'Engineering', 'Разработка', 'Development', 'Скрипт', 'Script', 'Приложение', 'Application', 'App', 'Программа', 'Program', 'Софт', 'Software', 'Железо', 'Hardware', 'Интерфейс командной строки', 'Command Line Interface', 'CLI', 'Графический интерфейс', 'Graphical User Interface', 'GUI', 'Конечный пользователь', 'End user', 'Документация', 'Documentation', 'Чистый код', 'Clean code', 'Технический долг', 'Technical debt', 'Легаси-код', 'Legacy code', 'Сборка мусора', 'Garbage collection', 'Системный администратор', 'System Administrator', 'DevOps', 'Data Scientist', 'QA-инженер', 'QA Engineer', 'Тестировщик', 'Tester', 'Аналитик', 'Analyst', 'Продукт', 'Product', 'Фича', 'Feature', 'Баг-репорт', 'Bug report', 'Тикет', 'Ticket', 'Спринт', 'Sprint', 'Стендап', 'Standup', 'Бэклог', 'Backlog', 'Продакшен', 'Production', 'Стейджинг', 'Staging', 'Разработка', 'Development', 'Локальная среда', 'Local environment', 'Переменная окружения', 'Environment variable', 'Конфигурация', 'Configuration', 'Настройка', 'Settings', 'Параметр', 'Parameter', 'Аргумент', 'Argument', 'Строка', 'String', 'Число', 'Number', 'Целое число', 'Integer', 'Число с плавающей точкой', 'Float', 'Булевый тип', 'Boolean', 'NULL', 'Undefined', 'Структура данных', 'Data structure', 'Очередь', 'Queue', 'Стек', 'Stack', 'Дерево', 'Tree', 'Граф', 'Graph', 'Хэш-таблица', 'Hash table', 'Словарь', 'Dictionary', 'Множество', 'Set', 'Сортировка', 'Sorting', 'Поиск', 'Search', 'Фильтрация', 'Filtering', 'Валидация', 'Validation', 'Сериализация', 'Serialization', 'Парсинг', 'Parsing', 'Рендеринг', 'Rendering', 'Компонент', 'Component', 'Модуль', 'Module', 'Пакет', 'Package', 'Зависимость', 'Dependency', 'Сборка', 'Build', 'Развертывание', 'Deployment', 'Миграция', 'Migration', 'Резервное копирование', 'Backup', 'Восстановление', 'Recovery', 'Пропускная способность', 'Throughput', 'Задержка', 'Latency', 'Производительность', 'Performance', 'Масштабируемость', 'Scalability', 'Надежность', 'Reliability', 'Отказоустойчивость', 'Fault tolerance'
    ];
    
    // Функция для проверки, является ли страница о программисте
    function isAboutProgrammer(pageData) {
        if (!pageData) return false;
        
        const title = pageData.title ? pageData.title.toLowerCase() : '';
        const extract = pageData.extract ? pageData.extract.toLowerCase() : '';
        const description = pageData.description ? pageData.description.toLowerCase() : '';
        
        const allText = title + ' ' + extract + ' ' + description;
        
        for (const keyword of programmingKeywords) {
            if (allText.includes(keyword.toLowerCase())) {
                return true;
            }
        }
        
        return false;
    }
    
    // Функция для получения данных из Википедии
    async function fetchWikipediaData(query) {
        try {
            const response = await fetch(`https://ru.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
            if (!response.ok) {
                return null;
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Ошибка при поиске:', error);
            return null;
        }
    }
    
    // Функция для поиска через API поиска Википедии
    async function searchWikipedia(query) {
        try {
            const response = await fetch(`https://ru.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`);
            if (!response.ok) {
                return [];
            }
            const data = await response.json();
            return data.query.search || [];
        } catch (error) {
            console.error('Ошибка при поиске:', error);
            return [];
        }
    }
    
    // Функция для вычисления схожести
    function calculateSimilarity(query, title, extract) {
        const queryWords = query.toLowerCase().split(' ').filter(word => word.length > 2);
        const titleWords = title.toLowerCase().split(' ');
        const extractWords = extract ? extract.toLowerCase().split(' ') : [];
        
        const allWords = [...titleWords, ...extractWords];
        
        let matches = 0;
        queryWords.forEach(queryWord => {
            if (allWords.some(word => word.includes(queryWord) || queryWord.includes(word))) {
                matches++;
            }
        });
        
        return matches / Math.max(queryWords.length, 1);
    }
    
    // Функция для поиска программиста с похожими результатами
    async function searchProgrammerWithSimilar() {
        const query = searchInput.value.trim();
        if (!query) {
            loadDefaultProgrammers();
            return;
        }
        
        programmersContainer.innerHTML = '<div class="loading">Поиск программистов...</div>';
        
        const results = [];
        
        // Шаг 1: Ищем точное соответствие
        const exactMatch = await fetchWikipediaData(query);
        if (exactMatch && isAboutProgrammer(exactMatch)) {
            results.push({...exactMatch, similarity: 1});
        }
        
        // Шаг 2: Ищем через поиск Википедии
        const searchResults = await searchWikipedia(query + " программист");
        
        // Обрабатываем результаты поиска
        for (const result of searchResults) {
            if (results.length >= 8) break; // Собираем больше для фильтрации
            
            const pageData = await fetchWikipediaData(result.title);
            if (pageData && isAboutProgrammer(pageData)) {
                // Проверяем, нет ли дубликатов
                const isDuplicate = results.some(r => r.title === pageData.title);
                if (!isDuplicate) {
                    const similarity = calculateSimilarity(query, pageData.title, pageData.extract);
                    results.push({...pageData, similarity});
                }
            }
        }
        
        // Шаг 3: Если результатов мало, ищем более общий запрос
        if (results.length < 5) {
            const fallbackResults = await searchWikipedia("программист " + query);
            for (const result of fallbackResults) {
                if (results.length >= 8) break;
                
                const pageData = await fetchWikipediaData(result.title);
                if (pageData && isAboutProgrammer(pageData)) {
                    const isDuplicate = results.some(r => r.title === pageData.title);
                    if (!isDuplicate) {
                        const similarity = calculateSimilarity(query, pageData.title, pageData.extract);
                        results.push({...pageData, similarity});
                    }
                }
            }
        }
        
        // Шаг 4: Сортируем и показываем результаты
        if (results.length > 0) {
            results.sort((a, b) => b.similarity - a.similarity);
            displayProgrammers(results.slice(0, 6)); // Показываем до 6 лучших результатов
        } else {
            // Если ничего не нашли, показываем сообщение
            programmersContainer.innerHTML = '<div class="loading">Не найдено программистов по вашему запросу</div>';
        }
    }
    
    // Функция для загрузки программистов по умолчанию (без проверки)
    async function loadDefaultProgrammers() {
        programmersContainer.innerHTML = '<div class="loading">Загрузка программистов...</div>';
        
        const programmersData = [];
        
        for (const name of defaultProgrammers) {
            const data = await fetchWikipediaData(name);
            if (data) {
                programmersData.push(data);
            }
            // Добавляем небольшую задержку чтобы не перегружать API
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        displayProgrammers(programmersData);
    }
    
    // Функция для отображения программистов
    function displayProgrammers(programmers) {
        programmersContainer.innerHTML = '';
        
        if (programmers.length === 0) {
            programmersContainer.innerHTML = '<div class="loading">Ничего не найдено</div>';
            return;
        }
        
        programmers.forEach(data => {
            const card = document.createElement('div');
            card.className = 'programmer-card';
            
            const imageUrl = data.thumbnail ? data.thumbnail.source : 'https://via.placeholder.com/300x200?text=Нет+изображения';
            const description = data.extract ? 
                (data.extract.length > 150 ? data.extract.substring(0, 150) + '...' : data.extract) 
                : 'Описание недоступно';
            
            card.innerHTML = `
                <img src="${imageUrl}" alt="${data.title}" class="programmer-image">
                <div class="programmer-info">
                    <h3 class="programmer-name">${data.title}</h3>
                    <p class="programmer-description">${description}</p>
                    <a href="${data.content_urls.desktop.page}" target="_blank" class="programmer-link">Читать в Википедии</a>
                </div>
            `;
            
            programmersContainer.appendChild(card);
        });
    }
    
    // Обработчики событий
    searchButton.addEventListener('click', searchProgrammerWithSimilar);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProgrammerWithSimilar();
        }
    });
    
    // Загрузка начальных данных (без проверки)
    loadDefaultProgrammers();
});