const API_URL = import.meta.env.VITE_API_URI ?? "http://localhost:3000/api";
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
