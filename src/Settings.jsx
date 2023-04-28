function Settings() {

    return (
        <div className="modal">
            
            <div className = "line">
                <h5>Font</h5>
                <div className = "choises">
                    <div className = "button" onClick = {() => document.documentElement.className = "font-a"}>Aa</div>
                    <div className = "button" onClick = {() => document.documentElement.className = "font-b"}>Aa</div>
                    <div className = "button" onClick = {() => document.documentElement.className = "font-c"}>Aa</div>
                </div>
            </div>
            <div className = "line">
                <h5>Color</h5>
                <div className = "choises">
                    <div className = "button red"  onClick = {() => document.documentElement.className = "red"}></div>
                    <div className = "button blue" onClick = {() => document.documentElement.className = "blue"}></div>
                    <div className = "button pink" onClick = {() => document.documentElement.className = "pink"}></div>
                </div>
            </div>
        </div>
    )
}

export default Settings