import React, { useState } from "react"
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

import StaffProfile from "./Profile"
import StaffPermissions from "./Permissions"


const UserDashboard = props => {
  /* {props.match.params.tenantID} */

  let [activeTab, setActiveTab] = useState(0)
  const tabs = [
    { title: "Profile", component: StaffProfile },
    { title: "Permissions", component: StaffPermissions }
  ];

  return (
    <div className="page-content">
      <ReactTitle title="Staff Dashboard" />

      <Container fluid>
        <div className="page-title-box">
          <h6 className="page-title">Staff Dashboard</h6>
        </div>
        <Row>
          <Col>
            <Nav tabs>
              {tabs.map((tab, index) =>
                <NavItem key={index}>
                  <NavLink
                    className={`${activeTab == index ? 'active' : ''}`}
                    onClick={() => setActiveTab(index)}
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

export default UserDashboard
