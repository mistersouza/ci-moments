import { useState, useRef, useEffect } from 'react'

export const useToggleMenu = () => {
    const [ isExpanded, setIsExpanded ] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const handleBurgerMenuClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) setIsExpanded(false)
        }
        document.onmouseup = handleBurgerMenuClick
        return () => document.onmouseup = null; 
    }, [ref])
    
    return { isExpanded, setIsExpanded, ref }; 
}
