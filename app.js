window.onload = function(){
	initialbusses = [
		{
			name: "MM Series",
			source: "Dakshineshwar",
			destination: "Duttapukur",
			number: "MM3",
			passengerCapacity: 100
		},
		
		{
			name: "KB Series",
			source: "Bangur",
			destination: "Sapoorji Estate",
			number: "KB16",
			passengerCapacity: 85
		},
		
		{
			name: "DN Series",
			source: "Habra",
			destination: "Jagolia",
			number: "DN26",
			passengerCapacity: 125
		},
		
		{
			name: "V Series",
			source: "Airport",
			destination: "Tollyguange",
			number: "V1",
			passengerCapacity: 150
		},
		
		{
			name: "DN Series",
			source: "Shyambazar",
			destination: "Hasnabad",
			number: "DN18",
			passengerCapacity: 90
		}
	]
	if(localStorage.getItem("busses") == null){
		localStorage.setItem("busses", JSON.stringify(initialbusses));
	}
};

function display(searchArray=undefined){
	let addElements="";
	let busses;
	if(searchArray == undefined){
	    busses = JSON.parse(localStorage.getItem("busses"));
	}
	else{
		busses = searchArray;
	}

	busses.forEach(function(ob, index){
		let addRow = `<tr>
					<td>${ob.name}</td>
					<td>${ob.source}</td>
					<td>${ob.destination}</td>
					<td>${ob.number}</td>
					<td>${ob.passengerCapacity}</td>
					<td><button onclick="updateBus(${index})">Update</button>
						<button onclick="deleteBus(${index})">Delete</button>
					</td>
				  </tr>`;
		addElements += addRow;
	});
	document.getElementsByClassName('table-body')[0].innerHTML = addElements;
}

display();

function addBus(e){
	e.preventDefault();
	
	let bus={};
	
	let name = document.getElementById('name').value;
	let source = document.getElementById('source').value;
	let destination = document.getElementById('dest').value;
	let number = document.getElementById('num').value;
	let passengerCapacity = document.getElementById('pass').value;
	
	bus.name = name;
	bus.source = source;
	bus.destination = destination;
	bus.number = number;
	bus.passengerCapacity = Number(passengerCapacity);
	
	let busses = JSON.parse(localStorage.getItem("busses"));
	busses.push(bus);
	localStorage.setItem("busses", JSON.stringify(busses));
	
	display();
	
	document.getElementById('name').value="";
	document.getElementById('source').value="";
	document.getElementById('dest').value="";
	document.getElementById('num').value="";
	document.getElementById('pass').value="";
	
}

function searchDisplay(){
	let searchEle = document.getElementById("input").value;
	let busses = JSON.parse(localStorage.getItem("busses"));
	
	let searchArray = busses.filter(function(b){
		return (
		b.source.toLowerCase().indexOf(searchEle.toLowerCase())!=-1 || b.destination.toLowerCase().indexOf(searchEle.toLowerCase())!=-1);
	});
	display(searchArray);
}

function deleteBus(index){
	if (confirm("Are you sure, you want to delete?")) {
		let busses = JSON.parse(localStorage.getItem("busses"));
		busses.splice(index, 1);
		localStorage.setItem("busses", JSON.stringify(busses));
		display();
	}
}

let uindex;
function updateBus(index){
	let modal = document.getElementsByClassName('modal')[0];
	modal.style.display="block";
	let busses = JSON.parse(localStorage.getItem("busses"));
	document.getElementById('upname').value = busses[index].name;
	document.getElementById('upsource').value = busses[index].source;
	document.getElementById('updest').value = busses[index].destination;
	document.getElementById('upnum').value = busses[index].number;
	document.getElementById('uppass').value = busses[index].passengerCapacity;
	uindex = index;
}

function submitUpdate(e){
	e.preventDefault();
	if (e.target.className == "modal" || e.target.className == "button") {
		let modal = document.getElementsByClassName('modal')[0];
		modal.style.display="none";
	}
	if (e.target.className == "button") {
		let busses = JSON.parse(localStorage.getItem("busses"));
		let name = document.getElementById('upname').value;
		let source = document.getElementById('upsource').value;
		let destination = document.getElementById('updest').value;
		let number = document.getElementById('upnum').value;
		let passengerCapacity = document.getElementById('uppass').value;
		busses[uindex].name = name;
		busses[uindex].source = source;
		busses[uindex].destination = destination;
		busses[uindex].number = number;
		busses[uindex].passengerCapacity = Number(passengerCapacity);
		localStorage.setItem("busses", JSON.stringify(busses));
		
		display();
	}	
}