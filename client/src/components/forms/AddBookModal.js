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

import useCreateBook from "../hooks/useCreateBook";

const AddBookModal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const handleChange = (event) => setInput(event.target.value);

  const createBook = useCreateBook();

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a book</ModalHeader>
        <ModalCloseButton />
        <form className="add-book-form">
          <ModalBody>
            <Input
              placeholder="Book title"
              value={input}
              onChange={handleChange}
            />
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
                  await createBook(input);
                } catch (error) {
                  console.error(error);
                }

                onClose();
              }}
            >
              Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddBookModal;
