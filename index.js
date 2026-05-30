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

	} catch (err) {

		console.error(err.response?.data || err);

		res.status(500).json(
			err.response?.data || err.toString()
		);

	}

});

/*
	List roles
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

	} catch (err) {

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

	} catch (err) {

		console.error(err.response?.data || err);

		res.status(500).json(
			err.response?.data || err.toString()
		);

	}

});

/*
	TEST ASSIGN ROLE
*/
app.get("/testassign", async (req, res) => {

	try {

		const membershipId = "MTEwMjg2NDc5ODM";

		const response = await axios.post(
			`https://apis.roblox.com/cloud/v2/groups/${GROUP_ID}/memberships/${membershipId}:assignRole`,
			{
				role: `groups/${GROUP_ID}/roles/731113037`
			},
			{
				headers: {
					"x-api-key": API_KEY,
					"Content-Type": "application/json"
				}
			}
		);

		res.json(response.data);

	} catch (err) {

		console.error(err.response?.data || err);

		res.status(500).json(
			err.response?.data || err.toString()
		);

	}

});

/*
	AUTO RANK ENDPOINT
*/
app.post("/rank", async (req, res) => {

	try {

		const userId = String(req.body.userId);
		const roleId = String(req.body.roleId);

		// Cari membership pemain
		const membershipResponse = await axios.get(
			`https://apis.roblox.com/cloud/v2/groups/${GROUP_ID}/memberships?maxPageSize=100`,
			{
				headers: {
					"x-api-key": API_KEY
				}
			}
		);

		const memberships = membershipResponse.data.groupMemberships || [];

		const member = memberships.find(m =>
			m.user === `users/${userId}`
		);

		if (!member) {

			return res.status(404).json({
				success: false,
				error: "Member not found in group"
			});

		}

		const membershipId = member.path.split("/").pop();

		// Assign role baru
		const assignResponse = await axios.post(
			`https://apis.roblox.com/cloud/v2/groups/${GROUP_ID}/memberships/${membershipId}:assignRole`,
			{
				role: `groups/${GROUP_ID}/roles/${roleId}`
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
			userId,
			roleId,
			data: assignResponse.data
		});

	} catch (err) {

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
