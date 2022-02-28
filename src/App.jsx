import { useState } from "react";
import { cloneDeep } from "lodash";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { nanoid } from "nanoid";

import generate from "./generate";
import ResultModal from "./components/ResultModal";
import Field from "./components/Field";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

/* Styled */
const Header = styled.header`
  height: 50px;
  display: flex;
  align-items: center;
  flex-grow: 0;
`;

/* Helpers */
const findField = (fields, id) => {
  for (let field of fields) {
    if (field.id === id) return field;

    if (field.children) {
      const result = findField(field.children, id);
      if (result) return result;
    }
  }
};

const removeField = (fields, id) => {
  for (let index in fields) {
    if (fields[index].id === id) {
      fields.splice(index, 1);
      return;
    } else if (fields[index].children) {
      removeField(fields[index].children, id);
    }
  }
};

const createDefaultField = () => ({ name: "", type: "id", id: nanoid() });

const GeneratorPage = () => {
  const [state, setState] = useState({
    total: 0,
    fields: [createDefaultField()],
  });

  const [generatedJSON, setGeneratedJSON] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleAddNewField = () => {
    setState((prev) => {
      const newState = cloneDeep(prev);
      newState.fields.push(createDefaultField());

      return newState;
    });
  };

  const handleChangeFieldType = (id, type) => {
    setState((prev) => {
      const newState = cloneDeep(prev);
      const found = findField(newState.fields, id);
      found.type = type;

      return newState;
    });
  };

  const handleChangeFieldAdditional = (id, key, val) => {
    setState((prev) => {
      const addFieldKey = "add-to-object";

      const newState = cloneDeep(prev);
      const found = findField(newState.fields, id);
      key === addFieldKey
        ? (found.children = [...(found.children || []), createDefaultField()])
        : (found[key] = val);

      return newState;
    });
  };

  const handleChangeFieldName = (id, name) => {
    setState((prev) => {
      const newState = cloneDeep(prev);
      const found = findField(newState.fields, id);
      found.name = name;

      return newState;
    });
  };

  const handleTotalChange = (total) => {
    setState((prev) => ({ ...prev, total }));
  };

  const handleRemoveField = (id) => {
    setState((prev) => {
      const newState = cloneDeep(prev);
      removeField(newState.fields, id);
      return newState;
    });
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
                value={state.total > 0 ? state.total : ""}
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
