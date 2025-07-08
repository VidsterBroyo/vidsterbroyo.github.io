console.log("%cpls don't hack me", "color: lime; font-size: 20px; background: black; padding: 4px; border: 1px solid lime;");
console.log("this site is held together solely by hopes and dreams")
/* WHY ARE YOU HERE DID YOU NOT HEED MY REQUEST ??? */



let marquee1, marquee2;
let aboutMe = `Vidu Widyalankara is an incoming UWaterloo CS student who is beyond passionate about Computer Science.
              Since finding out Computer Science was a thing in grade 4, Vidu has been enamored by the discipline. 
              He is proficient in Python, Javascript, HTML/CSS, Java, and has experience using C++. 
              Vidu keeps himself busy throughout highschool by immersing himself in extracurriculars related to
              Computer Science, allowing him to continue expanding his knowledge in the discipline. He believes 
              that his greatest strength is his dedication and attention to detail of his work. In his free time, Vidu bikes, plays chess, and does puzzles.`
let aboutMeIndex = 0
let scroll = true
let generateInterval
let sparkle = document.getElementById("sparkle");
let backgrounds = [["assets/img/bgs/cobblestone.png", "100px"],  ["assets/img/bgs/bricks.webp", "200px"],  ["assets/img/bgs/018prp.gif", "100px"]]
let bgIndex = 0


document.addEventListener("visibilitychange", (event) => {
  if (document.visibilityState != "visible") {
    document.title = "get back in here"
    document.getElementById("favicon").href = "assets/img/angryFavicon.svg?v=2"
  } else {
    document.title = "Vidu Widyalankara"
    document.getElementById("favicon").href = "assets/img/favicon.png?v=2"
  }
});

let animationPlaying = false;


function triggerAnimation() {
  let nameContainer = document.getElementById("nameContainer")

  if (animationPlaying) {
    return
  }

  animationPlaying = true;


  document.querySelectorAll("#name span").forEach((span, i) =>
    span.style.animation = `nameBounce 0.4s ease-in-out ${i * 0.1}s`
  )
  sparkle.play();


  setTimeout(() => {
    animationPlaying = false

    // empty animation so it can replay later
    document.querySelectorAll("#name span").forEach((span) => {
      span.style.animation = "";
    }
    )

    void nameContainer.offsetWidth; // force a reflow


    // if user still hovering, repeat animation 
    if (nameContainer.matches(":hover")) {
      triggerAnimation()
    }

  }
    , 1900)


}


function pauseScroll() {
  scroll = false
}

function resumeScroll() {
  scroll = true;
}



function move() {
  if (scroll) {
    marquee1.style.left = (marquee1.offsetLeft - 4) + "px"
    marquee2.style.left = (marquee2.offsetLeft - 4) + "px"

    if (marquee1.offsetLeft < -(marquee1.offsetWidth)) {
      marquee1.style.left = marquee2.offsetWidth + "px"
    }
    if (marquee2.offsetLeft < -(marquee2.offsetWidth)) {
      marquee2.style.left = marquee1.offsetWidth + "px"
    }
  }
}


function checkVisibility() {
  if (document.getElementById("gptDiv").getBoundingClientRect().top < window.innerHeight - 100) {
    startGenerating()
    window.removeEventListener('scroll', checkVisibility)
  }
}


function generate() {
  text = document.getElementById("answer").innerHTML
  document.getElementById("answer").innerHTML = text.slice(0, text.length - 2) + aboutMe.charAt(aboutMeIndex) + " ●"

  if (aboutMeIndex == aboutMe.length) {
    clearInterval(generateInterval)
    document.getElementById("answer").innerHTML = text.slice(0, text.length - 1)
  }

  aboutMeIndex++;
}


function startGenerating() {
  i = 0
  generateInterval = setInterval(generate, 15)
}



let currentElement;

function dragMouseDown(e) {
  e = e || window.event;
  e.preventDefault();

  currentElement = this

  // get the mouse cursor position at startup:
  pos3 = e.clientX;
  pos4 = e.clientY;
  document.onmouseup = closeDragElement;

  // call a function whenever the cursor moves:
  document.onmousemove = elementDrag;
}

var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;


function elementDrag(e) {
  e = e || window.event;
  e.preventDefault();

  // calculate the new cursor position:
  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;

  // set the element's new position:

  currentElement.style.removeProperty('bottom');

  currentElement.style.top = (currentElement.offsetTop - pos2) + "px";
  if ((currentElement.offsetLeft - pos1) < window.innerWidth - currentElement.width - 13) {
    currentElement.style.left = (currentElement.offsetLeft - pos1) + "px";
  }
}

function closeDragElement() {
  // stop moving when mouse button is released:
  document.onmouseup = null;
  document.onmousemove = null;
}



function setup() {
  star = document.getElementById("star1")
  star.addEventListener("mousedown", dragMouseDown);
  star = document.getElementById("star2")
  star.addEventListener("mousedown", dragMouseDown);

  marquee1 = document.getElementById("marquee")
  marquee2 = document.getElementById("followupMarquee")

  marquee2.style.left = marquee1.offsetWidth + marquee1.offsetLeft + "px"

  setInterval(move, 30)


  let dialUpInterval = 850; //850

  setTimeout(() => {
    document.getElementById("dialUpGif").src = "assets/img/dialUpGif/frame2.png"
  }, dialUpInterval)

  setTimeout(() => {
    document.getElementById("dialUpGif").src = "assets/img/dialUpGif/frame3.png"
  }, dialUpInterval*2)

  setTimeout(() => {
    document.getElementById("dialUpGif").src = "assets/img/dialUpGif/frame4.png"
  }, dialUpInterval*3)

  setTimeout(() => {
    document.getElementById("dialUpGif").src = "assets/img/dialUpGif/frame5.png"
  }, dialUpInterval*4)

  setTimeout(() => {
    document.getElementById("loading").style.display = "none"
    document.getElementById("content").style.display = "block"
    document.body.style.backgroundImage = "url('assets/img/bgs/cobblestone.png')"
    document.body.style.cursor = "url('./assets/img/cursors/whiteCursor.svg') 0 0, auto"
  }, dialUpInterval*5)

}


window.addEventListener('scroll', checkVisibility);



function changeBG() {
  bgIndex += 1
  bgIndex = bgIndex % backgrounds.length;

  document.body.style.backgroundImage = `url("${backgrounds[bgIndex][0]}")`
  document.body.style.backgroundSize = backgrounds[bgIndex][1]
}