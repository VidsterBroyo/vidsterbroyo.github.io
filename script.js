console.log("%cpls don't hack me", "color: lime; font-size: 20px; background: black; padding: 4px; border: 1px solid lime;");
console.log("this site is held together solely by hopes and dreams")
/* WHY ARE YOU HERE - DID YOU NOT HEED MY REQUEST ??? */


let marquee1, marquee2;
let scroll = true

const sparkle = document.getElementById("sparkle");
let animationPlaying = false;

let netscapeWindow;
let netscapeContent;
let netscapeLocation;
let backBtn;
let forwardBtn;
let seeLiveLink;
let seeLiveBtn;
let githubLink;
let githubBtn;
let devpostLink;
let devpostBtn;

let currentProjectIndex = 0;

const backgrounds = [["assets/img/bgs/cobblestone.png", "100px"], ["assets/img/bgs/bricks.webp", "200px"], ["assets/img/bgs/018prp.gif", "100px"]]
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
  document.getElementById("star1").addEventListener("mousedown", dragMouseDown);
  document.getElementById("star2").addEventListener("mousedown", dragMouseDown);

  marquee1 = document.getElementById("marquee")
  marquee2 = document.getElementById("followupMarquee")

  netscapeWindow = document.getElementById("netscapeWindow")
  netscapeContent = document.getElementById("netscapeContent")
  netscapeLocation = document.getElementById("netscapeLocation")

  backBtn = document.getElementById("backBtn")
  forwardBtn = document.getElementById("forwardBtn")
  seeLiveLink = document.getElementById("seeLiveLink")
  seeLiveBtn = document.getElementById("seeLiveBtn")
  githubLink = document.getElementById("githubLink")
  githubBtn = document.getElementById("githubBtn")
  devpostLink = document.getElementById("devpostLink")
  devpostBtn = document.getElementById("devpostBtn")

  let dialUpInterval = 50; //850

  setTimeout(() => {
    document.getElementById("dialUpGif").src = "assets/img/dialUpGif/frame2.png"
  }, dialUpInterval)

  setTimeout(() => {
    document.getElementById("dialUpGif").src = "assets/img/dialUpGif/frame3.png"
  }, dialUpInterval * 2)

  setTimeout(() => {
    document.getElementById("dialUpGif").src = "assets/img/dialUpGif/frame4.png"
  }, dialUpInterval * 3)

  setTimeout(() => {
    document.getElementById("dialUpGif").src = "assets/img/dialUpGif/frame5.png"
  }, dialUpInterval * 4)

  setTimeout(() => {
    document.getElementById("loading").style.display = "none"
    document.getElementById("content").style.display = "block"
    document.body.style.backgroundImage = "url('assets/img/bgs/cobblestone.png')"
    document.body.style.cursor = "url('./assets/img/cursors/whiteCursor.svg') 0 0, auto"
    marquee2.style.left = marquee1.offsetWidth + marquee1.offsetLeft + "px"
    setInterval(move, 30)

  }, dialUpInterval * 5)



  // convert this to jquery later
  // card click function
  document.querySelectorAll('.cardInner').forEach((card, index) => {
    card.addEventListener('click', () => {
      openNetscape(index)
    }
    )
  })


}



function changeBG() {
  bgIndex += 1
  bgIndex = bgIndex % backgrounds.length;

  document.body.style.backgroundImage = `url("${backgrounds[bgIndex][0]}")`
  document.body.style.backgroundSize = backgrounds[bgIndex][1]
}


function closeWindow() {
  netscapeWindow.style.display = "none"
}


function openNetscape(index) {
  currentProjectIndex = index

  // if current project is last project, disable forward btn
  if (currentProjectIndex == content.length - 1) {
    backBtn.disabled = false
    backBtn.style.backgroundImage = 'url("assets/img/netscapeWindow/backActive.png")'
    forwardBtn.disabled = true
    forwardBtn.style.backgroundImage = 'url("assets/img/netscapeWindow/forwardDisabled.png")'


    // if current project is first project, disable back btn
  } else if (currentProjectIndex == 0) {
    backBtn.disabled = true
    backBtn.style.backgroundImage = 'url("assets/img/netscapeWindow/backDisabled.png")'
    forwardBtn.disabled = false
    forwardBtn.style.backgroundImage = 'url("assets/img/netscapeWindow/forwardActive.png")'
  }

  // else, enable both
  else {
    forwardBtn.disabled = false
    forwardBtn.style.backgroundImage = 'url("assets/img/netscapeWindow/forwardActive.png")'
    backBtn.disabled = false
    backBtn.style.backgroundImage = 'url("assets/img/netscapeWindow/backActive.png")'
  }


  // set the content and address
  netscapeContent.innerHTML = content[index].html
  netscapeLocation.innerHTML = content[index].location

  techUsed.innerHTML = ""
  content[index].tech.forEach((name) => {
    techUsed.innerHTML += `<span>${name[0]}</span>${name.slice(1)}&nbsp;&nbsp;&nbsp;&nbsp;`
  })


  // set the see live, github, and devpost button links
  if (content[index].liveSite) {
    seeLiveLink.href = content[index].liveSite
    seeLiveBtn.disabled = false
    seeLiveBtn.style.filter = "grayscale(0%)"
  } else {
    seeLiveLink.href = ''
    seeLiveBtn.disabled = true
    seeLiveBtn.style.filter = "grayscale(100%)"
  }

  if (content[index].github) {
    githubLink.href = content[index].github
    githubBtn.disabled = false
    githubBtn.style.filter = "grayscale(0%)"
  } else {
    githubLink.href = ''
    githubBtn.disabled = true
    githubBtn.style.filter = "grayscale(100%)"
  }

  if (content[index].devpost) {
    devpostLink.href = content[index].devpost
    devpostBtn.disabled = false
    devpostBtn.style.filter = "grayscale(0%)"
  } else {
    devpostLink.href = ''
    devpostBtn.disabled = true
    devpostBtn.style.filter = "grayscale(100%)"
  }


  // show the window
  netscapeWindow.style.display = "flex"
}



