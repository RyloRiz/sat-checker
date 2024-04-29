import './style.css'
import { fetchSites } from './utils.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = ``

let zipcode = document.querySelector<HTMLInputElement>('#zip') as HTMLInputElement;
let start = document.querySelector<HTMLButtonElement>('#start') as HTMLButtonElement;
let stop = document.querySelector<HTMLButtonElement>('#stop') as HTMLButtonElement;
let check = document.querySelector<HTMLButtonElement>('#check') as HTMLButtonElement;
let tbl = document.querySelector<HTMLTableElement>('#tbl') as HTMLTableElement;
// let tbody = tbl!.querySelector('tbody');

let isActive = false;
let zip: string = '00000';

start.addEventListener('click', () => isActive = true);

stop.addEventListener('click', () => isActive = false);

check.addEventListener('click', () => update());

async function update() {
	zip = zipcode.value.toString();

	let rows = (document.querySelector("#tbl > thead") as HTMLTableSectionElement).rows;
	for (let i = 1; i < rows.length; i++) {
		rows[i].remove()
	}
	let sites: any[] = await fetchSites(zip);
	let under15Miles = false;
	let under15Name = '';
	let under15Distance = 0;
	console.log(sites);
	sites.forEach(site => {
		if (site['seatAvailability'] == true && site['distance'] < 35) {
			let row = tbl.insertRow(tbl.rows.length);
			let nameCell = row.insertCell(0);
			let codeCell = row.insertCell(1);
			let addressCell = row.insertCell(2);
			let distanceCell = row.insertCell(3);
			nameCell.innerHTML = site['name'];
			codeCell.innerHTML = site['code'];
			addressCell.innerHTML = `${site['address1']}, ${site['city']} ${site['state']}`;
			distanceCell.innerHTML = Math.round(site['distance']).toString();
			if (Math.round(site['distance']) <= 15) {
				under15Miles = true;
				under15Name = nameCell.innerHTML;
				under15Distance = Math.round(site['distance']);
			}
		}
	});
	if (under15Miles) {
		setTimeout(function () {
			alert(`The location "${under15Name}" is only ${under15Distance} miles away!`);
		}, 1);
	}
}

setInterval(async () => {
	if (!isActive) return;
	console.log("Searching...");
	await update();
}, 1000 * 60 * 1);
