import styled from 'styled-components'

export const ModalContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`
export const ModalContent = styled.div`
  width: 400px;
  height: 400px;
  background-color: #FFFFFF;
  padding: 20px;
`;