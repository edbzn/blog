import "normalize.css";
import "./assets/index.scss";
import { render } from "lit-html";

import home from "./app/home";

export default render(home(), document.body);
