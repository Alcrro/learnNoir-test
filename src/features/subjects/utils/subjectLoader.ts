import { API_URL } from "../../../libs/config";
export function subjectLoader() {
	async function loadSubjects() {
		const result = await fetch(`${API_URL}/subjects/stats`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await result.json();
		console.log(data);

		return data;
	}

	loadSubjects();
}
