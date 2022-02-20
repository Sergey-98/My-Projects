`use strict`;
console.log("JS30#3.3-random-game: Предполагаемая оценка - 70 баллов \n Отзыв по пунктам ТЗ: \n Все пункты выполнены полностью!: \n 1. Вёрстка +10 \n 2. Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам +10 \n 3. Реализовано завершение игры при достижении игровой цели +10 \n 4. По окончанию игры выводится её результат, например, количество ходов, время игры, набранные баллы, выигрыш или поражение и т.д +10 \n 5. Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +10 \n 6. Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10 \n 7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10");

// -------------for player-------------//

const playlist = {
    0: {
        src: "assets/audio/Wayne.mp3", 
        artist: "Des Rocks",
        title: "Wayne",
    },
    1: {
        src: "assets/audio/Rodina.mp3", 
        artist: "Анимация",
        title: "Родина",
    },
    2: {
        src: "assets/audio/sky_in_fair.mp3", 
        artist: "5sta Family",
        title: "Небо в огне",
    },
    3: {
        src: "assets/audio/Obitateli_raya.mp3", 
        artist: "Грот",
        title: "Обитатели рая",
    },
    4: {
        src: "assets/audio/What_Are_You_Waiting_For.mp3", 
        artist: "Nickelback",
        title: "What are you waiting for",
    },
    5: {
        src: "assets/audio/Inkvizitor_vsegda_prav.mp3", 
        artist: "DEEP-EX-SENSE",
        title: "Инквизитор всегда прав",
    },
    6: {
        src: "assets/audio/If_Today_Was_Your_Last_Day.mp3", 
        artist: "Nickelback",
        title: "If today was your last day",
    },
    7: {
        src: "assets/audio/lullaby.mp3", 
        artist: "Oxxxymiron",
        title: "Колыбельная",
    },
}

const audio = document.querySelector('audio');
const play = document.querySelector('.play');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const artist = document.querySelector('.artist');
const songTitle = document.querySelector('.song-title');
const current = document.querySelector('.current');
const duration = document.querySelector('.duration');
const progress = document.querySelector('.progress-song');
const mute = document.querySelector('.vol-mute');

let isPlay = false;
let isSound = true;
let playlistLength = Object.keys(playlist).length;
let numberPlay = 0;
let nowSound = playlist[numberPlay].src;
let artistSong = playlist[numberPlay].artist;
let title = playlist[numberPlay].title;
let songPoster = playlist[numberPlay].poster;
let background = playlist[numberPlay].backPoster;
let audioTime = 0;
let audioLength;
let minutes;
let second;
let seconds;
let changeVolume;

audio.src = nowSound;

function songData(number) {
    audio.src = playlist[number].src;
    artist.textContent = playlist[number].artist;
    songTitle.textContent = playlist[number].title;
}

audio.addEventListener('loadedmetadata', function() {
    audioLength = Math.round(audio.duration);
    let min = Math.floor(audio.duration / 60);
    let sec = Math.floor((audio.duration % 60));
    let secDuration = (sec < 10) ? `0${sec}` : sec;
    duration.textContent = `${Math.floor(audio.duration / 60)}:${Math.floor((audio.duration % 60))}`;
    duration.textContent = `${min}:${secDuration}`;
    progress.max = audioLength;
    artist.textContent = playlist[numberPlay].artist;
    songTitle.textContent = playlist[numberPlay].title;
});

function playAudio() {
    if (!isPlay) {
        nowSound = playlist[numberPlay].src;
        artistSong = playlist[numberPlay].artist;
        title = playlist[numberPlay].title;
        
        audio.play();
        play.style.backgroundImage = 'url(assets/svg/pause.svg)';
        isPlay = true;
        Play = setInterval(function() {
            audioTime = Math.round(audio.currentTime);
            audioLength = Math.round(audio.duration);
            minutes = Math.floor(audio.currentTime / 60);
            second = Math.floor((audio.currentTime % 60));
            seconds = (second < 10) ? `0${second}` : second;
            progress.value = audio.currentTime;
            current.textContent = `${minutes}:${seconds}`;
            if (audioTime == audioLength) {
                playNext();
            }
        }, 1000);
        
    } else {
        audio.pause();
        play.style.backgroundImage = 'url(assets/svg/play.svg)';
        clearInterval(Play);
        isPlay = false;
    }
}

