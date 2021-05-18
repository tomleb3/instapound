import { useEffect, useState } from "react"
import { userService } from '../services/userService'

export const AppFilter = () => {

    const [filterTxt, setFilterTxt] = useState('')
    const [users, setUsers] = useState([])

    useEffect(() => {
        onFilter()
    }, [filterTxt])

    const handleInput = ev =>
        setFilterTxt(ev.target.value)

    const onFilter = () =>
        setTimeout(async () => setUsers(await userService.getUsers(filterTxt)), 500)

    const clearTxt = () => setFilterTxt('')

    console.log(users)
    return <form className="app-filter">
        <input type="text" className={filterTxt ? 'active' : ''} value={filterTxt} onChange={handleInput} />
        <div>
            <span></span>
            <p className={filterTxt ? 'hidden' : ''}>Search</p>
        </div>
        <button onClick={clearTxt}></button>
    </form>
}