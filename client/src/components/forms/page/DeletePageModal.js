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

import useDeletePage from "../../hooks/page/useDeletePage";

const DeletePageModal = ({ bookId, pageId, isOpen, onClose }) => {
  const deletePage = useDeletePage();

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete book</ModalHeader>
        <ModalCloseButton />
        <form className="delete-page-form">
          <ModalBody>
            <Text fontSize="sm">
              Are you sure you want to delete this page?
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
                deletePage(bookId, pageId);
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

export default DeletePageModal;
