import { Form, Col } from "react-bootstrap";

const OneOfAdditional = ({ value, onChange }) => {
  return (
    <Form.Group as={Col}>
      <Form.Label className="label">Values(comma-separated)</Form.Label>
      <Form.Control
        type="text"
        name="oneof"
        value={value}
        required
        onChange={({ target }) => onChange("list", target.value)}
      />
    </Form.Group>
  );
};

export default OneOfAdditional;
