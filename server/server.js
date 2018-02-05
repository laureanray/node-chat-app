const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
let port = process.env.PORT || 3000;
let app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server is up and running at port ${port}`);
});
