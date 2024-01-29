// SVG строки из файлов

// Первая звезда
const star1SVG = `<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.22308 0.249425C4.23779 0.107691 4.35724 0 4.49973 0C4.64223 0 4.76168 0.107691 4.77639 0.249425L4.99625 2.36736C5.08593 3.23125 5.76875 3.91407 6.63264 4.00375L8.75058 4.22361C8.89231 4.23832 9 4.35777 9 4.50027C9 4.64276 8.89231 4.76221 8.75058 4.77692L6.63264 4.99678C5.76875 5.08646 5.08593 5.76928 4.99625 6.63317L4.77639 8.75111C4.76168 8.89284 4.64223 9.00053 4.49973 9.00053C4.35724 9.00053 4.23779 8.89284 4.22308 8.75111L4.00322 6.63317C3.91354 5.76929 3.23072 5.08646 2.36683 4.99678L0.248893 4.77692C0.107159 4.76221 -0.00053215 4.64276 -0.00053215 4.50027C-0.00053215 4.35777 0.107158 4.23832 0.248893 4.22361L2.36683 4.00375C3.23072 3.91407 3.91354 3.23125 4.00322 2.36736L4.22308 0.249425Z" fill="#10CA99"/>
</svg>`;

// Вторая звезда
const star2SVG = `<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.84203 0.434082C6.00273 0.434082 6.13744 0.555988 6.15404 0.716432L6.40198 3.11394C6.50312 4.09186 7.27317 4.86482 8.24743 4.96634L10.6359 5.21522C10.7958 5.23187 10.9172 5.36709 10.9172 5.5284C10.9172 5.6897 10.7958 5.82492 10.6359 5.84157L8.24743 6.09045C7.27317 6.19197 6.50312 6.96493 6.40198 7.94285L6.15404 10.3404C6.13744 10.5008 6.00273 10.6227 5.84203 10.6227C5.68133 10.6227 5.54663 10.5008 5.53003 10.3404L5.28209 7.94285C5.18095 6.96493 4.41089 6.19197 3.43664 6.09045L1.04814 5.84157C0.888294 5.82492 0.766846 5.6897 0.766846 5.5284C0.766846 5.36709 0.888294 5.23187 1.04814 5.21522L3.43664 4.96634C4.4109 4.86482 5.18095 4.09186 5.28209 3.11394L5.53003 0.716432C5.54663 0.555988 5.68133 0.434082 5.84203 0.434082ZM5.84203 3.54846C5.60279 4.52365 4.84106 5.28825 3.86954 5.5284C4.84106 5.76854 5.60279 6.53314 5.84203 7.50833C6.08128 6.53314 6.84301 5.76854 7.81453 5.5284C6.84301 5.28825 6.08128 4.52365 5.84203 3.54846Z" fill="white"/>
</svg>
`;
// Массив изображений для выбора в функции создания эффекта
const starSVGs = [star1SVG, star2SVG];

// Максимальное количество одновременно крутящихся звезд
const maxStars = 60;

// Текущее количество звезд для отслеживания отсутствия превышения параметра maxStars
let currentStars = 0;

// Индекс, с котороо начинаются браться изображения из массива starSVGs
let starIndex = 0;

