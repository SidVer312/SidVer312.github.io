
function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
    timeText.innerHTML = currentTime;
}
setInterval(updateTime, 1000);
var biggestIndex = 1;
var topBar = document.querySelector("#nav")


// Make the DIV element draggable:
dragElement(document.getElementById("window"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
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
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


var welcomeScreen = document.querySelector("#window")

function closeWindow(element) {
    element.style.display = "none"
}

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}


var welcomeScreenClose = document.querySelector("#windowclose")
var welcomeScreenOpen = document.querySelector("#windowopen")


welcomeScreenClose.addEventListener("click", function() {
    closeWindow(welcomeScreen);
  });


welcomeScreenOpen.addEventListener("click", function() {
    openWindow(welcomeScreen);
  });

var selectedIcon = undefined

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
} 

function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = undefined
}

function handleNotesIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element)
    openWindow(document.querySelector("#notes"))
  }
  else{
    selectIcon(element)
  }
}

var icon = document.querySelector("#icon")
icon.addEventListener("click", () => 
  handleNotesIconTap(icon)

  
)

function handleFilesIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element)
    openWindow(document.querySelector("#files"))
  }
  else{
    selectIcon(element)
  }
}

var filesicon = document.querySelector("#filesicon")
filesicon.addEventListener("click", () => 
  handleFilesIconTap(filesicon)

  
)

dragElement(document.querySelector("#notes"))

var notesScreen = document.querySelector("#notes")
var notesScreenClose = document.querySelector("#notesclose")

notesScreenClose.addEventListener("click", () => closeWindow(notesScreen))



function handleWindowTap(element) {
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon)
}


function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}

addWindowTapHandling(welcomeScreen)
addWindowTapHandling(notesScreen)
addWindowTapHandling(document.querySelector("#files"))
dragElement(document.querySelector("#files"))


function initializeWindow(elementName){
  var screen = document.querySelector("#" + elementName)
  addWindowTapHandling(screen)
  var screenclose = document.querySelector("#" + elementName + "close")
  screenclose.addEventListener("click", () => closeWindow(screen))
  dragElement(screen)
}


var content = [
  {
    title: "About Me",
    date: "2024-05-26",
    content: `
      <p style="font-weight: bold; font-family: monospace;">Welcome to my life</p>
      <img src="assets/Siddhartha_Verma.jpeg"  style="width: 128px; height: 128px; object-fit: cover;">
      <p style="font-weight: 400; font-family: monospace; font-size: 13px;">Hello/ciao/Servus!

          My name is Siddhartha Verma. I am an Alumnus of DPS RK Puram batch of '24 and the former Chief Advisor at Exun Clan, the technology club of my school. </p>
      <p style="font-weight: 400; font-family: monospace; font-size: 13px;"> I am a student, programmer, quizzer, Computer Hardware and Robotics enthusiast by day, and a massive Motorsport (primarily Formula 1 and WEC) fan and car guy by night, with my interest in cars also leading me to dip my toes into Aerodynamics.
          My love for technology and cars fuels my attempt to understand what's behind some of the fastest machines on the planet, computers and cars alike.</p>
    `
  }
]


function setNotesContent(index){
  var notesContent = document.querySelector("#notescontent")
  notesContent.innerHTML = content[index].content

}

setNotesContent(0)


function addToSidebar(index){
  var sidebar = document.querySelector("#sidebar")
  var note = content[index]
  var newDiv = document.createElement("div")
  newDiv.innerHTML = `
    <div class="note" onclick="setNotesContent(${index})">
      <p style="font-weight: bold; font-family: monospace; font-size: 13px; margin-bottom: 0px;">${note.title}</p>
      <p style="font-weight: 400; font-family: monospace; font-size: 13px; margin-top: 0px;">${note.date}</p>
    </div>
  `
  newDiv.addEventListener("click", () => setNotesContent(index))
  sidebar.appendChild(newDiv)
}

for (var i = 0; i < content.length; i++){
  addToSidebar(i)
}

var files = document.querySelector("#files")
var filesScreenClose = document.querySelector("#filesclose")
filesScreenClose.addEventListener("click", () => closeWindow(files))


initializeWindow(files)