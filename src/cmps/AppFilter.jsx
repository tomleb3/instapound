import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { userService } from '../services/userService'

export const AppFilter = () => {

    const [filterTxt, setFilterTxt] = useState('')
    const [isLoading, toggleIsLoading] = useState(false)
    const [users, setUsers] = useState([])
    const usersExist = users && users.length

    useEffect(() => {
        filterTxt ? debounce(onFilter) : clearUsers()
    }, [filterTxt])

    useEffect(() =>
        toggleIsLoading(false), [users])

    const debounce = (func, delay = 750) => {
        toggleIsLoading(true)
        setTimeout(() => func(), delay)
    }

    const handleInput = ev =>
        setFilterTxt(ev.target.value)

    const onFilter = async () =>
        setUsers(await userService.getUsers(filterTxt))

    const clearTxt = () => setFilterTxt('')
    const clearUsers = () => setUsers([])

    let loadSpinnerSvgs = (
        <svg aria-label="Loading..." viewBox="0 0 100 100">
            <rect fill="#555555" height="10" opacity="0" rx="5" ry="5" transform="rotate(-90 50 50)" width="28" x="67" y="45"></rect>
            <rect fill="#555555" height="10" opacity="0.125" rx="5" ry="5" transform="rotate(-45 50 50)" width="28" x="67" y="45"></rect>
            <rect fill="#555555" height="10" opacity="0.25" rx="5" ry="5" transform="rotate(0 50 50)" width="28" x="67" y="45"></rect>
            <rect fill="#555555" height="10" opacity="0.375" rx="5" ry="5" transform="rotate(45 50 50)" width="28" x="67" y="45"></rect>
            <rect fill="#555555" height="10" opacity="0.5" rx="5" ry="5" transform="rotate(90 50 50)" width="28" x="67" y="45"></rect>
            <rect fill="#555555" height="10" opacity="0.625" rx="5" ry="5" transform="rotate(135 50 50)" width="28" x="67" y="45"></rect>
            <rect fill="#555555" height="10" opacity="0.75" rx="5" ry="5" transform="rotate(180 50 50)" width="28" x="67" y="45"></rect>
            <rect fill="#555555" height="10" opacity="0.875" rx="5" ry="5" transform="rotate(225 50 50)" width="28" x="67" y="45"></rect>
        </svg>
    )

    return <div className="filter-container">
        <form className="app-filter">
            <input type="text" className={filterTxt ? 'active' : ''} value={filterTxt} onChange={handleInput} />
            <div>
                <span></span>
                <p className={filterTxt ? 'hidden' : ''}>Search</p>
            </div>
            {isLoading ? <span className="load-spinner">{loadSpinnerSvgs}</span>
                : <button className="btn-clear" type="button" onClick={clearTxt}></button>}
        </form>

        <section className={`search-results ${filterTxt ? (usersExist ? '' : 'flex j-center a-center') : 'd-none'}`}>
            {filterTxt && <div className="dialog-background" onClick={clearTxt}></div>}
            <div className="dialog-arrow"></div>
            {usersExist ? users.map(user => {
                return <Link to={user.username} key={user._id} onClick={clearTxt}>
                    <img src={user.imgUrl} alt={user.username} />
                    <div className="flex col">
                        <label className="fs14 fw600 pointer">{user.username}</label>
                        <span>{user.fullname}</span>
                    </div>
                </Link>
            })
                : !isLoading && <div className="no-results">No results found.</div>}
            <div className="box-shadow"></div>
        </section>
    </div>
}