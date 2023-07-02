const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');
const sidebar = document.querySelector('.sidebar');
const container = document.querySelector('.container');

//ставим необходимый слайд
const mainSlide = document.querySelector('.main-slide');
const slidesCount = mainSlide.querySelectorAll('div').length; /*получили число divov в mainSlide */
sidebar.style.top = `-${(slidesCount - 1) * 100}vh`; /*вычитаем единицу, так как на экране уже стоит один слайд*/

let activeSlideIndex = 0;

upBtn.addEventListener('click',() => {
    ChangeSlide('up');
})

downBtn.addEventListener('click',() => {
    ChangeSlide('down');
})

function ChangeSlide(direction) {
    if (direction === 'up') {
        activeSlideIndex++;
        if (activeSlideIndex === slidesCount) {
            activeSlideIndex = 0;
        }
    }
    else if (direction === 'down') {
        activeSlideIndex--;
        if (activeSlideIndex < slidesCount) {
            a = slidesCount - 1;
        } 
    }
    const height = container.clientHeight;
    mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;
    sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`;
}

