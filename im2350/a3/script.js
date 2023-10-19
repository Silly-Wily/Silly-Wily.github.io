var lastKnownScrollpos = 0;
var canScrollUpdate = true;

// VIDEO SCROLL WHEEL SCRUBBING EFFECT

const video = document.getElementById("bgVideo");
//Making it so that scroll wheel is detected and can produce events on whether you scroll up or down
document.addEventListener("wheel", function(event){
    //lastKnownScrollPos = window.scrollY;
    //if(canScrollUpdate){
      //  window.requestAnimationFrame(function(){
        //    processScroll(lastKnownScrollPos);
          //  canScrollUpdate = true;
        //})
        //canScrollUpdate = false;
   // }

//The code above is when I attempted to try and attach the video to the scrollY position, but found that it didn't work effectively and scrapped it.
//Thought I might as well keep it to showcase the problems that occured and the solutions that were found later.

    

// BACKGROUND VIDEO SCRUBBING EFFECT

console.log(event.deltaY)

//I have the scroll function to be so that when you scroll once, 0.3 seconds of the video plays.
//I have done this so that the user can scroll from the top of the webpage to the bottom and see the entire video play.
//I found out how to do this by using the console.log(event.deltaY). What I found is that when you scroll down you get a posotive number
//and when you scroll up it becomes a negative number. Knowing this I made the code below so that if you number detected is posotive, scrolling down,
//the video will play, then if the number detected is negative, scrolling up, it will rewind.

    if (event.deltaY > 0){
        video.currentTime = video.currentTime + 0.3;
    } else {
        video.currentTime = video.currentTime - 0.3;
    }

    if (video.currentTime < 0.1){
        video.currentTime = video.currentTime + 0.1;
    }
//What I have coded here is so that the video cannot go beyond the start and end of the video itself.
//If someone keeps scrolling up, it will go back 0.1 seconds and the same thing if you keep scrolling down.
    if (video.currentTime > video.length - 0.1){
        video.currentTime = video.length - 0.2;
    }
})

// TEXT FADE IN / OUT TRANSITION EFFECT

//This javascript below is to have the fade in function for the text as you scroll down the page.
//I watched a YouTube video by Beyond Fireship to help me understand the process of how the java script identifies when the text is visible on the
//page and when it isn't, therefore causing the fade in transition effect
//here's the link to the video that assisted me in producing the fade code: https://www.youtube.com/watch?v=T33NN_pPeNI&t=175s
//I've put in notes in this code to showcase that I understand what I am typing in, and also show what I've learnt from watching this video

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    //checking to see if fade class (the text) is detected when it appears on screen
       // console.log(entry)
        if(entry.isIntersecting) {
    //if the fade class is seen run the show class
            entry.target.classList.add('show');
        } else {
    //if the fade class is not in view remove the show class
            entry.target.classList.remove('show');
        }
    });
});

//the code below is used so that the observer understand what it needs to observe, which is all 'fade' elements

const fadeElements = document.querySelectorAll('.fade');
fadeElements.forEach((el) => observer.observe(el));

