const noblox = require("noblox.js");

async function test() {
    try {
        console.log("COOKIE LENGTH:", process.env.COOKIE ? process.env.COOKIE.length : 0);

        await noblox.setCookie(process.env.COOKIE);

        const user = await noblox.getCurrentUser();

        console.log("SUCCESS");
        console.log(user);
    } catch (err) {
        console.error("FAILED");
        console.error(err);
    }
}

test();
