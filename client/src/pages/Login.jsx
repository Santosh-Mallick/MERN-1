import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginLogo from "../assets/images/login.png";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";


export const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth();


  // let handle the input field value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("Login Form", response);
      const responseData = await response.json();

      if (response.ok) {
        toast.success("Login Successful");
        setUser({ email: "", password: ""});
        navigate("/");
        // localStorage.setItem("token",responseData);
        storeTokenInLS(responseData.token);
      } else {
        toast.error(responseData.extraDetails ? responseData.extraDetails : responseData.message);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src={loginLogo} alt="A image of a woman"
                  height="400px"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>email
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                      autoComplete="new-email"
                    />
                    </label>
                  </div>

                  <div>
                    <label>password
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                      autoComplete="new-password"
                    />
                    </label>
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};