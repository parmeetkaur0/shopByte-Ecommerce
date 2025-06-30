import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "@/config/firebase.config";
import { signInWithPopup } from "firebase/auth";
import { setUser } from "@/store/auth-slice/index.js"; 

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data.payload.message });
        navigate("/shop/home");
      } else {
        toast({
          title: data?.payload?.message || "Login failed",
          variant: "destructive",
        });
      }
    });
  };

 
const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // ✅ Dispatch to Redux store
    dispatch(
      setUser({
        userName: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
      })
    );

    toast({ title: `Welcome ${user.displayName}!` });
    navigate("/shop/home");
  } catch (error) {
    toast({
      title: "Google Sign-In Failed",
      description: error.message,
      variant: "destructive",
    });
  }
};

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>

      <CommonForm
        formControls={loginFormControls}
        buttonText="Sign In"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />

      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="px-3 text-sm text-muted-foreground">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <button
        onClick={handleGoogleLogin}
        className="bg-white border border-gray-300 text-black px-6 py-3 rounded-full w-full font-semibold flex items-center justify-center gap-3 hover:shadow-md transition duration-300"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google Icon"
          className="w-5 h-5"
        />
        Continue with Google
      </button>
    </div>
  );
}

export default AuthLogin;
