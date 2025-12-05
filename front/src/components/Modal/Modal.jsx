import { ModalContainer, ModalContent } from "./modal.styled";

function Modal(props) {
  return (
    <ModalContainer>
      <ModalContent>{props.children}</ModalContent>
    </ModalContainer>
  )
}

export default Modal;