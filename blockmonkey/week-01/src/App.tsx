import {Routes, Route} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import { ROUTES } from "./constants/routes";
import SignInPage from "./pages/SignInPage";
import TodoListPage from "./pages/TodoListPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route
          path={ROUTES.SIGN_UP}
          element={<SignUpPage />}
        />

        <Route
          path={ROUTES.SIGN_IN}
          element={<SignInPage />}
        />

        <Route
          path={ROUTES.TODOLIST}
          element={<TodoListPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </>
  )
}

export default App
