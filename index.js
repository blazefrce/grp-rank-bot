const express = require("express");
const noblox = require("noblox.js");

const app = express();

const COOKIE = process.env.COOKIE;
const GROUP_ID = Number(process.env.GROUP_ID);

app.use(express.json());

async function startBot() {
	try {
		await noblox.setCookie(COOKIE);

		const currentUser = await noblox.getCurrentUser();

		console.log("Logged in as:", currentUser.UserName);
		console.log("Group ID:", GROUP_ID);

	} catch (err) {
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
