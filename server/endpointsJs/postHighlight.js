function postHighlightHandler(req, res) {
    // Handle file upload and form data here
    const image = req.file; // File details
    const description = req.body.description;
    console.log(image, description);
    // Process and save image and description to the database
  
    // Send a response to the client
    res.status(200).json({ message: 'File uploaded successfully' });
}


module.exports = {postHighlightHandler}