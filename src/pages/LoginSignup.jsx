import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, useLocation } from 'react-router-dom'

import { userService } from '../services/userService'
import {
    login,
    signup,
} from '../store/actions/userActions'
// import { socketService } from '../services/socketService'

const _LoginSignup = ({ loggedInUser, login, signup, }) => {

    const cloudinaryBaseUrl = process.env.REACT_APP_CLOUDINARY_BASE_URL
    const currPage = useLocation().pathname
    const [userMsg, setUserMsg] = useState('')
    const [loginCred, setLoginCred] = useState({ username: '', password: '' })
    const [signupCred, setSignupCred] = useState({
        email: '',
        fullname: '',
        username: '',
        password: ''
    })
    const [signupCredCheck, setSignupCredCheck] = useState({
        emailChecked: false,
        usernameChecked: false,
        passwordChecked: false,
        emailIsValid: false,
        emailIsTaken: false,
        usernameIsTaken: false,
        passwordIsValid: false,
        connectionOk: true
    })
    const [userPrefs, setUserPrefs] = useState({
        lang: 'english',
        showPassword: false,
        darkMode: false
    })

    useEffect(() => {
        window.scrollTo(0, 0)
        if (loggedInUser) return <Redirect to="/"></Redirect> // Might now work, check in later stage
    }, [])

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
        let { username, password } = loginCred
        if (!username || !password) return setUserMsg('Please enter user/password')
        // email = email.toLowerCase()
        const userCreds = { username, password }
        try {
            await login(userCreds)
            if (localStorage['loggedInUser']) {
                // socketService.emit('LOGIN', loggedInUser)
                return <Redirect to="/"></Redirect>
            }
        } catch (err) {
            return await setUserMsg('Login failed, try again.')
        }
    }
    const doSignup = async ev => {
        ev.preventDefault()
        let { email, username, password, fullname } = signupCred
        if (!email || !username || !password || !fullname) return setUserMsg('All inputs are required')
        email = email.toLowerCase()

        try {
            await signup(signupCred)
            if (localStorage['loggedInUser']) return <Redirect to="/"></Redirect>
        }
        catch (err) {
            return await setUserMsg('Signup failed, try again.')
        }
    }

    const onCheckEmail = async () => {
        try {
            setSignupCredCheck({ ...signupCredCheck, emailChecked: false })
            var emailPattern = new RegExp
                (/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
            const isEmailValid = emailPattern.test(signupCred.email)
            const isEmailTaken = await userService.checkEmail(signupCred)
            setSignupCredCheck({
                ...signupCredCheck,
                emailIsValid: isEmailValid,
                emailIsTaken: isEmailTaken,
                emailChecked: true
            })
        } catch (err) {
            setSignupCredCheck({
                ...signupCredCheck,
                connectionOk: false
            })
        }
    }
    const onCheckUsername = async () => {
        try {
            setSignupCredCheck({ ...signupCredCheck, usernameChecked: false })
            const isUsernameTaken = await userService.checkUsername(signupCred)
            setSignupCredCheck({
                ...signupCredCheck,
                isUsernameTaken: isUsernameTaken,
                usernameChecked: true
            })
        } catch (err) {
            setSignupCredCheck({
                ...signupCredCheck,
                connectionOk: false
            })
        }
    }
    const onCheckPassword = () => {
        setSignupCredCheck({ ...signupCredCheck, passwordChecked: false })
        const isPasswordValid = signupCred.password.length >= 6
        setSignupCredCheck({
            ...signupCredCheck,
            passwordIsValid: isPasswordValid,
            passwordChecked: true
        })
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
                    onBlur={onCheckEmail}
                />
                <div className="input-righthand-container">
                    {signupCred.email && signupCredCheck.emailChecked && <span
                        className={`indication-icon ${signupCredCheck.emailIsValid &&
                            !signupCredCheck.emailIsTaken ? 'icon-ok' : 'icon-err'}`}></span>}
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
                    onBlur={onCheckUsername}
                />
                <div className="input-righthand-container">
                    {signupCred.username && signupCredCheck.usernameChecked && <span
                        className={`indication-icon ${signupCredCheck.isUsernameTaken ? 'icon-err' : 'icon-ok'}`}></span>}
                </div>
            </div>
            <div className="input-container">
                <span className={signupCred.password && 'on-top'}>Password</span>
                <input
                    type={userPrefs.showPassword ? "text" : "password"} name="password"
                    className={signupCred.password && 'while-typing'}
                    value={signupCred.password}
                    onChange={signupHandleChange}
                    onBlur={onCheckPassword}
                />
                <div className="input-righthand-container">
                    {signupCred.password && signupCredCheck.passwordChecked && <span
                        className={`indication-icon ${signupCredCheck.passwordIsValid ? 'icon-ok' : 'icon-err'}`}></span>}
                    {signupCred.password && <button type="button" className="show-password"
                        onClick={() => setUserPrefs({ ...userPrefs, showPassword: !userPrefs.showPassword })}>
                        {userPrefs.showPassword ? 'Hide' : 'Show'}</button>}
                </div>
            </div>
            <button className={`btn-action ${signupCred.email &&
                signupCred.username && signupCred.password.length >= 6 ? 'active' : ''}`}
                type="submit">Sign Up</button>
            <div className="terms-container">
                <p>By signing up, you agree to our&nbsp;
                <a href="">Terms</a>,&nbsp;
                <a href="">Data Policy</a>
                &nbsp;and&nbsp;
                <a href="">Cookies Policy</a>&nbsp;.
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
                <a href="">Log in with Facebook</a>
            </div>
            <p className="clr-red fs14">{userMsg}</p>
            <a href="" className="forgot-pass">Forgot password?</a>
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
                    <img src={`${cloudinaryBaseUrl}/loginSignup-page/phones-img5_wpcyae.jpg`} alt="" />
                    <img src={`${cloudinaryBaseUrl}/loginSignup-page/phones-img4_qjacpo.jpg`} alt="" />
                    <img src={`${cloudinaryBaseUrl}/loginSignup-page/phones-img3_o7xr3m.jpg`} alt="" />
                    <img src={`${cloudinaryBaseUrl}/loginSignup-page/phones-img2_yo9eld.jpg`} alt="" />
                    <img src={`${cloudinaryBaseUrl}/loginSignup-page/phones-img1_zlmfti.jpg`} alt="" />
                </div>
            </article>
            <article className="right-panel flex col j-center a-center">
                {(!loggedInUser && currPage !== '/signup') && loginSection}
                {(!loggedInUser && currPage === '/signup') && signupSection}
                <div className="page-switch-container flex j-center">
                    {currPage === '/signup' ? <p>Have an account?&nbsp;<Link to="/login">Log in</Link></p>
                        : <p>Don't have an account?&nbsp;<Link to="/signup">Sign up</Link></p>}
                </div>
                <label>Get the app.</label>
                <div className="app-stores-container">
                    <a href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&amp;ct=igweb.loginPage.badge&amp;mt=8&amp;vt=lo">
                        <img className="pointer" alt=""
                            src={`${cloudinaryBaseUrl}/loginSignup-page/apple-appstore_iciokc.png`} />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.instagram.android&amp;
                referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3DF25EDB58
                -AFC5-43F9-B6D3-EFB6C7309776%26utm_content%3Dlo%26utm_medium%3Dbadge">
                        <img className="pointer" alt=""
                            src={`${cloudinaryBaseUrl}/loginSignup-page/android-googleplay_c0bp6g.png`} />
                    </a>
                </div>
            </article>
        </section>
        <section className="content-bottom">
            <article className="links-container">
                <div className="flex wrap j-center">
                    <a href="">About</a>
                    <a href="">Blog</a>
                    <a href="">Jobs</a>
                    <a href="">Help</a>
                    <a href="">API</a>
                    <a href="">Privacy</a>
                    <a href="">Terms</a>
                    <a href="">Top Accounts</a>
                    <a href="">Hashtags</a>
                    <a href="">Locations</a>
                </div>
                <div className="flex wrap j-center">
                    <a href="">Beauty</a>
                    <a href="">Dance & Performance</a>
                    <a href="">Fitness</a>
                    <a href="">Food & Drink</a>
                    <a href="">Home & Garden</a>
                    <a href="">Music</a>
                    <a href="">Visual Arts</a>
                </div>
            </article>
            <article className="lang-copyright-container flex j-center">
                <div className="flex a-center pointer">
                    <span className="capitalize">{userPrefs.lang}</span>
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