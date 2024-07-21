import { SubGraphProposal } from "../types";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    VStack
} from "@chakra-ui/react";
import { useState } from "react";
import { Tables } from "@/utils/supabase/database.types";

// Define the Update type
type Update = Tables<'updates'>;

interface UpdateSubmitionModalProps {
    proposal: SubGraphProposal;
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
