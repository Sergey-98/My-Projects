`use strict`;

console.log("JS30#1.2-Audio-Player: Предполагаемая оценка - 70 баллов \n Отзыв по пунктам ТЗ: \n Все пункты выполнены полностью!: \n 1. Вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки 'Вперёд' и 'Назад' для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека +5 \n 2. В футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5 \n 3. Есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5 \n 4. Внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5 \n 5. При кликах по кнопкам 'Вперёд' и 'Назад' переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10 \n 6. При смене аудиотрека меняется изображение - обложка аудиотрека +10 \n 7. Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10 \n 8. Отображается продолжительность аудиотрека и его текущее время проигрывания +10 \n 9. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10");

const playlist = {
    0: {
        src: "assets/audio/Wayne.mp3", 
        artist: "Des Rocks",
        title: "Wayne",
        poster: "url(assets/img/Wayne_poster.jpg)",
        backPoster: "assets/img/Wayne_backposter.jpg",
    },
    1: {
        src: "assets/audio/Rodina.mp3", 
        artist: "Анимация",
        title: "Родина",
        poster: "url(assets/img/Rodina_poster.jpg)",
        backPoster: "assets/img/Rodina_backposter.jpg",
    },
    2: {
        src: "assets/audio/sky_in_fair.mp3", 
        artist: "5sta Family",
        title: "Небо в огне",
        poster: "url(assets/img/SkyInFair_poster.jpg)",
        backPoster: "assets/img/SkyInFair_backposter.jpg",
    },
    3: {
        src: "assets/audio/Obitateli_raya.mp3", 
        artist: "Грот",
        title: "Обитатели рая",
        poster: "url(assets/img/Grot_poster.jpg)",
        backPoster: "assets/img/Grot_backposter.jpg",
    },
    4: {
        src: "assets/audio/What_Are_You_Waiting_For.mp3", 
        artist: "Nickelback",
        title: "What are you waiting for",
        poster: "url(assets/img/What_Are_You_Waiting_For_poster.jpg)",
        backPoster: "assets/img/What_Are_You_Waiting_For_backposter.jpg",
    },
    5: {
        src: "assets/audio/Inkvizitor_vsegda_prav.mp3", 
        artist: "DEEP-EX-SENSE",
        title: "Инквизитор всегда прав",
        poster: "url(assets/img/deepexsense_poster.jpg)",
        backPoster: "assets/img/deepexsense_backposter.jpg",
    },
    6: {
        src: "assets/audio/If_Today_Was_Your_Last_Day.mp3", 
        artist: "Nickelback",
        title: "If today was your last day",
        poster: "url(assets/img/if_today_was_your_last_day_poster.jpg)",
        backPoster: "assets/img/if_today_was_your_last_day_poster.jpg",
    },
    7: {
        src: "assets/audio/lullaby.mp3", 
        artist: "Oxxxymiron",
        title: "Колыбельная",
        poster: "url(assets/img/oxy_poster.jpg)",
        backPoster: "assets/img/oxy_backposter.jpg",
    },
}

const audio = document.querySelector('audio');
const page = document.querySelector('.page');
const poster = document.querySelector('.poster');
const play = document.querySelector('.play');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const artist = document.querySelector('.artist');
const songTitle = document.querySelector('.song-title');
const current = document.querySelector('.current');
const duration = document.querySelector('.duration');
const progress = document.querySelector('.progress-song');
const nowSong = document.querySelector('.now-song');
const allSong = document.querySelector('.all-song');
let list = document.querySelector('.list');
const vol = document.querySelector('.volume');
const hamburger = document.querySelector('.hamburger');
const playListPage = document.querySelector('.play-list');
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
//------------
for (let i = 0; i < playlistLength; i++) {
    let li = document.createElement('li');
    li.className = "new-artist";
    li.textContent = `${playlist[i].artist}. (${playlist[i].title})`;
    list.append(li);
}
let newArtist = document.querySelectorAll('.new-artist');
//------------
audio.src = nowSound;
poster.style.backgroundImage = playlist[numberPlay].poster;
page.src = playlist[numberPlay].backPoster;
allSong.textContent = playlistLength;
nowSong.textContent = numberPlay + 1;

function songData(number) {
    audio.src = playlist[number].src;
    artist.textContent = playlist[number].artist;
    songTitle.textContent = playlist[number].title;
    poster.style.backgroundImage = playlist[number].poster;
    page.src = playlist[number].backPoster;
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
        songPoster = playlist[numberPlay].poster;
        background = playlist[numberPlay].backPoster;
        nowSong.textContent = numberPlay + 1;
        
        audio.play();
        activeSong (numberPlay);
        play.style.backgroundImage = 'url(assets/svg/pause.svg)';
        poster.style.backgroundSize = "120%";
        poster.style.backgroundPosition = "center 35%";
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
        poster.style.backgroundSize = "100%";
        clearInterval(Play);
        isPlay = false;
    }
}
function soundAudio() {
    if (isSound) {
        changeVolume = audio.volume;
        audio.volume = 0;
        vol.value = 0;
        mute.style.backgroundImage = 'url(assets/svg/mute.svg)';
        isSound = false;
    } else {
        vol.value = changeVolume;
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
vol.addEventListener('change',() => {
    audio.volume = vol.value;
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

function activeSong (number) {
    newArtist.forEach((elem) => elem.classList.remove('active'));
    // console.log(newArtist[number]);
    newArtist[number].classList.add('active');  
}

newArtist.forEach((art, index) => {
    art.addEventListener('click', (event) => {
        target = event.target;
        if (target.classList.contains('new-artist')) {
            numberPlay = index;
            isPlay = false;
            audio.currentTime = 0;
            progress.value = 0;
            songData(numberPlay);
            playAudio();
            if (hamburger.classList.contains('active') && playListPage.classList.contains('active')) {
                hamburger.classList.remove('active');
                playListPage.classList.remove('active');  
            } else {
                hamburger.classList.add('active');
                playListPage.classList.add('active');  
            }
        }
    });
})
hamburger.addEventListener('click', () => {
    if (hamburger.classList.contains('active') && playListPage.classList.contains('active')) {
        hamburger.classList.remove('active');
        playListPage.classList.remove('active');  
    } else {
        hamburger.classList.add('active');
        playListPage.classList.add('active');  
    }
});
document.addEventListener('keydown', function(event) {
    if (event.code == 'Space') {
        if (isPlay) {
            isPlay = true;
            playAudio();
        } else {
            isPlay = false;
            playAudio();
        }
    }
});
document.addEventListener('keydown', function(event) {
    if (event.code == 'ArrowRight') {
        audio.currentTime += 5;
    }
});
document.addEventListener('keydown', function(event) {
    if (event.code == 'ArrowLeft') {
        audio.currentTime -= 5;
    }
});