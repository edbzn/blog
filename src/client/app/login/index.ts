import { html } from "lit-html";
import page from "../layout/page";
import router from "../..";

const logUser = async (credentials: {
  name: string;
  password: string;
}): Promise<void> => {
  await fetch(`http://localhost:8081/api/v1/login`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    body: JSON.stringify({ ...credentials }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

const login = html`
  <style scoped>
    form {
      margin-top: 20px;
    }

    form input, form label {
      display: block;
    }

    form input {
      margin-bottom: 10px;
    }
  </style>
  <div>
    <h1>Login</h1>
    <form name="login" @submit=${async (e: Event) => {
      e.preventDefault();

      let name = document.getElementById("name") as HTMLInputElement;
      let password = document.getElementById("password") as HTMLInputElement;
      const credentials = { name: name.value, password: password.value };

      try {
        await logUser(credentials);
        router.push("/admin");
      } catch (e) {
        router.push("/error");
      }
    }}>
      <label for="name">Name</name>
      <input id="name" name="name" type="text" required />
      <label for="password">Password</name>
      <input id="password" name="password" type="password" required />
      <button type="submit">Login</button>
    </form>
  </div>
`;

export default page(login);
