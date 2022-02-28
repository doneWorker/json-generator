import { Form, Col, Button } from "react-bootstrap";
import styled from "styled-components";

const $Col = styled(Form.Group)`
  display: flex;
  align-items: end;
`;

const ObjectAdditional = () => {
  return (
    <$Col as={Col}>
      <Button>Add field</Button>
    </$Col>
  );
};

export default ObjectAdditional;
