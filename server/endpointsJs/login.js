async function loginHandler(req, res) {
    const data = req.body;

    res.json("Success!");
    console.log(data);
}


module.exports = loginHandler;