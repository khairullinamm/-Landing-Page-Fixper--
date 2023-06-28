

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
    const now =  document.querySelector('.select__current');
    now.innerHTML = current; //меняем текущий город
    selectBody.forEach(item => item.classList.add("select-hide")); //скрываем body
});
});

