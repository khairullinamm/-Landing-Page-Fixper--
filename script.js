'use strict'

function ScrollPageByNav(item) {
    
    const section = document.querySelector(`.${item.classList[1].split('__section')[0]}`);

    section.scrollIntoView({
        block: "center", //вертикальное позиционирование
        inline: "center", //горизонтальное позиционирование
        behavior: "smooth"
    });
}

function CalcWidthToScroll() {

    let teamPersonWidth = window.getComputedStyle(teamPersons[0]).minWidth.split('px')[0];
    teamPersonWidth = Number(teamPersonWidth);

    let teamPersonMarginRight = window.getComputedStyle(teamPersons[1]).marginRight.split('px')[0]; 
    teamPersonMarginRight = Number(teamPersonMarginRight);

    teamPersonWidth = teamPersonWidth + teamPersonMarginRight;

    return teamPersonWidth;
}

const checkBtns = TypeOfSection => {
    
    if (TypeOfSection === 'team')
    {
        defaultNavLeftBtn[0].disabled = positionTeam === 0; //устанавливаем disabled, если position == 0

        const defaultNavNextBtnTrue = defaultNavNextBtn[0].getElementsByTagName('button');

        console.log(defaultNavNextBtnTrue);
        defaultNavNextBtnTrue[0].disabled = positionTeam <= -((teamPersons.length - 3) * teamPersonWidth); 
    }

    else if (TypeOfSection === 'feedback') 
    {
        console.log("pos = ",feedBackItem.length);
        defaultNavLeftBtn[1].disabled = positionFeedback === 0; 

        const defaultNavNextBtnTrue = defaultNavNextBtn[1].getElementsByTagName('button');
        defaultNavNextBtnTrue[0].disabled = positionFeedback <= -((feedBackItem.length - 2) * feedbackItemWidth); 
    }
};

function TabToNextBtn(item) {
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
        
        positionFeedback = positionFeedback - (feedbackItemWidth + feedbackItemMarginRight);
        feedBackContainer.style.transform = `translateX(${positionFeedback}px)`;
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
            positionTeam-=teamPersonWidth;
            teamWorkers.style.transform = `translateX(${positionTeam}px)`;
            checkBtns('team');
    }
    
}

function TabToPrevBtn(item) {
    console.log('i');
    if  (item.classList.contains('feedback'))
    {
        console.log('hey');
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

        positionFeedback = positionFeedback + (feedbackItemWidth + feedbackItemMarginRight);
        feedBackContainer.style.transform = `translateX(${positionFeedback}px)`;
        checkBtns('feedback');
    }
    
    else if (item.classList.contains('team'))
    {
        console.log('hi');

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

        positionTeam+=teamPersonWidth;
        teamWorkers.style.transform = `translateX(${positionTeam}px)`;

        checkBtns('team');
    }
}

function ChangeOfferSectionHeight() {
    const screenWidth = window.screen.width;
    if (screenWidth < 1169) {

        const discountHeight = discount.offsetHeight;

        const offerSection = document.querySelector('.offer__container');
        const offerMainSection = document.querySelector('.offer__main-part');

        let offetSectionHeight = offerSection.offsetHeight;

        offetSectionHeight -= discountHeight;

        offerSection.style.minHeight = offetSectionHeight + 'px';
        offerMainSection.style.maxHeight = offetSectionHeight + 'px';
       
    }
}

function showPricesFunction(type) {

    if (showAllPrices[0].classList.contains('delete__prices')) {
        priceItems.forEach(item => {
            if (item.classList.contains('price-add') && item.classList.contains(`${type}`)) {
                item.classList.remove("price-add");
            item.classList.add("select-hide");
            }
        })
        showAllPrices[0].classList.remove('delete__prices');
        showAllPrices[0].getElementsByTagName('button')[0].innerHTML = "Показать все цены";
    }
    else {
        priceItems.forEach(item => {
            if (item.classList.contains('select-hide') && item.classList.contains(`${type}`)) {
                item.classList.remove("select-hide");
                item.classList.add("price-add");
            }
        })
        showAllPrices[0].classList.add('delete__prices');
        showAllPrices[0].getElementsByTagName('button')[0].innerHTML = "Убрать дополнительные цены";
    }
}

