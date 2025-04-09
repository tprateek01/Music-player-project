console.log('Welcome to Music$');
let audioElement= new Audio('1.mp3');
//INTIALIZE song index
let index=1;
let playInfo=document.getElementById("playInfo");
let masterPlay=document.getElementById("playbutton");
let myprogress=document.getElementById("myProgress");
let songGIF=document.getElementById('songGIF');
let songItem=Array.from(document.getElementsByClassName("songItem"));
let a=document.getElementsByClassName("songI");
let showVolume=document.querySelector("#show-volume");
let volumeIcon=document.querySelector("#volume-icon");
let currentVolume=document.querySelector("#volume");
let slider=document.querySelector(".volume");

volumeIcon.addEventListener("click",muteSound);
currentVolume.addEventListener("change",changeVolume);
slider.addEventListener("change",changeDuration);
//Indexed the list of song
var song=[
    {songName:"Ishq- Faheem Abdulah,Rauhan Malik" ,filePath:"1.mp3", coverPath:"1.jpg"},
    {songName:"Tu Hain To Mai Hoon - Arijit Singh,Afshana" ,filePath:"2.mp3", coverPath:"2.jpg"},
    {songName:"Raanjhana Ve - Antara Mitra,Soham Naik" ,filePath:"3.mp3", coverPath:"3.jpg"},
    {songName:"Filhaal - B Praak" ,filePath:"4.mp3", coverPath:"4.jpg"},
    {songName:"Tera Zikr - Darshan Raval" ,filePath:"5.mp3", coverPath:"5.jpg"},];

//update songList with songs array
songItem.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src=song[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=song[i].songName;

    
});


masterPlay.addEventListener('click',()=>
{ //to play the song
    if(audioElement.paused|| audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        songGIF.style.opacity=1; //to make the GIF visible while playing


}
//to pause the song
else{
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    songGIF.style.opacity=0;  //to make the GIF invisible while playing

}

})
//seek the progressbar
audioElement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogress.value=progress;

})
// it will allow us to change the song progress time
myprogress.addEventListener('change',()=>{
    audioElement.currentTime=myprogress.value * audioElement.duration/100;
})

    let makeplay=()=>{
    Array.from(document.getElementsByClassName("songI")).forEach((element)=>{
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");})

}

Array.from(document.getElementsByClassName("songI")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target.id);
        makeplay();
         index=parseInt(e.target.id);
         playInfo.innerText=song[index-1].songName;
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        audioElement.src=index+'.mp3';
        audioElement.currentTime=0;
        audioElement.play();
        songGIF.style.opacity=1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
      
        
    })
})
document.getElementById("previous").addEventListener('click',()=>
{   if(index>0){
        index-=1;
        makeplay();
    
    }
    else{
        index=1;
    }
       //this logic to transfer the pause icon to the previous song which will be played
        makeplay();
        audioElement.src=index+'.mp3';
        playInfo.innerText=song[index-1].songName;
        audioElement.currentTime=0;
        audioElement.play();
        let x=document.getElementById(index);
        x.classList.remove("fa-play-circle");
        x.classList.add("fa-pause-circle");
    })
document.getElementById("next").addEventListener('click',()=>
    {   if(index<6){
            index+=1;
            }
        
        else{
            index=1;
        }
            makeplay();
            audioElement.src=index+'.mp3';
            playInfo.innerText=song[index-1].songName;
            audioElement.currentTime=0;
            audioElement.play();
            let x=document.getElementById(index);
            x.classList.remove("fa-play-circle");
            x.classList.add("fa-pause-circle");
            
    })
    function muteSound(){
        audioElement.volume=0;
        showVolume.innerHTML=0;
        currentVolume.value=0;
        volumeIcon.classList.remove("fa-volume-up");
        volumeIcon.classList.add("fa-volume-mute");
    }
   function changeVolume(){
    showVolume.innerHTML=currentVolume.value;
    audioElement.volume=currentVolume.value/100;
    volumeIcon.classList.remove("fa-volume-mute");
    volumeIcon.classList.add("fa-volume-up");
    if (currentVolume.value==0){
        volumeIcon.classList.remove("fa-volume-up");
        volumeIcon.classList.add("fa-volume-mute");

    }

   }
   function changeDuration(){
    let sliderPosition=audioElement.duration*(slider.value/100);
    audioElement.currentTime=sliderPosition;
   

   }


    

