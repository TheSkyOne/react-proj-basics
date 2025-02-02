import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./cmps/Home.jsx"
import { AnimalList } from "./cmps/AnimalListCmp.jsx"
import { SeasonClock } from "./cmps/SeasonClockCmp.jsx"
import { CountDown } from "./cmps/CountDownCmp.jsx"
import { WatcherApp } from "./cmps/WatcherAppCmp.jsx"

const animalsInfo = [
    {type: 'Malayan Tiger', count: 787},
    {type: 'Mountain Gorilla', count: 212},
    {type: 'Fin Whale', count: 28},
]

export function RootCmp() {


    return (
        <section className="app main-layout">
            <AppHeader />
            <main>
                <Home />
                <AnimalList animalsInfo={animalsInfo}/>
                <hr></hr>
                <SeasonClock _monthName="December" _day="Sunday"/>
                <SeasonClock _monthName="March" _day="Monday"/>
                <SeasonClock _monthName="June" _day="Tuesday"/>
                <SeasonClock _monthName="September" _day="Wednesday"/>
                <SeasonClock/>
                <hr></hr>
                <CountDown startFrom={15} onDone={() => console.log("Done!")}/>
                <hr></hr>
                <WatcherApp/>
                <hr></hr>
            </main>
        </section>
    )
}