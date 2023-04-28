import { useEffect, useState } from "react";
import Settings from "./Settings"
import settngs_icon from "./pictures/settings.svg"

let pomodoro = 5
let shortbreak = 5
let longbreak = 5
let nbrPomodoro = 3
let currentPomodoro = nbrPomodoro
let nbrshortbreak = 2
let currentShortbreak = nbrshortbreak

let timer = pomodoro
let breaktype = "Pomodoro"

setInterval(() => timer--, 1000)

document.documentElement.style.setProperty('--timer', timer+"s");


function App() {
  
  const [timeLeft, setTimeLeft] = useState(timer)
  const [settings, setSettings] = useState(false)

useEffect(() => {
  setTimeout(() => {
    if (timer <= 0) {
      if (breaktype === "Pomodoro") {
        // if (currentPomodoro > 0) {
          if (currentShortbreak > 0) {
            timer = shortbreak
            currentShortbreak--
            breaktype = "Short Break"
            console.log("Shortbreake")
            document.querySelector(".pomodoro").classList.remove("active")
            document.querySelector(".pomodoro").classList.remove("start")
            document.querySelector(".sliding-color").style.animation = 'move-short 1s linear forwards'
            document.querySelector(".short-break").classList.add("active")
          } else {
            currentShortbreak = nbrshortbreak
            breaktype = "Long Break"
            currentPomodoro--
            timer = longbreak
            console.log("Longbreake")
            document.querySelector(".pomodoro").classList.remove("active")
            document.querySelector(".sliding-color").style.animation = 'move-long 1s linear forwards'
            document.querySelector(".long-break").classList.add("active")
          }
          // }
      } else {
        if (breaktype === "Long Break") {
          document.querySelector(".sliding-color").style.animation = 'move-pomodoro-long 1s linear forwards'
        } else {
          document.querySelector(".sliding-color").style.animation = 'move-pomodoro 1s linear forwards'
        }
        breaktype = "Pomodoro"
        timer = pomodoro
        console.log("Pomodoro")
        document.querySelector(".short-break").classList.remove("active")
        document.querySelector(".long-break").classList.remove("active")
        document.querySelector(".pomodoro").classList.add("active")
      }
      document.documentElement.style.setProperty('--timer', timer+"s")
      document.querySelector(".a").style.animation = 'none'
      void document.querySelector(".a").offsetWidth
      document.querySelector(".a").style.animation = 'animate var(--timer) linear infinite'

      document.querySelector(".c").style.animation = 'none'
      void document.querySelector(".c").offsetWidth
      document.querySelector(".c").style.animation = 'animate var(--timer) linear infinite'
    }
    setTimeLeft(timer);
  }, 1000);
});

  return (
    <div className="main-display">
      {settings && <Settings />}
      {/* <h2>{"Current breaktype: " + breaktype }</h2> */}
      {/* <h2>{"Current Pomodoro: " + currentPomodoro}</h2> */}
      {/* <h2>{"Current Shortbreak: " + currentShortbreak}</h2> */}
      {/* <h2>{"Timer: " + timer}</h2> */}
      <h2>pomodoro</h2>
      <div className="active-cycle">
        <h3 className="pomodoro start">Pomodoro</h3>
        <h3 className="short-break">Short break</h3>
        <h3 className="long-break">Long break</h3>
      </div>
      <div className="inactive-bg">
        <div className="inactive"></div>
        <div className="inactive"></div>
        <div className="inactive"></div>
      </div>
      <div className="sliding-holder">
        <div className="sliding-color"></div>
      </div>
      <div>
        <div className = "a">
          <div className = "b">
            <div className = "c"></div>
          </div>
        </div>
        <div className = "d">
          <div className = "e">
            <div className = "f">
              <div className = "g"></div>  
            </div>
          </div>
        </div>
      </div>
      <div className = "h">
        <div className = "i"></div>
      </div>
      <h1>{Math.floor(timeLeft/60) + ":" + ((timeLeft % 60) >= 10 ? (timeLeft % 60) : ("0"+(timeLeft % 60)))}</h1>
      <h4>{breaktype}</h4>
      <div onClick = {() => setSettings((prevState) => !prevState)}>
        <img src = {settngs_icon} alt = 'Icon for setting variables'></img>
      </div>
    </div>
  );
}

export default App;
