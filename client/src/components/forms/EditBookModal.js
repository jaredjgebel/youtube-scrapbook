import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
} from "@chakra-ui/core";

import useEditBook from "../hooks/useEditBook";

const EditBookModal = ({ isOpen, onClose, currentTitle, id }) => {
  const [input, setInput] = useState(currentTitle);
  const handleChange = (event) => setInput(event.target.value);

  const editBook = useEditBook();

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit your book</ModalHeader>
        <ModalCloseButton
          onClick={() => {
            setInput(currentTitle);
            onClose();
          }}
        />
        <form className="add-book-form">
          <ModalBody>
            <Textarea value={input} onChange={handleChange} />
          </ModalBody>

          <ModalFooter>
            <Button
              variantColor="burgandy"
              onClick={() => {
                setInput(currentTitle);
                onClose();
              }}
              marginRight={1}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variantColor="teal"
              marginLeft={1}
              onClick={(e) => {
                e.preventDefault();
                editBook(id, input);
                onClose();
              }}
            >
              Edit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditBookModal;
