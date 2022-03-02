import { Form, Col } from "react-bootstrap";

const OneOfAdditional = ({ value, onChange }) => {
  return (
    <Form.Group as={Col}>
      <Form.Control
        type="text"
        name="oneof"
        placeholder="Values(comma-separated)"
        value={value}
        required
        onChange={({ target }) => onChange("list", target.value)}
      />
    </Form.Group>
  );
};

export default OneOfAdditional;
