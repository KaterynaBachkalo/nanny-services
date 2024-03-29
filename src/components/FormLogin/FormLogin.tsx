import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { FC, useState } from "react";
// import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import css from "./FormLogin.module.css";
import { ReactComponent as OpenEyeIcon } from "../../img/openeye.svg";
import { ReactComponent as ClosedEyeIcon } from "../../img/closeeye.svg";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

interface IForms {
  email: string;
  password: string;
}

interface IProps {
  onClose: (value: boolean) => void;
}

const FormLogin: FC<IProps> = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  // const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required(`Enter email, please`),
    password: Yup.string()
      .required(`Enter password, please`)
      .min(8, `Min 8 characters`)
      .max(64, `Max 64 characters`),
  });

  const initialValues: IForms = { email: "", password: "" };

  const onSubmit = async (values: any, { resetForm }: any) => {
    try {
      const signIn = async () => {
        await signInWithEmailAndPassword(auth, values.email, values.password);
      };
      signIn();
    } catch (error) {}
    resetForm();
    // setRedirect(true);

    toast.success(`Success login`);
    onClose(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <div className={css.inputWrap}>
          <div className={css.wrap}>
            <Field
              type="text"
              name="email"
              placeholder="Email"
              className={css.input}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={css.errormessage}
            />
          </div>

          <div className={css.wrap}>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className={css.input}
            />
            <div onClick={() => setShowPassword(!showPassword)}>
              {!showPassword ? (
                <ClosedEyeIcon className={css.iconeye} />
              ) : (
                <OpenEyeIcon className={css.iconeye} />
              )}
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className={css.errormessage}
            />
          </div>
        </div>
        <button type="submit" className={css.button}>
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default FormLogin;
