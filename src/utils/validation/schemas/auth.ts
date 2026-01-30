import * as Yup from "yup";

const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-&!])[A-Za-z\d-&!]{8,}$/;
const phoneRegex = /^\d{10}$/;

export const LoginCredentialsSchema = Yup.object({
  identifier: Yup.string()
    .required("Identifier is required")
    .test(
      "identifier-format",
      "Must be a valid username, email, or phone number",
      (value) => {
        if (!value) return false;
        const isUsername = usernameRegex.test(value);
        const isPhone = phoneRegex.test(value);
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        return isUsername || isPhone || isEmail;
      }
    ),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters")
    .matches(
      passwordRegex,
      "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character (-&!)"
    ),
});
