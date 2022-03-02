import { Form, Col } from "react-bootstrap";

const StringAdditional = ({ totalParagraph, onChange }) => {
  return (
    <>
      <Form.Group as={Col}>
        <Form.Control
          type="number"
          name="value"
          placeholder="Total paragraphs"
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