function forwardProject() {
  currentProjectIndex += 1

  openNetscape(currentProjectIndex)
}

function backProject() {
  currentProjectIndex -= 1

  openNetscape(currentProjectIndex)
}


const content = [
  {
    location: 'ontarioslca:',
    liveSite: 'https://ontarioslca.ca/',
    github: 'https://github.com/HaltonChess/haltonchess.github.io',
    tech: ['HTML/CSS', 'JS', 'Bootstrap', 'Google API'],
    html: `
      <h2>CTO of Ontario Student Led Chess Association</h2>
      <ul>
        <li>Created a (gorgeous) <a href="https://ontarioslca.ca">website</a> for OntarioSLCA using Bootstrap</li>
        <li>Programmed an algorithm to manage the club’s Google Sheets Chess Leaderboard</li>
        <li>Created <a href="https://ontarioslca.ca/PAWn">PAWn</a>, a Javascript Chess pairing algorithm following the Swiss System compatible for both team and individual competitions</li>
      </ul>
    `
  },
  {
    location: 'minvestFinance:',
    liveSite: 'https://beta.minvestfinance.com/',
    tech: ['React.js', 'Typescript', 'AWS', 'Flask', 'Auth0'],
    html: `
      <h2>Minvest Finance</h2>
      <ul>
        <li>As a <b>Co-Lead Software Engineer</b>, I lead a team focused on creating <a href="https://beta.minvestfinance.com">Minvest's "MinvestEd" page</a>, a resource to teach GenZ financial lessons</li>
        <ul>
          <li>Created using ReactJS, Flask, and Auth0's API</li>
        </ul>
        <li>As a <b>Cloud Specialist</b>, I built Minvest's AWS environment from the ground up</li>
        <ul>
          <li>I also save the company a minimum of CA$580+ per year by using AWS resources efficiently</li>
        </ul>
      </ul>
    `
  },
  {
    location: 'summit:',
    github: 'https://github.com/VidsterBroyo/SummIT',
    tech: ['Flask', 'BeautifulSoup4', 'Web Scraping', 'AWS'],
    html: `
      <h2>SummIT</h2>
      <ul>
        <li>An application designed to remove high-data content from websites, reducing the website's size</li>
        <li>This results in faster load times, less bandwidth used, and less carbon emissions</li>
        <li>From collected data, the application can reduce the size of sites by an average of 95%</li>
        <li>Created using Python and BeautifulSoup</li>
      </ul>
    `
  },
  {
    location: 'tu20:',
    liveSite: 'https://techundertwenty.com/',
    tech: ['Node.js', 'Javascript', 'AWS'],
    html: `
      <h2>Tech Under Twenty</h2>
      <ul>
        <li>As <b>Team Lead</b>, I lead a <a href="https://techundertwenty.com">team of 30+ students</a> to provide youth in the GTA with opportunities in tech, business & entrepreneurship</li>
        <li>I increased the total number of event attendees by 3x, helping to fulfill TU20’s mission statement</li>
        <li>As <b>Development Team Lead</b>, I increase attendee satisfaction by leading a team to create IT solutions for TU20 events</li>
      </ul>
    `
  },
  {
    location: 'twitterFeelsDetector:',
    liveSite: 'https://www.kaggle.com/code/viduwidyalankara/twitter-sentiment-detection-vidu-widyalankara/notebook',
    tech: ['pandas', 'numpy', 'Random Forest', 'XGBoost'],
    html: `
      <h2>Twitter Sentiment Detection</h2>
      <ul>
        <li>I created a <a href="https://www.kaggle.com/code/viduwidyalankara/twitter-sentiment-detection-vidu-widyalankara/notebook">machine learning model</a> trained on a dataset of 1.6 million tweets to predict a Tweet’s sentiment</li>
        <li>I performed exploratory data analysis and trained the model using both Random Forest and XGBoost</li>
      </ul>
    `
  },
  {
    location: 'proGamer:',
    liveSite: 'https://youtu.be/vlZ9YsXv1dc',
    tech: ['File', 'Edit', 'View', 'Options'],
    html: `
      
      <h2>Top 100 Minecraft Speedrun*</h2>
      <p style="text-align: center">*for Any% Glitchless 2-player 1.9-1.15 (Easy) category.... sorry if i baited you into thinking i'm actually good </p>
      <ul>
        <li>My friend and I started our Summer after Grade 12 by trying to get a top 100 Minecraft speedrun in any category</li>
        <li>After tons of practices and attempts, we ended up with a <b>1:03:51.297</b> time, placing us <b>93rd</b> in our category</li>
      </ul>
    `
  }
];
