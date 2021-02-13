let ctx = document.getElementById('myChart').getContext('2d');
let note = document.getElementById("note");

let http_xmlRequest = new XMLHttpRequest();
http_xmlRequest.open('GET','https://api.covid19api.com/countries');
http_xmlRequest.send();
http_xmlRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

        	let countries = JSON.parse(this.responseText);
        	let paren  = document.getElementById("countries");
        	for(let i=0;i<countries.length;i++)
        	{
        		let button = document.createElement("BUTTON");
                let txt = document.createTextNode(countries[i].Country);
                button.classList.add("country");
                button.addEventListener("click", function(){ get_data(countries[i].Country); });
                button.appendChild(txt);
                paren.appendChild(button);
        	}
       }
    };
let xmlRequest = new XMLHttpRequest();
function get_data(country)
{
	xmlRequest.open('GET','https://api.covid19api.com/dayone/country/'+country);
    xmlRequest.send();  
}
xmlRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            note.style.display="none";
        	let data = JSON.parse(this.responseText);
            let date  = [];
            let conf = [];
            let rec = [];
            let acti = [];
            let death  = [];
            let count  = data[0].Country;
        	for(let i=0;i<data.length;i++)
        	{
        		date.push((data[i].Date).substring(0, 10));
        		conf.push(data[i].Confirmed);
        		rec.push(data[i].Recovered);
        		acti.push(data[i].Active);
        		death.push(data[i].Deaths);
        	}
     
        	var myChart = new Chart(ctx, {
                 type: 'line',
			    data: {
				labels: date,
				datasets: [{
					label: 'Recovered',
					backgroundColor: '#f05454',
					borderColor: '#f05454',
					data:rec,
					fill: false,
				}, {
					label: 'Confirmed',
					fill: false,
					backgroundColor: '#654062',
					borderColor: '#654062',
					data:conf,
				},
				{
					label: 'Deaths',
					fill: false,
					backgroundColor: '#ffd66b',
					borderColor: '#ffd66b',
					data:death,
				},
				{
					label: 'Active',
					fill: false,
					backgroundColor: '#965d62',
					borderColor: '#965d62',
					data:acti,
				}]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: count 
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Dates'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Numbers'
						}
					}]
				}
			}

        	});
       }
    };