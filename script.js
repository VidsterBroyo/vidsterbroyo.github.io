console.log("%cpls don't hack me", "color: lime; font-size: 20px; background: black; padding: 4px; border: 1px solid lime;");
console.log("this site is held together solely by hopes and dreams")
/* WHY ARE YOU HERE - DID YOU NOT HEED MY REQUEST ??? */

// DOM handles
const marquee1 = document.getElementById("marquee")
const marquee2 = document.getElementById("followupMarquee")

const sparkle = document.getElementById("sparkle");

const projectGallery = document.getElementById("projectGallery")

const netscapeWindow = document.getElementById("netscapeWindow")
const netscapeContent = document.getElementById("netscapeContent")
const netscapeLocation = document.getElementById("netscapeLocation")

const backBtn = document.getElementById("backBtn")
const forwardBtn = document.getElementById("forwardBtn")
const seeLiveLink = document.getElementById("seeLiveLink")
const seeLiveBtn = document.getElementById("seeLiveBtn")
const githubLink = document.getElementById("githubLink")
const githubBtn = document.getElementById("githubBtn")
const devpostLink = document.getElementById("devpostLink")
const devpostBtn = document.getElementById("devpostBtn")

document.getElementById("star1").addEventListener("mousedown", dragMouseDown);
document.getElementById("star2").addEventListener("mousedown", dragMouseDown);

let scroll = true
let animationPlaying = false;

let currentProjectIndex = 0;

const backgrounds = [["assets/img/bgs/cobblestone.png", "100px"], ["assets/img/bgs/018prp.gif", "100px"], ["assets/img/bgs/pinkCloth.jpg", "100px"], ["assets/img/bgs/blueSea.jpg", "100px"], ["assets/img/bgs/greenWall.gif", "100px"], ["assets/img/bgs/flowers.avif", "260px"], ["assets/img/bgs/bricks.webp", "300px"], ["assets/img/bgs/purpleDiamond.gif", "200px"], ["assets/img/bgs/brown.gif", "100px"], ["assets/img/bgs/pinkWeird.gif", "100px"]]
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



// dragging stars
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
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

  // dial up animation
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



  // load project cards
  projects.forEach((project, i) =>
    projectGallery.innerHTML += `
                                  <div class="col-md-6">
                                    <div class="card">
                                      <div class="cardInner" onclick="openNetscape(${i})"
                                        style="background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${project.cover});">
                                        <div>
                                          <h2>${project.title}</h2>
                                          <p>
                                          ${project.tech.map((name) => `<span>${name}</span>`).join("")}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                `
  )

}




