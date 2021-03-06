import { useState } from "react";
import { cloneDeep } from "lodash";
import { Container, Form } from "react-bootstrap";

import generate from "./generate";
import { findField, removeField, createDefaultField } from "./helpers";
import Header from "./components/Header";
import Field from "./components/Field";
import ResultModal from "./components/ResultModal";
import WelcomeModal from "./components/WelcomeModal";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

/* Page */
const GeneratorPage = () => {
  const [state, setState] = useState({
    total: 0,
    fields: [createDefaultField()],
  });

  const [generatedJSON, setGeneratedJSON] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [welcomeIsOpen, setWelcomeIsOpen] = useState(true);

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

  const handleRun = () => {
    setGeneratedJSON(generate(state));
    setModalIsOpen(true);
  };

  return (
    <main>
      <Header
        total={state.total}
        onTotalChange={handleTotalChange}
        onAddNewField={handleAddNewField}
        onRun={handleRun}
      />
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
      <WelcomeModal
        isOpen={welcomeIsOpen}
        onClose={() => setWelcomeIsOpen(false)}
      />
    </main>
  );
};

export default GeneratorPage;
