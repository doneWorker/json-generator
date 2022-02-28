import { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import styled from "styled-components";

import generate from "./generate";
import ResultModal from "./components/ResultModal";
import Field from "./components/Field";

import "bootstrap/dist/css/bootstrap.min.css";

/* Styled */
const Header = styled.header`
  height: 50px;
  display: flex;
  align-items: center;
  flex-grow: 0;
`;

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
            <Field
              key={idx}
              id={idx}
              field={field}
              onChangeName={handleChangeFieldName}
              onChangeType={handleChangeFieldType}
              onChangeAdditional={handleChangeFieldAdditional}
              onRemove={handleRemoveField}
            />
          ))}
        </Form>
      </Container>
      <ResultModal
        isOpen={modalIsOpen}
        generatedJSON={generatedJSON}
        onClose={() => setModalIsOpen(false)}
      />
    </main>
  );
};

export default GeneratorPage;
