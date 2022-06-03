export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user, user.token);
  if (user && user.token) {
    return { "x-access-token": user.token };
  } else {
    return {};
  }
}
