import { useEffect, useState } from "react";
import Settings from "./Settings"
import settings_icon from "./pictures/settings.svg"

let minute = 1

let pomodoroInit = 55 * minute
let shortbreakInit = 5 * minute
let longbreakInit = 30 * minute
let numberOfPomodoro = 8
let numberOfShortbreaks = 3
let currentShortbreak = numberOfShortbreaks
let breaktype = "Pomodoro"
let currentPomodoro  = numberOfPomodoro
let timer = pomodoroInit

setInterval(() => timer--, 1000)

document.documentElement.style.setProperty('--timer', timer+"s");


function App() {
  
  const [timeLeft, setTimeLeft] = useState(timer)
  const [settings, setSettings] = useState(false)
  const [pomodoro, setPomodoro] = useState(pomodoroInit)
  const [shortbreak, setShortbreak] = useState(shortbreakInit)
  const [longbreak, setLongbreak] = useState(longbreakInit)
  const [nbrshortbreak, setNbrshortbreak] = useState(numberOfShortbreaks)
  const [nbrPodomoro, setNbrPodomoro] = useState(numberOfPomodoro)
  const [resetTimer, setResetTimer] = useState(false)
  const [restart, setRestart] = useState(0)

useEffect(() => {
  let timeoutId = setTimeout(() => {
    if (timer <= 0) {
      if (breaktype === "Pomodoro") {
        if (currentPomodoro > 0) {
          if (currentShortbreak > 0) {
            timer = shortbreak
            currentShortbreak--
            breaktype = "Short Break"
            document.querySelector(".pomodoro").classList.remove("active")
            document.querySelector(".pomodoro").classList.remove("start")
            document.querySelector(".sliding-color").style.animation = 'move-short 1s linear forwards'
            document.querySelector(".short-break").classList.add("active")
            currentPomodoro--
            if (currentPomodoro === 0) {
              document.querySelector(".pomodoro").classList.add("active")
              document.querySelector(".short-break").classList.remove("active")
              document.querySelector(".sliding-color").style.animation = 'none'
            }
          } else {
            currentShortbreak = nbrshortbreak
            breaktype = "Long Break"
            timer = longbreak
            document.querySelector(".pomodoro").classList.remove("active")
            document.querySelector(".sliding-color").style.animation = 'move-long 1s linear forwards'
            document.querySelector(".long-break").classList.add("active")
            currentPomodoro--
            if (currentPomodoro === 0) {
              document.querySelector(".pomodoro").classList.add("active")
              document.querySelector(".long-break").classList.remove("active")
              document.querySelector(".sliding-color").style.animation = 'none'
            }
          }
        } else {
          setTimeLeft(0)
          return
        }
      } else {
        if (breaktype === "Long Break") {
          document.querySelector(".sliding-color").style.animation = 'move-pomodoro-long 1s linear forwards'
        } else {
          document.querySelector(".sliding-color").style.animation = 'move-pomodoro 1s linear forwards'
        }
        breaktype = "Pomodoro"
        timer = pomodoro
        document.querySelector(".short-break").classList.remove("active")
        document.querySelector(".long-break").classList.remove("active")
        document.querySelector(".pomodoro").classList.add("active")
      }
      document.documentElement.style.setProperty('--timer', timer+"s")
      document.querySelector(".a").style.animation = 'none'
      void document.querySelector(".a").offsetWidth
      document.querySelector(".a").style.animation = 'animate var(--timer) linear'
      document.querySelector(".d").style.animation = 'none'
      void document.querySelector(".d").offsetWidth
      document.querySelector(".d").style.animation = 'animate var(--timer) linear'
      document.querySelector(".f").style.animation = 'none'
      void document.querySelector(".f").offsetWidth
      document.querySelector(".f").style.animation = 'animate var(--timer) linear'
    }
    if (resetTimer) {
      document.querySelector(".a").style.animation = 'none'
      void document.querySelector(".a").offsetWidth
      document.querySelector(".d").style.animation = 'none'
      void document.querySelector(".d").offsetWidth
      document.querySelector(".f").style.animation = 'none'
      void document.querySelector(".f").offsetWidth
      timer = pomodoro
      document.documentElement.style.setProperty('--timer', timer+"s")
      document.querySelector(".short-break").classList.remove("active")
      document.querySelector(".long-break").classList.remove("active")
      document.querySelector(".pomodoro").classList.add("active")
      document.querySelector(".a").style.animation = 'animate var(--timer) linear'
      document.querySelector(".d").style.animation = 'animate var(--timer) linear'
      document.querySelector(".f").style.animation = 'animate var(--timer) linear'
      document.querySelector(".sliding-color").style.animation = 'move-home 0s linear forwards'
      setTimeLeft(pomodoro)
      breaktype = "Pomodoro"
      currentPomodoro = nbrPodomoro
      currentShortbreak = nbrshortbreak
      setResetTimer(false)
    }
    if (currentPomodoro !== 0) {
      setTimeLeft(timer)
    } else {
      setTimeLeft(0)
      breaktype = "Finished"
      timer = 0
      document.querySelector(".a").style.animation = 'none'
      void document.querySelector(".a").offsetWidth
      document.querySelector(".d").style.animation = 'none'
      void document.querySelector(".d").offsetWidth
      document.querySelector(".f").style.animation = 'none'
      void document.querySelector(".f").offsetWidth
      document.querySelector(".sliding-color").style.animation = 'move-home 0s linear forwards'
    }
  }, 1000)
  return () => clearTimeout(timeoutId)
  // eslint-disable-next-line
}, [timer, restart])

  return (
    <div className="main-display">
      {settings && <Settings
        setSettings = {setSettings}
        pomodoro = {pomodoro}
        setPomodoro = {setPomodoro}
        longbreak = {longbreak}
        setLongbreak = {setLongbreak}
        shortbreak = {shortbreak}
        setShortbreak = {setShortbreak}
        nbrPodomoro = {nbrPodomoro}
        setNbrPodomoro = {setNbrPodomoro}
        nbrshortbreak = {nbrshortbreak}
        setNbrshortbreak = {setNbrshortbreak}
        setResetTimer = {setResetTimer}
        minute = {minute}
        setRestart = {setRestart}
      />}
      <h2>pomodoro</h2>
      <div className="active-cycle">
        <h3 className="pomodoro start">Pomodoro {currentPomodoro > 0 ? currentPomodoro : null}</h3>
        <h3 className="short-break">Short break {breaktype === "Short Break" ? currentShortbreak + 1 : null}</h3>
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
      <div onClick = {() => setSettings(() => true)}>
        <img src = {settings_icon} alt = 'Icon for setting variables'></img>
      </div>
    </div>
  );
}

export default App;
