// Слайдер
        document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');
            let currentSlide = 0;
            
            function showSlide(index) {
                slides.forEach(slide => slide.classList.remove('active'));
                slides[index].classList.add('active');
            }
            
            prevBtn.addEventListener('click', function() {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
            
            nextBtn.addEventListener('click', function() {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
            
            // Генерация случайных отзывов
            const reviewsContainer = document.getElementById('reviewsContainer');
            const firstNames = ['Александр', 'Мария', 'Дмитрий', 'Екатерина', 'Сергей', 'Ольга', 'Андрей', 'Наталья', 'Михаил', 'Ирина'];
            const lastNames = ['Смирнов', 'Иванова', 'Кузнецов', 'Петрова', 'Попов', 'Соколова', 'Лебедев', 'Морозова', 'Новиков', 'Волкова'];
            const positiveReviews = [
                'Отличный сервис! Все сделано качественно и в срок.',
                'Очень доволен результатом. Профессионалы своего дела!',
                'Прекрасная работа, рекомендую всем знакомым.',
                'Высокий уровень исполнения, приятно удивлен.',
                'Все понравилось, буду обращаться еще.',
                'Величайший труд рук человечества',
                'А почему положительных отзывов больше отрицательных?',
                'Ваще пушка, я не ожидал(а)!',
                'Статьи украдены из википедии, мы все пираты!',
                'Поражён, просто глаза вылетают из орбит',
            ];
            const neutralReviews = [
                'Нормально, но есть небольшие недочеты.',
                'В целом неплохо, но можно улучшить.',
                'Работа выполнена, но сроки немного сдвинулись.',
                'Средний результат, соответствует ожиданиям.',
                'Ничего выдающегося, но и плохого сказать не могу.',
                'Ну типа ок, чё сказать',
                'Очередная попытка удивить человечество',
                'Ну не плохо, но и не так прям',
                'Я не особо такое люблю',
            ];
            const negativeReviews = [
                'Не доволен качеством, много ошибок.',
                'Сроки сорваны, результат не соответствует ожиданиям.',
                'Работа выполнена некачественно, не рекомендую.',
                'Много недочетов, пришлось переделывать.',
                'Разочарован сервисом, не оправдал ожиданий.',
                'Одно разочарование',
                'Фигня полная, берёт всё из википедии, а сами отзывы накручены и написаны в самом скрипте',
                'Нет спасибо',
            ];
            
            // Генерируем 6 случайных отзывов
            for (let i = 0; i < 6; i++) {
                const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
                const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
                const rating = Math.floor(Math.random() * 5) + 1;
                
                let reviewText, recommendation;
                if (rating >= 4) {
                    reviewText = positiveReviews[Math.floor(Math.random() * positiveReviews.length)];
                    recommendation = 'Рекомендую';
                } else if (rating === 3) {
                    reviewText = neutralReviews[Math.floor(Math.random() * neutralReviews.length)];
                    recommendation = 'Нет рекомендации';
                } else {
                    reviewText = negativeReviews[Math.floor(Math.random() * negativeReviews.length)];
                    recommendation = 'Не рекомендую';
                }
                
                const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
                
                const reviewElement = document.createElement('div');
                reviewElement.className = 'review';
                reviewElement.innerHTML = `
                    <div class="review-header">
                        <div class="reviewer-name">${firstName} ${lastName}</div>
                        <div class="stars">${stars}</div>
                    </div>
                    <div class="review-text">${reviewText}</div>
                    <div class="recommendation ${rating <= 2 ? 'not-recommend' : rating == 3 ? 'half-recommend' : ''}">${recommendation}</div>
                `;
                
                reviewsContainer.appendChild(reviewElement);
            }
        });