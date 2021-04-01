import { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { Direct } from './pages/Direct.jsx'
import { Explore } from './pages/Explore.jsx'
import { Activity } from './pages/Activity.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { About } from './pages/About.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { loadPosts } from './store/actions/postActions.js'
import { loadSubscriptions } from './store/actions/subscriptionActions.js'

const _App = ({ loadPosts, loadSubscriptions, loggedInUser }) => {

  useEffect(() => {
    const getData = async () => {
      await loadPosts()
      await loadSubscriptions()

      // console.log('posts:', await loadPosts())
      console.log('subs:', await loadSubscriptions())
    }
    getData()
  }, [])

  return (
    <main className="App" role="main">
      {!loggedInUser ? <LoginSignup /> :
        <Fragment>
          <AppHeader />
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/activity" component={Activity} />
            <Route path="/explore" component={Explore} />
            <Route path="/direct" component={Direct} />
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
const mapDispatchToProps = {
  loadPosts,
  loadSubscriptions,
}
export const App = connect(mapStateToProps, mapDispatchToProps)(_App)