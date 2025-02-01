const {useState, useEffect} = React
import { capitalizeString } from "../services/util.service.js"

export function SeasonClock({_monthName = "", _day = ""}){
    const currentDate = new Date()
    // const monthNum = currentDate.getMonth() // January is 0
    const monthName = (_monthName && capitalizeString(_monthName)) || new Intl.DateTimeFormat("en-US", {month: "long"}).format(currentDate) //actual month name, such as "January"
    const day = (_day && capitalizeString(_day)) || currentDate.toLocaleDateString("en-US", { weekday: "long" })
    const season = getSeason(monthName)
    const seasonImg = getImage(season)

    const [isDark, setIsDark] = useState(false)

    function getSeason(month){
        //how to do error handling here
        // if (month < 0 || month > 11) return new Error("got month number outside of range, expected between 0 and 11 (inclusive)")
        if (month < 0 || month > 11) return "not valid month"
        if (month === "December" || month === "January" || month === "February") return "Winter"
        if (month === "March" || month === "April" || month === "May") return "Spring"
        if (month === "June" || month === "July" || month === "August") return "Summer"
        if (month === "September" || month === "October" || month === "November") return "Autumn"
    }

    function getImage(season){
        switch (season){
            case "Winter":
                return "../assets/season-imgs/winter.png"
            case "Spring":
                return "../assets/season-imgs/spring.png"
            case "Summer":
                return "../assets/season-imgs/summer.png"
            case "Autumn":
                return "../assets/season-imgs/autumn.png"
        }
        //how to do error handling here
        // return new Error(`couldnt find image for ${season} at "../assets/season-imgs/`)
    }

    function onToggleDark(){
        console.log("toggling dark")
        setIsDark(isDark => !isDark)
    }


    const darkClass = isDark ? "dark" : ""

    return (
    <div className={`season-clock ${darkClass}`} data-season={season} onClick={onToggleDark}>
        <h1>{monthName} ({season})</h1>
        <img src={seasonImg}></img>
        <h4>{day}</h4>
        <h6>
            {!_monthName && !_day
                ? "Uses machine month and day"
                : !_monthName
                ? "Uses machine month"
                : !_day
                ? "Uses machine day"
                : ""}
        </h6>
    </div>
    )
}


