import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });
    await newUser.save();
    res.status(200).json({ success: true, message: "Created successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Create failed" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    // nếu người dùng không tồn tại
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    // nếu người dùng tồn tại thì kiểm tra mật khẩu
    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // nếu mật khẩu không đúng
    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Email or Password is incorrect" });
    }

    const { password: userPassword, role, ...rest } = user._doc;
    // hàm khởi tạo token với jwt
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );
    // tạo 1 cookie chứa thông tin truy cập và tả về phản hồi JSON cho người dùng
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expiresIn: "15d",
      })
      .status(200)
      .json({
        token,
        data: { ...rest },
        role,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};

export const generateToken = (email, phone) => {
  const token = jwt.sign({ email, phone }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });
  return token;
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded.email;
  } catch (error) {
    return null;
  }
};

// Xác thực email
export const sendVerificationEmail = async (email) => {
  try {
    // Tìm người dùng bằng email
    const user = await User.findOne({ email });
    const username = user ? user.username : "Người dùng";
    // Tạo một transporter sử dụng SMTP
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Cấu hình nội dung email
    let mailOptions = {
      from: process.env.EMAIL_PASSWORD,
      to: email,
      subject: "Xác thực email",
      text: "Xin chào!, ${username} Đây là email xác thực.",
    };

    // Gửi email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Kiểm tra token
export const checkToken = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token not provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;
    // Kiểm tra người dùng từ userId
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // Phản hồi với thông tin người dùng
    return res
      .status(200)
      .json({ success: true, message: "Token verified", data: user });
  } catch (error) {
    console.error("Error:", error);
    return res.status(401).json({ success: false, message: "Token invalid" });
  }
};
