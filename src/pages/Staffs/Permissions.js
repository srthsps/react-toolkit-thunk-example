import React, { useState } from "react"

import { Container, Row, Col, Card, CardBody } from "reactstrap"


import Switch from "react-switch"

const StaffPermissions = props => {
  const switchOnColor = "#626ed4";

  const [switch1, setswitch1] = useState(true)
  const [switch2, setswitch2] = useState(true)
  const [switch3, setswitch3] = useState(true)
  const [switch4, setswitch4] = useState(true)

  return (
    <Container fluid>
      <div className="page-title-box">
        <Row className="align-items-center">
          <Col>
            <h6 className="page-title">Permissions</h6>
          </Col>
        </Row>
      </div>
      <Row className="mt-4">
        <Col>
          <Card>
            <CardBody>
              <Row className="mt-3">
                <Col>
                  <h5 className="font-size-14 mb-3">Example Permission #1</h5>
                </Col>
                <Col>
                  <Switch
                    onColor={switchOnColor}
                    onChange={() => {
                      setswitch1(!switch1)
                    }}
                    checked={switch1}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <h5 className="font-size-14 mb-3">Example Permission #2</h5>
                </Col>
                <Col>
                  <Switch
                    onColor={switchOnColor}
                    onChange={() => {
                      setswitch2(!switch2)
                    }}
                    checked={switch2}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <h5 className="font-size-14 mb-3">Example Permission #3</h5>
                </Col>
                <Col>
                  <Switch
                    onColor={switchOnColor}
                    onChange={() => {
                      setswitch3(!switch3)
                    }}
                    checked={switch3}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <h5 className="font-size-14 mb-3">Example Permission #4</h5>
                </Col>
                <Col>
                  <Switch
                    onColor={switchOnColor}
                    onChange={() => {
                      setswitch4(!switch4)
                    }}
                    checked={switch4}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default StaffPermissions
