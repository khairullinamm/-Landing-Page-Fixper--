

/*----Custom select---*/
const selectHeader = document.querySelectorAll('.select__header');
const selectItem = document.querySelectorAll('.select__item');
const selectBody = document.querySelectorAll('.select__body');

selectBody.forEach(item => item.classList.add("select-hide"));

//на каждую кнопку вешаем слушатель события и указываем, что конкретно мы будем слушать
selectHeader.forEach(item => { item.addEventListener("click", () => {
    selectBody.forEach(item => item.classList.remove("select-hide"));
});
});

selectItem.forEach(item => { item.addEventListener("click", () => {
    let arr = item.children;
    let current = arr[1].innerHTML; /*содержание span*/
    console.log(current);
    const now =  document.querySelector('.select__current');
    now.innerHTML = current; //меняем текущий город
    selectBody.forEach(item => item.classList.add("select-hide")); //скрываем body
});
});

//при нажатии на любое другое место будет скрываться
document.addEventListener("click", function (e) { 

    if (e.target.className !== 'select__body' && e.target.className !== 'select__item' && e.target.className !== 'select__header' && e.target.className !== 'select__current')
        selectBody.forEach(item => item.classList.add("select-hide")); //скрываем body
});

//Решить проблему в select
//Изменить цвет крестика при нажатии в discount


/*------------------------------ALERT-------------------------------*/
const ButtonCall = document.querySelectorAll('.button-call');
const ButtonDiscount = document.querySelectorAll('.button__discount');
const Alert = document.querySelectorAll('.alert');


Alert.forEach(item => item.classList.add("select-hide"));

/*При нажатии на кнопку звонка или скидки вылезает окно*/
ButtonCall.forEach(item => { item.addEventListener("click", () => {
    Alert.forEach(item => item.classList.remove("select-hide"));
}); });

ButtonDiscount.forEach(item => { item.addEventListener("click", () => {
    Alert.forEach(item => item.classList.remove("select-hide"));
}); });


/*меняем цвет креста на черный*/
const crossAlertSVG = document.querySelectorAll('.svgInternalID');
let i = 0;
while (i < crossAlertSVG.length)
{
    crossAlertSVG[i].setAttribute("stroke", "black");
    i++;
}

/*при нажатии на крест скрываем*/
const crossAlert = document.querySelectorAll('.alert__cross');
crossAlert.forEach(item => { item.addEventListener("click", () => {
    Alert.forEach(item => item.classList.add("select-hide"));
});
});

const crossDiscount = document.querySelectorAll('.offer__close-discount');
const discount = document.querySelectorAll('.offer__discount');

crossDiscount.forEach(item => { item.addEventListener("click", () => {
    discount.forEach(item => item.style.display = 'none');
});
});

const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

const noticeMobile = document.querySelector('.diagnoctics__notice-mobile');
const noticeDesktop = document.querySelector('.diagnoctics__notice-desktop');

const teamPerson = document.querySelectorAll('.team__person');

const feedbackItem = document.querySelectorAll('.feedback__item');

if (screenWidth <= 1024) {

    noticeMobile.style.display = 'flex';
    noticeDesktop.style.display = 'none';

    if (teamPerson.length === 3) {
        teamPerson[2].style.display = 'none';
    }

    if (feedbackItem.length === 2) {
        feedbackItem[1].style.display = 'none';
    }
}
else if (screenWidth > 1024) {

    noticeMobile.style.display = 'none';
    noticeDesktop.style.display = 'flex';

    if (teamPerson.length < 3) {
        teamPerson[2].style.display = 'block';
    }

    if (feedbackItem.length < 2) {
        feedbackItem[1].style.display = 'block';
    }
}