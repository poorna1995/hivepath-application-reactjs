import useNoAuth from "../customHooks/useNoAuth";

const WithNoAuth = (props) => useNoAuth(props) && props.children;

export default WithNoAuth;
