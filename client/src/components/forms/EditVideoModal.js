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

import useEditVideo from "../hooks/useEditVideo";

const EditVideoModal = ({
  isOpen,
  onClose,
  bookId,
  pageId,
  videoId,
  link,
  notes,
}) => {
  const editVideo = useEditVideo();

  const [linkState, setLink] = useState(link);
  const handleLinkChange = (event) => setLink(event.target.value);

  const [notesState, setNotes] = useState(notes);
  const handleNotesChange = (event) => setNotes(event.target.value);

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit video</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <form className="Edit-video-form">
          <ModalBody>
            <Flex
              as={Input}
              value={linkState}
              placeholder="Link to video"
              onChange={handleLinkChange}
              marginBottom={1}
            />
            <Textarea
              value={notesState}
              placeholder="Notes"
              onChange={handleNotesChange}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              variantColor="burgandy"
              onClick={() => {
                setLink(link);
                setNotes(notes);
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
                editVideo(bookId, pageId, videoId, notesState, linkState);
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

export default EditVideoModal;
