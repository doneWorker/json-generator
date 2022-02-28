import { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { nanoid } from "nanoid";

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

const createDefaultField = () => ({ name: "", type: "id", id: nanoid() });

const GeneratorPage = () => {
  const [state, setState] = useState({
    total: 0,
    fields: [createDefaultField()],
  });

  const [generatedJSON, setGeneratedJSON] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleAddNewField = () => {
    setState((prev) => ({
      ...prev,
      fields: [...prev.fields, createDefaultField()],
    }));
  };

  const handleChangeFieldType = (id, type) => {
    setState((prev) => ({
      ...prev,
      fields: prev.fields.map((field) =>
        field.id === id ? { name: field.name, type } : field
      ),
    }));
  };

  // TODO: decompose
  const handleChangeFieldAdditional = (id, key, val) => {
    setState((prev) => {
      const addFieldKey = "add-to-object";

      const changeKeyMapper = (field) =>
        field.id === id ? { ...field, [key]: val } : field;

      const addFieldMapper = (field) =>
        field.id === id
          ? {
              ...field,
              children: field.children
                ? [...field.children, createDefaultField()]
                : [createDefaultField()],
            }
          : field;

      const mapper = key === addFieldKey ? addFieldMapper : changeKeyMapper;

      return {
        ...prev,
        fields: prev.fields.map(mapper),
      };
    });
  };

  const handleChangeFieldName = (id, name) => {
    setState((prev) => {
      return {
        ...prev,
        fields: prev.fields.map((field) =>
          field.id === id ? { ...field, name } : field
        ),
      };
    });
  };

  const handleTotalChange = (total) => {
    setState((prev) => ({ ...prev, total }));
  };

  const handleRemoveField = (id) => {
    setState((prev) => ({
      ...prev,
      fields: prev.fields.filter((field) => field.id !== id),
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
          {state.fields.map((field) => (
            <Field
              key={field.id}
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
