import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button, Loading, Textbox } from "../components";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const handleSignup = async (data) => {
    try {
      const res = await registerUser(data).unwrap();
      console.log(res, "res");
      navigate("/log-in");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
  <main className="flex justify-center items-center h-screen">
      <div className="w-full p-4 md:p-1 flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(handleSignup)}
        className="form-container w-full max-w-2xl  flex flex-col gap-y-8 bg-white dark:bg-slate-900 px-10 pt-14 pb-14"
      >
         <img className=" h-32 w-32 mx-auto" src="/logo-Photoroom.png"/>
        <div>
          <p className="text-green-600 text-3xl font-bold text-center">
            Create An Account!
          </p>
          <p className="text-center text-base text-gray-700 dark:text-gray-500">
            Keep all your credetials safe!
          </p>
        </div>
        <div className="flex flex-col gap-y-5">
          <Textbox
            type="text"
            name="name"
            label="Name"
            className="w-full rounded-full"
            register={register("name", {
              required: "Name is required!",
            })}
            error={errors.name ? errors.name.message : ""}
          />
          <Textbox
            type="email"
            name="email"
            label="Email Address"
            className="w-full rounded-full"
            register={register("email", {
              required: "Email Address is required!",
            })}
            error={errors.email ? errors.email.message : ""}
          />
          <Textbox
            type="text"
            name="role"
            label="Role"
            className="w-full rounded-full"
            register={register("role", {
              required: "Role is required!",
            })}
            error={errors.role ? errors.role.message : ""}
          />
          <Textbox
            type="text"
            name="title"
            label="Title"
            className="w-full rounded-full"
            register={register("title", {
              required: "Title is required!",
            })}
            error={errors.title ? errors.title.message : ""}
          />
          <Textbox
            type="password"
            name="password"
            label="Password"
            className="w-full rounded-full"
            register={register("password", {
              required: "Password is required!",
            })}
            error={errors.password ? errors.password?.message : ""}
          />
          <span
            onClick={() => navigate("/log-in")}
            className="text-sm text-gray-600 hover:underline cursor-pointer"
          >
            Already have an account?
          </span>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <Button
            type="submit"
            label="Register"
            className="w-full h-10 bg-green-600 text-white rounded-full"
          />
        )}
      </form>
    </div>
  </main>
  );
};

export default Signup;
