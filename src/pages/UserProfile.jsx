import { Fragment, useContext, useEffect, useState } from 'react'
import { Link, NavLink, useParams } from "react-router-dom"
import { connect } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import { userService } from '../services/userService'
import { UserPosts } from '../cmps/UserPosts'
import { subscriptionService } from '../services/subscriptionService'
import { UserSuggestions } from '../cmps/UserSuggestions'
import { WindowDataContext } from '../App'
import { isMobileOnly } from 'react-device-detect'
import { editUser } from '../store/actions/userActions'

const _UserProfile = ({ loggedInUser, editUser }) => {

    const { username, currTab } = useParams(null)
    const [mainState, setMainState] = useState({
        user: {},
        followers: [],
        following: []
    })
    const { user, followers, following } = mainState
    const [suggestionsOpen, setSuggestionsOpen] = useState(false)
    const { windowData } = useContext(WindowDataContext)
    const isMobileWidth = windowData.windowWidth <= 735
    const userExists = Object.keys(user).length
    const isLoggedInUserPage = username === loggedInUser.username
    const isFollowedByMe = !isLoggedInUserPage &&
        followers?.some(follower => {
            return follower.byUser.username === loggedInUser.username
        })

    useEffect(() => {
        (async () => {
            setMainState({
                user: await userService.getByUsername(username),
                followers: await subscriptionService.getFollowers(username),
                following: await subscriptionService.getFollowing(username)
            })
        })()
        document.title = user.fullname ?
            `${user.fullname} (@${username}) \u2022 Instapound`
            : `${username} \u2022 Instapound`
    }, [username, user.fullname])

    const onFollowUser = async () => {
        try {
            if (isFollowedByMe || !userExists) return
            await subscriptionService.add({
                byUsername: loggedInUser.username,
                aboutUsername: username
            })
            setMainState({
                ...mainState,
                followers: await subscriptionService.getFollowers(username)
            })
        } catch (err) {
            // SNACKBAR DOCKED TO BOTTOM
        }
    }
    const onUnfollowUser = async () => {
        try {
            if (!isFollowedByMe || !userExists) return
            await subscriptionService.remove({
                byUsername: loggedInUser.username,
                aboutUsername: username
            })
            setMainState({
                ...mainState,
                followers: await subscriptionService.getFollowers(username)
            })
        } catch (err) {
            // SNACKBAR DOCKED TO BOTTOM
        }
    }

    const userStats = (
        userExists && <main className="user-stats-container flex">
            <div>
                <label className="text">
                    <span className="fw600">{user?.posts?.length}</span> posts
                </label>
            </div>
            <div>
                <label>
                    <Link to={`/${user.username}/followers/`}>
                        <span className="fw600">{followers?.length}</span> followers
                    </Link>
                </label>
            </div>
            <div>
                <label>
                    <Link to={`/${user.username}/following/`}>
                        <span className="fw600">{following?.length}</span> following
                    </Link>
                </label>
            </div>
        </main>
    )

    const gearOptionsBtnSvg = (
        <Link className="btn-options" to="/accounts/edit/">
            <svg aria-label="Options" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                <path clipRule="evenodd" d="M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5
                         0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6
                          0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5
                           1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1
                            1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1
                             1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1
                              4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3
                               1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3
                                6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z" fillRule="evenodd"></path>
            </svg>
        </Link>
    )
    const dotsOptionsBtnSvg = (
        <button className="btn-options">
            <svg aria-label="Options" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                <circle clipRule="evenodd" cx="8" cy="24" fillRule="evenodd" r="4.5"></circle>
                <circle clipRule="evenodd" cx="24" cy="24" fillRule="evenodd" r="4.5"></circle>
                <circle clipRule="evenodd" cx="40" cy="24" fillRule="evenodd" r="4.5"></circle>
            </svg>
        </button>
    )
    const mobileHeader = (
        <header className="mobile-header">
            <div>
                {isLoggedInUserPage ? gearOptionsBtnSvg : <button>
                    <span style={{ display: 'inline-block', transform: 'rotate(270deg)' }}>
                        <svg aria-label="Back" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                            <path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5
                             0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path>
                        </svg>
                    </span>
                </button>}
                <div className="fw600">
                    <NavLink to="/" exact={true} replace>{username}</NavLink>
                </div>
                <NavLink className={isLoggedInUserPage ? '' : 'hidden'} to="/explore/people/suggested/">
                    <svg aria-label="Discover People" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                        <path d="M32 25.5c5.2 0 9.5-4.3 9.5-9.5S37.2 6.5 32 6.5s-9.5 4.3-9.5 9.5 4.3 9.5 9.5 9.5zm0-16c3.6 0
                     6.5 2.9 6.5 6.5s-2.9 6.5-6.5 6.5-6.5-2.9-6.5-6.5 2.9-6.5 6.5-6.5zm5.5 19h-11c-5.5 0-10 4.5-10 10V40c0
                      .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-1.5c0-3.9 3.1-7 7-7h11c3.9 0 7 3.1 7 7V40c0 .8.7 1.5 1.5 1.5s1.5-.7
                       1.5-1.5v-1.5c0-5.5-4.5-10-10-10zm-20-4.5c0-.8-.7-1.5-1.5-1.5h-5.5V17c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5
                        1.5v5.5H2c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h5.5V31c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-5.5H16c.8 0 1.5-.7 1.5-1.5z"></path>
                    </svg>
                </NavLink>
            </div>
        </header>
    )

    return <section className="user-profile-container flex col grow">

        {isMobileOnly && mobileHeader}

        <main className="user-profile main-layout m-page">
            <header className="flex">
                <div className="user-img-container grow">
                    {userExists ? <img className="user-img" src={user.imgUrl} alt="" />
                        : <Skeleton circle height={150} width={150} />}
                </div>
                {userExists ? <div className="user-info-container flex col">
                    <header className="flex a-center">
                        <label>{user.username}</label>
                        <div className="flex a-center">
                            <div className="action-btns-container flex a-center">
                                {isLoggedInUserPage ? <button className="btn-edit-profile">
                                    <Link to="/accounts/edit/">Edit Profile</Link>
                                </button>
                                    : isFollowedByMe ? <Fragment>
                                        <button className="btn-message" aria-label="Message">Message</button>
                                        <button className="btn-unfollow" aria-label="Following" onClick={onUnfollowUser}>
                                            <span></span>
                                        </button>
                                        <button className={`btn-suggestions ${suggestionsOpen ? 'suggestions-open' : ''}`}
                                            aria-label="Suggestions" onClick={() => setSuggestionsOpen(!suggestionsOpen)}>
                                            <svg aria-label="Down Chevron Icon" fill="#262626" height="12" viewBox="0 0 48 48" width="12">
                                                <path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5
                                         0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path>
                                            </svg>
                                        </button>
                                    </Fragment>
                                        : <button className="btn-follow" aria-label="Follow" onClick={onFollowUser}>Follow</button>}
                            </div>
                            <div className="btn-options-container">
                                {isLoggedInUserPage ? (isMobileOnly ? null
                                    : gearOptionsBtnSvg)
                                    : dotsOptionsBtnSvg}
                            </div>
                        </div>
                    </header>
                    {!isMobileWidth && userStats}
                    <footer>
                        <h1>{user.fullname}</h1>
                        <span>{user.bio}</span>
                    </footer>
                </div> : <Skeleton />}
            </header>

            {suggestionsOpen && <UserSuggestions />}
            {isMobileWidth && userStats}

            <main>
                <div className="tab-switch-container flex j-center a-center">
                    <Link to={`/${user.username}/`}
                        className={`flex a-center ${!currTab ? 'active-tab' : ''}`}>
                        <svg aria-label="Posts" fill="#8e8e8e" height="12" viewBox="0 0 48 48" width="12">
                            <path clipRule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0
                     1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11
                      25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14
                       28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fillRule="evenodd"></path>
                        </svg>
                        <label>POSTS</label>
                    </Link>
                    <Link to={`/${user.username}/channel/`}
                        className={`flex a-center ${currTab === 'channel' ? 'active-tab' : ''}`}>
                        <svg aria-label="Posts" fill="#8e8e8e" height="12" viewBox="0 0 48 48" width="12">
                            <path d="M41 10c-2.2-2.1-4.8-3.5-10.4-3.5h-3.3L30.5 3c.6-.6.5-1.6-.1-2.1-.6-.6-1.6-.5-2.1.1L24 5.6 19.7
                     1c-.6-.6-1.5-.6-2.1-.1-.6.6-.7 1.5-.1 2.1l3.2 3.5h-3.3C11.8 6.5 9.2 7.9 7 10c-2.1 2.2-3.5 4.8-3.5
                      10.4v13.1c0 5.7 1.4 8.3 3.5 10.5 2.2 2.1 4.8 3.5 10.4 3.5h13.1c5.7 0 8.3-1.4 10.5-3.5 2.1-2.2 3.5-4.8
                       3.5-10.4V20.5c0-5.7-1.4-8.3-3.5-10.5zm.5 23.6c0 5.2-1.3 7-2.6 8.3-1.4 1.3-3.2 2.6-8.4 2.6H17.4c-5.2
                        0-7-1.3-8.3-2.6-1.3-1.4-2.6-3.2-2.6-8.4v-13c0-5.2 1.3-7 2.6-8.3 1.4-1.3 3.2-2.6 8.4-2.6h13.1c5.2 0 7 1.3
                         8.3 2.6 1.3 1.4 2.6 3.2 2.6 8.4v13zM34.6 25l-9.1 2.8v-3.7c0-.5-.2-.9-.6-1.2-.4-.3-.9-.4-1.3-.2l-11.1
                          3.4c-.8.2-1.2 1.1-1 1.9.2.8 1.1 1.2 1.9 1l9.1-2.8v3.7c0 .5.2.9.6 1.2.3.2.6.3.9.3.1 0 .3 0
                           .4-.1l11.1-3.4c.8-.2 1.2-1.1 1-1.9s-1.1-1.2-1.9-1z"></path>
                        </svg>
                        <label>IGTV</label>
                    </Link>
                    <Link to={`/${user.username}/saved/`}
                        className={`flex a-center ${currTab === 'saved' ? 'active-tab' : ''}`}>
                        <svg aria-label="Saved" fill="#8e8e8e" height="12" viewBox="0 0 48 48" width="12">
                            <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3
                     .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3
                      2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
                        </svg>
                        <label>SAVED</label>
                    </Link>
                    <Link to={`/${user.username}/tagged/`}
                        className={`flex a-center ${currTab === 'tagged' ? 'active-tab' : ''}`}>
                        <svg aria-label="Tagged" fill="#8e8e8e" height="12" viewBox="0 0 48 48" width="12">
                            <path d="M41.5 5.5H30.4c-.5 0-1-.2-1.4-.6l-4-4c-.6-.6-1.5-.6-2.1 0l-4 4c-.4.4-.9.6-1.4.6h-11c-3.3 0-6
                     2.7-6 6v30c0 3.3 2.7 6 6 6h35c3.3 0 6-2.7 6-6v-30c0-3.3-2.7-6-6-6zm-29.4 39c-.6 0-1.1-.6-1-1.2.7-3.2
                      3.5-5.6 6.8-5.6h12c3.4 0 6.2 2.4 6.8 5.6.1.6-.4 1.2-1 1.2H12.1zm32.4-3c0 1.7-1.3 3-3 3h-.6c-.5
                       0-.9-.4-1-.9-.6-5-4.8-8.9-9.9-8.9H18c-5.1 0-9.4 3.9-9.9 8.9-.1.5-.5.9-1 .9h-.6c-1.7 0-3-1.3-3-3v-30c0-1.7
                        1.3-3 3-3h11.1c1.3 0 2.6-.5 3.5-1.5L24 4.1 26.9 7c.9.9 2.2 1.5 3.5 1.5h11.1c1.7 0 3 1.3 3 3v30zM24
                         12.5c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6 9.6-4.3 9.6-9.6-4.3-9.6-9.6-9.6zm0 16.1c-3.6 0-6.6-2.9-6.6-6.6
                          0-3.6 2.9-6.6 6.6-6.6s6.6 2.9 6.6 6.6c0 3.6-3 6.6-6.6 6.6z"></path>
                        </svg>
                        <label>TAGGED</label>
                    </Link>
                </div>
                {!currTab ? <UserPosts username={username} />
                    : <label className="not-available muted">Not available yet...</label>}
            </main>
        </main>
    </section>
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {
    editUser
}
export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfile)