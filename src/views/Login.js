import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked } from "@coreui/icons";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useContext } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = () => {
    if (!email.trim() || !password.trim()) {
      alert("Email and password are required");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://18.118.42.224:3001/api/v1/users/login",
        {
          email,
          password,
        }
      );
      console.log(response);

      setAuthState({
        role: response.data.data.user.role,
        id: response.data.data.user._id,
        name: response.data.data.user.firstName,
        lastname: response.data.data.user.lastName,
        // fatherName:
        //   response.data.data.user.familyDetails.fatherFirstName !== undefined
        //     ? response.data.data.user.familyDetails.fatherFirstName
        //     : null,
        // fatherLastName:
        //   response.data.data.user.familyDetails.fatherFirstName !== undefined
        //     ? response.data.data.user.familyDetails.fatherLastName
        //     : null,
        // class: response.data.data.user.class,
      });
      const token = response.data.token;
      const user = response.data.data.user.role;
      const userId = response.data.data.user._id;
      console.log(response);
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", user);
      localStorage.setItem("userId", userId);
      console.log("sucessfully logged in");
      // window.location.replace("/");
      navigate("*");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        console.error("Login failed:", errorMessage);
        alert(errorMessage); // Show the error message from the backend
      } else {
        console.error("Login failed:", error.message);
        alert("An error occurred. Please try again."); // Show a generic error message
      }
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account.
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText></CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        {/* <CIcon icon={cilLockLocked} /> */}
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          // onClick={handleLogin}
                          type="submit"
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  {/* <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div> */}
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
