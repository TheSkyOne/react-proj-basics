export function AnimalList({animalsInfo}){
    console.log(animalsInfo)

    return (
        <div className="animals-list">
            <span>Rare Animals</span>
            <table>
                <tbody>
                    {animalsInfo.map(animal => (
                    <tr key={animal.type}>
                        <td>{animal.type}</td>
                        <td>{animal.count}</td>
                        <td><a href={`https://www.google.com/search?q=${animal.type}`}>search</a></td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    )
}



