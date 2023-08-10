'use strict'


/*---------NAVIGATION BUTTONS IN HEADER AND NAV SECTIONS----------*/
//----------------------------------------------------------
const navigationBtn = document.querySelectorAll('.document__nav');
navigationBtn.forEach(item => { item.addEventListener("click", () => {
    //берем второй класс (первый - document__nav) 
    //и разделяем на подстроки, разделитель - __section, т.о получаем "название секции" и "section" и берем [0] - название секции
    //т.о. получаем секцию по классу
    const section = document.querySelector(`.${item.classList[1].split('__section')[0]}`);
    
    section.scrollIntoView({
        //start,center,end,nearest - по умолчанию start
        block: "center", //вертикальное позиционирование
    
        //start,center,end,nearest - по умолчанию nearest
        inline: "center", //горизонтальное позиционирование
    
      //auto,smooth - по умолчанию auto
        behavior: "smooth"
    });
  }); });
//----------------------------------------------------------


/*------------------------------ALERT-CALL-------------------------------*/
//-----------------------------------------------------------------------
const ButtonCall = document.querySelectorAll('.button-call'); //кнопки в header, offer и call
const ButtonDiscount = document.querySelectorAll('.button__discount'); //кнопка в скидке
const Alert = document.querySelector('.alert'); //секция с окном

Alert.classList.add("select-hide"); 

/*При нажатии на кнопку звонка или скидки вылезает окно*/
ButtonCall.forEach(item => { item.addEventListener("click", (e) => {

    e.preventDefault(); //для отмены перезагрузки страницы при кнопке для отправки формы

    Alert.classList.remove("select-hide");

}); });

ButtonDiscount.forEach(item => { item.addEventListener("click", () => {
    Alert.forEach(item => item.classList.remove("select-hide"));
}); });


/*меняем цвет креста на черный*/
const crossAlertSVG = document.querySelectorAll('.svgInternalID');

crossAlertSVG.forEach(item => {
    item.setAttribute("stroke", "black");
});


/*при нажатии на крест скрываем*/
const crossAlert = document.querySelector('.alert__cross');
crossAlert.addEventListener("click", () => {
    Alert.classList.add("select-hide");
});
//----------------------------------------------------------


/*----------------------------CLOSE DISCOUNT----------------- */
const crossDiscount = document.querySelector('.offer__close-discount');
const discount = document.querySelector('.offer__discount');

crossDiscount.addEventListener("click", () => {
    discount.style.display = 'none';
});
//----------------------------------------------------------



const questionShowAnswer = document.querySelectorAll('.questions__show');
console.log(questionShowAnswer);
questionShowAnswer.forEach(item => { item.addEventListener("click", () => {
    console.log(item);
    document.querySelector('.questions__answer').style.display = 'block';
  }); });
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




/*------------------------------------Нажатие на ДАЛЕЕ и изменение активного индикатора ----------------------------------*/
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

let teamPersonMarginRight = window.getComputedStyle(teamPersons[1]).marginRight.split('px')[0]; 
teamPersonMarginRight = Number(teamPersonMarginRight);

teamPersonWidth = teamPersonWidth + teamPersonMarginRight;

let position = 0;
const checkBtns = TypeOfSection => {
    
    if (TypeOfSection === 'team')
    {
        defaultNavLeftBtn[0].disabled = position === 0; //устанавливаем disabled, если position == 0

        const defaultNavNextBtnTrue = defaultNavNextBtn[0].getElementsByTagName('button');
        defaultNavNextBtnTrue[0].disabled = position <= -((teamPersons.length - 3) * teamPersonWidth); 
    }

    else if (TypeOfSection === 'feedback') 
    {
        defaultNavLeftBtn[1].disabled = position === 0; //устанавливаем disabled, если position == 0

       // const defaultNavNextBtnTrue = defaultNavNextBtn[1].getElementsByTagName('button');
       // defaultNavNextBtnTrue[1].disabled = position <= -((teamPersons.length - 3) * teamPersonWidth); 
    }
};

checkBtns('team');
checkBtns('feedback');

defaultNavNextBtn.forEach(item => { item.addEventListener("click", () => {
   
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
        checkBtns('feedback');
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
        position-=teamPersonWidth;
        teamWorkers.style.transform = `translateX(${position}px)`;
   }
   checkBtns('team');
}); });

//назад
defaultNavLeftBtn.forEach(item => { item.addEventListener("click", () => {
    if  (item.classList.contains('feedback'))
    {
        for (let i = 0; i < defaultNavIndicatorFeedback.children.length; i++)
        {
            if (defaultNavIndicatorFeedback.children[i].className === 'active') 
                {
                    const active = defaultNavIndicatorFeedback.children[i];

                    defaultNavIndicatorFeedback.children[i-1].remove(); //удаляем старый active
    
                    const navPage = document.createElement('div');
                    navPage.classList.add('nav__page');
    
                    active.after(navPage); //добавляем до него (взамен прошлого active) обычный кружок
                    break;
                }   
        }

        checkBtns('feedback');
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

        checkBtns('team');
    }
}); });

