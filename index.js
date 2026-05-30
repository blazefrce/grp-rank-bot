const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

const API_KEY = process.env.API_KEY;
const GROUP_ID = process.env.GROUP_ID;

app.get("/", (req, res) => {
	res.send("GRP Rank API Online");
});

/*
	TEST MEMBERS
	https://domain-railway-kamu/members
*/
app.get("/members", async (req, res) => {

	try {

		const response = await axios.get(
			`https://apis.roblox.com/cloud/v2/groups/${GROUP_ID}/memberships?maxPageSize=20`,
			{
				headers: {
					"x-api-key": API_KEY
				}
			}
		);

		res.json(response.data);

	} catch(err) {

		console.error(err.response?.data || err);

		res.status(500).json(
			err.response?.data || err.toString()
		);

	}

});

/*
	TEST API KEY
	https://domain-railway-kamu/testrank
*/
app.get("/testrank", async (req, res) => {

	try {

		const response = await axios.get(
			`https://apis.roblox.com/cloud/v2/groups/${GROUP_ID}/roles`,
			{
				headers: {
					"x-api-key": API_KEY
				}
			}
		);

		res.json(response.data);

	} catch(err) {

		console.error(err.response?.data || err);

		res.status(500).json(
			err.response?.data || err.toString()
		);

	}

});

/*
	NANTI DIPAKAI ROBLOX
	BELUM FINAL
*/
app.post("/rank", async (req, res) => {

	try {

		const userId = req.body.userId;
		const roleId = req.body.roleId;

		res.json({
			success: true,
			message: "Endpoint aktif",
			userId,
			roleId
		});

	} catch(err) {

		console.error(err);

		res.status(500).json({
			success: false,
			error: err.toString()
		});

	}

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log("Running on port", PORT);
});
