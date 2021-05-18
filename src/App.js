import { Fragment, useEffect } from 'react'
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

const _App = ({ loggedInUser }) => {

  return (
    <main className="App" role="main">
      {!loggedInUser ? <LoginSignup /> :
        <Fragment>
          <AppHeader />
          <Switch>
            <Route path="/about/" component={About} />
            <Route path="/activity/" component={Activity} />
            <Route path="/explore/" render={() => <Fragment>
              <Explore />
              <AppFooter />
            </Fragment>} />
            <Route path="/direct/" component={Direct} />
            <Route path="/:username/tagged/" render={() => <Fragment>
              <UserProfile currTab="tagged" />
              <AppFooter />
            </Fragment>} />
            <Route path="/:username/saved/" render={() => <Fragment>
              <UserProfile currTab="saved" />
              <AppFooter />
            </Fragment>} />
            <Route path="/:username/channel/" render={() => <Fragment>
              <UserProfile currTab="channel" />
              <AppFooter />
            </Fragment>} />
            <Route path="/:username/" render={() => <Fragment>
              <UserProfile currTab="posts" />
              <AppFooter />
            </Fragment>} />
            <Route path="/" component={Home} />
          </Switch>
        </Fragment>}
    </main >
  );
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.userModule.loggedInUser
  }
}
export const App = connect(mapStateToProps)(_App)