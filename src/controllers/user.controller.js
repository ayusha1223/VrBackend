const getUsers = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get all users",
  });
};

module.exports = {
  getUsers,
};