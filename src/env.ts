export default {
  API_ROOT: process.env.NODE_ENV === "production" ? "https://scoop.gigalixirapp.com/" : "http://localhost:3000/",
  HCAPTCHA_KEY: process.env.NODE_ENV === "production" ? process.env.REACT_APP_HCAPTCHA_KEY! : "10000000-ffff-ffff-ffff-000000000001"
}
