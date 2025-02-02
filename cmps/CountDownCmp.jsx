const { useState, useEffect, useRef } = React

export function CountDown({ startFrom = 10, onDone }) {
    const [count, setCount] = useState(startFrom)
    const intervalIdRef = useRef()

    useEffect(() => {
        intervalIdRef.current = setInterval(() => {
            setCount(count => {
                if (count <= 6){
                    // whats the best practice to grab the count-down element here?
                    document.querySelector(".count-down").style.color = "red"
                    document.querySelector(".count-down").style.borderColor = "red"
                }

                if (count === 1){
                    clearInterval(intervalIdRef.current)
                    onDone()
                    return 0
                }
                return count - 1
            })
            
        }, 1000)

        return () => {if(intervalIdRef.current) clearInterval(intervalIdRef.current)}
    }, [])

    
    return (
        <div className="count-down">
            {count}
        </div>
    )
}