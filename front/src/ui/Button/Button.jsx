import { ButtonDiv, ButtonContent } from "./button.styled";


function Button(props) {
  return (
    <ButtonDiv>
      <ButtonContent>{props.title}</ButtonContent>
    </ButtonDiv>
  )
}

export default Button;