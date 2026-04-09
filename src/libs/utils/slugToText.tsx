export function slugToText(slug: string) {
	if (slug.includes("-")) {
		const split = slug.split("-");
		return split
			.map((item) => item.charAt(0).toLocaleUpperCase() + item.slice(1))
			.join(" ");
	}

	return slug.charAt(0).toLocaleUpperCase() + slug.slice(1);
}
