import { signInWithEmailAndPassword } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"




function SignIn() {

    const firebaseConfig = {
        apiKey: "AIzaSyDwsdMznaTMlmsOtY3gvNhjNjN7zn2dj_A",
        authDomain: "pokestorealday.firebaseapp.com",
        projectId: "pokestorealday",
        storageBucket: "pokestorealday.firebasestorage.app",
        messagingSenderId: "224912064865",
        appId: "1:224912064865:web:08f528131e00f504d90520"
      };

  const [app] = useState(initializeApp(firebaseConfig));
  const [auth] = useState(getAuth(app));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState('disconnected');
  function showMessage(message, type = "success") {
      alert(message);
  }
  const sign = async () => {
      try {
          const credentials = await signInWithEmailAndPassword(auth, email, password);
          showMessage("Welcome " + credentials.user.email)
          setLogin('connected');
      } catch (error) {
          if (error.code === "auth/wrong-password" || error.code === "auth/invalid-email") {
              showMessage("Usuario o Contraseña erróneos")
          } else {
              showMessage("Error: " + error.message)
          }
      }

  }; 

  const url = "#";
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <Link className="btn btn-primary" onClick={()=> sign()}  to={"/home"}>Submit</Link>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href={url}>password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignIn;