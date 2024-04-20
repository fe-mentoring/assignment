import { useState } from "react";
import { signUpApi } from "../../../api/auth";
import { SignUpParameter } from "../../../api/auth/types";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from "../../../constants/routes";

const SignUp = () => {
    const [UserEmail, setUserEmail] = useState("");
    const [UserName, setUserName] = useState("");
    const [UserPassword, setUserPassword] = useState("");
    const [VerifyPassword, setVerifyPassword] = useState("");
    const navi = useNavigate();

    const handleSignUp = async() => {
        if (UserPassword !== VerifyPassword) {
            alert(`Password & v-Password Not Matched`)
            return;
        }

        try {
            const signUpApiBody: SignUpParameter = {
                email: UserEmail,
                username: UserName,
                password : UserPassword
            }
            const signUpResult = await signUpApi(signUpApiBody);
            alert(`회원가입완료 ${signUpResult.user.id}`);
            navi(ROUTES.SIGN_IN);
        } catch (e : any) {
            alert(e.response.data.message);
        } finally {
            setUserEmail("");
            setUserName("");
            setUserPassword("");
            setVerifyPassword("");
        }
    }


  return (
    <div>
        <div>
            <button onClick={() => navi(ROUTES.SIGN_IN)}>Go Sign-In</button>
        </div>
        <input type="text" placeholder="email" value={UserEmail} onChange={e => setUserEmail(e.currentTarget.value)} />
        <input type="text" placeholder="name" value={UserName} onChange={e => setUserName(e.currentTarget.value)} />
        <input type="password" placeholder="password" value={UserPassword} onChange={e => setUserPassword(e.currentTarget.value)} />
        <input type="password" placeholder="v-password" value={VerifyPassword} onChange={e => setVerifyPassword(e.currentTarget.value)} />
        <button onClick={handleSignUp}>SignUp</button>
    </div>
  )
}

export default SignUp