import { Modal, Button } from "react-bootstrap";
import { FaCopy } from "react-icons/fa";

const ResultModal = ({ generatedJSON, isOpen, onClose }) => {
  return (
    <Modal scrollable show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Generated JSON</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <pre>{generatedJSON}</pre>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          <FaCopy /> Copy
        </Button>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultModal;
