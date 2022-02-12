`use strict`;

console.log("JS30#2.2-Image-gallery: Предполагаемая оценка - 70 баллов \n Отзыв по пунктам ТЗ: \n Все пункты выполнены полностью!: \n 1. Вёрстка +10  \n 2. При загрузке приложения на странице отображаются полученные от API изображения +10 \n 3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10 \n 4. Поиск +30 \n 5. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10 (press photo)");

let answer = 'cars';
let photos = document.querySelector('.photos');
let input = document.querySelector('.input');

let search = document.querySelector('.search-icon');
let close = document.querySelector('.close-icon');
let modal = document.querySelector('.modal');
let modalClose = document.querySelector('.close-modal');
let modalNext = document.querySelector('.next-img');
let modalPrev = document.querySelector('.prev-img');
let examples = document.querySelectorAll('.list');

let url = `https://api.unsplash.com/search/photos?query=${answer}&per_page=30&orientation=landscape&client_id=ZIxUxmKGbJefxBnAVjQsolTyN3WS_QbRY4pTKe1rQKw`;
let num;
getData();
setFocus();

async function getData() {
    try {
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            ShowData(data, res);
        } else if (res.status == 403) {
            console.log('403 - Too many request');
        } else {
            console.log('Статус запроса: ' + res.status);
        }
        
    }
    catch(err) {
        console.log(`Ошибка: ${err}`);
    }
     
}

function ShowData(data, res) {
    deleteElements ();
    console.log('Статус запроса: ' + res.status);
    let result = data.results;
    if (res.status == 403) {
        console.log('403 - Too many request');
    }
    if (result.length == 0) {
        alert('Указанных данных в API не существует');
    }
    for (let i = 0; i < result.length; i++) {
        const img = document.createElement('img');
        img.classList.add('gallery-img')
        img.src = `${result[i].urls.regular}`;
        img.alt = `image`;
        photos.append(img);
    }
    findModal(result);
    nextPhoto(result);
    prevPhoto(result);
}

function findModal(result) {
    let galleryImg = document.querySelectorAll('.gallery-img');
    galleryImg.forEach((elem, index) => {
    elem.addEventListener('click', () => {
        num = index;
        showModal()
        modal.style.backgroundImage = `url('${result[index].urls.regular}')`;
    });
});
}
function nextPhoto(result) {
    modalNext.addEventListener('click', () => {
        if (num >= result.length-1) {
            num = 0;
        } else {
            num += 1;
        }
        modal.style.backgroundImage = `url('${result[num].urls.regular}')`;
    })
}
function prevPhoto(result) {
    modalPrev.addEventListener('click', () => {
        if (num == 0) {
            num = result.length-1;
        } else {
            num -= 1;
        }
        modal.style.backgroundImage = `url('${result[num].urls.regular}')`;
    })
}

function showModal() {
    modal.classList.add('active');
    photos.classList.add('active');
    modalClose.classList.add('active');
    modalNext.classList.add('active');
    modalPrev.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
    photos.classList.remove('active');
    modalClose.classList.remove('active');
    modalNext.classList.remove('active');
    modalPrev.classList.remove('active');
}

function deleteElements () {
    photos.innerHTML = '';
}
function setFocus() {
    input.focus();
}

document.addEventListener('keydown', function(event) {
    if (event.code == 'Enter') {
        answer = (input.value.length == 0) ? answer : input.value;
        url = `https://api.unsplash.com/search/photos?query=${answer}&per_page=30&orientation=landscape&client_id=ZIxUxmKGbJefxBnAVjQsolTyN3WS_QbRY4pTKe1rQKw`;
        getData();
    }
});
search.addEventListener('click', function(event) {
    if (event.target.classList.contains('search-icon')) {
        answer = (input.value.length == 0) ? answer : input.value;
        url = `https://api.unsplash.com/search/photos?query=${answer}&per_page=30&orientation=landscape&client_id=ZIxUxmKGbJefxBnAVjQsolTyN3WS_QbRY4pTKe1rQKw`;
        getData();
    }
});
input.addEventListener('input', () => {
    if (input.value.length > 0) {
        close.classList.remove('hide');
    } else if (input.value.length == 0) {
        close.classList.add('hide');
    }
});

close.addEventListener('click', function(event) {
    if (event.target.classList.contains('close-icon')) {
        input.value = '';
        input.placeholder = "Search";
        close.classList.add('hide');
    }
});
modalClose.addEventListener('click', function(event) {
    if (event.target.classList.contains('close-modal')) {
        closeModal();
    }
});

examples.forEach((elem => {
    elem.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('list')) {
        let ex_url = target.dataset.examples;
        url = `https://api.unsplash.com/search/photos?query=${ex_url}&per_page=30&orientation=landscape&client_id=ZIxUxmKGbJefxBnAVjQsolTyN3WS_QbRY4pTKe1rQKw`;
        getData();
    }
    })
}));

