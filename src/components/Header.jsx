import { Container, Col, Row, Form, Button } from "react-bootstrap";
import styled from "styled-components";

const $Header = styled.header`
  height: 55px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-grow: 0;
  background: white;
  box-shadow: 0 0 11px var(--bs-blue);
`;

const Header = ({ total, onTotalChange, onAddNewField, onRun }) => (
  <$Header>
    <Container>
      <Row>
        <Col xs={5} md={2}>
          <Button onClick={onAddNewField} style={{ marginRight: 10 }}>
            + Add new field
          </Button>
        </Col>
        <Form.Group as={Col} xs={4} md={{ span: 2, offset: 6 }}>
          <Form.Control
            type="number"
            name="value"
            placeholder="Total records"
            required
            value={total > 0 ? total : ""}
            onChange={(e) => onTotalChange(parseInt(e.target.value, 10))}
          />
        </Form.Group>
        <Col xs={2}>
          <Button variant="primary" onClick={onRun}>
            Run!
          </Button>
        </Col>
      </Row>
    </Container>
  </$Header>
);

export default Header;
