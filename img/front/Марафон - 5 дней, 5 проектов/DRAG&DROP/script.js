const item = document.querySelector('.item');
const placeholders = document.querySelectorAll('.placeholder');

item.addEventListener('dragstart', dragstart); /*при начале перетаскиваний вызывается функция dragstart*/
item.addEventListener('dragend', dragend); /*при окончании - dragend*/

for (const placeholder of placeholders) {
    placeholder.addEventListener('dragover',dragover); /*элемент находится над плейсхолдером*/
    placeholder.addEventListener('dragenter',dragenter); /*элемент находится на территории плесхолдера*/
    placeholder.addEventListener('dragleave', dragleave); /*элемент перетащили с одного и вышли оттуда*/
    placeholder.addEventListener('drop', dragdrop); /*элемент отупстили*/
}

function dragstart(event) {
    //event.target - элемент
    event.target.classList.add('hold'); /*Добавляем класс в процессе перетаскивания*/
    setTimeout(() =>  event.target.classList.add
    ('hide'), 0)
    
}
function dragend(event) {
    event.target.className = 'item';
}

function dragover (event) {
    event.preventDefault();

}
function dragenter (event) {
    event.target.classList.add('hovered');
    
}
function dragleave (event) {
    event.target.classList.remove('hovered');
    
}
function dragdrop (event) {
    event.target.append(item);
    event.target.classList.remove('hovered');
    
}
