async function loginHandler(req, res) {
    const data = req.body;

    res.json(req.body);
    console.log(data);
}


module.exports = loginHandler;