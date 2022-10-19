import React, { useContext, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { Fieldset, Toast } from "primereact";
import { AuthContext } from "../context/login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, handleLogin, erro } = useContext(AuthContext);
  const dt = useRef(null);
  const toast = useRef(null);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      senha: "",
    },
    validate: (data) => {
      let errors = {};
      if (!data.email) {
        errors.email = "Email is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = "Invalid email address. E.g. example@email.com";
      }

      if (!data.senha) {
        errors.senha = "Password is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      handleLogin(data);
      if (erro) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: erro,
          life: 3000,
        });
      }

      formik.resetForm();
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  return (
    <>
      <div className="flex m-8 flex-wrap align-items-center justify-content-center">
        <Toast ref={toast} />
        <Fieldset legend="Simple Smile">
          <h2>Login</h2>
          <div>
            <div className="flex justify-content-center ">
              <div className="card">
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                  <div className="field mt-5">
                    <span className="p-float-label p-input-icon-right">
                      <i className="pi pi-envelope" />
                      <InputText
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        className={classNames({
                          "p-invalid": isFormFieldValid("email"),
                        })}
                      />
                      <label
                        htmlFor="email"
                        className={classNames({
                          "p-error": isFormFieldValid("email"),
                        })}
                      >
                        Email*
                      </label>
                    </span>
                    {getFormErrorMessage("email")}
                  </div>
                  <div className="field mt-5">
                    <span className="p-float-label ">
                      <Password
                        id="senha"
                        name="senha"
                        value={formik.values.senha}
                        onChange={formik.handleChange}
                        toggleMask
                        feedback={false}
                        className={classNames({
                          "p-invalid": isFormFieldValid("senha"),
                        })}
                      />
                      <label
                        htmlFor="senha"
                        className={classNames({
                          "p-error": isFormFieldValid("senha"),
                        })}
                      >
                        Password*
                      </label>
                    </span>
                    {getFormErrorMessage("senha")}
                  </div>

                  <Button
                    className=" p-button-raised p-button-outlined"
                    type="submit"
                    label="Entrar"
                  />
                </form>
              </div>
            </div>
          </div>
        </Fieldset>
      </div>
    </>
  );
};

export default Login;
