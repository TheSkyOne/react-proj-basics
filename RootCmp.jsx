import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./cmps/Home.jsx"
import { AnimalListCmp } from "./cmps/AnimalListCmp.jsx"

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
                <AnimalListCmp animalsInfo={animalsInfo}/>
            </main>
        </section>
    )
}