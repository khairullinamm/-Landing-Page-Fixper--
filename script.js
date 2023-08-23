'use strict'

/*------------------------------navigation buttons in header and nav sections------------------------------*/
const navigationBtn = document.querySelectorAll('.document__nav');
navigationBtn.forEach(item => { item.addEventListener("click", () => {
    ScrollPageByNav(item);
    CheckBurger();

    function ScrollPageByNav(item) {
    
        const section = document.querySelector(`.${item.classList[1].split('__section')[0]}`);
    
        section.scrollIntoView({
            block: "center", //вертикальное позиционирование
            inline: "center", //горизонтальное позиционирование
            behavior: "smooth"
        });
    }
    function CheckBurger() {
        if (burgerNav.style.display === 'block') 
        {
            setTimeout("burgerNav.style.display = 'none'", 1000);
        }
    }

  }); });

/*------------------------------ALERT WINDOW------------------------------*/
const ButtonCall = document.querySelectorAll('.button-call'); 
const ButtonDiscount = document.querySelector('.button__discount'); 
const Alert = document.querySelector('.alert'); 

Alert.classList.add("select-hide"); 

ButtonCall.forEach(item => { item.addEventListener("click", (e) => {
    e.preventDefault(); 

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

const problemCall = document.querySelector('.problem__call');
problemCall.addEventListener("click", () => Alert.classList.remove("select-hide"));

/*------------------------------GET AND CLOSE DISCOUNT------------------------------*/
const crossDiscount = document.querySelector('.offer__close-discount');
const discount = document.querySelector('.offer__discount');

crossDiscount.addEventListener("click", () => {
    ChangeOfferSectionHeight();
    discount.style.display = 'none';

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
});

const discountButton = document.querySelector('.button__discount');
const discountSection = document.querySelector('.discount');
const discountCross = document.querySelector('.discount__cross');

discountSection.classList.add("select-hide"); 
discountButton.addEventListener("click", () => discountSection.classList.remove("select-hide")); 
discountCross.addEventListener("click", () => discountSection.classList.add("select-hide")); 

/*------------------------------NAV AT TEAM AND FEEDBACK------------------------------*/
const defaultNavIndicatorFeedback = document.querySelector('.nav__indicator.feedback');
const defaultNavIndicatorTeam = document.querySelector('.nav__indicator.team');

const defaultNavNextBtn = document.querySelectorAll('.nav__right');
const defaultNavLeftBtn = document.querySelectorAll('.nav__left');


const teamWorkers = document.querySelector('.team__workers');
const teamPersons = document.querySelectorAll('.team__person');

const feedBackContainer = document.querySelector('.feedback__cards');
const feedBackItem = document.querySelectorAll('.feedback__item');

const feedbackItemWidth =  feedBackItem[0].offsetWidth;
const feedbackItemMarginRight = Number(window.getComputedStyle(feedBackItem[0]).marginRight.split('px')[0]);

let teamPersonWidth = function() {
    let teamPersonWidth = window.getComputedStyle(teamPersons[0]).minWidth.split('px')[0];
    teamPersonWidth = Number(teamPersonWidth);

    let teamPersonMarginRight = window.getComputedStyle(teamPersons[1]).marginRight.split('px')[0]; 
    teamPersonMarginRight = Number(teamPersonMarginRight);

    teamPersonWidth = teamPersonWidth + teamPersonMarginRight;

    return teamPersonWidth;
}

teamPersonWidth = teamPersonWidth();

let positionTeam = 0;
let positionFeedback = 0;

checkBtns('team');
checkBtns('feedback');

defaultNavNextBtn.forEach(item => {  item.addEventListener("click", () => {
        TabToNextBtn(item);
        function TabToNextBtn(item) {

        let defaultNavIndicator = defaultNavIndicatorTeam;

        if (item.classList.contains('feedback'))
            defaultNavIndicator = defaultNavIndicatorFeedback;

        for (let i = 0; i < defaultNavIndicator.children.length; i++) {
            if (defaultNavIndicator.children[i].className === 'active') {
                const active = defaultNavIndicator.children[i];
                const deepCopy = active.cloneNode(true);

                if (i!==3) {
                    active.after(deepCopy); //добавляем active после текущего active
                    active.remove(); //удаляем старый active

                    const activenew = defaultNavIndicator.querySelector('.active'); //находим новый active

                    const navPage = document.createElement('div');
                    navPage.classList.add('nav__page');

                    activenew.before(navPage); //добавляем перед ним (взамен прошлого active) обычный кружок

                    const navPagesAll = defaultNavIndicator.querySelectorAll('.nav__page');
                    navPagesAll[navPagesAll.length - 1].remove(); //удаляем кружок в конце
                }

                else {
                    defaultNavIndicator.prepend(deepCopy); //добавляем active в самое начало
                    active.remove(); //удаляем старый из конца
                }
            
                break;
            }   
        }

        if (item.classList.contains('feedback')) {
            positionFeedback = positionFeedback - (feedbackItemWidth + feedbackItemMarginRight);
            feedBackContainer.style.transform = `translateX(${positionFeedback}px)`;
            checkBtns('feedback');
        }
        else {
            positionTeam-=teamPersonWidth;
            teamWorkers.style.transform = `translateX(${positionTeam}px)`;
            checkBtns('team');
        }
        }

}); });
defaultNavLeftBtn.forEach(item => { item.addEventListener("click", () => {
    TabToPrevBtn(item) 

    function TabToPrevBtn(item) {

        let defaultNavIndicator = defaultNavIndicatorTeam;

        if (item.classList.contains('feedback'))
            defaultNavIndicator = defaultNavIndicatorFeedback;

        for (let i = 0; i < defaultNavIndicator.children.length; i++) {
            if (defaultNavIndicator.children[i].className === 'active') {
                const active = defaultNavIndicator.children[i];
    
                defaultNavIndicator.children[i-1].remove(); //удаляем старый active
        
                const navPage = document.createElement('div');
                navPage.classList.add('nav__page');
        
                active.after(navPage); //добавляем до него (взамен прошлого active) обычный кружок
                break;
            }   
        }
    
        if (item.classList.contains('feedback')) {
            positionFeedback = positionFeedback + (feedbackItemWidth + feedbackItemMarginRight);
            feedBackContainer.style.transform = `translateX(${positionFeedback}px)`;
            checkBtns('feedback');
        }

        else {
            positionTeam+=teamPersonWidth;
            teamWorkers.style.transform = `translateX(${positionTeam}px)`;
    
            checkBtns('team');
        }
    }
}); });
function checkBtns(TypeOfSection) {
    
    if (TypeOfSection === 'team') {
        defaultNavLeftBtn[0].disabled = positionTeam === 0; 
    
        const defaultNavNextBtnTrue = defaultNavNextBtn[0].getElementsByTagName('button');
        defaultNavNextBtnTrue[0].disabled = positionTeam <= -((teamPersons.length - 3) * teamPersonWidth); 
    }
    
    else if (TypeOfSection === 'feedback') {
        defaultNavLeftBtn[1].disabled = positionFeedback === 0; 
    
        const defaultNavNextBtnTrue = defaultNavNextBtn[1].getElementsByTagName('button');
        defaultNavNextBtnTrue[0].disabled = positionFeedback <= -((feedBackItem.length - 2) * feedbackItemWidth); 
    }
};

/*------------------------------SHOW NAV BU BURGER------------------------------*/
const burgerMenu = document.querySelector('.header__burger');
const burgerNav = document.querySelector('.header__nav-mobile');

burgerMenu.addEventListener("click", () => burgerNav.style.display = "block");

/*------------------------------SHOW ANSWERS TO QUESTIONS------------------------------*/
const questionShowAnswer = document.querySelectorAll('.questions__show');

questionShowAnswer.forEach(item => { item.addEventListener("click", () => {

    const questionsAnswers = document.querySelectorAll('.questions__answer');

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

/*------------------------------SHOW ALL PRICES------------------------------*/
const showAllPrices = document.querySelectorAll('.price__show');
showAllPrices.forEach(item => {item.addEventListener("click", () => {
   
    const priceItems = document.querySelectorAll('.price__item');

    if (window.screen.width > 580)
        showPricesFunction('desktop');
    else 
        showPricesFunction('mobile');

    function showPricesFunction(type) {
        if (showAllPrices[0].classList.contains('delete__prices')) {
            priceItems.forEach(item => {
                if (item.classList.contains('price-add') && item.classList.contains(`${type}`)) {
                    item.classList.remove("price-add");
                item.classList.add("select-hide");
            } })

            showAllPrices[0].classList.remove('delete__prices');
            showAllPrices[0].getElementsByTagName('button')[0].innerHTML = "Показать все цены";
        }
        else {
            priceItems.forEach(item => {
                if (item.classList.contains('select-hide') && item.classList.contains(`${type}`)) {
                    item.classList.remove("select-hide");
                    item.classList.add("price-add");
                } })
            showAllPrices[0].classList.add('delete__prices');
            showAllPrices[0].getElementsByTagName('button')[0].innerHTML = "Убрать дополнительные цены";
        }
    }
}) })

/*------------------------------CUSTOM SELECT------------------------------*/
const selectHeader = document.querySelector('.select__header');
const selectItem = document.querySelectorAll('.select__item');
const selectBody = document.querySelector('.select__body');

selectBody.classList.add("select-hide");

selectHeader.addEventListener("click", () => {
    selectBody.classList.remove("select-hide");
});

selectItem.forEach(item => { item.addEventListener("click", () => {

    let choosenText = item.children[1].innerHTML; 
    const currentText =  document.querySelector('.select__current');
    currentText.innerHTML = choosenText; 

    selectBody.classList.add("select-hide"); 
});
});

/*------------------------------HIDE BURGER AND CUSTOM SELECT------------------------------*/
document.addEventListener("click", function (e) { 
    if (e.target.className !== 'select__body' && e.target.className !== 'select__item' && e.target.className !== 'select__header' && e.target.className !== 'select__current')
        selectBody.classList.add("select-hide"); 
    
    if (e.target.className != 'header__nav-mobile' && e.target.className != 'header__burger' && burgerNav.style.display === 'block') 
    {
        burgerNav.style.display = 'none';
    }
});

/*------------------------------SHOW PROBLEN IN DIAGNOSTICS------------------------------*/
const diagnsticsButtons = document.querySelectorAll('.diagnostics__button');
const problemDiagram = document.querySelectorAll('.problem__diagram');
const problemSection = document.querySelector('.problem');
const diagnosticsSection = document.querySelector('.diagnostics');
const diagnsticsSelect = document.querySelector('.diagnostics__select');
const changeAnotherProblem = document.querySelector('.problem__change');

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
        clearInterval(interval);
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
diagnsticsButtons.forEach(item => { item.addEventListener("click", () => {
        
    problemSection.style.display = "block";
    diagnosticsSection.style.display = "none";


    for (let i = 0; i < diagnsticsButtons.length; i++) {
        if (item === diagnsticsButtons[i])
        {
            interval = setInterval(function () {
                updatePercentFirst(50 + i, 20 + i, 13 + i);
            }, 20);
        }
    }

}) });
diagnsticsSelect.addEventListener("change", (e) => {
        
        problemSection.style.display = "block";
        diagnosticsSection.style.display = 'none';
        
        let i = Number(e.target.value);
        
        interval = setInterval(function () {
            updatePercentFirst(50 + i, 20 + i, 13 + i);
        }, 20);
})
changeAnotherProblem.addEventListener("click", () => {
    
    problemSection.style.display = "none";
    diagnosticsSection.style.display = "block"

    problemDiagram[0].children[0].innerHTML = '0%';
    problemDiagram[1].children[0].innerHTML = '0%';
    problemDiagram[2].children[0].innerHTML = '0%';

    firstPercent = 0;
    secondPercent = 0;
    ThirdPercent = 0;

    diagnsticsSelect.value = "choose";
})

/*------------------------------ADD SENDING DATA IN FORMS------------------------------*/
let id = 1; 
const formAlert = document.querySelector('.alert__form');

function phoneTest(input) {
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
        
        let response = await fetch('http://localhost:3000/users').catch(() => 
        {
            document.querySelector('.alert__alert').style.display = 'block';
            document.querySelector('.alert__alert').style.color = 'red';
            document.querySelector('.alert__alert').innerHTML = 'К сожалению, в настоящее время сервер для отправки данных недоступен';

            form.reset();
            setTimeout(Alert.classList.remove('sending'), 2000);

            return;
        });

        if (response.ok)
        {   
            let json = await response.json();
            user.id = json[json.length - 1].id + 1;
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

        else {
            Alert.classList.remove('sending'); 
            document.querySelector('.alert__alert').style.display = 'block';
            document.querySelector('.alert__alert').innerHTML = 'Произошла ошибка с отправкой данных, попробуйте еще раз';
        }

    } else {
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