function CheckBurger() {
    if (burgerNav.style.display === 'block') 
    {
        setTimeout("burgerNav.style.display = 'none'", 1000);
    }
}
//---------------------navigation buttons in header and nav sections---------------------
const navigationBtn = document.querySelectorAll('.document__nav');

navigationBtn.forEach(item => { item.addEventListener("click", () => {
    ScrollPageByNav(item);
    CheckBurger();
  }); });





//---------------------alert window---------------------
const ButtonCall = document.querySelectorAll('.button-call'); //кнопки в header, offer и call и geo
const ButtonDiscount = document.querySelectorAll('.button__discount'); 
const Alert = document.querySelector('.alert'); 

Alert.classList.add("select-hide"); 

ButtonCall.forEach(item => { item.addEventListener("click", (e) => {
    e.preventDefault(); //для отмены перезагрузки страницы при кнопке для отправки формы

    if (item.parentElement.classList.contains('call__form'))
    {
        item.parentElement.children[0].classList.remove('error');
        if ((phoneTest(item.parentElement.children[0])) && (item.parentElement.children[0].value != ''))
        {
            document.querySelector('.input__phone').value = item.parentElement.children[0].value;
            Alert.classList.remove("select-hide");

            item.parentElement.reset();
        }
        else 
            item.parentElement.children[0].classList.add('error');
    }
    else {
        Alert.classList.remove("select-hide");
    }
}); });

ButtonDiscount.forEach(item => { item.addEventListener("click", () => {
    Alert.forEach(item => item.classList.remove("select-hide"));
}); });

//change color or cross in alert window
const crossAlertSVG = document.querySelectorAll('.svgInternalID');

crossAlertSVG.forEach(item => {
    item.setAttribute("stroke", "black");
});

//hide cross when we tab to it
const crossAlert = document.querySelector('.alert__cross');
crossAlert.addEventListener("click", () => {
    
    Alert.classList.add("select-hide");
    document.querySelector('.alert__alert').style.display = 'none';
    document.querySelector('.alert__alert').style.color = 'red';
    document.querySelector('.alert__alert').innerHTML = 'Ошибка в заполнении полей, попробуйте еще раз';

    document.querySelectorAll('.error').forEach(item => {
        item.classList.remove('error');
    })

    form.reset();
});






//---------------------close discount in offer section---------------------
const crossDiscount = document.querySelector('.offer__close-discount');
const discount = document.querySelector('.offer__discount');

crossDiscount.addEventListener("click", () => {
    ChangeOfferSectionHeight();
    discount.style.display = 'none';
});

//----------------- get discount ----------------
const discountButton = document.querySelectorAll('.button__discount');
const discountSection = document.querySelector('.discount');
const discountCross = document.querySelectorAll('.discount__cross');

discountSection.classList.add("select-hide"); 

discountButton.forEach(item => { item.addEventListener("click", (e) => {
    discountSection.classList.remove("select-hide");
}); });

discountCross.forEach(item => { item.addEventListener("click", (e) => {
    discountSection.classList.add("select-hide");
}); });


//---------------------navigations sections in team and feedback sections---------------------
const defaultNavNextBtn = document.querySelectorAll('.nav__right');
const defaultNavLeftBtn = document.querySelectorAll('.nav__left');

const defaultNavIndicatorFeedback = document.querySelector('.nav__indicator.feedback');
const defaultNavIndicatorTeam = document.querySelector('.nav__indicator.team');

const teamPersons = document.querySelectorAll('.team__person');
const teamWorkers = document.querySelector('.team__workers');


const feedBackContainer = document.querySelector('.feedback__cards');
const feedBackItem = document.querySelectorAll('.feedback__item');

const feedbackItemWidth =  feedBackItem[0].offsetWidth;
const feedbackItemMarginRight = Number(window.getComputedStyle(feedBackItem[0]).marginRight.split('px')[0]);

console.log("mr = ", feedbackItemMarginRight);

console.log("width = ",feedbackItemWidth);
let teamPersonWidth = CalcWidthToScroll();