function soundAudio() {
    if (isSound) {
        changeVolume = audio.volume;
        audio.volume = 0;
        mute.style.backgroundImage = 'url(assets/svg/mute.svg)';
        isSound = false;
    } else {
        audio.volume = changeVolume;
        mute.style.backgroundImage = 'url(assets/svg/unmute.svg)';
        isSound = true;
    }
}
function changeCurTime() {
    audio.currentTime = progress.value;
    minutes = Math.floor(audio.currentTime / 60);
    second = Math.floor((audio.currentTime % 60));
    seconds = (second < 10) ? `0${second}` : second;
    current.textContent = `${minutes}:${seconds}`;
}
progress.addEventListener('change',() => {
    changeCurTime();
})
mute.addEventListener('click',() => {
    soundAudio()
})
function playNext() {
    if (numberPlay >= playlistLength-1) {
        numberPlay = 0;    
    }
    else {
        numberPlay += 1;
    }
    isPlay = false;
    audio.currentTime = 0;
    progress.value = 0;
    songData(numberPlay);
    playAudio();
}

function playPrev() {
    if (numberPlay == 0) {
        numberPlay = playlistLength-1;
    }
    else {
        numberPlay -= 1;
    }
    isPlay = false;
    audio.currentTime = 0;
    progress.value = 0;
    songData(numberPlay);
    playAudio();
}

play.addEventListener('click', (event) => {
    target = event.target;
    if (target.classList.contains('play')) {
        playAudio();
    }
});

next.addEventListener('click', (event) => {
    target = event.target;
    if (target.classList.contains('next')) {
        playNext();
    }
});

prev.addEventListener('click', (event) => {
    target = event.target;
    if (target.classList.contains('prev')) {
        playPrev();
    }
});

// -------------- for game -----------//

let score = 0;

const playConfig = {
    step: 0,
    mStep: 10,
    sizeCell: 16,
    sizePoint: 16 / 3,
}

const snake = {
    x: 16,
    y: 16,
    dx: playConfig.sizeCell,
    dy: 0,
    otherPoint: [],
    maxPoint: 3,
}

const points = {
    x: 0,
    y: 0
}

let canvas = document.querySelector('#canvas');
let context = canvas.getContext("2d");
let block = document.querySelector('.count');
let modal = document.querySelector('.modal');
let restart = document.querySelector('.restart');
let field = document.querySelector('.field');
let modalScore = document.querySelector('.modal-score');
let indexScore = document.querySelectorAll('.score-index');
let resultScore = document.querySelectorAll('.score-res');
let dateScore = document.querySelectorAll('.score-date');
let clear = document.querySelector('.clear');
let level = document.querySelector('.level')
let fieldArr = ['url(assets/svg/field-1.svg)', 'url(assets/svg/field-2.svg)','url(assets/svg/field-3.svg)', 'url(assets/svg/field-4.svg)', 'url(assets/svg/field-5.svg)'];
let scoreArr = [];
let dateArr = [];
draw();

function game() {
    requestAnimationFrame(game);
    if (++playConfig.step < playConfig.mStep) {
        return;
    }
    if (modal.classList.contains('active')) {
       return (window.cancelAnimationFrame(game));
    }
    playConfig.step = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    pointDraw();
    snakeDraw();
}

requestAnimationFrame(game);

function snakeDraw() {
    snake.x += snake.dx;
    snake.y += snake.dy;

    border();

    snake.otherPoint.unshift(
        {
            x: snake.x, 
            y: snake.y
        });

    if (snake.otherPoint.length > snake.maxPoint) {
        snake.otherPoint.pop();
    }

    snake.otherPoint.forEach((elem, index) => {
        if (index == 0) {
            context.fillStyle = "#0f4900";
        }
        else {
            context.fillStyle = "#24b400";
        }
        context.fillRect(elem.x, elem.y, playConfig.sizeCell, playConfig.sizeCell);
        
        if (elem.x === points.x && elem.y == points.y) {
            snake.maxPoint += 0.5;
            countScore();
            positionPoints();
        }

        for (let i = index + 1; i < snake.otherPoint.length; i++) {
            if (elem.x == snake.otherPoint[i].x && elem.y == snake.otherPoint[i].y) {
                stopGame();
            }
        }
    });
}

function border() {
    if (snake.x < 0) {
		snake.x = canvas.width - playConfig.sizeCell;
	} else if ( snake.x >= canvas.width ) {
		snake.x = 0;
	}

	if (snake.y < 0) {
		snake.y = canvas.height - playConfig.sizeCell;
	} else if ( snake.y >= canvas.height ) {
		snake.y = 0;
	}
}

