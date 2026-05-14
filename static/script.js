
const beeps = {
    "1": new Audio('static/beeps/one.wav'),
    "2": new Audio('static/beeps/two.wav'),
    "3": new Audio('static/beeps/three.wav'),
    "4": new Audio('static/beeps/four.wav'),
    "5": new Audio('static/beeps/five.wav'),
    "6": new Audio('static/beeps/six.wav'),
    "7": new Audio('static/beeps/seven.wav'),
    "8": new Audio('static/beeps/eight.wav'),
    "9": new Audio('static/beeps/nine.wav'),
    "0": new Audio('static/beeps/zero.wav'),
    "C": new Audio('static/beeps/star.wav'),
    "H": new Audio('static/beeps/hash.wav')
};

const audio = new Audio();

const hangup = new Audio('static/snd/hangup.mp3');

var calling = false;

function get_name(number) {

  name = "default.wav"

  switch (number) {
    case "80038":
      name = "indice1.wav"; break;
    case "21024":
      name = "indice2.wav"; break;
    case "79092":
      name = "indice3.wav"; break;
    case "54538":
      name = "indice4.wav"; break;
    case "25541":
      name = "indice5.wav"; break;
  }
  return name;

}


function add_digit(evt) {

  if (!document.fullscreenElement) document.documentElement.requestFullscreen();

  let beep = beeps[evt.currentTarget.id];
  beep.currentTime = 0;
  beep.play();

  let div_number = document.getElementById("number");
  if (div_number.textContent.length < 5)
    div_number.textContent = div_number.textContent + evt.currentTarget.id;

}

function remove_digit(evt) {

  let beep = beeps["C"];
  beep.currentTime = 0;
  beep.play();
  let div_number = document.getElementById("number");
  div_number.textContent = div_number.textContent.slice(0, -1)

}


function toggle_call(evt) {

  if (calling)
    end_call(evt);
  else {
    let beep = beeps["H"];
    beep.currentTime = 0;
    beep.play();
    start_call(evt);
  }

}


function end_call(evt) {

  audio.pause();
  hangup.currentTime = 0;
  hangup.play();
  document.getElementById("number").textContent = "";
  document.getElementById("picture").src = "static/cute.png";
  calling = false;

}


async function start_call() {

  let numero = document.getElementById("number").textContent;
  if (numero != "") {

    let name = get_name(numero);
    if (name != "") {
      document.getElementById("picture").src = "static/wave.gif";
      audio.src = "static/snd/" + name;
      audio.play();
      calling = true;
    }
    else
      end_call();
  }

}

document.getElementById("picture").src = "static/cute.png";

for (key of document.getElementsByClassName("num")) {
  key.addEventListener("touchstart", add_digit);
  //key.addEventListener("click", add_digit);
}

document.getElementById("correct").addEventListener("touchstart", remove_digit);
document.getElementById("call").addEventListener("touchstart", toggle_call);
//document.getElementById("correct").addEventListener("click", remove_digit);
//document.getElementById("call").addEventListener("click", toggle_call);

audio.addEventListener("ended", end_call);
audio.addEventListener("error", end_call);

const splashScreen = document.getElementById("splashScreen");
const startBtn = document.getElementById("startBtn");
 
startBtn.addEventListener("click", async () => {
  try {
    // Hide splash screen and enter full screen
    splashScreen.style.display = "none";
    await document.documentElement.requestFullscreen();
  } catch (err) {
    alert(`Failed to enter full screen: ${err.message}`);
    splashScreen.style.display = "flex"; // Show splash screen again on error
  }
});