let positionTeam = 0;
let positionFeedback = 0;

checkBtns('team');
checkBtns('feedback');


defaultNavNextBtn.forEach(item => { 
    item.addEventListener("click", () => TabToNextBtn(item) );
});

//назад
defaultNavLeftBtn.forEach(item => { item.addEventListener("click", () => {console.log(item);
TabToPrevBtn(item) }); 
});




//----------show nav using burger menu-----------------------------
const burgerMenu = document.querySelectorAll('.header__burger');
const burgerNav = document.querySelector('.header__nav-mobile');

burgerMenu.forEach(item => {
    item.addEventListener("click", () => 
    {
        burgerNav.style.display = "block";
    })
})

//---------------------show answers to questions---------------------
const questionShowAnswer = document.querySelectorAll('.questions__show');
const questionsAnswers = document.querySelectorAll('.questions__answer');
console.log(questionShowAnswer);
questionShowAnswer.forEach(item => { item.addEventListener("click", () => {

    if (!item.classList.contains("tab"))
    {
        questionsAnswers[item.id-1].style.display = 'block';
        item.children[0].setAttribute("src", "./img/icons/minus.svg");
        item.children[0].style.padding = "17px 12px";
        item.classList.add("tab");
    }

    else 
    {
        questionsAnswers[item.id-1].style.display = 'none';
        item.children[0].setAttribute("src", "./img/icons/+.svg");
        item.children[0].style.padding = "12px";
        item.classList.remove("tab");
    }


  }); });



//------------------------show all prices-desktop-----------------------

const showAllPrices = document.querySelectorAll('.price__show');
const priceItems = document.querySelectorAll('.price__item');


showAllPrices.forEach(item => {item.addEventListener("click", () => {
   
    if (window.screen.width > 580)
        showPricesFunction('desktop');
    else 
        showPricesFunction('mobile');
})

})


//---------------------custom select---------------------
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

//при нажатии на любое другое место будет скрываться (burger and select)
document.addEventListener("click", function (e) { 

    if (e.target.className !== 'select__body' && e.target.className !== 'select__item' && e.target.className !== 'select__header' && e.target.className !== 'select__current')
        selectBody.forEach(item => item.classList.add("select-hide")); //скрываем body
    
    if (e.target.className != 'header__nav-mobile' && e.target.className != 'header__burger' && burgerNav.style.display === 'block') 
    {
       console.log("hi loh");
       burgerNav.style.display = 'none';
    }
});

let firstPercent = 0;
let secondPercent = 0;
let ThirdPercent = 0;
let interval;


function updatePercentFirst(firstMax, secondMax, thirdMax)  {
    firstPercent++;
    problemDiagram[0].children[0].innerHTML = `${firstPercent}%`;

    updatePercentSecond(secondMax);
    updatePercentThird(thirdMax);

    if (firstPercent > firstMax)
    {
        clearInterval(interval);
    }
}

function updatePercentThird(thirdMax) {
    if (ThirdPercent < thirdMax)
        ThirdPercent++;

    problemDiagram[1].children[0].innerHTML = `${ThirdPercent}%`;
}

function updatePercentSecond(secondMax) {
    if (secondPercent < secondMax)
        secondPercent++;
    problemDiagram[2].children[0].innerHTML = `${secondPercent}%`;

}

//-------------diagnostics section--------------------
const diagnsticsButtons = document.querySelectorAll('.diagnostics__button');
const problemSection = document.querySelector('.problem');
const diagnosticsSection = document.querySelector('.diagnostics');


const problemDiagram = document.querySelectorAll('.problem__diagram');

diagnsticsButtons.forEach(item => {
    item.addEventListener("click", () => {
        
        problemSection.style.display = "block";
        diagnosticsSection.style.display = "none";

        for (let i = 0; i < diagnsticsButtons.length; i++)
        {
            if (item === diagnsticsButtons[i])
            {
                interval = setInterval(function () {
                    updatePercentFirst(50 + i, 20 + i, 13 + i);
                }, 20);
            }
        }
    })
})

