//tabs
const tabsBtns = document.querySelectorAll(".tabs__nav button");

const tabsItems = document.querySelectorAll(".tabs__item");

//Функция скрывает табы и убирает active у кнопок

function hideTabs() {
    tabsItems.forEach(item => item.classList.add("hide")); /*добавляем к элементу класс hide*/
    tabsBtns.forEach(item => item.classList.remove("active")); /*удаляем класс active*/
}

//Ф-я показывает переданный номер таба и делает соответств. кнопку активной
function showTab(index) {
    tabsItems[index].classList.remove("hide");
    tabsBtns[index].classList.add("active");
}
hideTabs();
showTab(0);

//на каждую кнопку вешаем слушатель события и указываем, что конкретно мы будем слушать
tabsBtns.forEach((btn,index) => btn.addEventListener("click", () => {
    hideTabs();
    showTab(index);
})); 

// Anchors

const anchors = document.querySelectorAll(".header__nav a");
anchors.forEach(anc => { //на каждую ссылку anc вешаем слушатель событий
    anc.addEventListener("click", function(event) {
        event.preventDefault(); //отменяем стандартное поведение -- переход на заглушку
        
        const id = anc.getAttribute("href");
        const elem = document.querySelector(id); 

        window.scroll({
            top: elem.offsetTop - 74, //вычитаем шапку
            behavior: 'smooth' //медленная прокрутка
        });
    });
});