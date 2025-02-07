'use client';

import { useState } from "react";
import axios from "axios";
import classes from "./RegisterModalClass.module.scss";
import { $url } from "@/api/api";

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [activeTab, setActiveTab] = useState<"register" | "login">("register");
  const [formData, setFormData] = useState({ email: "", password: "", roles: "PARENT" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const endpoint =
        activeTab === "register"
          ? `${$url}/api/v1/user/register`
          : `${$url}/api/v1/user/login`;

      const res = await axios.post(endpoint, formData);
      const data = res.data;
      setMessage(`Success: ${data.message || "Operation completed"}`);
      console.log(data)
    } catch (error: any) {
      setMessage(`Error: ${error.response?.data?.message || "An error occurred"}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <div className={classes.header}>
          <button
            className={activeTab === "register" ? classes.active : ""}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
          <button
            className={activeTab === "login" ? classes.active : ""}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
        </div>
        <div className={classes.body}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {activeTab === "register" && (
            <select
              name="roles"
              value={formData.roles}
              onChange={handleInputChange}
              className={classes.roleSelect}
            >
              <option value="PARENT">PARENT</option>
              <option value="GUEST">GUEST</option>
            </select>
          )}
          <button
            className={classes.submit}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : activeTab === "register"
              ? "Register"
              : "Login"}
          </button>
          {message && <p className={classes.message}>{message}</p>}
        </div>
      </div>
    </div>
  );
}
