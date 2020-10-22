import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/core";

import useDeleteBook from "../../hooks/book/useDeleteBook";

const DeleteBookModal = ({ id, isOpen, onClose }) => {
  const deleteBook = useDeleteBook();

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete book</ModalHeader>
        <ModalCloseButton />
        <form className="add-book-form">
          <ModalBody>
            <Text fontSize="sm">
              Are you sure you want to delete your book?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              variantColor="burgandy"
              onClick={onClose}
              marginRight={1}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variantColor="burgandy"
              marginLeft={1}
              onClick={(e) => {
                e.preventDefault();
                deleteBook(id);
                onClose();
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBookModal;
