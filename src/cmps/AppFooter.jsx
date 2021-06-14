import { connect } from "react-redux"
import { Link } from "react-router-dom"

const _AppFooter = ({ loggedInUser, homePage }) => {
    return <footer className={`app-footer main-layout ${homePage ? 'for-home-page' : ''}`}>
        <div className={`links-container flex wrap ${!homePage ? 'j-center' : ''}`}>
            <Link to="">About</Link>
            {homePage ? <Link to="">Help</Link>
                : <Link to="">Blog</Link>}
            {homePage ? <Link to="">Press</Link>
                : <Link to="">Jobs</Link>}
            {homePage ? <Link to="">API</Link>
                : <Link to="">Help</Link>}
            {homePage ? <Link to="">Jobs</Link>
                : <Link to="">API</Link>}
            <Link to="">Privacy</Link>
            <Link to="">Terms</Link>
            {homePage ? <Link to="">Locations</Link>
                : <Link to="">Top Accounts</Link>}
            {homePage ? <Link to="">Top Accounts</Link>
                : <Link to="">Hashtags</Link>}
            {homePage ? <Link to="">Hashtags</Link>
                : <Link to="">Locations</Link>}
            {homePage && <Link to="">Language</Link>}
        </div>
        <div className={`lang-copyright-container flex ${!homePage ? 'j-center' : ''}`}>
            <div className="flex a-center pointer">
                <span className="capitalize">{loggedInUser.language}</span>
                <svg aria-label="Down Chevron Icon" className="_8-yf5 " fill="#8e8e8e" height="12" viewBox="0 0 48 48" width="12">
                    <path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5
                     0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path>
                </svg>
            </div>
            <label>© {new Date().getFullYear()} Instapound not from Facebook</label>
        </div>
    </footer>
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
export const AppFooter = connect(mapStateToProps)(_AppFooter)