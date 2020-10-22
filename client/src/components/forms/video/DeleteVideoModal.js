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

import useDeleteVideo from "../../hooks/video/useDeleteVideo";

const DeleteVideoModal = ({ bookId, pageId, videoId, isOpen, onClose }) => {
  const deleteVideo = useDeleteVideo();

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete book</ModalHeader>
        <ModalCloseButton />
        <form className="delete-video-form">
          <ModalBody>
            <Text fontSize="sm">
              Are you sure you want to delete this video?
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
                deleteVideo(bookId, pageId, videoId);
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

export default DeleteVideoModal;
