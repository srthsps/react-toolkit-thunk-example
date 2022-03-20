import React, { useState } from "react"
import classnames from "classnames"
import {
  Container,
  Row,
  Col,
  TabPane,
  Nav,
  NavLink,
  NavItem,
  TabContent
} from "reactstrap"
import { ReactTitle } from "react-meta-tags"

// i18n
import { withTranslation } from "react-i18next"

import LandlordRequests from "./Requests"
import Profile from "./Profile"
import Transactions from "./Transactions"
import LandlordDetails from "./AccountDetails"

const LandlordDashboard = props => {
  let [activeTab, setActiveTab] = useState(0)

  let toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const tabs = [
    { title: "Account Details", component: LandlordDetails },
    { title: "Profile", component: Profile },
    { title: "Transactions", component: Transactions },
    { title: "Requests", component: LandlordRequests }
  ];

  // const tabs = [
  //   { title: "Account Details", route: '/first'},
  //   { title: "Profile", route: '/second' },
  //   { title: "Transactions", route: '/third' },
  //   { title: "Requests", route: '/fourth' }
  // ];

  return (
    <div className="page-content">
      <ReactTitle title="Landlord Dashboard" />

      <Container fluid>
        <div className="page-title-box">
          <Row className="align-items-center">
            <Col>
              <h6 className="page-title">Landlord Dashboard</h6>
            </Col>
          </Row>
        </div>
        <Row>
          <Col>
            <Nav tabs>
              {tabs.map((tab, index) => 
                <NavItem key={index}>
                  <NavLink
                    className={classnames({
                      active: activeTab === index,
                    })}
                    onClick={() => toggle(index)}
                  >
                    {tab.title}
                  </NavLink>
                </NavItem>
              )}
            </Nav>

            <TabContent activeTab={activeTab} className="p-3 text-muted">
              {tabs.map((tab, index) => 
                <TabPane tabId={index} key={tab.title}>
                  <tab.component />
                </TabPane>
              )}
            </TabContent>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default withTranslation()(LandlordDashboard)
