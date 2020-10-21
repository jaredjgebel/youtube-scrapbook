import React, { useState } from "react";
import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Input,
} from "@chakra-ui/core";

import useCreateVideo from "../hooks/useCreateVideo";

const AddVideoModal = ({ isOpen, onClose, bookId, pageId }) => {
  const createVideo = useCreateVideo();

  const [link, setLink] = useState("");
  const handleLinkChange = (event) => setLink(event.target.value);

  const [notes, setNotes] = useState("");
  const handleNotesChange = (event) => setNotes(event.target.value);

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a video</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <form className="add-video-form">
          <ModalBody>
            <Flex
              as={Input}
              value={link}
              placeholder="Link to video"
              onChange={handleLinkChange}
              marginBottom={1}
            />
            <Textarea
              value={notes}
              placeholder="Notes"
              onChange={handleNotesChange}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              variantColor="burgandy"
              onClick={() => {
                setLink("");
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
                createVideo(bookId, pageId, link, notes);
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

export default AddVideoModal;
