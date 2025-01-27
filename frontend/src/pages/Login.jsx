// Login.js
import Form from "../components/Form";

function Login({ setIsLoggedIn }) {
  // Pass the prop to Form
  return (
    <Form route="/api/token/" method="login" setIsLoggedIn={setIsLoggedIn} />
  );
}

export default Login;
