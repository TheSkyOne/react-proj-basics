const { useState, useEffect} = React

export function MouseMonitor() {
    const [isMonitoring, setIsMonitoring] = useState(true)
    const [pos, setPos] = useState({x: 0, y: 0})

    useEffect(() => {
        addMouseListener()
    }, [])

    useEffect(() => {
        if (isMonitoring){
            addMouseListener()
        }
        else{
            removeMouseListener()
        }
    }, [isMonitoring])

    function onMonitorButtonClicked(){
        setIsMonitoring(isMonitoring => !isMonitoring)
    }

    function addMouseListener(){
        document.addEventListener("mousemove", setPos)
    }

    function removeMouseListener(){
        document.removeEventListener("mousemove", setPos)
    }

    return (
        <div className="mouse-monitor">
            <h1>Mouse Position</h1>
            <h1 className="position-display">X: {pos.x}, Y: {pos.y}</h1>
            <button className="monitor-button" onClick={onMonitorButtonClicked}>{isMonitoring ? "Pause" : "Resume"}</button>
        </div>
    )
}