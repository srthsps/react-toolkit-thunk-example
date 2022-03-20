import React, { useState, useRef , useEffect } from "react"
import {
  Container,
  Row,
  Col,
  CardBody,
  Card,
  Input,
  Button,
} from "reactstrap"
import SimpleBar from "simplebar-react"
import { ReactTitle } from "react-meta-tags"

import user1 from "../../assets/images/users/user-4.jpg"
import user2 from "../../assets/images/users/user-2.jpg"


// i18n
import { withTranslation } from "react-i18next"

const Support = props => {
  const currentUser = user1;

  let dummyMessages = [
    { id: 0, user: user1, time: '10:00', name: 'John', message: 'Hello' },
    { id: 1, user: user2, time: '10:00', name: 'Doe', message: 'Hey' },
    { id: 2, user: user2, time: '10:01', name: 'Doe', message: 'What\'s up?' },
    { id: 3, user: user1, time: '10:02', name: 'John', message: 'Did you know that bungee gum has the properties of both rubber and gum?' },
    { id: 4, user: user2, time: '10:02', name: 'Doe', message: '.......' },
  ];

  const [ chatMessages, setChatMessages ] = useState(dummyMessages);
  const addChatMessage = (chatMessage) => {
    if (message.trim() === "") {
      return;
    }

    setMessage("");
    setChatMessages(chatMessages => [...chatMessages, chatMessage]);
  }

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [chatMessages])

  const [ message, setMessage ] = useState("");
  const scrollRef = useRef();

  const getCurrentTime = () => {
    let date = new Date();
    return date.getHours() + ":" + date.getMinutes();
  }
  const maxHeight = '367px';

  return (
    <div className="page-content">
      <ReactTitle title="Support" />

      <Container fluid>
        <div className="page-title-box">
          <Row className="align-items-center">
            <Col>
              <h6 className="page-title">Support</h6>
            </Col>
          </Row>
        </div>

        <Row>
          <Col md={{ offset: 2, size: 8 }}>
            <Card>
              <CardBody>
                <h4 className="card-title mb-4">Chat</h4>
                <div className="chat-conversation">
                  <SimpleBar style={{ height: maxHeight }} scrollableNodeProps={{ ref: scrollRef }}>
                    <ul
                      className="conversation-list"
                      data-simplebar
                      style={{ maxHeight: maxHeight }}
                    >
                      {chatMessages.map((chatMessage) => 
                        <li className={`clearfix ${chatMessage.user === currentUser ? 'odd' : ''}`} key={chatMessage.id}>
                          <div className="chat-avatar">
                            <img
                              src={chatMessage.user}
                              className="avatar-xs rounded-circle"
                              alt="User avatar"
                            />
                            <span className="time">{chatMessage.time}</span>
                          </div>
                          <div className="conversation-text">
                            <div className="ctext-wrap">
                              <span className="user-name">{chatMessage.name}</span>
                              <p>{chatMessage.message}</p>
                            </div>
                          </div>
                        </li>
                      )}
                      
                    </ul>
                  </SimpleBar>

                  <Row className="mt-3 pt-1">
                    <Col md="9" className="chat-inputbar col-8">
                      <Input
                        type="text"
                        className="chat-input"
                        placeholder="Enter your text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </Col>
                    <Col md="3" className="chat-send col-4">
                      <div className="d-grid">
                        <Button
                          type="submit"
                          color="success"
                          className="btn-block"
                          disabled={message.trim() === ''}
                          onClick={() => addChatMessage({ 
                            id: chatMessages.length,
                            user: user1,
                            name: 'John',
                            time: getCurrentTime(),
                            message: message,
                          })}
                        >
                          Send <i className="fa fa-paper-plane ps-1" />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>)
}

export default withTranslation()(Support)