import { useState, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";

import { FaCopy } from "react-icons/fa";

const ResultModal = ({ generatedJSON, isOpen, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(generatedJSON).then(
      () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1_000);
      },
      () => {
        setIsCopied(false);
      }
    );
  }, [generatedJSON]);

  return (
    <Modal scrollable show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Generated JSON</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <pre>{generatedJSON}</pre>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCopy}>
          {!isCopied ? (
            <>
              <FaCopy /> Copy
            </>
          ) : (
            "Copied !"
          )}
        </Button>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultModal;
