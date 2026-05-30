const noblox = require("noblox.js");

async function test() {
    try {

        console.log("COOKIE EXISTS:", !!process.env.COOKIE);
        console.log("COOKIE LENGTH:", process.env.COOKIE ? process.env.COOKIE.length : 0);

        if (process.env.COOKIE) {
            console.log(
                "COOKIE START:",
                process.env.COOKIE.substring(0, 50)
            );
        }

        console.log("Trying login...");

        await noblox.setCookie(process.env.COOKIE);

        console.log("Cookie accepted");

        const user = await noblox.getCurrentUser();

        console.log("SUCCESS");
        console.log("USERNAME:", user.UserName);
        console.log("USERID:", user.UserID);

    } catch (err) {

        console.error("FAILED");
        console.error(err);

    }
}

test();
