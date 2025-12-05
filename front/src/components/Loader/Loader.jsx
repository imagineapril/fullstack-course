import { LoaderWrapper } from "./loader.styled";

function Loader() {
  return <LoaderWrapper>
    <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </LoaderWrapper>
}

export default Loader