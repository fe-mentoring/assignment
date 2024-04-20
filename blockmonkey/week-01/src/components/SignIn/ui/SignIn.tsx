import { useState } from "react";
import { signInApi } from "../../../api/auth";
import { SignInParameter } from "../../../api/auth/types";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from "../../../constants/routes";

const SignIn = () => {
    const [UserEamil, setUserEamil] = useState("");
    const [UserPassword, setUserPassword] = useState("");
    const navi = useNavigate();

    const handleSignIn = async () => {
        const body: SignInParameter = {
            email: UserEamil,
            password : UserPassword
        }
        try {
            const resp = await signInApi(body);
            // Store Access Token Into Session Storage,
            // cause when close the browser remove the token.
            sessionStorage.setItem('ac_token', resp.accessToken);
            // Navi To Landing Page
            navi(ROUTES.TODOLIST);
        } catch (e : any) {
            console.log(`SignIn Error `);
            alert(e.response.data.message);
        } finally {
            setUserEamil("");
            setUserPassword("");
        }
    }

  return (
      <div>
          <div>
              <button onClick={() => navi(ROUTES.SIGN_UP)}>Go Sign-Up</button>
          </div>
          <input
              type="text"
              placeholder="email"
              value={UserEamil}
              onChange={e => setUserEamil(e.currentTarget.value)}
          />
          <input
              type="password"
              placeholder="password"
              value={UserPassword}
              onChange={e => setUserPassword(e.currentTarget.value)}
          />

          <button onClick={handleSignIn}>Sign-In</button>
    </div>
  )
}

export default SignIn