document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const formatButtons = document.querySelectorAll('.format-btn');
    const messageTextarea = document.getElementById('message');
    
    // Обработчики для кнопок форматирования текста
    formatButtons.forEach(button => {
        button.addEventListener('click', function() {
            const format = this.dataset.format;
            this.classList.toggle('active');
            
            // Получаем текущее выделение
            const start = messageTextarea.selectionStart;
            const end = messageTextarea.selectionEnd;
            const selectedText = messageTextarea.value.substring(start, end);
            
            let formattedText = '';
            
            switch(format) {
                case 'bold':
                    formattedText = `**${selectedText}**`;
                    break;
                case 'italic':
                    formattedText = `*${selectedText}*`;
                    break;
                case 'strike':
                    formattedText = `~~${selectedText}~~`;
                    break;
            }
            
            // Вставляем отформатированный текст
            messageTextarea.setRangeText(formattedText, start, end, 'select');
            messageTextarea.focus();
        });
    });
    
    // Обработчик отправки формы
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const contact = document.getElementById('contact').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Простая валидация
        if (!name || !contact || !message) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        
        // Валидация email или телефона
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^8\s?\(?\d{3}\)?\s?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
        
        if (!emailRegex.test(contact) && !phoneRegex.test(contact.replace(/\s/g, ''))) {
            alert('Пожалуйста, введите корректный email или телефон');
            return;
        }
        
        // Создаем красивое сообщение об успехе
        showSuccessMessage(name);
        
        // Очищаем форму
        contactForm.reset();
        formatButtons.forEach(btn => btn.classList.remove('active'));
    });
    
    // Функция для показа сообщения об успехе
    function showSuccessMessage(userName) {
        // Создаем элемент для сообщения
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <h3>Спасибо за ваше сообщение, ${userName}!</h3>
                <p>Оно скоро будет проверено нашей модерацией!</p>
                <button class="close-success">OK</button>
            </div>
        `;
        
        // Добавляем стили
        successMessage.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;
        
        const successContent = successMessage.querySelector('.success-content');
        successContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 10px;
            text-align: center;
            max-width: 400px;
            margin: 1rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: slideUp 0.3s ease;
        `;
        
        successContent.querySelector('h3').style.cssText = `
            color: #27ae60;
            margin-bottom: 1rem;
            font-size: 1.3rem;
        `;
        
        successContent.querySelector('p').style.cssText = `
            color: #7f8c8d;
            margin-bottom: 1.5rem;
            line-height: 1.5;
        `;
        
        const closeButton = successContent.querySelector('.close-success');
        closeButton.style.cssText = `
            background: #3498db;
            color: white;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            transition: background 0.3s;
        `;
        
        closeButton.addEventListener('mouseenter', function() {
            this.style.background = '#2980b9';
        });
        
        closeButton.addEventListener('mouseleave', function() {
            this.style.background = '#3498db';
        });
        
        // Обработчик закрытия
        closeButton.addEventListener('click', function() {
            document.body.removeChild(successMessage);
        });
        
        // Закрытие по клику на фон
        successMessage.addEventListener('click', function(e) {
            if (e.target === successMessage) {
                document.body.removeChild(successMessage);
            }
        });
        
        // Добавляем сообщение на страницу
        document.body.appendChild(successMessage);
        
        // Добавляем CSS анимации
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { 
                    opacity: 0;
                    transform: translateY(20px);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    // Альтернативный вариант функции showSuccessMessage (проще)
function showSuccessMessage(userName) {
    alert(`Спасибо за ваше сообщение, ${userName}!\n\nОно скоро будет проверено нашей модерацией!`);
}
});