import React, { useState, useEffect } from "react"
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


import { useParams, useHistory } from "react-router-dom"

import PropertyDetails from "./PropertyDetails"
import Units from "../Units/Units"
import Transactions from "./Transactions"
import Tenants from "./Tenants"
// import MangersAndStaffs from "./MangersAndStaffs"

const PropertyDashboard = props => {
  // let [activeTab, setActiveTab] = useState(0)
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
      history.push(`${tabRoute}`);
    }
 }



  const tabs = [
    { title: "Property Details", route: 'property-details', content: <PropertyDetails /> },
    { title: "Transactions", route: 'transactions', content: <Transactions /> },
    { title: "Tenants", route: 'tenants', content: <Tenants /> },
    { title: "Units", route: 'units', content: <Units /> },
    

  ];

  return (
    <div className="page-content">
      <ReactTitle title="Property Dashboard" />

      <Container fluid>
        <div className="page-title-box">
          <Row className="align-items-center">
            <Col>
              <h6 className="page-title">Property Dashboard</h6>
            </Col>
          </Row>
        </div>
        <Row>
          {/* <Col>
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
          </Col> */}

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

export default PropertyDashboard
