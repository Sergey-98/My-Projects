`use strict`;

const playlist = {
    0: {
        src: "assets/audio/beyonce.mp3", 
        artist: "Beyonce",
        title: "Don't Hurt Yourself",
        poster: "url(assets/img/lemonade.png)",
        backPoster: "assets/img/lemonade.png",
    },
    1: {
        src: "assets/audio/dontstartnow.mp3", 
        artist: "Dua LIpa",
        title: "Don't Start Now",
        poster: "url(assets/img/dontstartnow.png)",
        backPoster: "assets/img/dontstartnow.png",
    }
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


let isPlay = false;
let playlistLength = Object.keys(playlist).length;
let numberPlay = 0;
let nowSound = playlist[numberPlay].src;
let artistSong = playlist[numberPlay].artist;
let title = playlist[numberPlay].title;
let songPoster = playlist[numberPlay].poster;
let background = playlist[numberPlay].backPoster;

let audioTime = 0;
let audioLength;

audio.src = nowSound;
audio.currentTime = progress.value;


function songData(number) {
    audio.src = playlist[number].src;
    artist.textContent = playlist[number].artist;
    songTitle.textContent = playlist[number].title;
    poster.style.backgroundImage = playlist[number].poster;
    page.src = playlist[number].backPoster;
}
// function songData(music, artistSound, TitleSound, PosterSong) {
//     audio.src = music;
//     artist.textContent = artistSound;
//     songTitle.textContent = TitleSound;
//     poster.style.backgroundImage = PosterSong;
//     page.src = background;
// }
audio.addEventListener('loadedmetadata', function() {
    audioLength = Math.round(audio.duration);
    duration.textContent = `${Math.floor(audio.duration / 60)}:${Math.floor((audio.duration % 60))}`;
    progress.max = audioLength;
});
function playAudio() {
    if (!isPlay) {
        // audio.currentTime = progress.value;
        console.log('current', audio.currentTime);
        // audio.currentTime = audio.currentTime;
        nowSound = playlist[numberPlay].src;
        artistSong = playlist[numberPlay].artist;
        title = playlist[numberPlay].title;
        songPoster = playlist[numberPlay].poster;
        background = playlist[numberPlay].backPoster
        
        audio.play();
        play.style.backgroundImage = 'url(assets/img/pause.png)';
        poster.style.backgroundSize = "120%";
        poster.style.backgroundPosition = "center 35%";
        isPlay = true;
        Play = setInterval(function() {
            console.log(audio.currentTime);
            audioTime = Math.round(audio.currentTime);
            audioLength = Math.round(audio.duration);
            let minutes = Math.floor(audio.currentTime / 60);
            let second = Math.floor((audio.currentTime % 60));
            let seconds = (second < 10) ? `0${second}` : second;
            progress.value = (audioTime * 100) / audioLength;
            current.textContent = `${minutes}:${seconds}`;
            if (audioTime == audioLength) {
                playNext();
            }
        }, 300);
    } else {
        audio.pause();
        play.style.backgroundImage = 'url(assets/img/play.png)';
        poster.style.backgroundSize = "100%";
        clearInterval(Play);
        isPlay = false;
    }
}
progress.addEventListener('change',() => {
    console.log(progress.value, audioLength, audio.currentTime);
    audio.currentTime = progress.value;
})
function playNext() {
    console.log(numberPlay);
    if (numberPlay >= playlistLength-1) {
        numberPlay = 0;
    }
    else {
        numberPlay += 1;
    }
    isPlay = false;
    console.log(nowSound, artistSong, title);
    audio.currentTime = 0;
    progress.value = 0;
    songData(numberPlay);
    // songData(nowSound, artistSong, title, songPoster);
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
    console.log(nowSound, artistSong, title);
    audio.currentTime = 0;
    progress.value = 0;
    songData(numberPlay);
    // songData(nowSound, artistSong, title, songPoster);
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