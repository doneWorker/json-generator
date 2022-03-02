import { Container, Col, Row, Form, Button } from "react-bootstrap";
import styled from "styled-components";

const $Header = styled.header`
  height: 50px;
  display: flex;
  align-items: center;
  flex-grow: 0;
`;

const Header = ({ total, onTotalChange, onAddNewField, onRun }) => (
  <$Header>
    <Container>
      <Row>
        <Form.Group as={Col} xs={2}>
          <Form.Control
            type="number"
            name="value"
            placeholder="Total records"
            required
            value={total > 0 ? total : ""}
            onChange={(e) => onTotalChange(parseInt(e.target.value, 10))}
          />
        </Form.Group>
        <Col>
          <Button onClick={onAddNewField} style={{ marginRight: 10 }}>
            + Add new field
          </Button>
          <Button variant="primary" onClick={onRun}>
            Run!
          </Button>
        </Col>
      </Row>
    </Container>
  </$Header>
);

export default Header;
