import { useState } from "react"

function Settings({setSettings, pomodoro, setPomodoro, longbreak,
    setLongbreak, shortbreak, setShortbreak, nbrPodomoro,
    setNbrPodomoro, nbrshortbreak, setNbrshortbreak,
    setResetTimer, minute, setRestart}) {
    
    const [color, setColor] = useState("red")
    const [font, setFont] = useState("font-a")
    const [pomodoroTmp, setPomodoroTmp] = useState(pomodoro/minute)
    const [shortbreakTmp, setShortbreakTmp] = useState(shortbreak/minute)
    const [longbreakTmp, setLongbreakTmp] = useState(longbreak/minute)
    const [nbrshortbreakTmp, setNbrshortbreakTmp] = useState(nbrshortbreak)
    const [nbrPodomoroTmp, setNbrPodomoroTmp] = useState(nbrPodomoro)

    // Increment and decrement of input value
    function Input({inputType, setTimer, max}) {
        return (
            <span className = 'number-wrapper'>
                <input type = "text" value={inputType} disabled></input>
                <span 
                    className = "spantop"
                    onClick={() => setTimer((prev) => prev < max ? prev + 1 : prev)}
                    >&lsaquo;
                </span>
                <span 
                    className = "spanbottom"
                    onClick={() => setTimer((prev) => prev > 1 ? prev - 1 : prev)}
                    >&rsaquo;
                </span>
            </span>
        )
    }


    return (
        // Modal
        <div className="modal">
            {/* Modal headline */}
            <div className = "line">
                <h2 className ="h2-settings">Settings</h2>
                <h2 className = "close" onClick = {() => setSettings(() => false)}>&#215;</h2>
            </div>
            <hr className = "hr-top"></hr>
            {/* Settings of time in minutes */}
            <h5 className = "line">Time (minutes)</h5>
            <div className = "line">
                <div className = "line2">
                    <h6>pomodoro</h6>
                    <Input inputType = {pomodoroTmp} setTimer = {setPomodoroTmp} max = {99} />
                </div>
                <div className = "line2">
                    <h6>short break</h6>
                    <Input inputType = {shortbreakTmp} setTimer = {setShortbreakTmp} max = {30} />
                </div>
                <div className = "line2">
                    <h6>long break</h6>
                    <Input inputType = {longbreakTmp} setTimer = {setLongbreakTmp} max = {60} />
                </div>
            </div>
            <hr></hr>
            {/* Setting of work periodes */}
            <div className = "line">
                <h5>Number of work periods</h5>
                <Input inputType = {nbrPodomoroTmp} setTimer = {setNbrPodomoroTmp} max = {10} />
            </div>
            <hr></hr>
            {/* Setting of number of short breakes before long breake */}
            <div className = "line">
                <h5>Number of short breaks before long break</h5>
                <Input inputType = {nbrshortbreakTmp} setTimer = {setNbrshortbreakTmp} max = {20} />
            </div>
            <hr></hr>
            {/* Selection of active font */}
            <div className = "line">
                <h5 className = "fontname">Font</h5>
                <div className = "choises">
                    <div className = "button button-a selected" onClick = {() => {
                        setFont("font-a")
                        document.querySelector(".button-a").classList.remove("unselected")
                        document.querySelector(".button-b").classList.remove("selected")
                        document.querySelector(".button-c").classList.remove("selected")
                        document.querySelector(".button-a").classList.add("selected")
                        document.querySelector(".button-b").classList.add("unselected")
                        document.querySelector(".button-c").classList.add("unselected")
                        document.documentElement.className = `${color} font-a`
                    }}>Aa</div>
                    <div className = "button button-b unselected" onClick = {() => {
                        setFont("font-b")
                        document.querySelector(".button-a").classList.remove("selected")
                        document.querySelector(".button-b").classList.remove("unselected")
                        document.querySelector(".button-c").classList.remove("selected")
                        document.querySelector(".button-a").classList.add("unselected")
                        document.querySelector(".button-b").classList.add("selected")
                        document.querySelector(".button-c").classList.add("unselected")
                        document.documentElement.className = `${color} font-b`
                    }}>Aa</div>
                    <div className = "button button-c unselected" onClick = {() => {
                        setFont("font-c")
                        document.querySelector(".button-a").classList.remove("selected")
                        document.querySelector(".button-b").classList.remove("selected")
                        document.querySelector(".button-c").classList.remove("unselected")
                        document.querySelector(".button-a").classList.add("unselected")
                        document.querySelector(".button-b").classList.add("unselected")
                        document.querySelector(".button-c").classList.add("selected")
                        document.documentElement.className = `${color} font-c`
                    }}>Aa</div>
                </div>
            </div>
            <hr></hr>
            {/* Selection of active color */}
            <div className = "line">
                <h5>Color {color}</h5>
                <div className = "choises">
                    <div className = "button red-dot tagged" onClick = {() => {
                        setColor("red")
                        document.querySelector(".red-dot").classList.remove("untagged")
                        document.querySelector(".blue-dot").classList.remove("tagged")
                        document.querySelector(".pink-dot").classList.remove("tagged")
                        document.querySelector(".red-dot").classList.add("tagged")
                        document.querySelector(".blue-dot").classList.add("untagged")
                        document.querySelector(".pink-dot").classList.add("untagged")
                        document.documentElement.className = `${font} red`
                    }}>&#10004;</div>
                    <div className = "button blue-dot untagged" onClick = {() => {
                        setColor("blue")
                        document.querySelector(".red-dot").classList.remove("tagged")
                        document.querySelector(".blue-dot").classList.remove("untagged")
                        document.querySelector(".pink-dot").classList.remove("tagged")
                        document.querySelector(".blue-dot").classList.add("tagged")
                        document.querySelector(".red-dot").classList.add("untagged")
                        document.querySelector(".pink-dot").classList.add("untagged")
                        document.documentElement.className = `${font} blue`
                    }}>&#10004;</div>
                    <div className = "button pink-dot untagged" onClick = {() => {
                        setColor("pink")
                        document.querySelector(".red-dot").classList.remove("tagged")
                        document.querySelector(".blue-dot").classList.remove("tagged")
                        document.querySelector(".pink-dot").classList.remove("untagged")
                        document.querySelector(".pink-dot").classList.add("tagged")
                        document.querySelector(".red-dot").classList.add("untagged")
                        document.querySelector(".blue-dot").classList.add("untagged")
                        document.documentElement.className = `${font} pink`
                    }}>&#10004;</div>
                </div>
            </div>
            <hr></hr>
            {/* Buttons at bottom of modal */}
            <div className = "line line3">
                <h5 className = "button-2"
                    onClick = {() => {
                        setPomodoro(pomodoroTmp * minute)
                        setLongbreak(longbreakTmp * minute)
                        setShortbreak(shortbreakTmp * minute)
                        setNbrPodomoro(nbrPodomoroTmp)
                        setNbrshortbreak(nbrshortbreakTmp)
                        setResetTimer(true)
                        setRestart((prev) => prev + 1)
                        setSettings(false)
                    }}>Restart with new settings
                </h5>
                <h5 className = "button-2"
                    onClick = {() => setSettings(false)}>Cancel
                </h5>
            </div>
        </div>
    )
}

export default Settings