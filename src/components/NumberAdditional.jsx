import { Form, Col } from "react-bootstrap";

const NumberAdditional = ({ min, max, onChange }) => {
  return (
    <>
      <Form.Group as={Col}>
        <Form.Label className="label">Min</Form.Label>
        <Form.Control
          type="number"
          name="value"
          required
          value={min}
          onChange={({ target }) => onChange("min", parseInt(target.value, 10))}
        />
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label className="label">Max</Form.Label>
        <Form.Control
          type="number"
          name="value"
          required
          value={max}
          onChange={({ target }) => onChange("max", parseInt(target.value, 10))}
        />
      </Form.Group>
    </>
  );
};

export default NumberAdditional;
