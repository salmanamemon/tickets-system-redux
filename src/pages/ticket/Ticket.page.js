import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
//import tickets from "../../assets/data/dummy-tickets.json";
import { MessageHistory } from "../../components/message-history/MessageHistory.comp";
import { UpdateTicket } from "../../components/update-ticket/UpdateTicket.comp";
import { useParams } from "react-router-dom";
import { fetchSingleTicket, closeTicket } from "../ticket-list/ticketsAction";


// const ticket = tickets[0];
export const Ticket = () => {
  const { replyMsg } = useSelector(state => state.tickets)

  const { tId } = useParams();
  const dispatch = useDispatch();
  const { isLoading, error, selectedTicket } = useSelector(state => state.tickets);
  //const [message, setMessage] = useState("");
  //const [ticket, setTicket] = useState("");

  //const ticket = selectedTicket;
  //console.log(ticket);


  useEffect(() => {
    dispatch(fetchSingleTicket(tId))
  }, [tId, dispatch]);

  return (
    <Container>
      <Row>
        <Col>
          <PageBreadcrumb page="Ticket" />
        </Col>
      </Row>
      <Row>
        <Col>
          {isLoading && <Spinner variant="primary" animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}
          {replyMsg && <Alert variant="success">{replyMsg}</Alert>}
        </Col>
      </Row>
      <Row>
        <Col className="text-weight-bolder text-secondary">
          <div className="subject">Subject: {selectedTicket.subject}</div>
          <div className="date">Ticket Opened: {selectedTicket.openAt}</div>
          <div className="status">Status: {selectedTicket.status}</div>
        </Col>
        <Col className="text-right">
          <Button 
            variant="outline-info" 
            onClick={() => dispatch(closeTicket(tId))}
            disabled={selectedTicket.status === "closed"}
          >Close Ticket</Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>{selectedTicket.conversations && <MessageHistory msg={selectedTicket.conversations} />}</Col>
      </Row>
      <hr />

      <Row className="mt-4">
        <Col>
          <UpdateTicket id={tId}/>
        </Col>
      </Row>
    </Container>
  );
};
