// lets create a chakra modal so the user can also share his post on socials 

import { Proposal, Update } from "@/types";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";


interface UpdateSubmitionModalProps {
    proposal: Proposal;
    update: Update;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (comment: string) => void;
}

const UpdateSubmitionModal = ({ proposal, update, isOpen, onClose, onSubmit }: UpdateSubmitionModalProps) => {
    const [newComment, setNewComment] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(newComment);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Submit Update</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Textarea
                            placeholder="Enter your comment here"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={handleSubmit}>
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default UpdateSubmitionModal;
