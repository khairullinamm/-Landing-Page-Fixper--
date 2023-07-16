

/*----CUSTOM SELECT---*/
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


/*------------------------------ALERT-CALL-------------------------------*/
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

/*---------Нажатие на ДАЛЕЕ и изменение активного индикатора ---------*/
const defaultNavNextBtn = document.querySelectorAll('.nav__right');

const defaultNavLeftBtn = document.querySelectorAll('.nav__left');
const defaultNavIndicatorFeedback = document.querySelector('.nav__indicator.feedback');
const defaultNavIndicatorTeam = document.querySelector('.nav__indicator.team');
const teamPersons = document.querySelectorAll('.team__person');
const teamWorkers = document.querySelector('.team__workers');


const screenWidth = window.screen.width;
const screenHeight = window.screen.height;


let teamPersonWidth = window.getComputedStyle(teamPersons[0]).minWidth.split('px')[0];
teamPersonWidth = Number(teamPersonWidth);

if (screenWidth > 505 || screenWidth < 361)
    teamPersonWidth+=30;
else
    teamPersonWidth+=60;

console.log(screenWidth);
console.log(teamPersonWidth);

let position = 0;
const checkBtns = () => {
    
    defaultNavLeftBtn[0].disabled = position === 0;
    console.log (position);
    console.log(-((teamPersons.length - 3) * teamPersonWidth));
    const defaultNavNextBtnTrue = defaultNavNextBtn[0].getElementsByTagName('button');
    defaultNavNextBtnTrue[0].disabled = position <= -((teamPersons.length - 3) * teamPersonWidth);
};
checkBtns();
defaultNavNextBtn.forEach(item => { item.addEventListener("click", () => {
   
    //checkBtns();
    if (item.classList.contains('feedback'))
   {
    for (let i = 0; i < defaultNavIndicatorFeedback.children.length; i++) //проходимся по всем кружочкам и ищем эктив
    {
        if (defaultNavIndicatorFeedback.children[i].className === 'active') 
            {
                    const active = defaultNavIndicatorFeedback.children[i];
                    const deepCopy = active.cloneNode(true);

                    if (i!==3) /*если это не последний кружок*/
                    {
                        active.after(deepCopy); //добавляем active после текущего active
                        active.remove(); //удаляем старый active

                        const activenew = defaultNavIndicatorFeedback.querySelector('.active'); //находим новый active

                        const navPage = document.createElement('div');
                        navPage.classList.add('nav__page');

                        activenew.before(navPage); //добавляем перед ним (взамен прошлого active) обычный кружок

                        const navPagesAll = defaultNavIndicatorFeedback.querySelectorAll('.nav__page');
                        navPagesAll[navPagesAll.length - 1].remove(); //удаляем кружок в конце
                    }
                    else //если мы на концеы
                    {
                        defaultNavIndicatorFeedback.prepend(deepCopy); //добавляем active в самое начало
                        active.remove(); //удаляем старый из конца
                    }
                    break;
            }   
    }

   }

   else if (item.classList.contains('team'))
   {

    for (let i = 0; i < defaultNavIndicatorTeam.children.length; i++)
    {
        if (defaultNavIndicatorTeam.children[i].className === 'active') 
            {
                const active = defaultNavIndicatorTeam.children[i];
                const deepCopy = active.cloneNode(true);

                active.after(deepCopy); //добавляем active после текущего active
                active.remove(); //удаляем старый active

                const activenew = defaultNavIndicatorTeam.querySelector('.active'); //находим новый active

                const navPage = document.createElement('div');
                navPage.classList.add('nav__page');

                activenew.before(navPage); //добавляем перед ним (взамен прошлого active) обычный кружок

                const navPagesAll = defaultNavIndicatorTeam.querySelectorAll('.nav__page');
                navPagesAll[navPagesAll.length - 1].remove(); //удаляем кружок в конце
                
                break;
            }   
    }

    //if (screenWidth > 1100) {
        position-=teamPersonWidth;
        teamWorkers.style.transform = `translateX(${position}px)`;

    //}

   }
   checkBtns();
}); });

defaultNavLeftBtn.forEach(item => { item.addEventListener("click", () => {
  //  checkBtns();
    if  (item.classList.contains('feedback'))
    {

    }
    
    else if (item.classList.contains('team'))
    {

        for (let i = 0; i < defaultNavIndicatorTeam.children.length; i++)
        {
            if (defaultNavIndicatorTeam.children[i].className === 'active') 
                {
                    const active = defaultNavIndicatorTeam.children[i];

                    defaultNavIndicatorTeam.children[i-1].remove(); //удаляем старый active
    
                    const navPage = document.createElement('div');
                    navPage.classList.add('nav__page');
    
                    active.after(navPage); //добавляем до него (взамен прошлого active) обычный кружок
                    break;
                }   
        }

        position+=teamPersonWidth;
        teamWorkers.style.transform = `translateX(${position}px)`;

        checkBtns();
    }
}); });

