import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import UseAuth from "../../../hooks/UseAuth";
import useAxios from "../../../hooks/useAxios";

const Register = () => {
  const { createUser, updateUserProfile } = UseAuth();
  const [profilePic, setProfilePic] = useState();
  const axiosInstance = useAxios();
  const navigate = useNavigate(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);

        // Save user in DB
        const userInfo = {
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };
        await axiosInstance.post("/users", userInfo);

        // Update profile
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUserProfile(userProfile)
          .then(() => {
            console.log("Profile updated");
            navigate("/login");
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => console.log(error));
  };

  const handelImgUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_UPLOAD}`,
      formData
    );

    setProfilePic(res.data.data.url);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-xl rounded-xl p-8 mt-6">
      <h2 className="text-3xl font-bold text-center text-slate-700 mb-4">
        🏢 Create Your Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="label">
            <span className="label-text font-medium text-slate-600">Name</span>
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">Name is required</p>
          )}
        </div>

        {/* Profile Photo */}
        <div>
          <label className="label">
            <span className="label-text font-medium text-slate-600">
              Profile Photo
            </span>
          </label>
          <input
            onChange={handelImgUpload}
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Email */}
        <div>
          <label className="label">
            <span className="label-text font-medium text-slate-600">Email</span>
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">Email is required</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="label">
            <span className="label-text font-medium text-slate-600">
              Password
            </span>
          </label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input input-bordered w-full"
            placeholder="Enter your password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500 text-sm mt-1">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 text-sm mt-1">
              Password must be at least 6 characters
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button className="btn btn-primary w-full mt-2">Register</button>
      </form>

      {/* Link to Login */}
      <p className="mt-4 text-sm text-center text-slate-600">
        Already have an account?
        <Link
          to="/login"
          className="ml-1 text-blue-600 font-medium hover:underline"
        >
          Login
        </Link>
      </p>

      <div className="divider">OR</div>

      {/* Social Login */}
      <SocialLogin />
    </div>
  );
};

export default Register;
