export function setupCounter(element: HTMLButtonElement) {
	let counter = 0
	const setCounter = (count: number) => {
		counter = count
		element.innerHTML = `count is ${counter}`
	}
	element.addEventListener('click', () => setCounter(counter + 1))
	setCounter(0)
}

export async function fetchSites(zip: string) {
	let res = await fetch(`https://aru-test-center-search.collegeboard.org/prod/test-centers?date=2024-06-01&zip=${zip}&country=US`,
		{ method: 'GET' });
	return await res.json();
}