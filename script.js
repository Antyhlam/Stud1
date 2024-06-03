// Переключение закладок
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.target;
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        tabContents.forEach(content => {
            if (content.id === target) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
    });
});

// Переключение закладок с помощью колеса мыши
window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) { // Прокрутка вниз
        const activeTab = document.querySelector('.tab.active');
        const nextTab = activeTab.nextElementSibling;
        if (nextTab) {
            nextTab.click();
        }
    } else { // Прокрутка вверх
        const activeTab = document.querySelector('.tab.active');
        const prevTab = activeTab.previousElementSibling;
        if (prevTab) {
            prevTab.click();
        }
    }
});

// Ввод имени
const userNameInput = document.getElementById('userName');
const greeting = document.getElementById('greeting');

userNameInput.addEventListener('input', () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        greeting.textContent = "";
    } else {
        greeting.textContent = `Привет, ${userName}!`;
    }
});

// Чайная магия
const teaCup = document.querySelector('.tea-magic-container .tea-cup');
const teaLeaf = document.querySelector('.tea-magic-container .tea-leaf');

let teaLeafX = 40; // Начальное положение чайного листа по горизонтали
let teaLeafY = 20; // Начальное положение чайного листа по вертикали
let teaLeafRotation = 0; // Начальный угол вращения чайного листа

window.addEventListener('mousemove', (event) => {
    // Получаем ширину и высоту чашки
    const cupWidth = teaCup.offsetWidth;
    const cupHeight = teaCup.offsetHeight;

    // Вычисляем пропорциональное положение мыши в пределах чашки
    const relativeX = event.clientX / window.innerWidth * cupWidth;
    const relativeY = event.clientY / window.innerHeight * cupHeight;

    // Ограничиваем движение чайного листа в пределах чашки
    teaLeafX = Math.max(10, Math.min(cupWidth - 30, relativeX));
    teaLeafY = Math.max(20, Math.min(cupHeight - 30, relativeY));

    teaLeafRotation += 2; // Поворачиваем чайный лист на 2 градуса

    teaLeaf.style.left = `${teaLeafX}px`;
    teaLeaf.style.top = `${teaLeafY}px`;
    teaLeaf.style.transform = `rotate(${teaLeafRotation}deg)`;
});

window.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        // Изменяем цвет чашки при нажатии пробела
        teaCup.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 50%)`;
    }
});

// Часы
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12; // 12-часовой формат
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourRotation = (hours + minutes / 60) * 30; // 360 / 12 = 30 градусов за час
    const minuteRotation = minutes * 6; // 360 / 60 = 6 градусов за минуту
    const secondRotation = seconds * 6; // 360 / 60 = 6 градусов за секунду

    hourHand.style.transform = `translateX(-50%) rotate(${hourRotation}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteRotation}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${secondRotation}deg)`;
}

setInterval(updateClock, 1000);