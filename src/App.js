import PropTypes from 'prop-types'
import React, { useEffect } from "react"

import { BrowserRouter as Router, Switch } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
// import "./assets/scss/bootstrap-dark.scss";
// import "./assets/scss/app-dark.scss";

// import "./assets/scss/bootstrap.scss";
// import "./assets/scss/app.scss";

// import "./assets/scss/theme.scss"



import Loading from "./components/CommonForBoth/Loading"

const LightTheme = React.lazy(() => import('./components/Common/Light'));
const DarkTheme = React.lazy(() => import('./components/Common/Dark'));

const App = props => {

  console.log("initial props", props)

  function getLayout() {
    let layoutCls = VerticalLayout
    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const Layout = getLayout()

  let option = false

  // useEffect(()=>{
  // },[props.layout.leftSideBarTheme])

  return (
     <React.Suspense fallback={<Loading />}>
    <Router basename="/property/downtown">
    {/* {props.layout.leftSideBarTheme === 'dark' && <LightTheme /> }
    {props.layout.leftSideBarTheme === 'light' && <DarkTheme />}
    {console.log(props.layout.leftSideBarTheme)} */}
      <Switch>
        {authRoutes.map((route, idx) => (
          <Authmiddleware
            path={route.path}
            layout={NonAuthLayout}
            component={route.component}
            key={idx}
            isAuthProtected={false}
          />
        ))}

        {userRoutes.map((route, idx) => (
          
          <Authmiddleware
            path={route.path}
            layout={Layout}
            component={route.component}
            key={idx}
            isAuthProtected={true}
            exact
          />
         
        ))}
       
      </Switch>
    </Router>
    </React.Suspense>
  )
}

App.propTypes = {
  layout: PropTypes.any
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}


export default connect(mapStateToProps, null)(App)