const diagnsticsSelect = document.querySelector('.diagnostics__select');
diagnsticsSelect.addEventListener("change", (e) => {
        problemSection.style.display = "block";
        diagnosticsSection.style.display = 'none';
        let i = Number(e.target.value);
        interval = setInterval(function () {
            updatePercentFirst(50 + i, 20 + i, 13 + i);
        }, 20);
    })


const changeAnotherProblem = document.querySelector('.problem__change');
changeAnotherProblem.addEventListener("click", () => {
    
    problemSection.style.display = "none";
    diagnosticsSection.style.display = "block"

    problemDiagram[0].children[0].innerHTML = '0%';
    problemDiagram[1].children[0].innerHTML = '0%';
    problemDiagram[2].children[0].innerHTML = '0%';

    firstPercent = 0;
    secondPercent = 0;
    ThirdPercent = 0;

    diagnsticsSelect.value = "true";
    console.log(diagnsticsSelect);
})

const problemCall = document.querySelector('.problem__call');
problemCall.addEventListener("click", () => {
    Alert.classList.remove("select-hide");
})


//---------------------------forms-----------------------------
let id = 1; 
const formAlert = document.querySelector('.alert__form');

function phoneTest(input) 
{
    return /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(input.value);
}

formAlert.addEventListener('submit', formSend); 
async function formSend(e) {
    
    e.preventDefault();
    document.querySelector('.alert__alert').style.display = 'none';
    
    let error = formValidate();
    
    if (error === 0) {
        
        Alert.classList.add('sending'); 

        let user = {
            id,
            "name": `${document.querySelector('.input__name').value}`,
            "phone": `${document.querySelector('.input__phone').value}`
          };

        let response = await fetch('http://localhost:3000/users').catch(
            () => {
                
                setTimeout(() => {  console.log("World!"); }, 2000);

                document.querySelector('.alert__alert').style.display = 'block';
                document.querySelector('.alert__alert').innerHTML = 'К сожалению, в настоящее время сервер для отправки данных недоступен';

                form.reset();
                Alert.classList.remove('sending'); 

                return;
                
            })
        
        if (response.ok) { 
            let json = await response.json();
            user.id = json[json.length - 1].id + 1;
        } 

        else {
                document.querySelector('.alert__alert').style.display = 'block';
                document.querySelector('.alert__alert').innerHTML = 'К сожалению, в настоящее время сервер для отправки данных недоступен';

                form.reset();
                Alert.classList.remove('sending'); 

                return;
        }


        response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });
        
        if (response.ok) {

            form.reset();
            Alert.classList.remove('sending'); 

            document.querySelector('.alert__alert').style.display = 'block';
            document.querySelector('.alert__alert').style.color = 'green';
            document.querySelector('.alert__alert').innerHTML = 'Ваши данные успешно отправлены!';
            
        } 
        
        else 
        {
            Alert.classList.remove('sending'); 
            
            document.querySelector('.alert__alert').style.display = 'block';
            document.querySelector('.alert__alert').innerHTML = 'Произошла оошибка с отправкой данных, попробуйте еще раз';
        }

    } 
    else {
        
        document.querySelector('.alert__alert').style.display = 'block';
    }

    function formValidate() {
        
        let error = 0;
        let formReq = document.querySelectorAll('.req');

        for (let index = 0; index < formReq.length; index++)
        {
            const input = formReq[index];
            removeError(input);

            if (input.classList.contains('input__name')) {
                
                if (!nameTest(input))
                {
                    addError(input);
                    error++;
                }

                if (input.value === '') {
                    addError(input);
                    error++;
                }
            }

            if (input.classList.contains('input__phone')) {
                if (!phoneTest(input)) {
                    addError(input);
                    error++;
                }
                if (input.value === '') {
                    addError(input);
                    error++;
                }
            }
        }

        return error;
    }

    function addError(input) 
    {
        input.parentElement.classList.add('error');
        input.classList.add('error');
    }

    function removeError(input) 
    {
        input.parentElement.classList.remove('error');
        input.classList.remove('error');
    }

    function nameTest(input) 
    {
        console.log(/[а-яА-ЯЁё]/.test(input.value))
        return /[а-яА-ЯЁё]/.test(input.value);
    }

}