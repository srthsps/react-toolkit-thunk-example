import React, { useEffect } from "react"
import {
  Container,
  Row,
  Col,
  TabPane,
  Nav,
  NavLink,
  NavItem,
  TabContent,
} from "reactstrap"
import { ReactTitle } from "react-meta-tags"

import { useParams, useHistory } from "react-router-dom"

import AccountDetails from "./AccountDetails"
import ActiveRentals from "./ActiveRentals"

// import Requests from "./Requests"
// import Profile from "./Profile"
// import Transactions from "./Transactions"



const TenantDashboard = props => {
  /* {props.match.params.tenantID} */

  const tabs = [
    { title: "Account Details", route: "account-details", content: <AccountDetails /> },
    { title: "Active Rentals", route: "active-rentals", content: <ActiveRentals /> }
    // { title: "Profile", route: "profile", content: <Profile /> },
    // { title: "Transactions", route: "transactions", content: <Transactions /> },
    // { title: "Requests", route: "requests", content: <Requests /> },
  ]

  let { active_tab } = useParams()
  const history = useHistory()

  useEffect(() => {
    const defaultTab = tabs[0].route;
    if (!active_tab || !tabs.find(tab => tab.route === active_tab)) {
      history.replace(`./${defaultTab}`)
    }
  }, [])

  const toggle = tabRoute => {
    if (active_tab !== tabRoute) {
      history.push(`./${tabRoute}`);
    }
 }

  return (
    <div className="page-content">
      <ReactTitle title="Tenant Dashboard" />

      <Container fluid>
        <div className="page-title-box">
          <h6 className="page-title">Tenant Dashboard</h6>
        </div>
        <Row>
          <Col>
            <Nav tabs>
              {tabs.map(tab => (
                <NavItem key={tab.title}>
                  <NavLink
                    className={active_tab === tab.route ? "active" : ""}
                    onClick={() => {
                      toggle(tab.route)
                    }}
                    role="button"
                  >
                    {tab.title}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
            <TabContent activeTab={active_tab}>
              {tabs.map(tab => (
                <TabPane key={tab.title} tabId={tab.route}>
                  {tab.content}
                </TabPane>
              ))}
            </TabContent>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default TenantDashboard
