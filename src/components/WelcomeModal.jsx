import { Modal, Button } from "react-bootstrap";

const IntroModal = ({ isOpen, onClose }) => {
  return (
    <Modal scrollable show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Welcome!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Here you can easily generate list of data and then export it as JSON
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IntroModal;
