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
import { useMutation, useQueryCache } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";

const apiUrl = process.env.REACT_APP_API_URL;

const createBook = async ({ title, token }) => {
  const response = await fetch(`${apiUrl}/api/v1/books`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ title }),
  });

  const json = await response.json();

  return json.error ? json.error : { books: json.books };
};

const AddModal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const handleChange = (event) => setInput(event.target.value);

  const queryCache = useQueryCache();

  const { getAccessTokenSilently } = useAuth0();

  let token;
  getAccessTokenSilently()
    .then((retrievedToken) => (token = retrievedToken))
    .catch((err) => console.error(err));

  const [mutate] = useMutation(createBook, {
    // refetches user query to include new book
    onSuccess: () => {
      queryCache.invalidateQueries("user");
    },
  });

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
                  await mutate({ title: input, token });
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

export default AddModal;
