import * as Yup from "yup";

export const registerSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must not exceed 50 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/, "Username must contain uppercase, lowercase, and numbers (min 5 characters)")
    .required("Username is required"),

  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),

  phone_number: Yup.number()
    .min(1000000000, "Phone number must be 10 digits")
    .max(9999999999, "Phone number must be 10 digits")
    .required("Phone number is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must not exceed 50 characters")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[-&!]/, "Must contain at least one special character (-, &, or !)")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),

  agreeToTerms: Yup.boolean()
    .oneOf([true], "You must agree to the terms and conditions"),
});
