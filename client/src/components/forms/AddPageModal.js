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

import useCreatePage from "../hooks/useCreatePage";

const AddPageModal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const handleChange = (event) => setInput(event.target.value);

  const createPage = useCreatePage();

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a page</ModalHeader>
        <ModalCloseButton />
        <form className="add-page-form">
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
              onClick={(e) => {
                e.preventDefault();
                createBook(input);
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
