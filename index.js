class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-audio");
    this.snareAdio = document.querySelector(".snare-audio");
    this.hihatAudio = document.querySelector(".hihat-audio");
    this.playBtn = document.querySelector(".play");
    this.selects = document.querySelectorAll("select");
    this.mute = document.querySelectorAll(".mute")
    this.index = 0;
    this.bpm = 300;
    this.isPlay=null
  }
  activepad() {
    this.classList.toggle("active");
    
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      if(bar.classList.contains("active")){
      if(bar.classList.contains("kick-pad")){
        this.kickAudio.currentTime=0
        this.kickAudio.play();
       
      }
      if(bar.classList.contains("snare-pad")){
        this.snareAdio.currentTime=0
        this.snareAdio.play();
      }
      if(bar.classList.contains("hihat-pad")){
        this.hihatAudio.currentTime=0
        this.hihatAudio.play();
      }
    }
    else{}
    
    });

    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
   if(!this.isPlay){
    this.playBtn.innerText="STOP"
     this.isPlay= setInterval(() => {
        this.repeat();
      }, interval);
    }
    else{
      clearInterval(this.isPlay)
      this.isPlay=null
      this.playBtn.innerText="PLAY"
    }
  }

audioSelct(e){
 if(e.target.id==="snare-select select")this.snareAdio.src=e.target.value
 if(e.target.id==="kick-select select")this.kickAudio.src=e.target.value
 if(e.target.id==="hihat-select select")this.hihatAudio.src=e.target.value
}


muteAudio(e){
  const index=e.target.getAttribute("data-track")
  if(index==0){
    e.target.classList.toggle("active")
    this.kickAudio.volume=0
    if(!e.target.classList.contains("active")){
      this.kickAudio.volume=1
    }
  }
  if(index==1)
  {  
  e.target.classList.toggle("active")
  this.snareAdio.volume=0
  if(!e.target.classList.contains("active")){
    this.snareAdio.volume=1
  }
  }
  if(index==2)
  {
    e.target.classList.toggle("active")
    this.hihatAudio.volume=0
    if(!e.target.classList.contains("active")){
      this.hihatAudio.volume=1
    }
  }
  
}
toggling(){
 const allPlads= document.querySelectorAll(".pad")
 allPlads.forEach(pad=>{
  pad.classList.toggle("active");
    pad.style.color="white"
    pad.innerText=""
  });
}
addingText(name){
  const allPlads= document.querySelectorAll(".pad")
  allPlads.forEach(pad=>{
    if(pad.classList.contains("active")){
      pad.style.color="white"
       pad.innerText=name
    }
    });
  
}
}
const drumKit = new DrumKit();
drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activepad);
  pad.addEventListener("animationend",function(){
    this.style.animation=""
  })
});

drumKit.playBtn.addEventListener("click", () => {
  drumKit.start();
});
drumKit.selects.forEach(select=>{
  select.addEventListener("change",(e)=>{
    drumKit.audioSelct(e)
  })
 
})
drumKit.mute.forEach(mute=>{
 mute.addEventListener("click",function(e){
  drumKit.muteAudio(e);
 })
 
})
drumKit.playBtn.style="font-weight:bold;"



document.querySelector(".toggling").addEventListener("click",function(){
  drumKit.toggling()
})
 
document.querySelector(".inputs").addEventListener("input",function(e){
 drumKit.addingText(e.target.value)
})
 