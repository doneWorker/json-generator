import { useState } from "react";
import { Container, Col, Row, Modal, Form, Button } from "react-bootstrap";
import styled from "styled-components";

import generate from "./generate";
import RenderComponent from "./components/RenderComponent";
import NumberAdditional from "./components/NumberAdditional";
import OneOfAdditional from "./components/OneOfAdditional";
import StringAdditional from "./components/StringAdditional";

import { MdRemoveCircleOutline } from "react-icons/md";

import "bootstrap/dist/css/bootstrap.min.css";

/* Styled */
const Header = styled.header`
  height: 50px;
  display: flex;
  align-items: center;
  flex-grow: 0;
`;

const $Row = styled(Row)`
  padding: 5px 0;
  margin: 5px 0;
  border: 1px solid #ccc;
  background: white;
`;

const RemoveCol = styled(Col)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 50px;
  flex-grow: 0;
  font-size: 25px;
  color: #ff5555;
`;

const typesToComponents = {
  number: NumberAdditional,
  oneof: OneOfAdditional,
  string: StringAdditional,
};

const defaultField = { name: "", type: "id" };

const GeneratorPage = () => {
  const [state, setState] = useState({
    total: 0,
    fields: [defaultField],
  });

  const [generatedJSON, setGeneratedJSON] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleAddNewField = () => {
    setState((prev) => ({
      ...prev,
      fields: [...prev.fields, defaultField],
    }));
  };

  const handleChangeFieldType = (id, type) => {
    setState((prev) => ({
      ...prev,
      fields: prev.fields.map((field, idx) =>
        idx === id ? { name: field.name, type } : field
      ),
    }));
  };

  const handleChangeFieldAdditional = (id, key, val) => {
    setState((prev) => ({
      ...prev,
      fields: prev.fields.map((field, idx) =>
        idx === id ? { ...field, [key]: val } : field
      ),
    }));
  };

  const handleChangeFieldName = (id, name) => {
    setState((prev) => ({
      ...prev,
      fields: prev.fields.map((field, idx) =>
        idx === id ? { ...field, name } : field
      ),
    }));
  };

  const handleTotalChange = (total) => {
    setState((prev) => ({ ...prev, total }));
  };

  const handleRemoveField = (id) => {
    setState((prev) => ({
      ...prev,
      fields: prev.fields.filter((f, idx) => idx !== id),
    }));
  };

  return (
    <main>
      <Header>
        <Container>
          <Row>
            <Form.Group as={Col} xs={2}>
              <Form.Control
                type="number"
                name="value"
                placeholder="Total records"
                required
                value={state.total > 0 ? state.total : null}
                onChange={(e) => handleTotalChange(parseInt(e.target.value))}
              />
            </Form.Group>
            <Col>
              <Button onClick={handleAddNewField} style={{ marginRight: 10 }}>
                + Add new field
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setGeneratedJSON(generate(state));
                  setModalIsOpen(true);
                }}
              >
                Run!
              </Button>
            </Col>
          </Row>
        </Container>
      </Header>
      <Container>
        <Form>
          {state.fields.map((field, idx) => (
            <$Row key={idx}>
              <Form.Group as={Col}>
                <Form.Label className="label">Field's name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  required
                  value={field.name}
                  onChange={({ target }) =>
                    handleChangeFieldName(idx, target.value)
                  }
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label className="label">Type</Form.Label>
                <Form.Select
                  name="type"
                  required
                  value={field.type}
                  onChange={(e) => handleChangeFieldType(idx, e.target.value)}
                >
                  <option value="id">id</option>
                  <option value="number">Number</option>
                  <option value="string">String</option>
                  <option value="oneof">One of</option>
                  <option value="object">Object</option>
                </Form.Select>
              </Form.Group>
              {
                <RenderComponent
                  Elem={typesToComponents[field.type]}
                  onChange={(key, val) =>
                    handleChangeFieldAdditional(idx, key, val)
                  }
                />
              }
              <RemoveCol>
                <MdRemoveCircleOutline onClick={() => handleRemoveField(idx)} />
              </RemoveCol>
            </$Row>
          ))}
        </Form>
      </Container>
      <Modal scrollable show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Generated JSON</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{generatedJSON}</pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setModalIsOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default GeneratorPage;
