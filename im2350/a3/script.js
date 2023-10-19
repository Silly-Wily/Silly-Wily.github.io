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

//When thinking of an idea, I thought it would be interesting to have an animated background that is always present as you scroll down a webpage. I saw that Apple products have 
//their own webpage that has some sections of animated images, which I thought was exactly what I wanted to try and recreate. There were many ways in creating the animated background,
//one being having multiple images of each frame, whereas you scroll a new image will appear, or have it so that a video is scrubbing through as you are scrolling down the webpage.
//The latter is what I decided on, as I felt that it would be easier to accomplish and with the assistance of my teacher it was achievable.
//It would be awesome to implement this concept on other projects where the background feels as if it is interacting with the webpage more, instead of just being a separate element.

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

//The text fade in effect was just another element I wanted to add to be a part of the scroll function. I wanted to have an animation so that the webpage doesn't look as stiff and so that
//the background isn't the only thing that is moving. I therefore looked on how to create a simple fade in transition and further added a blur effect, so that the animation feels more seamless.
//I wanted to keep it simple, and I am satisfied with how it turned out.

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

// DIFFICULTIES

//I thought I might as well add what was difficult about this project, even though it's on the webpage, I thought I might as well have the text in the code as well, just in case.
//There were quite a few difficulties when putting together this webpage that I thought I might as well talk about. I found it difficult initially to figure out how I wanted the video to play as you scroll up and down the webpage.
//I started off with thinking I could use the Y position of the webpage to play and rewind, but I found that it wasn't working as I wanted it to. I was then told that I can just have the webpage detect the scroll wheel itself,
//so that even if you reach the top or bottom of the webpage, if the video hasn't ended or isn't at the beginning, you can continue playing the video by scrolling.
//There were some other elements that I expressed in my presentation that I found were unnecessary now. One of them being to have the text in more random positions on the x axis, I found that when the text was all centred, 
//it looked a lot nicer than the thought of having them all over the place. I also had the idea of coding in a scroll speed limiterso that there won't be any issues if the user tries to scroll really fast down the webpage. 
//But what I found was that even if you scroll really fast down the webpage the code can keep up to it and doesn't break, therefore I found the needfor the scroll speed limiter was unnecessary. Another element I wanted to add was to have
//additional information appear when you hover on text. I felt that this doesn't keep with the scroll function that I am wanting to highlight and decided against implementing it into the webpage.


