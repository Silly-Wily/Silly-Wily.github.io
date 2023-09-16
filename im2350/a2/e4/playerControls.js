/* DEFINITIONS & SETUP */

// this is the video itself
let videoElement = document.getElementById("videoElement");
// the buttons for the controls
let playButton = document.getElementById("playButton");
let stopButton = document.getElementById("stopButton");
let muteButton = document.getElementById("muteButton");
let unmuteButton = document.getElementById("unmuteButton");
let fullScreenButton = document.getElementById("fullScreenButton");
// the progress element
let progressBar = document.getElementById("progressBar");

videoElement.removeAttribute("controls");

document.getElementById("controlsWrapper").style.display = "flex";

videoElement.addEventListener('loadedmetadata', () => {
  progressBar.setAttribute('max', videoElement.duration);
});

videoElement.addEventListener("playing", () => {

  if (!progressBar.getAttribute('max')){
    progressBar.setAttribute('max', videoElement.duration);
  }
});

/* LOADING */

videoElement.addEventListener("waiting", () => {
  progressBar.classList.add("timeline-loading");
});
videoElement.addEventListener("canplay", () => {
  progressBar.classList.remove("timeline-loading");
});

/* MEDIA FINSIHED */

// when the media finishes we want to make sure that play icon switches back over from pause to indicate that the user can restart playback
videoElement.addEventListener("ended", () => {
  playButton.style.backgroundImage = "url('./icons/play.svg')";
});

/* PLAY/PAUSE */

function playPause(){

  if (videoElement.paused || videoElement.ended) {
    // if it isn't already playing make it play
    videoElement.play();
    // then make sure the icon on the button changes to pause indicating what it does if you click it
    playButton.style.backgroundImage = "url('./icons/pause.svg')";
    document.getElementById("videoPlayOverlay").style.display = "none";
  } else {
    // if it is already playing make it pause
    videoElement.pause();
    // then make sure the icon on the button changes to play indicating what it does if you click it
    playButton.style.backgroundImage = "url('./icons/play.svg')";
    document.getElementById("videoPlayOverlay").style.display = "block";
  }
}

playButton.addEventListener('click', playPause);

videoElement.addEventListener('click', playPause);

/* MUTE/UNMUTE */

/* I want to adjust audio to be off and on
  Signifier: I want to click a button
  Affordance: I want to toggle between mute and unmute
  Feedback: I want to update the button logo to describe the current state
  this is my function to toggle between mute and unmute */

function muteUnmute(){
  // check if working
  // console.log("mute/unmute is working");
  // check if audio is muted
  if(videoElement.muted){
    // if audio is true set to false
    videoElement.muted = false;
    // change icon to mute
    muteButton.style.backgroundImage = "url('./icons/mute.svg')";

  } else {
    // if audio is false set to true
    videoElement.muted = true;
    // change the icon to unmute
    muteButton.style.backgroundImage = "url('./icons/unmute.svg')";
  }

}

muteButton.addEventListener('click', muteUnmute);

/* FULLSCREEN/UNFULLSCREEN */

/* I want to adjust the size of the video to be fullscreen or not fullscreen
  Signifier: I want to click a button
  Affordance: I want to toggle between fullscreen and no fullscreen
  Feedback: I want to update the screen to fully display the video being viewed
  and to press 'ESCAPE' to get back to the default screen */
function fullUnFull() {
  
if(videoElement.requestFullscreen) {
  videoElement.requestFullscreen();
}
}

fullScreenButton.addEventListener('click', fullUnFull);

/* TIMELINE */

videoElement.addEventListener('timeupdate', () => {
  progressBar.value = videoElement.currentTime;
});


function scrubToTime(e){

  let x = e.clientX - (progressBar.getBoundingClientRect().left + window.scrollX);
  videoElement.currentTime = clampZeroOne(x / progressBar.offsetWidth) * videoElement.duration;
}

progressBar.addEventListener('mousedown', scrubToTime);
progressBar.addEventListener('mousedown', (e) => {
  window.addEventListener('mousemove', scrubToTime);
  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', scrubToTime);
  });
});




/* HELPER FUNCTIONS */

function clampZeroOne(input){
  return Math.min(Math.max(input, 0), 1);
}

function logEvent(e){
  console.log(e);
}

