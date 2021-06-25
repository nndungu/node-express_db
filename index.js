const server = require("./api/server");

PORT = 5500;

server.listen(PORT, () => {
    console.log(`\n*** Server running on port ${PORT} ***\n`);
});
