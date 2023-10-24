import { useState } from "react"

const ToggleButton = (props) => {
    const [active, setActive] = useState(false)

    const handleClick = () => {
        setActive((prevState) => (!prevState))
    }

    return (
        <div onClick={handleClick} className="relative w-14 bg-primary-200 h-8 rounded-full cursor-pointer border-4 border-primary-400/20">
            <div id="handle" className={`${active ? 'left-0 bg-contrast-500/20': 'left-[1.5rem] bg-contrast'} transition-all absolute h-6 w-6 rounded-full`}></div>
        </div>
    )
}

export default ToggleButton
