const selectHeader = document.querySelectorAll('.select__header');
const selectItem = document.querySelectorAll('.select__item');
const selectBody = document.querySelectorAll('.select__body');

selectBody.forEach(item => item.classList.add("select-hide"));
//на каждую кнопку вешаем слушатель события и указываем, что конкретно мы будем слушать
selectHeader.forEach(item => { item.addEventListener("click", () => {
    console.log(1);
    //selectBody.classList.add("select-hide");
    selectBody.forEach(item => item.classList.remove("select-hide"));
    //selectBody.classList.remove("select-hide");
});
});

selectItem.forEach(item => { item.addEventListener("click", () => {
    let arr = item.children;
    let current = arr[1].innerHTML;
    console.log(1 + "--->" + arr[1].innerHTML);
    const now =  document.querySelector('.select__current');
    now.innerHTML = current;
    selectBody.forEach(item => item.classList.add("select-hide"));
});
});


/*
let select = function () {
    let selectHeader = document.querySelector('.select__header');
    let selectBody = document.querySelector('.select__body');
    selectHeader.forEach(item =>{
        item.addEventListener('click', function() {
            alert();
            selectBody.classList.add("is-active");
        })
    })
}*/