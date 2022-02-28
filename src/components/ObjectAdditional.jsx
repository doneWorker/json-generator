import { Form, Col, Button } from "react-bootstrap";
import styled from "styled-components";

const $Col = styled(Form.Group)`
  display: flex;
  align-items: end;
`;

const ObjectAdditional = ({ onChange }) => {
  return (
    <$Col as={Col}>
      <Button onClick={() => onChange("add-to-object")}>Add field</Button>
    </$Col>
  );
};

export default ObjectAdditional;
