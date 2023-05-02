module.exports = (ctx) => ({
  async fun1(req, res) {
    console.log("user's fun1 called!");
    res.status(200).json({ status: 200 });
    return;
  },
});
