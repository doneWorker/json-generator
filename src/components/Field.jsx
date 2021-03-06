import { Col, Row, Form } from "react-bootstrap";
import styled from "styled-components";
import RenderComponent from "./RenderComponent";

import NumberAdditional from "./NumberAdditional";
import OneOfAdditional from "./OneOfAdditional";
import StringAdditional from "./StringAdditional";
import ObjectAdditional from "./ObjectAdditional";

import { MdRemoveCircleOutline } from "react-icons/md";

const typesToComponents = {
  number: NumberAdditional,
  oneof: OneOfAdditional,
  string: StringAdditional,
  object: ObjectAdditional,
};

const $Row = styled(Row)`
  padding: 20px 0;
  margin: 15px 0;
  background: white;

  .nested-fields {
    flex-shrink: 1;
    margin: 10px 0 10px 10px;
    border-left: 5px solid var(--bs-blue);
  }
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

const Field = (props) => {
  const { field, onChangeName, onChangeType, onChangeAdditional, onRemove } =
    props;

  return (
    <$Row>
      <Form.Group as={Col}>
        <Form.Control
          type="text"
          name="name"
          placeholder="Field's name"
          required
          value={field.name}
          onChange={({ target }) => onChangeName(field.id, target.value)}
        />
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Select
          name="type"
          required
          value={field.type}
          onChange={(e) => onChangeType(field.id, e.target.value)}
        >
          <option value="id">id</option>
          <option value="number">Number</option>
          <option value="string">String</option>
          <option value="oneof">One of</option>
          <option value="object">Object</option>
          <option value="name">Name</option>
        </Form.Select>
      </Form.Group>
      {
        <RenderComponent
          Elem={typesToComponents[field.type]}
          onChange={(key, val) => onChangeAdditional(field.id, key, val)}
        />
      }
      <RemoveCol>
        <MdRemoveCircleOutline onClick={() => onRemove(field.id)} />
      </RemoveCol>
      {field.children !== undefined && (
        <div className="nested-fields">
          {field.children.map((field) => (
            <Field key={field.id} {...props} field={field} />
          ))}
        </div>
      )}
    </$Row>
  );
};

export default Field;