// Основная функция создания, анимации и исчезновения звезд
/*  Принимает параметры 
    wrapper - элемет к которому будут привязаны звезды
    radius - радиус, равный половине элемента родителя, считается автоматически
    duration - количество в секундах, за которое звезды проходят траекторию
    direction - 'clockwise' для вращения по часовой, 'counterclockwise' для вращения против часовой 
*/
function createAndAnimateStar(wrapper, radius, duration, direction) {
    // Проверяем не превышает ли количество звезд на экране количество макксимально допустимых
    if (currentStars >= maxStars) {
        // Прекращаем создание новых если превышает
        // console.log('Max stars reached');
        return;
    }

    // Увеличиваем счетчик текущих звезд
    currentStars++;

    // Находим контейнер, куда будем добавлять звезду
    let svgWrapper = document.querySelector(wrapper);

    // Создаем div элемент, который будет оберткой для звезды
    let svgContainer = document.createElement('div');
    svgContainer.style.position = 'absolute';
    svgContainer.style.top = '50%';
    svgContainer.style.left = '50%';
    svgContainer.style.transform = 'translate(-50%, -50%)';
    svgContainer.style.transformOrigin = 'center';

    // Добавляем SVG код звезды внутрь созданного div
    svgContainer.innerHTML = starSVGs[Math.floor(Math.random() * starSVGs.length)];
    starIndex = (starIndex + 1) % starSVGs.length;

    // Рассчитываем начальный масштаб для звезды
    // initialScale на данный момент принимает значения от 0.1 до 1.5, при необходимости изменить 1.4 на максимально желаемый scale звезды, а 0.1 на минимально желаемое
    const initialScale = 0.1 + Math.random() * 1.4;

    // Рассчитываем начальную непрозрачность для звезды
    // initialOpacity на данный момент принимает значения от 0.5 до 1
    const initialOpacity = 0.5 + Math.random() * 0.5;

    // Рассчитываем количество вращений перед достижением конца радиуса всего вращения (края элемента родителя)
    // Сейчас от 1 арщения (360 градусов) до 3-ч вращений, при желании изменить 2 на максимально желаемое количество вращений
    const rotations = 360 * (1 + Math.random() * 2);

    // Создание случайной искривленной линии для движения звезды
    // При желаении сделать радиус кручения (максимально допустимый для выхода звезды от центра при кручении) менять число 50
    const offsetX = (Math.random() - 0.5) * 50;
    const offsetY = (Math.random() - 0.5) * 50;

    // Класс для управления звездой с уникальным номером, чтобы присвоить ему keyframes
    let animationName = `rotateAndScale-${Math.random().toString(36).substr(2, 9)}`;

    // Определение направления движения звезд из значения переданного в функцию
    let rotationDirection = direction === 'clockwise' ? '' : '-';

    // Установка анимации
    let keyframes = `
    @keyframes ${animationName} {
        0% {

            /* 
                Начальное положение анимации:
                - Звезда не повернута (rotate(0deg))
                - Находится в начальной точке (translate(0, 0))
                - Не выполнено дополнительное вращение (rotate(0deg))
                - Имеет начальный масштаб (scale(${initialScale}))
                - И начальную непрозрачность (opacity: ${initialOpacity}) 
            */

            transform: rotate(0deg) translate(0, 0) rotate(0deg) scale(${initialScale});
            opacity: ${initialOpacity};
        }
        80% {

            /* 
                Положение в 80% продолжительности анимации:
                - Звезда повернута на 80% от общего количества вращений (rotate(${rotationDirection}${rotations * 0.8}deg))
                - Смещена на 80% радиуса пути вращения плюс случайные смещения по X и Y (translate(${0.8 * radius + offsetX}px, ${0.8 * radius + offsetY}px))
                - Повернута в противоположном направлении на тот же угол, чтобы поддерживать ориентацию лицом вверх (rotate(-${rotations * 0.8}deg))
                - Масштаб не изменен (scale(${initialScale}))
                - Непрозрачность остается неизменной (opacity: ${initialOpacity}) 
            */

            transform: rotate(${rotationDirection}${rotations * 0.8}deg) translate(${0.8 * radius + offsetX}px, ${0.8 * radius + offsetY}px) rotate(-${rotations * 0.8}deg) scale(${initialScale});
            opacity: ${initialOpacity};
        }
        100% {

            /* 
                Конечное положение анимации:
                - Звезда повернута на полное количество вращений (rotate(${rotationDirection}${rotations}deg))
                - Смещена на полный радиус пути вращения плюс случайные смещения по X и Y (translate(${radius + offsetX}px, ${radius + offsetY}px))
                - Снова повернута в противоположном направлении, чтобы завершить вращение лицом вверх (rotate(-${rotations}deg))
                - Масштаб не изменен (scale(${initialScale}))
                - Непрозрачность уменьшается до 0, делая звезду невидимой (opacity: 0) 
            */

            transform: rotate(${rotationDirection}${rotations}deg) translate(${radius + offsetX}px, ${radius + offsetY}px) rotate(-${rotations}deg) scale(${initialScale});
            opacity: 0;
        }
    }`;

    // Добавляем стили на страницу
    let styleSheet = document.createElement("style");
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);

    // Применяем анимацию к контейнеру звезды
    svgContainer.style.animation = `${animationName} ${duration}s linear forwards`;

    // По завершении анимации удаляем звезду и уменьшаем счетчик
    svgContainer.addEventListener('animationend', () => {
        svgContainer.remove();
        // Уменьшаем счетчик
        currentStars--;
    });

    svgWrapper.appendChild(svgContainer);
}

// Функция поддержания постоянного количества звезд на экране
function maintainStars(wrapper, direction) {
    // Находим контейнер в котором наш спиннер
    const svgContainer = document.querySelector('.svg-container');
    // Считаем радиус исходя из высоты контейнера
    const radius = svgContainer.offsetHeight / 2;

    // Выставляем интервал для основной функции создания, анимации и удаления звезд
    setInterval(() => {
        // Проверка на максимальное количество звезд
        if (currentStars < maxStars) {
            // Для каждой звезды выбираем время, за которое она пройдет всю анимацию, сейчас между 5 и 10 секундами, можно убрать '+ Math.random() * 5' и выставлять точное значение по желанию
            const duration = 5 + Math.random() * 5;
            // Вызов основной функции
            createAndAnimateStar(wrapper, radius, duration, direction);
        }
        // 100 для вызова функции каждые 0.1 секунду для поддержания уровня звезд в анимации
    }, 100);
}

// Запускаем процесс для звезд, вращающихся по часовой стрелке
maintainStars('.svg-rotate-circle', 'clockwise');

// Функция для настройки размера контейнера со спиннером в соответствии с размером кнопки
function adjustSpinnerContainerSize() {
    // Выбираем элемент кнопки
    const btn = document.querySelector('.button-container');
    // Выбираем элемент спиннера
    const spinnerContainer = document.querySelector('.spinner-container');

    // Если элементы существуют на странице
    if (btn && spinnerContainer) {
        // Получаем стили кнопки, примененные на странице
        const btnStyles = window.getComputedStyle(btn);

        // Вычисляем ширину и высоту контейнера спиннера, исходя из размеров кнопки
        const width = parseFloat(btnStyles.width) + parseFloat(btnStyles.paddingLeft) + parseFloat(btnStyles.paddingRight);
        const height = parseFloat(btnStyles.height) + parseFloat(btnStyles.paddingTop) + parseFloat(btnStyles.paddingBottom);

        // Устанавливаем вычисленные ширину и высоту для контейнера спиннера
        spinnerContainer.style.width = `${width}px`;
        spinnerContainer.style.height = `${height}px`;
    }
}

// Вызываем функцию adjustSpinnerContainerSize, когда страница загружается, чтобы настроить размеры
window.addEventListener('load', adjustSpinnerContainerSize);

// При необходимости можно вызвать функцию adjustSpinnerContainerSize при изменении размера окна, если размер кнопки может измениться
window.addEventListener('resize', adjustSpinnerContainerSize);