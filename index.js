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
	List memberships
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
	Test API Key
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
	Find membership by UserId
	Example:
	/find/11028647983
*/
app.get("/find/:userid", async (req, res) => {

	try {

		const userId = String(req.params.userid);

		const response = await axios.get(
			`https://apis.roblox.com/cloud/v2/groups/${GROUP_ID}/memberships?maxPageSize=100`,
			{
				headers: {
					"x-api-key": API_KEY
				}
			}
		);

		const memberships = response.data.groupMemberships || [];

		const member = memberships.find(m =>
			m.user === `users/${userId}`
		);

		if (!member) {

			return res.status(404).json({
				success: false,
				message: "Member not found"
			});

		}

		res.json(member);

	} catch(err) {

		console.error(err.response?.data || err);

		res.status(500).json(
			err.response?.data || err.toString()
		);

	}

});

/*
	Placeholder rank endpoint
*/
app.post("/rank", async (req, res) => {

	try {

		const userId = req.body.userId;
		const roleId = req.body.roleId;

		res.json({
			success: true,
			message: "Rank endpoint active",
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
