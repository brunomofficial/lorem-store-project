const express = require("express");
const app = express();
app.use(express.static("."));
const PORT = 3000;
const host = '0.0.0.0'

app.listen(PORT, host, () => {
    console.log(`Server started at https://localhost:${PORT}`)
});

/*
ip route show || grep default
sudo ufw allow 3000/tcp
sudo ufw delete allow 3000/tcp
*/