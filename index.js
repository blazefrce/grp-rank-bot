const express = require("express");
const noblox = require("noblox.js");

const app = express();

const COOKIE = process.env.COOKIE;
const GROUP_ID = Number(process.env.GROUP_ID);

app.use(express.json());

async function startBot() {
	try {

		console.log("Starting login...");

		await noblox.setCookie(COOKIE);

		console.log("Cookie accepted");

		const currentUser = await noblox.getCurrentUser();

		console.log("Logged in as:", currentUser.UserName);

	} catch (err) {

		console.error("LOGIN ERROR:");
		console.error(err);

	}
}

startBot();

app.get("/", (req, res) => {
	res.send("GRP Rank Bot Online");
});

app.get("/ranker", async (req, res) => {

	try {

		const userId = Number(req.query.userid);
		const rank = Number(req.query.rank);

		await noblox.setRank(
			GROUP_ID,
			userId,
			rank
		);

		res.json({
			success: true,
			userId,
			rank
		});

	} catch (err) {

		console.error(err);

		res.status(500).json({
			success: false,
			error: err.toString()
		});

	}

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Running on ${PORT}`);
});
