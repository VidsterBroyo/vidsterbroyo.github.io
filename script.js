

document.addEventListener("visibilitychange", (event) => {
    if (document.visibilityState != "visible") {
      document.title = "get back in here"
      document.getElementById("favicon").href = "img/angryFavicon.svg"
    } else {
        document.title = "vidsterbroyo"
        document.getElementById("favicon").href = "img/favicon.png"
    }
  });



  

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
  if ((currentElement.offsetLeft - pos1) < window.innerWidth-currentElement.width-13){
    currentElement.style.left = (currentElement.offsetLeft - pos1) + "px";
  }
  }
  
  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

function setup(){
  star = document.getElementById("star1")
  star.addEventListener("mousedown", dragMouseDown);
  star = document.getElementById("star2")
  star.addEventListener("mousedown", dragMouseDown);
}