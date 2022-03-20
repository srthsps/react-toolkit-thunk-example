import React, { useState, useEffect } from "react"
import classnames from "classnames"
import UnitDetails from "./UnitDetails"
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

import UnitRequests from "./Requests"
import TransferOwnership from "./TransferOwnership"
import Agreements from "./Agreements"

import { useParams, useHistory } from "react-router-dom"

// i18n
import { withTranslation } from "react-i18next"

const PropertyUnitDashboard = props => {
  let [activeTab, setActiveTab] = useState(0)

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

  // let toggle = tab => {
  //   if (activeTab !== tab) {
  //     setActiveTab(tab)
  //   }
  // }

  // const tabs = ["Unit Details", "Requests", "Agreement", "Transfer"];

  const tabs = [
    { title: "Unit Details", route:'unit-details', content: <UnitDetails /> },
    { title: "Requests", route: 'requests', content: <UnitRequests /> },
    { title: "Agreement", route: 'agreement', content: <Agreements /> },
    { title: "Transfer", route: 'transfer', content: <TransferOwnership /> },
  ];

  return (
    <div className="page-content mt-5">
      <ReactTitle title="Unit Dashboard" />

      <Container fluid>
        <div className="page-title-box">
          <Row className="align-items-center">
            <Col>
              <h6 className="page-title">Unit Dashboard</h6>
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
                    {tab}
                  </NavLink>
                </NavItem>
              )}
            </Nav>

            <TabContent activeTab={activeTab} className="p-3 text-muted">
              <TabPane tabId={0}>
                <UnitDetails />
              </TabPane>
              <TabPane tabId={1}>
                <UnitRequests />
              </TabPane>
              <TabPane tabId={2}>
                <Agreements />
              </TabPane>
              <TabPane tabId={3}>
                <TransferOwnership />
              </TabPane>
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

export default withTranslation()(PropertyUnitDashboard)
