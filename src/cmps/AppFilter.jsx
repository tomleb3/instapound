import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
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
        setTimeout(async () =>
            setUsers(await userService.getUsers(filterTxt)), 1000)

    const clearTxt = () => setFilterTxt('')

    return <div className="filter-container">
        <form className="app-filter">
            <input type="text" className={filterTxt ? 'active' : ''} value={filterTxt} onChange={handleInput} />
            <div>
                <span></span>
                <p className={filterTxt ? 'hidden' : ''}>Search</p>
            </div>
            <button type="button" onClick={clearTxt}></button>
        </form>

        <section className={`search-results ${filterTxt ? '' : 'd-none'}`}>
            {filterTxt && <div className="dialog-background" onClick={clearTxt}></div>}
            <div className="dialog-arrow"></div>
            {users.map(user => {
                return <Link to={user.username} key={user._id} onClick={clearTxt}>
                    <img src={user.imgUrl} alt={user.username} />
                    <div className="flex col">
                        <label className="fs14 fw600 pointer">{user.username}</label>
                        <span>{user.fullname}</span>
                    </div>
                </Link>
            })}
            <div className="box-shadow"></div>
        </section>
    </div>
}