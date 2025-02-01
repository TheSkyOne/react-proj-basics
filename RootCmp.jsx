import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./cmps/Home.jsx"
import { AnimalList } from "./cmps/AnimalListCmp.jsx"
import { SeasonClock } from "./cmps/SeasonClockCmp.jsx"

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
                <SeasonClock _monthName="December" _day="Sunday"/>
                <SeasonClock _monthName="March" _day="Monday"/>
                <SeasonClock _monthName="June" _day="Tuesday"/>
                <SeasonClock _monthName="September" _day="Wednesday"/>
                <SeasonClock/>
            </main>
        </section>
    )
}