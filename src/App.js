import { useEffect, useState } from "react";
import Settings from "./Settings"
import settings_icon from "./pictures/settings.svg"

let minute = 60       // Antall sekunder i et minutt, kan endres til et lavere tall for testing

let pomodoroInit = 55 * minute    // Lengden på en arbeidsperiode
let shortbreakInit = 5 * minute   // Lengden på kort pause
let longbreakInit = 30 * minute   // Lengden på lang pause
let numberOfPomodoro = 8          // Antall arbeidsperioder
let numberOfShortbreaks = 3       // Antall korte pauser før lang pause
let currentShortbreak = numberOfShortbreaks // Nedtelling av korte pauser før lang pause
let breaktype = "Pomodoro"        // Viser aktiv syklus
let currentPomodoro  = numberOfPomodoro   // Nedtelling av arbeidsperioder
let timer = pomodoroInit          // Nedtelling starter med lengden på arbeidsperiode

setInterval(() => timer--, 1000)

document.documentElement.style.setProperty('--timer', timer+"s");


function App() {
  
  const [timeLeft, setTimeLeft] = useState(timer)                           // Tid som er igjen av aktiv syklus
  const [settings, setSettings] = useState(false)                           // Vise modal for settings
  const [pomodoro, setPomodoro] = useState(pomodoroInit)                    // Lengde på arbeidsperiode
  const [shortbreak, setShortbreak] = useState(shortbreakInit)              // Lengden på kort pause
  const [longbreak, setLongbreak] = useState(longbreakInit)                 // Lengden på lang pause
  const [nbrshortbreak, setNbrshortbreak] = useState(numberOfShortbreaks)   // Antall korte pauser før lang pause
  const [nbrPodomoro, setNbrPodomoro] = useState(numberOfPomodoro)          // Antall arbeidsperioder
  const [resetTimer, setResetTimer] = useState(false)                       // Variabel for å resette applikasjon
  const [restart, setRestart] = useState(0)                                 // Variabel for å restarte applikasjon

// Nedtelling og hovedskjerm
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

// Bilde i hovedskjerm
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
        <h3 className="pomodoro start">pomodoro {currentPomodoro > 0 ? currentPomodoro : null}</h3>
        <h3 className="short-break">short break {breaktype === "Short Break" ? currentShortbreak + 1 : null}</h3>
        <h3 className="long-break">long break</h3>
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
        {/* Background with blur effect */}
        <div className = "a">
          <div className = "b">
            <div className = "c"></div>
          </div>
        </div>
        {/* Progress bar */}
        <div className = "d">
          <div className = "e">
            <div className = "f">
              <div className = "g"></div>  
            </div>
          </div>
        </div>
      </div>
      {/* Inner circle with counter */}
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
