import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { userService } from '../services/userService'
import {
    login,
    signup,
} from '../store/actions/userActions'
// import { socketService } from '../services/socketService'

const _LoginSignup = ({ loggedInUser, login, signup }) => {

    const CLOUDINARY_BASE_URL = process.env.REACT_APP_CLOUDINARY_BASE_URL
    const currPage = useLocation().pathname
    const [loginCred, setLoginCred] = useState({ username: '', password: '' })
    const [signupCred, setSignupCred] = useState({
        email: '',
        fullname: '',
        username: '',
        password: ''
    })
    const [signupCredCheck, setSignupCredCheck] = useState({
        emailOk: false,
        usernameOk: false,
        passwordOk: false,

        emailChecked: false,
        usernameChecked: false,
        passwordChecked: false
    })
    const [userPrefs, setUserPrefs] = useState({
        language: 'english',
        showPassword: false,
        darkMode: false
    })
    const [userMsg, setUserMsg] = useState({
        show: false,
        txt: ''
    })

    useEffect(() => {
        window.scrollTo(0, 0)
        if (loggedInUser) return <Redirect to="/"></Redirect> // Might now work, check in later stage
    }, [loggedInUser])

    const loginHandleChange = ev => {
        const { name, value } = ev.target
        setLoginCred({
            ...loginCred,
            [name]: value
        })
    }
    const signupHandleChange = ev => {
        const { name, value } = ev.target
        setSignupCred({
            ...signupCred,
            [name]: value
        })
    }

    const doLogin = async ev => {
        ev.preventDefault()
        try {
            await login(loginCred)
            if (localStorage['loggedInUser']) {
                // socketService.emit('LOGIN', loggedInUser)
                return <Redirect to="/"></Redirect>
            }
        } catch (err) {
            return setUserMsg({ show: true, txt: err.response.data.errMsg })
        }
    }
    const doSignup = async ev => {
        ev.preventDefault()
        try {
            await signup(signupCred)
            if (localStorage['loggedInUser']) return <Redirect to="/"></Redirect>
        }
        catch (err) {
            return setUserMsg({ show: true, txt: err.response.data.errMsg })
        }
    }

    const onCredCheck = async () => {
        try {
            const credCheck = await userService.checkCreds(signupCred)
            setSignupCredCheck(credCheck)
            setUserMsg({ ...userMsg, txt: credCheck.errMsg })
        } catch (err) {
            console.log(err)
        }
    }

    let signupSection = (
        <form className="frm-signup flex col" onSubmit={doSignup}>
            <div className="logo">Instapound</div>
            <h2>Sign up to see photos and videos from your friends.</h2>
            <button type="button" className="btn-action active flex j-center a-center">
                <span className="facebook-icon"></span>
                <label className="pointer">Log in with Facebook</label>
            </button>
            <div className="divider-container flex a-center">
                <div></div>
                <span>or</span>
                <div></div>
            </div>
            <div className="input-container">
                <span className={signupCred.email && 'on-top'}>Email</span>
                <input
                    type="text" name="email"
                    className={signupCred.email && 'while-typing'}
                    value={signupCred.email}
                    onChange={signupHandleChange}
                    onBlur={onCredCheck}
                />
                <div className="input-righthand-container">
                    {signupCred.email && signupCredCheck.emailChecked && <span
                        className={`indication-icon ${signupCredCheck.emailOk
                            ? 'icon-ok' : 'icon-err'}`}></span>}
                </div>
            </div>
            <div className="input-container">
                <span className={signupCred.fullname && 'on-top'}>Full Name</span>
                <input
                    type="text" name="fullname"
                    className={signupCred.fullname && 'while-typing'}
                    value={signupCred.fullname}
                    onChange={signupHandleChange}
                />
            </div>
            <div className="input-container">
                <span className={signupCred.username && 'on-top'}>Username</span>
                <input
                    type="text" name="username"
                    className={signupCred.username && 'while-typing'}
                    value={signupCred.username}
                    onChange={signupHandleChange}
                    onBlur={onCredCheck}
                />
                <div className="input-righthand-container">
                    {signupCred.username && signupCredCheck.usernameChecked && <span
                        className={`indication-icon ${signupCredCheck.usernameOk ? 'icon-ok' : 'icon-err'}`}></span>}
                </div>
            </div>
            <div className="input-container">
                <span className={signupCred.password && 'on-top'}>Password</span>
                <input
                    type={userPrefs.showPassword ? "text" : "password"} name="password"
                    className={signupCred.password && 'while-typing'}
                    value={signupCred.password}
                    onChange={signupHandleChange}
                    onBlur={onCredCheck}
                />
                <div className="input-righthand-container">
                    {signupCred.password && signupCredCheck.emailChecked && <span
                        className={`indication-icon ${signupCredCheck.passwordOk ? 'icon-ok' : 'icon-err'}`}></span>}
                    {signupCred.password && <button type="button" className="show-password"
                        onClick={() => setUserPrefs({ ...userPrefs, showPassword: !userPrefs.showPassword })}>
                        {userPrefs.showPassword ? 'Hide' : 'Show'}</button>}
                </div>
            </div>
            <button className={`btn-action ${signupCred.email &&
                signupCred.username && signupCred.password.length >= 6 ? 'active' : ''}`}
                type="submit">Sign Up</button>
            {userMsg.show && <p className="user-msg">{userMsg.txt}</p>}
            <div className="terms-container">
                <p>By signing up, you agree to our&nbsp;
                <a href="https://www.google.com/">Terms</a>,&nbsp;
                <a href="https://www.google.com/">Data Policy</a>
                &nbsp;and&nbsp;
                <a href="https://www.google.com/">Cookies Policy</a>&nbsp;.
            </p>
            </div>
        </form>
    )
    let loginSection = (
        <form className="frm-login flex col" onSubmit={doLogin}>
            <div className="logo">Instapound</div>
            <div className="input-container">
                <span className={loginCred.username && 'on-top'}>Username or email</span>
                <input
                    type="text" name="username"
                    className={loginCred.username && 'while-typing'}
                    value={loginCred.username}
                    onChange={loginHandleChange}
                />
            </div>
            <div className="input-container">
                <span className={loginCred.password && 'on-top'}>Password</span>
                <input
                    type={userPrefs.showPassword ? "text" : "password"} name="password"
                    className={loginCred.password && 'while-typing'}
                    value={loginCred.password}
                    onChange={loginHandleChange}
                />
                <div className="input-righthand-container">
                    {loginCred.password && <button type="button" className="show-password"
                        onClick={() => setUserPrefs({ ...userPrefs, showPassword: !userPrefs.showPassword })}>
                        {userPrefs.showPassword ? 'Hide' : 'Show'}</button>}
                </div>
            </div>
            <button className={`btn-action ${loginCred.username && loginCred.password.length >= 6 && 'active'}`}
                type="submit">Log In</button>
            <div className="divider-container flex a-center">
                <div></div>
                <span>or</span>
                <div></div>
            </div>
            <div className="with-facebook-container flex a-center">
                <span></span>
                <Link href="/">Log in with Facebook</Link>
            </div>
            {userMsg.show && <p className="user-msg">{userMsg.txt}</p>}
            <a href="https://www.google.com/" className="forgot-pass">Forgot password?</a>
        </form>
    )
    let forgotPassword = (
        <form className="frm-forgotpass flex col">

        </form>
    )

    return <main className="login-signup flex col">
        <section className="content-top flex grow">
            <article className="phones-img">
                <div>
                    <img src={`${CLOUDINARY_BASE_URL}/loginSignup-page/phones-img5_wpcyae.jpg`} alt="" />
                    <img src={`${CLOUDINARY_BASE_URL}/loginSignup-page/phones-img4_qjacpo.jpg`} alt="" />
                    <img src={`${CLOUDINARY_BASE_URL}/loginSignup-page/phones-img3_o7xr3m.jpg`} alt="" />
                    <img src={`${CLOUDINARY_BASE_URL}/loginSignup-page/phones-img2_yo9eld.jpg`} alt="" />
                    <img src={`${CLOUDINARY_BASE_URL}/loginSignup-page/phones-img1_zlmfti.jpg`} alt="" />
                </div>
            </article>
            <article className="right-panel flex col j-center a-center">
                {(!loggedInUser && currPage !== '/signup') && loginSection}
                {(!loggedInUser && currPage === '/signup') && signupSection}
                <div className="page-switch-container flex j-center">
                    {currPage === '/signup' ? <p>Have an account?&nbsp;<Link to="/login" onClick={() => setUserMsg({ show: false, txt: '' })}>Log in</Link></p>
                        : <p>Don't have an account?&nbsp;<Link to="/signup" onClick={() => setUserMsg({ show: false, txt: '' })}>Sign up</Link></p>}
                </div>
                <label>Get the app.</label>
                <div className="app-stores-container">
                    <a href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&amp;ct=igweb.loginPage.badge&amp;mt=8&amp;vt=lo">
                        <img className="pointer" alt=""
                            src={`${CLOUDINARY_BASE_URL}/loginSignup-page/apple-appstore_iciokc.png`} />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.instagram.android&amp;
                referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3DF25EDB58
                -AFC5-43F9-B6D3-EFB6C7309776%26utm_content%3Dlo%26utm_medium%3Dbadge">
                        <img className="pointer" alt=""
                            src={`${CLOUDINARY_BASE_URL}/loginSignup-page/android-googleplay_c0bp6g.png`} />
                    </a>
                </div>
            </article>
        </section>
        <section className="content-bottom">
            <article className="links-container">
                <div className="flex wrap j-center">
                    <a href="https://www.google.com/">About</a>
                    <a href="https://www.google.com/">Blog</a>
                    <a href="https://www.google.com/">Jobs</a>
                    <a href="https://www.google.com/">Help</a>
                    <a href="https://www.google.com/">API</a>
                    <a href="https://www.google.com/">Privacy</a>
                    <a href="https://www.google.com/">Terms</a>
                    <a href="https://www.google.com/">Top Accounts</a>
                    <a href="https://www.google.com/">Hashtags</a>
                    <a href="https://www.google.com/">Locations</a>
                </div>
                <div className="flex wrap j-center">
                    <a href="https://www.google.com/">Beauty</a>
                    <a href="https://www.google.com/">Dance & Performance</a>
                    <a href="https://www.google.com/">Fitness</a>
                    <a href="https://www.google.com/">Food & Drink</a>
                    <a href="https://www.google.com/">Home & Garden</a>
                    <a href="https://www.google.com/">Music</a>
                    <a href="https://www.google.com/">Visual Arts</a>
                </div>
            </article>
            <article className="lang-copyright-container flex j-center">
                <div className="flex a-center pointer">
                    <span className="capitalize">{userPrefs.language}</span>
                    <svg aria-label="Down Chevron Icon" className="_8-yf5 " fill="#8e8e8e" height="12" viewBox="0 0 48 48" width="12">
                        <path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5
                     0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path>
                    </svg>
                </div>
                <label>© {new Date().getFullYear()} Instapound not from Facebook</label>
            </article>
        </section>
    </main>
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {
    login,
    signup,
}
export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)