import { Form, Col } from "react-bootstrap";

const StringAdditional = ({ totalParagraph, onChange }) => {
  return (
    <>
      <Form.Group as={Col}>
        <Form.Label className="label">Total paragraphs</Form.Label>
        <Form.Control
          type="number"
          name="value"
          required
          value={totalParagraph}
          onChange={({ target }) =>
            onChange("paragraph", parseInt(target.value, 10))
          }
        />
      </Form.Group>
    </>
  );
};

export default StringAdditional;
