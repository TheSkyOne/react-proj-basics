import { storageService } from "../services/async-storage.service.js"
import { makeId } from "../services/util.service.js"
const {useState, useEffect} = React
const STORAGE_KEY = "watchers"

export function WatcherApp(){
    const [watchers, setWatchers] = useState([])
    const [selectedWatcher, setSelectedWatcher] = useState({})

    useEffect(() => {
        loadWatchers()

        async function loadWatchers() {
            try{
                const loadedWatchers = await storageService.query(STORAGE_KEY)
                if(loadedWatchers && loadedWatchers.length > 0){
                    //if found data in localStorage, set "watchers" to it
                    setWatchers(loadedWatchers)
                }
                else{
                    //otherwise, populate watchers with default data post it to localStorage
                    const defaultData = [
                        makeWatcher("name 1", ["Rambo", "Rocky"]),
                        makeWatcher("name 2", ["Spider-Man 2", "Toy Story 1"]),
                        makeWatcher("name 3", ["Harry Potter", "Kung Fu Panda"])
                    ]
                    setWatchers(defaultData)
                    await postDefaultData(defaultData)
                }
            }
            catch(err){
                console.error("error trying to load watchers: " + err)
            }
        }

        async function postDefaultData(defaultWatchers){
            try{
                console.log(defaultWatchers)
                for(const watcher of defaultWatchers){
                    await storageService.post(STORAGE_KEY, watcher)
                }
            }
            catch(err){
                console.error("error trying to post watchers demo data: " + err)
            }
        }
    }, [])

    async function onAddWatcherClicked(){
        var name = prompt("Enter watcher's full name...")
        var movies = prompt("Enter watcher's favorite movies, as a comma seperated list...")

        movies = movies.split(",")
        movies.forEach(movie => movie.trim())

        const watcher = makeWatcher(name, movies)
        try{
            setWatchers(watchers => [...watchers, watcher])
            await storageService.post(STORAGE_KEY, watcher)
        }
        catch(err){
            console.error(err)
        }
    }

    async function onRemoveWatcher(watcherId) {
        try{
            const watcherIdx = watchers.findIndex(watcher => watcher.id === watcherId)
            setWatchers(watchers => watchers.filter((_, i) => i !== watcherIdx))
            await storageService.remove(STORAGE_KEY, watcherId)
        }
        catch(err){
            console.error(err)
        }
    }

    async function onSelectWatcher(watcherId) {
        const watcher = watchers.find(watcher => watcher.id === watcherId)
        setSelectedWatcher(watcher)
        document.querySelector(".watcher-details-modal").style.visibility = "visible"
        console.log(watcher)
    }

    function onCloseModalClicked(){
        document.querySelector(".watcher-details-modal").style.visibility = "hidden"
    }

    function makeWatcher(watcherName, moviesList){
        return {
            id: makeId(),
            fullname: watcherName,
            movies: moviesList
        }
    }


    return (
        <div className="watcher-app">
            <h1>Watcher App</h1>
            <button id="add-watcher" onClick={onAddWatcherClicked}>Add Watcher</button>
            <div className="watchers-list">
                {
                    watchers.map(watcher => 
                    <div key={watcher.id} className="watcher">
                        <div className="watcher-img"></div>
                        <h3 className="watcher-name">{watcher.fullname}</h3>
                        <hr></hr>
                        <div className="buttons-container">
                            <button onClick={() => onRemoveWatcher(watcher.id)}>X</button>
                            <button onClick={() => onSelectWatcher(watcher.id)}>Select Watcher</button>
                        </div>
                    </div>)
                }
            </div>
            <div className="watcher-details-modal">
                <h1>{selectedWatcher.fullname}</h1>
                <ul>
                    {
                        selectedWatcher.movies && selectedWatcher.movies.map((movie, i) => <li key={i}>{movie}</li>)
                    }
                </ul>
                <button onClick={onCloseModalClicked}>X</button>
            </div>
        </div>
    )
}