function stopGame() {
    showModal();
}

function pointDraw() {
    context.beginPath();
	context.fillStyle = "#000000";
	context.arc( points.x + (playConfig.sizeCell / 2 ), points.y + (playConfig.sizeCell / 2 ), playConfig.sizePoint, 0, 2 * Math.PI );
	context.fill();
}

function positionPoints() {
    points.x = randomPoints(0, canvas.width / playConfig.sizeCell) * playConfig.sizeCell;
    points.y = randomPoints(0, canvas.height / playConfig.sizeCell) * playConfig.sizeCell;
}

function countScore() {
    score += 1;
    draw();
}

function draw() {
    block.innerHTML = score;
}

function randomPoints (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function restartGame () {
    score = 0;
    draw();
    field.style.backgroundImage = `${fieldArr[randomPoints (0, fieldArr.length)]}`;
    snake.x = 16;
    snake.y = 16;
    snake.dx = playConfig.sizeCell;
    snake.dy =  0;
    snake.otherPoint =  [];
    snake.maxPoint = 3;

    positionPoints();
    closeModal();
}

function showModal() {
    modal.classList.add('active');
    modalScore.textContent = `Your score ${score} points`;
    scoreArr.push(score);
    let date = new Date();
    dateArr.push(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
    playEnd();
    dataScore();
    refreshTable(scoreArr, dateArr);
}

function closeModal() {
    modal.classList.remove('active');
}

restart.addEventListener('click', (ev) => {
    let event = ev.target;
    if (event.classList.contains('restart')) {
        restartGame();
    }
});

clear.addEventListener('click', (ev) => {
    let event = ev.target;
    if (event.classList.contains('clear')) {
        scoreArr = [];
        dateArr = [];
        clearStorage();
        refreshTable(scoreArr, dateArr);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.code == "ArrowUp") {
        snake.dy = -playConfig.sizeCell;
        snake.dx = 0;
    }
    else if (event.code == "ArrowLeft") {
        snake.dx = -playConfig.sizeCell;
        snake.dy = 0;
    }
    else if (event.code == "ArrowDown") {
        snake.dy = playConfig.sizeCell;
        snake.dx = 0;
    }
    else if (event.code == "ArrowRight") {
        snake.dx = playConfig.sizeCell;
        snake.dy = 0;
    }
});

window.addEventListener('load', getLocalStorage);

function dataScore() {
    if (scoreArr.length > 10) {
        scoreArr.shift();
        dateArr.shift();
    }
    setLocalStorage('records', JSON.stringify(scoreArr));
    setLocalStorage('date', JSON.stringify(dateArr));
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function refreshTable(result, date) {
    if (result.length == 0) {
        for (let i = 0; i < 10; i++) {
            indexScore[i].textContent = `-`;
            resultScore[i].textContent = `-`;
            dateScore[i].textContent = `-`;
        }
    }
    for (let i = 0; i < result.length; i++) {
        indexScore[i].textContent = `${i+1}`;
        if (result[i] == undefined) {
            resultScore.textContent = `-`;
        } else {
            resultScore[i].textContent = `${result[i]}`;
        }
        dateScore[i].textContent = `${date[i]}`;
    }
}  

function getLocalStorage() {
    if(localStorage.getItem('records')) {
        const rec = JSON.parse(localStorage.getItem('records'));
        const dat = JSON.parse(localStorage.getItem('date'));
        scoreArr = rec;
        dateArr = dat;
        refreshTable(scoreArr, dateArr);
    }
}
  
  function clearStorage() {
    localStorage.clear();
  }

    level.addEventListener('change', (ev) => {
        let event = ev.target;
        console.log(event.value);

        switch (event.value) {
            case 'Easy':
                playConfig.mStep = 15;
                break;
            case 'Medium':
                playConfig.mStep = 10;
                break;
            case 'Hard':
                playConfig.mStep = 8;
                break;
            case 'Professional':
                playConfig.mStep = 6;
                break;
            case 'King Of Snake':
                playConfig.mStep = 4;
                break;
          }
          level.blur();
    });

    //-------Sound for end Game--------//

  const endAudio = new Audio();

 function playEnd() {
    endAudio.src = 'assets/audio/game-lost.mp3';
    if (isSound) {
        changeVolume = audio.volume;
        audio.volume = 0;
        mute.style.backgroundImage = 'url(assets/svg/mute.svg)';
        isSound = false;
    }
    endAudio.volume = 0.8;
    endAudio.play();
  }