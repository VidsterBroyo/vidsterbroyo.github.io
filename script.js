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
  star = document.getElementById("star1")
  star.addEventListener("mousedown", dragMouseDown);
  star = document.getElementById("star2")
  star.addEventListener("mousedown", dragMouseDown);

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


  netscapeWindow.style.display = "flex"
  netscapeContent.innerHTML = content[index].html
  netscapeLocation.innerHTML = content[index].location

  if (content[index].liveSite) {
    seeLiveLink.href = content[index].liveSite
    seeLiveLink.disabled = false
  } else {
    seeLiveBtn.disabled = true
    seeLiveLink.href = ''
  }

  if (content[index].github) {
    githubLink.href = content[index].github
    githubBtn.disabled = false
  } else {
    githubBtn.disabled = true
    githubLink.href = ''
  }

  if (content[index].devpost) {
    devpostLink.href = content[index].devpost
    devpostBtn.disabled = false
  } else {
    devpostBtn.disabled = true
    devpostLink.href = ''
  }
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
    html: `
      <h2>Twitter Sentiment Detection</h2>
      <ul>
        <li>I created a <a href="https://www.kaggle.com/code/viduwidyalankara/twitter-sentiment-detection-vidu-widyalankara/notebook">machine learning model</a> trained on a dataset of 1.6 million tweets to predict a Tweet’s sentiment</li>
        <li>I performed exploratory data analysis and trained the model using both Random Forest and XGBoost</li>
      </ul>
    `
  }
];
