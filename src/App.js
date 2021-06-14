import { createContext, Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { Direct } from './pages/Direct.jsx'
import { Explore } from './pages/Explore.jsx'
import { Activity } from './pages/Activity.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { UserProfile } from './pages/UserProfile.jsx'
import { About } from './pages/About.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { PostDetails } from './pages/PostDetails.jsx'
import { MobileDock } from './cmps/MobileDock.jsx'
import { isMobileOnly } from 'react-device-detect'
import { CreatePostDetails } from './pages/CreatePostDetails.jsx'
import { CreatePostStyle } from './pages/CreatePostStyle.jsx'

export const WindowDataContext = createContext(null)

const _App = ({ loggedInUser }) => {

  const [windowData, setWindowData] = useState({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  })

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleResize = () => {
    setWindowData({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    })
  }

  return (
    <main className="App flex col fill" role="main">
      <WindowDataContext.Provider value={{ windowData }}>
        {!loggedInUser ? <LoginSignup /> :
          <Fragment>
            {!isMobileOnly && <AppHeader />}
            <Switch>

              <Route path="/p/:id/" render={() => <Fragment>
                <PostDetails />
                {!isMobileOnly && <AppFooter />}
              </Fragment>} />

              <Route path="/about/" component={About} />

              <Route path="/activity/" component={Activity} />

              <Route path="/explore/" render={() => <Fragment>
                <Explore />
                {!isMobileOnly && <AppFooter />}
              </Fragment>} />

              <Route path="/direct/" component={Direct} />

              <Route path="/create/details/" component={CreatePostDetails} />

              <Route path="/create/style/" component={CreatePostStyle} />

              <Route path="/:username/:currTab?/" render={() => <Fragment>
                <UserProfile />
                {!isMobileOnly && <AppFooter />}
              </Fragment>} />

              <Route path="/" exact component={Home} />
              
            </Switch>
            {isMobileOnly && <MobileDock />}
          </Fragment>}
      </WindowDataContext.Provider>
    </main>
  )
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.userModule.loggedInUser
  }
}
export const App = connect(mapStateToProps)(_App)