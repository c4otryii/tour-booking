import User from "../models/Tour.js";

export const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create User",
    });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: updateUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Updated failed",
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Deleted failed",
    });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "Successful",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found User",
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      success: true,
      message: "Successful",
      data: users,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found User",
    });
  }
};

export const changePassword = async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(id);

    // Nếu không tìm thấy người dùng
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    // Kiểm tra mật khẩu cũ
    const checkCorrectPassword = await bcrypt.compare(
      oldPassword,
      user.password
    );

    // Nếu mật khẩu cũ không đúng
    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Old password is incorrect" });
    }

    // Hash mật khẩu mới
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    // Cập nhật mật khẩu mới trong cơ sở dữ liệu
    user.password = hash;
    await user.save();

    // Phản hồi thành công
    return res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    // Xử lý lỗi
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to change password" });
  }
};
