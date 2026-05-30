const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

const API_KEY = process.env.API_KEY;
const GROUP_ID = process.env.GROUP_ID;

app.get("/", (req, res) => {
	res.send("GRP Rank API Online");
});

app.get("/testrank", async (req, res) => {

	try {

		const response = await axios.patch(
			`https://apis.roblox.com/cloud/v2/groups/${GROUP_ID}/users/1`,
			{
				roleId: 731113037
			},
			{
				headers: {
					"x-api-key": API_KEY,
					"Content-Type": "application/json"
				}
			}
		);

		res.json(response.data);

	} catch(err) {

		res.status(500).json(
			err.response?.data || err.toString()
		);

	}

});

app.post("/rank", async (req, res) => {

	try {

		const userId = req.body.userId;
		const roleId = req.body.roleId;

		const response = await axios.patch(
			`https://groups.roblox.com/v1/groups/${GROUP_ID}/users/${userId}`,
			{
				roleId: roleId
			},
			{
				headers: {
					"x-api-key": API_KEY,
					"Content-Type": "application/json"
				}
			}
		);

		res.json({
			success: true,
			data: response.data
		});

	} catch(err) {

		console.error(err.response?.data || err);

		res.status(500).json({
			success: false,
			error: err.response?.data || err.toString()
		});

	}

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log("Running on port", PORT);
});
