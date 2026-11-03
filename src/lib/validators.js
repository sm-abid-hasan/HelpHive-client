import { EVENT_TYPES } from "./constants";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}


export function validatePassword(password) {
  if (!password) return "Password is required.";
  if (password.length < 6) return "Password must be at least 6 characters long.";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
  return "";
}


export function validateLogin({ email, password }) {
  const errors = {};
  if (!emailRegex.test(email.trim())) errors.email = "Please enter a valid email address.";
  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;
  return errors;
}

export function validateRegister({ name, email, photoURL, password }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = "Name must be at least 2 characters long.";
  if (!emailRegex.test(email.trim())) errors.email = "Please enter a valid email address.";
  if (!isValidUrl(photoURL.trim())) errors.photoURL = "Please enter a valid photo URL (http or https).";
  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;
  return errors;
}

export function validateProfile({ name, photoURL }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = "Name must be at least 2 characters long.";
  if (!isValidUrl(photoURL.trim())) errors.photoURL = "Please enter a valid photo URL (http or https).";
  return errors;
}

export function validateNewsletterEmail(email) {
  return emailRegex.test(email.trim());
}


export function validateEvent(values, minDate) {
  const errors = {};
  if (values.title.trim().length < 5) errors.title = "Title must be at least 5 characters long.";
  if (values.description.trim().length < 20) errors.description = "Description must be at least 20 characters long.";
  if (!EVENT_TYPES.includes(values.eventType)) errors.eventType = "Please choose an event type.";
  if (!isValidUrl(values.thumbnail.trim())) errors.thumbnail = "Please enter a valid image URL (http or https).";
  if (values.location.trim().length < 3) errors.location = "Please enter the event location.";
  if (!values.eventDate) errors.eventDate = "Please choose the event date.";
  else if (values.eventDate < minDate) errors.eventDate = "Past dates are not allowed. Please choose a future date.";
  return errors;
}
