export function setupCounter(element: HTMLButtonElement) {
	let counter = 0
	const setCounter = (count: number) => {
		counter = count
		element.innerHTML = `count is ${counter}`
	}
	element.addEventListener('click', () => setCounter(counter + 1))
	setCounter(0)
}

export async function fetchSites(site: string, zip: string) {
	if (site == "") return [];

	let res = await fetch(`https://aru-test-center-search.collegeboard.org/prod/test-centers?date=${site}&zip=${zip}&country=US`,
		{ method: 'GET' });
	return await res.json();
}

export async function fetchTestDates() {
	let res = await fetch(`https://sat-admin-dates.collegeboard.org`, { method: 'GET' });
	return await res.json();
}