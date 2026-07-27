import { Request, Response } from "express";
import { User, users } from "../data/usersData";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateJWT";

const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body || {};
    if (!username || !email || !password || !role) {
      return res.status(400).json({
        status: "Failed",
        msg: "username, email and password and role are required",
      });
    }
    const user = users.find((u) => u.email === email);
    if (user)
      return res.status(400).json({
        status: "Failed",
        msg: "this email already has an account try sign in",
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword,
      role,
    };
    users.push(newUser);
    res.status(201).json({ status: "Success", data: newUser });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: error instanceof Error ? error.message : "Internal server error",
    });
  }
};
const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res
      .status(400)
      .json({ status: "Failed", msg: "Email and password are required" });
  const user = users.find((u) => u.email === email);
  if (!user)
    return res.status(400).json({
      status: "Failed",
      msg: "This email doesn't have an account try signup",
    });
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword)
    return res
      .status(400)
      .json({ status: "Failed", msg: "Invalid email or password" });
  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ status: "Success" });
};
const signOut = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ status: "Success", msg: "Signed out successfully" });
};
const getProfile = async (req: Request, res: Response) => {
  res.status(200).json({
    status: "Success",
    msg: "You are authenticated",
    user: (req as any).user,
  });
};

const adminOnly = async (req: Request, res: Response) => {
  res.status(200).json({
    status: "Success",
    msg: "Welcome, admin!",
    user: (req as any).user,
  });
};

export default { signUp, signIn, signOut, getProfile, adminOnly };
