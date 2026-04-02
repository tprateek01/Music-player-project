let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById("playbutton");
let myProgress = document.getElementById("myProgress");
let songGIF = document.getElementById('songGIF');
let playInfo = document.getElementById("playInfo");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let currentVolume = document.querySelector("#volume");
let volumeIcon = document.querySelector("#volume-icon");
let showVolume = document.querySelector("#show-volume");

let songs = [
    {songName: "Ishq - Faheem Abdullah", filePath: "1.mp3", coverPath: "1.jpg"},
    {songName: "Tu Hain To Mai Hoon", filePath: "2.mp3", coverPath: "2.jpg"},
    {songName: "Raanjhana Ve", filePath: "3.mp3", coverPath: "3.jpg"},
    {songName: "Filhaal - B Praak", filePath: "4.mp3", coverPath: "4.jpg"},
    {songName: "Tera Zikr - Darshan Raval", filePath: "5.mp3", coverPath: "5.jpg"},
];

const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
};

const syncUI = () => {
    if (audioElement.paused) {
        masterPlay.classList.replace("fa-circle-pause", "fa-circle-play");
        songGIF.style.opacity = 0;
        Array.from(document.getElementsByClassName('songI')).forEach(el => el.classList.replace("fa-circle-pause", "fa-circle-play"));
    } else {
        masterPlay.classList.replace("fa-circle-play", "fa-circle-pause");
        songGIF.style.opacity = 1;
        Array.from(document.getElementsByClassName('songI')).forEach(el => el.classList.replace("fa-circle-pause", "fa-circle-play"));
        let currentIcon = document.getElementById(`${songIndex}`);
        if(currentIcon) currentIcon.classList.replace("fa-circle-play", "fa-circle-pause");
        playInfo.innerText = `${songs[songIndex].songName}`;
    }
};

// Initialization
songs.forEach((element, i) => {
    if(songItems[i]) {
        songItems[i].getElementsByTagName("img")[0].src = songs[i].coverPath;
        songItems[i].getElementsByClassName("songName")[0].innerText = songs[i].songName;
        let tAudio = new Audio(songs[i].filePath);
        tAudio.addEventListener('loadedmetadata', () => {
            songItems[i].querySelector(".duration-display").innerText = formatTime(tAudio.duration);
        });
    }
});

// Initial Volume (Sync with Seekbar/LocalStorage)
const savedVol = localStorage.getItem('musicVol') || 100;
audioElement.volume = savedVol / 100;
currentVolume.value = savedVol;
showVolume.innerText = savedVol;

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        if(!audioElement.src) audioElement.src = songs[songIndex].filePath;
        audioElement.play();
    } else {
        audioElement.pause();
    }
    syncUI();
});

Array.from(document.getElementsByClassName("songI")).forEach((element) => {
    element.addEventListener('click', (e) => {
        let clickedId = parseInt(e.target.id);
        if(songIndex === clickedId && !audioElement.paused) {
            audioElement.pause();
        } else {
            songIndex = clickedId;
            audioElement.src = songs[songIndex].filePath;
            audioElement.play();
        }
        syncUI();
    });
});

document.getElementById("next").addEventListener('click', () => {
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    syncUI();
});

document.getElementById("previous").addEventListener('click', () => {
    songIndex = (songIndex <= 0) ? songs.length - 1 : songIndex - 1;
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    syncUI();
});

audioElement.addEventListener('timeupdate', () => {
    myProgress.value = parseInt((audioElement.currentTime / audioElement.duration) * 100) || 0;
    if(!audioElement.paused) {
        playInfo.innerText = `${songs[songIndex].songName} (${formatTime(audioElement.currentTime)} / ${formatTime(audioElement.duration)})`;
    }
});

myProgress.addEventListener('input', () => {
    audioElement.currentTime = (myProgress.value * audioElement.duration) / 100;
});

currentVolume.addEventListener('input', (e) => {
    let vol = e.target.value;
    audioElement.volume = vol / 100;
    showVolume.innerText = vol;
    localStorage.setItem('musicVol', vol);
    volumeIcon.className = vol == 0 ? "fas fa-volume-mute" : "fas fa-volume-up";
});

document.getElementById('theme-toggle').addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
});

document.getElementById('searchBar').addEventListener('input', (e) => {
    let q = e.target.value.toLowerCase();
    songItems.forEach((item, i) => {
        if(songs[i]) item.style.display = songs[i].songName.toLowerCase().includes(q) ? "flex" : "none";
    });
});

audioElement.addEventListener('ended', () => document.getElementById("next").click());