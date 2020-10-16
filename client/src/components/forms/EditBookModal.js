import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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
        <ModalCloseButton />
        <form className="add-book-form">
          <ModalBody>
            <Input value={input} onChange={handleChange} />
          </ModalBody>

          <ModalFooter>
            <Button variantColor="burgandy" onClick={onClose} marginRight={1}>
              Cancel
            </Button>

            <Button
              type="submit"
              variantColor="teal"
              marginLeft={1}
              onClick={async (e) => {
                e.preventDefault();

                try {
                  await editBook(id, input);
                } catch (error) {
                  console.error(error);
                }

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