function openNetscape(index) {

  currentProjectIndex = index

  // if current project is last project, disable forward btn
  if (currentProjectIndex == projects.length - 1) {
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
  netscapeContent.innerHTML = projects[index].html
  netscapeLocation.innerHTML = projects[index].location
  netscapeContent.scrollTop = 0;

  techUsed.innerHTML = ""
  projects[index].tech.forEach((name) => {
    techUsed.innerHTML += `<span>${name[0]}</span>${name.slice(1)}&nbsp;&nbsp;&nbsp;&nbsp;`
  })


  // set the see live, github, and devpost button links
  if (projects[index].liveSite) {
    seeLiveLink.href = projects[index].liveSite
    seeLiveBtn.disabled = false
    seeLiveBtn.style.filter = "grayscale(0%)"
  } else {
    seeLiveLink.href = ''
    seeLiveBtn.disabled = true
    seeLiveBtn.style.filter = "grayscale(100%)"
  }

  if (projects[index].github) {
    githubLink.href = projects[index].github
    githubBtn.disabled = false
    githubBtn.style.filter = "grayscale(0%)"
  } else {
    githubLink.href = ''
    githubBtn.disabled = true
    githubBtn.style.filter = "grayscale(100%)"
  }

  if (projects[index].devpost) {
    devpostLink.href = projects[index].devpost
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


// traverse through project gallery controls
function forwardProject() {
  currentProjectIndex += 1
  openNetscape(currentProjectIndex)
}

function backProject() {
  currentProjectIndex -= 1
  openNetscape(currentProjectIndex)
}

function closeWindow() {
  netscapeWindow.style.display = "none"
}


// heart click function
function changeBG() {
  bgIndex += 1
  bgIndex = bgIndex % backgrounds.length;

  document.body.style.backgroundImage = `url("${backgrounds[bgIndex][0]}")`
  document.body.style.backgroundSize = backgrounds[bgIndex][1]
}


// look i could turn this into a json file but im too lazy to turn all the ' into "
const projects = [
  {
    title: 'CTO of OntarioSLCA',
    cover: 'assets/img/projects/slca/2goats.jpg',
    location: 'ontarioslca:',
    liveSite: 'https://ontarioslca.ca/',
    github: 'https://github.com/HaltonChess/haltonchess.github.io',
    tech: ['HTML/CSS', 'JS', 'Bootstrap', 'Google API', 'SEO'],
    html: `
      <h2>CTO of Ontario Student Led Chess Association</h2>
      <ul>
        <li>Designed a (gorgeous) website for <a href="https://ontarioslca.ca" target="_blank">OntarioSLCA</a> using <b>Bootstrap</b></li>
        <li>Regularly updated website to showcase new tournaments & articles</li>
        <li>Optimized SEO, bringing the website from <b>#33</b> to the <b>#1</b> spot for our search terms ("high school chess league").</li>
        <li>Programmed an algorithm in JS to automate the management of the club’s <b>Chess Leaderboard</b> on <b>Google Sheets</b></li>
        <li>Built <a href="https://ontarioslca.ca/PAWn" target="_blank"><b>PAWn</b></a> (Pairing Algorithm Wizard), a Swiss System-based pairing algorithm used to create match-ups in both team & individual competitions.</li>
      </ul>

      <div class="row g-2">
        <div class="col-md-6"> 
          <img width="100%" src="assets/img/projects/slca/websiteHead.png" alt="Vidu Widyalankara's student led chess association website header">
        </div>
        <div class="col-md-6">
          <img width="100%" src="assets/img/projects/slca/websiteAbout.png" alt="about page of Vidu Widyalankara's student led chess association website">
        </div>
        <div class="col-md-6">
          <img style="height: 100%; width: 100%; object-fit: cover;" src="assets/img/projects/slca/pawnAdd.png" alt="picture of adding players to PAWn algorithm">
        </div>
        <div class="col-md-6">
          <img width="100%" src="assets/img/projects/slca/pawnPairings.png" alt="picture of PAWn algorithm-generated pairings">
        </div>
      </div>
      
      <div class="row">
        <div class="col-12 col-lg-6" style="display:block; margin: auto; margin-top: 10px">
          <img width="100%" src="assets/img/projects/slca/leaderboard.png" alt="picture of SCLA leaderboard on Vidu Widyalankara's SLCA website">
        </div>
      </div>

    `
  },
  {
    title: 'Minvest Finance',
    cover: 'assets/img/projects/mf/minvestStock.png',
    location: 'minvestFinance:',
    liveSite: 'https://beta.minvestfinance.com/',
    tech: ['React.js', 'Typescript', 'AWS', 'Docker', 'Flask', 'Auth0'],
    html: `
      <h2>Minvest Finance</h2>
      <ul>
        <li>As a <b>Co-Lead Software Engineer</b>, I led a team focused on creating Minvest's <b>MinvestEd</b>, an online resource to teach Gen Z financial lessons</li>
        <li>I also led the team in creating <b>Simvest</b>, a paper-trading service to give Gen Z investors experience in investing without real money </li>
        <ul class="subList">
          <li>Created using ReactJS, Flask, and Auth0's API</li>
        </ul>
        <li>As a <b>Cloud Specialist</b>, I built Minvest's AWS environment from the ground up using Docker, EC2 servers, ECS, and ACM</li>
        <ul>
          <li>I also saved the company a minimum of CA$580+ per year by using AWS resources efficiently</li>
        </ul>
      </ul>

   
      <div class="row g-2">
        <div class="col-md-6">
          <img style="height: calc(100% - 40px); width: 100%; object-fit: cover;"  src="assets/img/projects/mf/minvestHome.png" alt="home page of minvest finance">
          <p class="caption">Home page</p>
        </div>
        <div class="col-md-6">
          <img style="height: calc(100% - 40px); width: 100%; object-fit: cover;" src="assets/img/projects/mf/minvestStock.png" alt="a stock page on minvest finance">
          <p class="caption">A stock's page</p>
        </div>
        <div class="col-md-6"> 
          <img style="height: calc(100% - 40px); width: 100%; object-fit: cover;" src="assets/img/projects/mf/minvested.png" alt="minvestEd page, which Vidu Widyalankara led the creation of">
          <p class="caption">MinvestEd</p>
        </div>
        <div class="col-md-6">
          <img style="height: calc(100% - 40px); width: 100%; object-fit: cover;" src="assets/img/projects/mf/article.png" alt="a minvested article">
          <p class="caption">A MinvestEd article</p>
        </div>
        <div class="col-md-6">
          <img style="height: calc(100% - 40px); width: 100%; object-fit: cover;" src="assets/img/projects/mf/quiz.png" alt="a minvested quiz, created in React.js by Vidu Widyalankara">
          <p class="caption">A MinvestEd quiz</p>
        </div>
        <div class="col-md-6">
          <img style="height: calc(100% - 40px); width: 100%; object-fit: cover;" src="assets/img/projects/mf/simvest.png" alt="the simvest page of minvest finance, spearheaded by Vidu Widyalankara">
          <p class="caption">Simvest</p>
        </div>
      </div>
    `
  },
  {
    title: 'Investigating PPO & SAC Algorithms for Reinforcement Learning in Unity',
    cover: 'assets/img/projects/pposac/cover.png',
    location: 'iLoveSuikaGame:',
    liveSite: 'https://docs.google.com/document/d/e/2PACX-1vTNPVxiDZ0eqbbwmNluJvt3BvW7hxJBSEo8EwJ_eK5JMvnrmg79EnchnCqgMMeWBtg6qw7cV-HNKejS/pub',
    tech: ['Unity', 'ML-Agents', 'TensorBoard', 'C#'],
    html: `
      <h2>Investigating PPO & SAC Algorithms for Reinforcement Learning in Unity</h2>
      <ul>
        <li>For my IB Extended Essay in Computer Science, I answered the research question: <b>How do the cumulative reward and convergence rate of Proximal Policy Optimization and Soft Actor-Critic algorithms compare when applied to learning puzzle games?</b></li>
        <ul class="subList">
          <li>Basically, which algorithm was better for this use case</li>
        </ul>
        <li>To answer it, I recreated <a href="https://suikagame.com/" target="_blank"><em>Suika Game</em></a> in Unity, trained a PPO and SAC model to play the game for <b>500,000</b> steps using ML-Agents, and compared their results using <b>TensorBoard</b>.</li>
        
        <li>The experiment found that the <b>PPO</b> algorithm achieved a greater cumulative reward and convergence rate</li>
        <li>Read the 4000-word paper <a href="https://docs.google.com/document/d/e/2PACX-1vTNPVxiDZ0eqbbwmNluJvt3BvW7hxJBSEo8EwJ_eK5JMvnrmg79EnchnCqgMMeWBtg6qw7cV-HNKejS/pub" target="_blank">here<a></li>
      </ul>

      <div class="row">
        <div class="col-12 col-lg-8" style="display:block; margin: auto;">
          <img width="100%" src="assets/img/projects/pposac/suikaTraining.png" alt="a picture of 8 Unity-made suika games running concurrently, played by the model">
          <p class="caption">the PPO model training</p>
        </div>
        <div class="w-100"></div>
        <div class="col-12 col-lg-8" style="display:block; margin: auto;">
          <img width="100%" src="assets/img/projects/pposac/graph1.png" alt="a graph of steps vs rewards for both the PPO + SAC model">
          <p class="caption">"rewards" = points scored, "steps" = # of decisions made</p>
        </div>
      </div>
    `
  },
  {
    title: 'Tech Under Twenty',
    cover: 'assets/img/projects/tu20/cover.jpg',
    location: 'tu20:',
    liveSite: 'https://techundertwenty.com/',
    tech: ['Node.js', 'Express.js', 'AWS'],
    html: `
      <h2>Tech Under Twenty</h2>
      <ul>
        <li>While I was <b>President</b> of <a href="https://techundertwenty.com" target="_blank">TU20</a> from Grade 10 - 12, I led a team of 30+ students to provide youth in the GTA with opportunities in tech, business & entrepreneurship</li>
        <li>Some things TU20 did during my presidency:</li>
        <ul>
          <li>Held <b>hiring workshops</b> connecting local companies + highschool students</li>
          <li>Expanded our chapters program to highschools <b>across Canada</b></li>
          <li>Gave out <b>$4,000</b> to competitors of our tech + business competitions</li>
          <li>Increased the total number of event attendees by <b>3x</b></li>
        </ul>
        <li>As <b>Development Team Lead</b>, I handled the IT solutions for TU20, such as:</li>
        <ul>
          <li>Maintaining the website</li>
          <li>Creating a judging platform to streamline our award deliberation process in competitions</li>
          <li>Creating an online schedule + activity for our event attendees</li>
        </ul>
      </ul>

      <div class="row g-2">
        <div class="col-md-6">
          <img width="100%" src="assets/img/projects/tu20/celebration.jpg" alt="a team celebrating their win at TU20 Cup">
        </div>
        <div class="col-md-6">
          <img width="100%" src="assets/img/projects/tu20/convo.jpg" alt="some guys having a conversation at TU20 Cup">
        </div>
        <div class="col-md-6"> 
          <img width="100%" src="assets/img/projects/tu20/aur.JPG" alt="guy showing group of other guys something on a laptop">
        </div>
        <div class="col-md-6">
          <img width="100%" src="assets/img/projects/tu20/interview.jpg" alt="guy being interviewed by woman for a job">
        </div>
        <div class="col-md-6">
          <img width="100%" src="assets/img/projects/tu20/guys.jpg" alt="guys sitting down at a circular table">
        </div>
        <div class="col-md-6">
          <img style="height: 100%; width: 100%; object-fit: cover;" src="assets/img/projects/tu20/group.jpg" alt="a winning group taking a pic at TU20 Cup">
        </div>
        <div class="col-md-6">
          <img width="100%" src="assets/img/projects/tu20/rubrics.png" alt="rubrics page of Cup judging platform, created by Vidu Widyalankara">
        </div>
        <div class="col-md-6">
          <img width="100%" src="assets/img/projects/tu20/stats.png" alt="statistics page of Cup judging platform, created by Vidu Widyalankara">
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-12 col-lg-7" style="display:block; margin: auto;">
          <img width="100%" src="assets/img/projects/tu20/cupGroup.jpg" alt="big group standing together at TU20 Cup">
        </div>
      </div>
    `
  },
  {
    title: 'StudySync - HTN \'24',
    cover: 'assets/img/projects/ssync/cover.jpg',
    location: 'hackTheNorthWin',
    devpost: 'https://devpost.com/software/studying-with-hack-the-north',
    tech: ['MongoDB', 'Express.js', 'ReactJS', 'Auth0', 'Flask', 'Hackathon Win'],
    html: `
      <h2>StudySync - HTN '24</h2>
      <ul>
        <li>At <b>Hack The North 2024</b>, with school just recently starting, our team felt it best to build a tool to help us in our studies</li>
        <li>We all like to take collaborative notes, so we decided to build StudySync - <b>a platform to enhance our notetaking process</b></li>
        <li>Built using <b>React.js</b>, StudySync allows you to create study groups for different classes, where you collaborators can publish notes for the group to see</li>
        <li>Users can generate a <b>transcription</b> of a lecture with audio and get a quiz based on the content.</li>
        <li>A super cool feature, made possible by the <b>Symphonics API</b>, is the ability to transcribe a video of the user <b>mouthing their notes</b>. This is perfect for when you're too lazy to type your notes, but also can't make a voice note in the middle of class!</li>
        <li>StudySync was awarded the <b>Best Use of Auth0</b> award</li>
      </ul>
    <br>
      <div class="row g-2">
        <div class="col-md-6">
          <img width="100%" src="assets/img/projects/ssync/homeHome.png" alt="home page of studysync, showing study groups user is a part of">
        </div>
        <div class="col-md-6">
          <img width="100%" src="assets/img/projects/ssync/home.png" alt="AI lecture summarizer">
        </div>
        <div class="col-md-6"> 
          <img width="100%" src="assets/img/projects/ssync/upload.png" alt="page to upload audio or video lecture to get transcription of">
        </div>
        <div class="col-md-6">
          <img width="100%" src="assets/img/projects/ssync/quiz.png" alt="AI-generated quiz based on notes - Vidu Widyalankara made the UI!">
        </div>
      </div>
    `
  },
  {
    title: 'SummIT',
    cover: 'assets/img/projects/ss/newsPostSummIT.jpg',
    location: 'summit:',
    github: 'https://github.com/VidsterBroyo/SummIT',
    tech: ['Flask', 'BeautifulSoup4', 'Web Scraping', 'AWS'],
    html: `
      <h2>SummIT</h2>
      <ul>
        <li>A (formerly live) web browser designed to <b>remove high-bandwidth content</b> such as images, videos, ad trackers, and inessential JS scripts from websites</li>
        <li>The primary intended use case is to allow those in <b>communities lacking high-speed internet</b> to still access important sites such as news sites</li>
        <br>
        <li>From testing, SummIT showed to result in a <b>92% reduction</b> in both download and upload sizes of sites</li>
        <li>This translates to 92%:</li>
        <ul class="subList">
          <li>faster load times</li>
          <li>lower internet costs</li>
          <li>lower carbon emissions generated from servers</li>
        </ul>
        <li>Created using Flask & BeautifulSoup4</li>
      </ul>

      <div class="row">
        <div class="col-12 col-lg-8" style="display:block; margin: auto;">
          <video width="100%" controls alt="a video demo of Vidu Widyalankara's project SummIT">
            <source src="assets/img/projects/ss/SummITDemo.mp4" type="video/mp4">
            a video demo of Vidu Widyalankara's project SummIT
          </video>
        </div>
      </div>
      <br>
      <div class="row g-2">
        <div class="col-md-6"> 
          <img width="100%" src="assets/img/projects/ss/articlePostSummIT.jpg" alt="an article accessed through summit, with images & videos stripped">
          <p class="caption">News article accessed through SummIT</p>
        </div>
        <div class="col-md-6">
          <img width="100%" src="assets/img/projects/ss/demo.png" alt="a side-by-side comparison of home page of a news site accessed with and without summit. Photo courtesy of Vidu Widyalankara.">
        </div>
      </div>

    `
  },
  {
    title: 'Twitter Sentiment Detection',
    cover: 'assets/img/projects/twitter/oldTwitter.png',
    location: 'twitterFeelsDetector:',
    liveSite: 'https://www.kaggle.com/code/viduwidyalankara/twitter-sentiment-detection-vidu-widyalankara/notebook',
    tech: ['Pandas', 'Matplotlib', 'numpy', 'scikit-learn', 'Random Forest', 'XGBoost'],
    html: `
      <h2>Twitter Sentiment Detection</h2>
      <ul>
        <li> I built a <a href="https://www.kaggle.com/code/viduwidyalankara/twitter-sentiment-detection-vidu-widyalankara/notebook" target="_blank">machine learning model</a> to classify the sentiment of tweets (positive or negative) using <b>1.6M pre-labeled tweets</b> </li>
        <li> I performed <b>data preprocessing</b> by normalizing timestamps, converting time zones to EST, and removing noisy text/stopwords </li>
        <li> I performed <b>EDA</b>, exploring tweet frequency by sentiment and time of day, generating word clouds, and comparing the average tweet length based on sentiment</li>
        <li> I trained two different models, <b>Random Forest and XGBoost</b>, and hypertuned them to find the best possible hyperparameters</li>
        <li> The best test accuracy obtained was <b>~78.5%</b>, achieved using the XGBoost model with 1,000,000 training tweets and 2500 trees</li>
        <li> I included functionality for <b>real-time classification</b> on new tweet input using the trained model and vectorizer </li>
        <li> <a href="https://docs.google.com/presentation/d/e/2PACX-1vSOffim8oAY4UuielXu4wAQHRXD1puxc2szmvtBsZBtC6nnUoQOegfjHsK3UnQZdwZhD-QdjokBDBVx/pub?start=true&loop=false&delayms=5000" target="_blank">Project slidedeck</a> </li>
      </ul>

      <div class="row g-2">
        <div class="col-12 col-lg-7" style="display:block; margin: auto;">
          <img width="100%" src="assets/img/projects/twitter/happyWords.png" alt="wordcloud of 800,000 happy tweets. words like know, lol, thank, like, love.">
          <p class="caption">wordcloud of 800,000 happy tweets</p>
        </div>
        <div class="col-12 col-lg-7" style="display:block; margin: auto;">
          <img width="100%" src="assets/img/projects/twitter/sadWords.png" alt="wordcloud of 800,000 sad tweets. words like want, work, wish today, miss.">
          <p class="caption">wordcloud of 800,000 sad tweets</p>
        </div>
        <div class="col-12 col-lg-7" style="display:block; margin: auto;">
          <img width="100%" src="assets/img/projects/twitter/confusionMatrix.png" alt="confusion matrix.  too lazy to put numbers here but it's pretty good with some false positives. Photo courtesy of Vidu Widyalankara.">
          <p class="caption">confusion matrix of model with highest accuracy<br>(0 = sad, 1 = happy)</p>
        </div>
      </div>
    `
  },
  {
    title: 'Top 100 Minecraft Speedrun*',
    cover: 'assets/img/projects/mc/cover.jpg',
    location: 'proGamer:',
    liveSite: 'https://youtu.be/vlZ9YsXv1dc',
    tech: ['pro gamer skills'],
    html: `
      <h2>Top 100 Minecraft Speedrun*</h2>
      <p style="text-align: center">*for Any% Glitchless 2-player 1.9-1.15 (Easy) category.... sorry if i baited you into thinking i'm actually good </p>
      <ul>
        <li>My friend and I started our Summer after Grade 12 by trying to get a top 100 Minecraft speedrun in any category</li>
        <li>After tons of practices and attempts, we ended up with a <b>1:03:51.297</b> time, placing us <a target="_blank" href="https://www.speedrun.com/mc?h=Any_Glitchless_Co-op-Difficulty1%28Easy%29-random-seed-1-9-1-15-2-players&x=zd301qed-9l737pn1.4lxg24q2-rn1p34dn.5lm7wvjl-68kd9yql.jqzywvml-68k5jz82.jqz6vmm1"><b>93rd</b></a> in our category</li>
        <li>Watch the <a href="https://youtu.be/vlZ9YsXv1dc" target="_blank">VOD</a></li>
      </ul>

      <div class="row">
        <div class="col-12 col-lg-8" style="display:block; margin: auto;">
          <iframe width="100%" style="aspect-ratio: 16 / 10;" src="https://www.youtube.com/embed/vlZ9YsXv1dc?si=JVACnGrSH7AUImWB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
      <br>
      <div class="row g-2">
        <div class="col-md-6"> 
          <img width="100%" src="assets/img/projects/mc/ripGolem.png" alt="rip golem thank u for ur sacrifice">
          <p class="caption">rip golem thank u for ur sacrifice</p>
        </div>
        <div class="col-md-6">
          <img width="100%" src="assets/img/projects/mc/portal.png" alt="Vidu Widyalankara building nether portal">
          <p class="caption">we need to go deeper</p>
        </div>
        <div class="col-md-6">
          <img width="100%" src="assets/img/projects/mc/death.png" alt="Vidu Widyalankara almost throwing the run">
          <p class="caption">when i almost lost all the blaze rods in lava</p>
        </div>
        <div class="col-md-6">
          <img width="100%" src="assets/img/projects/mc/win.png" alt="Vidu Widyalankara killing the dragon">
          <p class="caption">W</p>
        </div>
      </div>
    `
  }
];
