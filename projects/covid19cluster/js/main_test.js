var width = 454,
		height = 625;

var svg = d3.select(".bottom-container")
	.append("svg")
		.attr("width", width)
		.attr("height", height);

var g = svg.append("g")
.attr("class", "everything");

//tooltip status
var isTooltipHidden = true;

//legend status
var isLegendHidden = true;

//svg object
var link, node, idText;

//scale by category
var groupCluster = d3.scaleOrdinal()
  .domain([1, 2, 3, 4, 5, 6])
  .range([20, 70, 120, 170, 220, 270])

//data--object with node and links
var graph;

//add zoom capabilities
var zoom_handler = d3.zoom()
    .on("zoom", zoom_actions);

zoom_handler(svg);

var radioValue;

//data url
var url = "/covid19cluster/json/kasus-corona-indonesia.json";

////////////////////////////////////////////////////////////////////////////////////////////////////
//UPDATE FORCE NORMAL
////////////////////////////////////////////////////////////////////////////////////////////////////

function forceNormal() {
	simulation.force("center")
		.x(width * forceProperties.center.x+70)
		.y(height * forceProperties.center.y+200);
	simulation.force("charge")
		.strength(forceProperties.charge.strength * forceProperties.charge.enabled)
		.distanceMin(forceProperties.charge.distanceMin)
		.distanceMax(forceProperties.charge.distanceMax);
	simulation.force("collide")
		.strength(forceProperties.collide.strength * forceProperties.charge.enabled)
		.radius(forceProperties.collide.radius)
		.iterations(forceProperties.collide.iterations);
	simulation.force("forceY")
		.strength(forceProperties.forceY.strength * forceProperties.forceY.enabled)
		.y(height * forceProperties.forceY.y);
	simulation.force("forceX")
		.strength(forceProperties.forceX.strength * forceProperties.forceX.enabled)
		.x(width * forceProperties.forceX.x);
	simulation.force("link")
		.id(function(d) { return d.id ;})
		.distance(forceProperties.link.distance)
		.iterations(forceProperties.link.iterations)
		.links(forceProperties.link.enabled ? graph.links : []);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
//UPDATE FORCE BY GROUPING
////////////////////////////////////////////////////////////////////////////////////////////////////
//GROUP BY CLUSTER
////////////////////////////////////////////////////////////////////////////////////////////////////

function forceCluster() {

	//width divider
	var div = Math.max.apply(Math,graph.nodes.map(function(d){return d.provinsiid;}));
	////console.log(div);
	////console.log(width);
	var scale = width/div/1.5;
	////console.log(scale);
	var arrdomain = Array.from(Array(div), (value, index) => (index+1));
	var arrrange = Array.from(Array(div), (value, index) => ((index+1)*scale));
	////console.log(arrrange);
	////console.log(arrdomain);

	var scaleCat = d3.scaleOrdinal()
	  .domain(arrdomain)
	  .range(arrrange)

	simulation.force("center")
		.x(width * forceProperties.center.x+55)
		.y(height * forceProperties.center.y+200);
	simulation.force("charge")
		.strength(-150)
		.distanceMin(forceProperties.charge.distanceMin)
		.distanceMax(forceProperties.charge.distanceMax);
	simulation.force("collide")
		.strength(forceProperties.collide.strength * forceProperties.charge.enabled)
		.radius(forceProperties.collide.radius)
		.iterations(forceProperties.collide.iterations);
	simulation.force("forceX")
		.strength(0.5)
		.x(height * forceProperties.forceX.x);
	simulation.force("forceY")
		.strength(0.9)
		.y(function(d){ return scaleCat(d.provinsiid) } );
	simulation.force("link")
		.id(function(d) { return d.id ;})
		.distance(forceProperties.link.distance)
		.strength(0.01)
		.iterations(forceProperties.link.iterations)
		.links(forceProperties.link.enabled ? graph.links : []);

}

////////////////////////////////////////////////////////////////////////////////////////////////////
//GROUP BY AGE
////////////////////////////////////////////////////////////////////////////////////////////////////

function forceAge() {

	//width divider
	var div = 11
	////console.log(div);
	////console.log(width);
	var scale = width/div/1.5;
	////console.log(scale);
	var arrdomain = Array.from(Array(div), (value, index) => (index+1));
	var arrrange = Array.from(Array(div), (value, index) => ((index+1)*scale));
	////console.log(arrrange);
	////console.log(arrdomain);

	var scaleCat = d3.scaleQuantile()
	  .domain([0,10,20,30,40,50,60,70,80,90,100])
	  .range(arrrange)

	simulation.force("center")
		.x(width * forceProperties.center.x+60)
		.y(height * forceProperties.center.y+150);
	simulation.force("charge")
		.strength(-150)
		.distanceMin(forceProperties.charge.distanceMin)
		.distanceMax(forceProperties.charge.distanceMax);
	simulation.force("collide")
		.strength(forceProperties.collide.strength * forceProperties.charge.enabled)
		.radius(forceProperties.collide.radius)
		.iterations(forceProperties.collide.iterations);
	simulation.force("forceX")
		.strength(0.5)
		.x(height * forceProperties.forceX.x);
	simulation.force("forceY")
		.strength(0.9)
		.y(function(d){ return scaleCat(d.umur) } );
	simulation.force("link")
		.id(function(d) { return d.id ;})
		.distance(forceProperties.link.distance)
		.strength(0.01)
		.iterations(forceProperties.link.iterations)
		.links(forceProperties.link.enabled ? graph.links : []);

}

////////////////////////////////////////////////////////////////////////////////////////////////////
//GROUP BY GENDER
////////////////////////////////////////////////////////////////////////////////////////////////////

function forceGender() {

	//width divider
	var div = Math.max.apply(Math,graph.nodes.map(function(d){return d.genderid;}));
	////console.log(div);
	////console.log(width);
	var scale = width/div/1.5;
	////console.log(scale);
	var arrdomain = Array.from(Array(div), (value, index) => (index+1));
	var arrrange = Array.from(Array(div), (value, index) => ((index+1)*scale));
	////console.log(arrrange);
	////console.log(arrdomain);

	var scaleCat = d3.scaleOrdinal()
	  .domain(arrdomain)
	  .range(arrrange)

	simulation.force("center")
		.x(width * forceProperties.center.x+50)
		.y(height * forceProperties.center.y+100);
	simulation.force("charge")
		.strength(-150)
		.distanceMin(forceProperties.charge.distanceMin)
		.distanceMax(forceProperties.charge.distanceMax);
	simulation.force("collide")
		.strength(forceProperties.collide.strength * forceProperties.charge.enabled)
		.radius(forceProperties.collide.radius)
		.iterations(forceProperties.collide.iterations);
	simulation.force("forceX")
		.strength(0.5)
		.x(height * forceProperties.forceX.x);
	simulation.force("forceY")
		.strength(0.7)
		.y(function(d){ return scaleCat(d.genderid) } );
	simulation.force("link")
		.id(function(d) { return d.id ;})
		.distance(forceProperties.link.distance)
		.strength(0.01)
		.iterations(forceProperties.link.iterations)
		.links(forceProperties.link.enabled ? graph.links : []);

}

////////////////////////////////////////////////////////////////////////////////////////////////////
//GROUP BY STATUS
////////////////////////////////////////////////////////////////////////////////////////////////////

function forceStatus() {

	//width divider
	var div = Math.max.apply(Math,graph.nodes.map(function(d){return d.statusid;}));
	////console.log(div);
	////console.log(width);
	var scale = width/div/1.5;
	////console.log(scale);
	var arrdomain = Array.from(Array(div), (value, index) => (index+1));
	var arrrange = Array.from(Array(div), (value, index) => ((index+1)*scale));
	////console.log(arrrange);
	////console.log(arrdomain);

	var scaleCat = d3.scaleOrdinal()
	  .domain(arrdomain)
	  .range(arrrange)

	simulation.force("center")
		.x(width * forceProperties.center.x+55)
		.y(height * forceProperties.center.y+70);
	simulation.force("charge")
		.strength(-150)
		.distanceMin(forceProperties.charge.distanceMin)
		.distanceMax(forceProperties.charge.distanceMax);
	simulation.force("collide")
		.strength(forceProperties.collide.strength * forceProperties.charge.enabled)
		.radius(forceProperties.collide.radius)
		.iterations(forceProperties.collide.iterations);
	simulation.force("forceX")
		.strength(0.5)
		.x(height * forceProperties.forceX.x);
	simulation.force("forceY")
		.strength(0.7)
		.y(function(d){ return scaleCat(d.statusid) } );
	simulation.force("link")
		.id(function(d) { return d.id ;})
		.distance(forceProperties.link.distance)
		.strength(0.01)
		.iterations(forceProperties.link.iterations)
		.links(forceProperties.link.enabled ? graph.links : []);

}

////////////////////////////////////////////////////////////////////////////////////////////////////
//GROUP BY NATIONALITY
////////////////////////////////////////////////////////////////////////////////////////////////////

function forceNational() {

	//width divider
	var div = Math.max.apply(Math,graph.nodes.map(function(d){return d.wnid;}));
	////console.log(div);
	////console.log(width);
	var scale = width/div/1.5;
	////console.log(scale);
	var arrdomain = Array.from(Array(div), (value, index) => (index+1));
	var arrrange = Array.from(Array(div), (value, index) => ((index+1)*scale));
	////console.log(arrrange);
	////console.log(arrdomain);

	var scaleCat = d3.scaleOrdinal()
	  .domain(arrdomain)
	  .range(arrrange)

	simulation.force("center")
		.x(width * forceProperties.center.x+55)
		.y(height * forceProperties.center.y+50);
	simulation.force("charge")
		.strength(-150)
		.distanceMin(forceProperties.charge.distanceMin)
		.distanceMax(forceProperties.charge.distanceMax);
	simulation.force("collide")
		.strength(forceProperties.collide.strength * forceProperties.charge.enabled)
		.radius(forceProperties.collide.radius)
		.iterations(forceProperties.collide.iterations);
	simulation.force("forceX")
		.strength(0.5)
		.x(height * forceProperties.forceX.x);
	simulation.force("forceY")
		.strength(0.7)
		.y(function(d){ return scaleCat(d.wnid) } );
	simulation.force("link")
		.id(function(d) { return d.id ;})
		.distance(forceProperties.link.distance)
		.strength(0.01)
		.iterations(forceProperties.link.iterations)
		.links(forceProperties.link.enabled ? graph.links : []);

}

////////////////////////////////////////////////////////////////////////////////////////////////////
//GROUP BY HOSPITAL
////////////////////////////////////////////////////////////////////////////////////////////////////

function forceHospital() {

	//width divider
	var div = Math.max.apply(Math,graph.nodes.map(function(d){return d.rsid;}));
	////console.log(div);
	////console.log(width);
	var scale = width/div/1.5;
	////console.log(scale);
	var arrdomain = Array.from(Array(div), (value, index) => (index+1));
	var arrrange = Array.from(Array(div), (value, index) => ((index+1)*scale));
	////console.log(arrrange);
	////console.log(arrdomain);

	var scaleCat = d3.scaleOrdinal()
	  .domain(arrdomain)
	  .range(arrrange)

	simulation.force("center")
		.x(width * forceProperties.center.x+50)
		.y(height * forceProperties.center.y+150);
	simulation.force("charge")
		.strength(-150)
		.distanceMin(forceProperties.charge.distanceMin)
		.distanceMax(forceProperties.charge.distanceMax);
	simulation.force("collide")
		.strength(forceProperties.collide.strength * forceProperties.charge.enabled)
		.radius(forceProperties.collide.radius)
		.iterations(forceProperties.collide.iterations);
	simulation.force("forceX")
		.strength(0.5)
		.x(height * forceProperties.forceX.x);
	simulation.force("forceY")
		.strength(0.7)
		.y(function(d){ return scaleCat(d.rsid) } );
	simulation.force("link")
		.id(function(d) { return d.id ;})
		.distance(forceProperties.link.distance)
		.strength(0.01)
		.iterations(forceProperties.link.iterations)
		.links(forceProperties.link.enabled ? graph.links : []);

}

////////////////////////////////////////////////////////////////////////////////////////////////////
//LOAD DATA
////////////////////////////////////////////////////////////////////////////////////////////////////

//load data
d3.json(url).then(function(_graph) {
	graph = _graph;
	initializeDisplay();
	initializeSimulation();

});

//kelompok warna
var warna = d3.scaleOrdinal(d3.schemeCategory10);

//radius lingkaran
var radius = 12;

////////////////////////////////////////////////////////////////////////////////////////////////////
//FORCE SIMULATION
////////////////////////////////////////////////////////////////////////////////////////////////////

//Force Simulator
var simulation = d3.forceSimulation();

//set up simulation to update location after each tick
function initializeSimulation() {
	simulation.nodes(graph.nodes);
	initializeForce();
	simulation.on("tick", ticked);
}

//values of all force
forceProperties = {
	center: {
		x: 0.5,
		y: 0.5
	},
	charge: {
		enabled: true,
		strength: -40,
		distanceMin: 1,
		distanceMax: 2000
	},
	collide: {
		enabled: true,
		strength: 10,
		iterations: 1,
		radius: 5
	},
	forceX: {
		enabled: true,
		strength: 0.1,
		x: .5
	},
	forceY: {
		enabled: true,
		strength: .1,
		y: .5
	},
	link: {
		enabled: true,
		distance: 50,
		iterations: 1
	}
}

//add force to simulations
function initializeForce() {
	//add force and associate each with a name
	simulation
		.force("link", d3.forceLink())
		.force("charge", d3.forceManyBody())
		.force("collide", d3.forceCollide())
		.force("center", d3.forceCenter())
		.force("forceX", d3.forceX())
		.force("forceY", d3.forceY());
	//apply properties to each force
	updateForces();
}

//apply new force properties
function updateForces() {
	//get radio button value
	if ( document.getElementById("normal").selected ) {
		forceNormal();
	} else if ( document.getElementById("cluster").selected ) {
		forceCluster();
	} else if ( document.getElementById("gender").selected ) {
		forceGender();
	} else if ( document.getElementById("negara").selected ) {
		forceNational();
	} else if ( document.getElementById("status").selected) {
		forceStatus();
	} else if ( document.getElementById("umur").selected) {
		forceAge();
	} else if ( document.getElementById("rs").selected) {
		forceHospital();
	}


	//update ignored until this is run
	//restart the simulation (important if simulation has already slowdown)
	simulation.alpha(1).restart();
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//DISPLAY
////////////////////////////////////////////////////////////////////////////////////////////////////

//generate the svg objects and force simulation
function initializeDisplay() {
	//set the data and properties	of link lines
	link = g
		.append("g")
		.attr("class","links")
		.selectAll("line")
		.data(graph.links)
		.enter()
		.append("line");

	//set the data and properties of the node circle
	node = g
		.append("g")
		.style("z-index","5")
		.attr("class", "nodes")
		.selectAll("circle")
		.data(graph.nodes)
		.enter()
		.append("circle")
		.style("z-index","6")
		.on("click", clickNode)
		.on("mouseover", function(d) {
			d3.select(this).style("cursor", "pointer");
		})
		.on("mouseout", function(d) {
			d3.select(this).style("cursor", "default");
		})
		.call(d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended));

	//text on node
	idText = g
		.append("g")
		.style("z-index","7")
		.selectAll("text")
		.data(graph.nodes)
		.enter()
		.append("text")
			.style("z-index","8")
			.attr("class",".text")
			.attr("text-anchor", "middle")
			.attr("dy", ".35em")
			.text(function(d) { return d.id })
			.style("font-family","Lato")
			.style("font-size", 11)
			.style("fill","white")
			.on("click", clickNode)
			.on("mouseover", function(d) {
				d3.select(this).style("cursor", "pointer");
			})
			.on("mouseout", function(d) {
				d3.select(this).style("cursor", "default");
			})
			.call(d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended));

	svg.call(d3.drag()
		.on("start", dragstarted)
		.on("drag", dragged)
		.on("end", dragended));

	//node tooltip
	node
		.append("title")
		.text(function(d) { return d.kasus; });

	//visualize the graph
	updateDisplay();
	initialScale();
}


//CHANGE DISPLAY SCALE
function initialScale() {

	var scale = "translate(50,50), scale(.6,.6)";
	////console.log(scale);

	node
		.attr("transform",scale);

	link
		.attr("transform",scale);

	idText
		.attr("transform",scale);

}

//update the display based on the forces (but not positions)
function updateDisplay() {

	if ( document.getElementById("cluster-color").selected ) {
		colorCluster();
	} else if ( document.getElementById("gender-color").selected ) {
		colorGender();
	} else if ( document.getElementById("negara-color").selected ) {
		colorNational();
	} else if ( document.getElementById("status-color").selected) {
		colorStatus();
	} else if ( document.getElementById("umur-color").selected) {
		colorAge();
	} else if ( document.getElementById("rs-color").selected) {
		colorHospital();
	}

	node
		.on("mouseover", fade(.1, "black"))
		.on("mouseout",fade(1, "white"));

	link
		.style("stroke", "white")
		.style("stroke-width", 3);

	idText
		.on("mouseover", fade(.1, "black"))
		.on("mouseout",fade(1, "white"));

		var linkedByIndex = {};
		graph.links.forEach(function(d) {
				linkedByIndex[d.source.index + "," + d.target.index] = 1;
		});

		////console.log(linkedByIndex);

		function isConnected(a, b) {
				return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
		}

		function fade(opacity,color) {
									 return function(d) {

								//node.style("stroke-opacity", function(o) {
									 //thisOpacity = isConnected(d, o) ? 1 : opacity;
									 //this.setAttribute('fill-opacity', thisOpacity);
									 //return thisOpacity;
							 //});

		 var connected = [d];

		 node.style("stroke-opacity", function(o) {
				 thisOpacity = opacity;
				 connected.forEach(function(e) {
						 if(isConnected(e, o)) { thisOpacity = 1; }
				 });
				 this.setAttribute('fill-opacity', thisOpacity);
				 return thisOpacity;
		 });



		 link
		 .style("stroke-opacity", function(o) {
				 thisOpacity = opacity;
						 connected.forEach(function(e) {
								 if(o.source === e || o.target === e) {
										 thisOpacity = 1;
								 }
						 });
						 return thisOpacity;
					})
					.style("stroke", function(o) {
								 thisColor = color;
								 connected.forEach(function(e) {
										 if(o.source === e || o.target === e) {
												 thisColor = "white";
										 }
								 });
								 return thisColor;
						 });

				 };

				 }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
//UPDATE COLOR
////////////////////////////////////////////////////////////////////////////////////////////////////
//COLOR BY CLUSTER
////////////////////////////////////////////////////////////////////////////////////////////////////
function colorCluster(){

	var data = {"klaster":["DKI Jakarta","Jawa Barat","Banten","Jawa Tengah","Jawa Timur","DI Yogyakarta","Bali","Kepulauan Riau","Lampung","Riau","Sumatera Utara","Kalimantan Barat","Kalimantan Timur","Sulawesi Utara","Sulawesi Selatan","Sulawesi Tenggara","Tidak diketahui"],
	 "id":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]};
	////console.log(data);

	var color = d3.scaleLinear()
		.range(["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896","#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"])
		.domain(data.id);

	node
		.attr("r", radius)
		.style("fill", function(d) {return color( d.provinsiid );})
		.style("stroke", "white")
		.style("stroke-width", 3);

	var el = document.getElementsByClassName("legend");
	$(el).remove();

	//CLUSTER LEGEND
	function legendCluster() {
	       // update visibility
	       isLegendHidden = !isLegendHidden;
	       var visibility = (isLegendHidden) ? "hidden" : "visible";

	       // load legend content (if it changes based on node)
				 // Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
		     var legend = d3
				 	 .select(".bottom-container")
					 .append("div")
					 .attr("class","legend")
					 .style("position", "absolute")
			     .style("padding", "4px")
			     .style("z-index", "0")
					 .style("top",0)
					 .style("visibility", visibility)
					 .append("svg")
					 .style("z-index", "0")
					 .style("width", "120px")
					 .style("height","325px")
		       .selectAll("g")
		       .data(data.id)
		       .enter()
		       .append("g")
		       .attr("transform", function(d, i) { return "translate(0," + i * 19 + ")"; });

		     legend.append("rect")
		       .attr("width", 13)
		       .attr("height", 13)
		       .style("fill", color);

		     legend.append("text")
		       .data(data.klaster)
		       .attr("x", 24)
		       .attr("y", 7)
					 .style("fill","white")
					 .style("font-family","Lato")
					 .style("font-size",9)
		       .attr("dy", ".35em")
		       .text(function(d) { return d; });

	       // place tooltip where cursor was
	       return legend.style("visibility", visibility);
	  }

		legendCluster();

		isLegendHidden = true;

};

////////////////////////////////////////////////////////////////////////////////////////////////////
//COLOR BY GENDER
////////////////////////////////////////////////////////////////////////////////////////////////////
function colorGender(){
	var domain = [1,2,3];

	var warnaGender = d3.scaleOrdinal()
	.domain(domain)
	.range(["salmon","steelblue","black"]);

	node
		.attr("r", radius)
		.style("fill", function(d) {return warnaGender( d.genderid );})
		.style("stroke", "white")
		.style("stroke-width", 3)

	var el = document.getElementsByClassName("legend");
	$(el).remove();

	//GENDER LEGEND
	function legendGender() {
	       // update visibility
	       isLegendHidden = !isLegendHidden;
	       var visibility = (isLegendHidden) ? "hidden" : "visible";

				 var data = {"klaster":["Perempuan","Laki-laki","Tidak Diketahui"],
				 	"id":[1,2,3]};
		     ////console.log(data);

		     var color = d3.scaleLinear()
		       .range(["salmon","steelblue","black"])
		       .domain(data.id);

	       // load legend content (if it changes based on node)
				 // Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
		     var legend = d3
				 	 .select(".bottom-container")
					 .append("div")
					 .attr("class","legend")
					 .style("position", "absolute")
			     .style("padding", "4px")
			     .style("z-index", "0")
					 .style("top",0)
					 .style("visibility", visibility)
					 .append("svg")
					 .style("z-index", "0")
					 .style("width", "120px")
					 .style("height","70px")
		       .selectAll("g")
		       .data(data.id)
		       .enter()
		       .append("g")
		       .attr("transform", function(d, i) { return "translate(0," + i * 19 + ")"; });

		     legend.append("rect")
		       .attr("width", 13)
		       .attr("height", 13)
		       .style("fill", color);

		     legend.append("text")
		       .data(data.klaster)
		       .attr("x", 24)
		       .attr("y", 7)
					 .style("fill","white")
					 .style("font-family","Lato")
					 .style("font-size",9)
		       .attr("dy", ".35em")
		       .text(function(d) { return d; });

	       // place tooltip where cursor was
	       return legend.style("visibility", visibility);
	  }

		legendGender();

		isLegendHidden = true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
//COLOR BY HOSPITAL
////////////////////////////////////////////////////////////////////////////////////////////////////
function colorHospital(){

	node
		.attr("r", radius)
		.style("fill", function(d) {return warna( d.rsid );})
		.style("stroke", "white")
		.style("stroke-width", 3)

	var el = document.getElementsByClassName("legend");
	$(el).remove();

	//GENDER LEGEND
	function legendHospital() {
	       // update visibility
	       isLegendHidden = !isLegendHidden;
	       var visibility = (isLegendHidden) ? "hidden" : "visible";

				 var data = {"klaster":["RSPI Sulianto Saroso, Jakarta","RS Persahabatan, Jakarta","RS Sanglah, Bali","RSPAD Gatot Subroto, Jakarta","RS Moewardi, Solo","Tidak Diketahui"],
				 	"id":[1,2,3,4,5,6]};
		     ////console.log(data);

		     var color = d3.scaleLinear()
		       .range(d3.schemeCategory10)
		       .domain(data.id);

	       // load legend content (if it changes based on node)
				 // Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
		     var legend = d3
				 	 .select(".bottom-container")
					 .append("div")
					 .attr("class","legend")
					 .style("position", "absolute")
			     .style("padding", "4px")
			     .style("z-index", "0")
					 .style("top",0)
					 .style("visibility", visibility)
					 .append("svg")
					 .style("z-index", "0")
					 .style("width", "170px")
					 .style("height","120px")
		       .selectAll("g")
		       .data(data.id)
		       .enter()
		       .append("g")
		       .attr("transform", function(d, i) { return "translate(0," + i * 19 + ")"; });

		     legend.append("rect")
		       .attr("width", 13)
		       .attr("height", 13)
		       .style("fill", warna);

		     legend.append("text")
		       .data(data.klaster)
		       .attr("x", 24)
		       .attr("y", 7)
					 .style("fill","white")
					 .style("font-family","Lato")
					 .style("font-size",9)
		       .attr("dy", ".35em")
		       .text(function(d) { return d; });

	       // place tooltip where cursor was
	       return legend.style("visibility", visibility);
	  }

		legendHospital();

		isLegendHidden = true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
//COLOR BY NEGARA
////////////////////////////////////////////////////////////////////////////////////////////////////
function colorNational(){

	var domain = [1,2,3];

	var warnaNational = d3.scaleOrdinal()
	.domain(domain)
	.range(["indianred","limegreen","black"]);

	node
		.attr("r", radius)
		.style("fill", function(d) {return warnaNational( d.wnid );})
		.style("stroke", "white")
		.style("stroke-width", 3)

		var el = document.getElementsByClassName("legend");
		$(el).remove();

	//NATIONALITY LEGEND
	function legendNational() {
	       // update visibility
	       isLegendHidden = !isLegendHidden;
	       var visibility = (isLegendHidden) ? "hidden" : "visible";

				 var data = {"klaster":["WNI","WNA","Tidak Diketahui"],
				 	"id":[1,2,3]};
		     ////console.log(data);

		     var color = d3.scaleLinear()
		       .range(d3.schemeCategory10)
		       .domain(data.id);

	       // load legend content (if it changes based on node)
				 // Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
		     var legend = d3
				 	 .select(".bottom-container")
					 .append("div")
					 .attr("class","legend")
					 .style("position", "absolute")
			     .style("padding", "4px")
			     .style("z-index", "0")
					 .style("top",0)
					 .style("visibility", visibility)
					 .append("svg")
					 .style("z-index", "0")
					 .style("width", "120px")
					 .style("height","70px")
		       .selectAll("g")
		       .data(data.id)
		       .enter()
		       .append("g")
		       .attr("transform", function(d, i) { return "translate(0," + i * 19 + ")"; });

		     legend.append("rect")
		       .attr("width", 13)
		       .attr("height", 13)
		       .style("fill", warnaNational);

		     legend.append("text")
		       .data(data.klaster)
		       .attr("x", 24)
		       .attr("y", 7)
					 .style("fill","white")
					 .style("font-family","Lato")
					 .style("font-size",9)
		       .attr("dy", ".35em")
		       .text(function(d) { return d; });

	       // place tooltip where cursor was
	       return legend.style("visibility", visibility);
	  }

		legendNational();

		isLegendHidden = true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
//COLOR BY STATUS
////////////////////////////////////////////////////////////////////////////////////////////////////
function colorStatus(){
	var domain = [1,2,3,4];

	var warnaStatus = d3.scaleOrdinal()
	.domain(domain)
	.range(["limegreen","goldenrod","indianred","black"]);
	node
		.attr("r", radius)
		.style("fill", function(d) {return warnaStatus( d.statusid );})
		.style("stroke", "white")
		.style("stroke-width", 3)

	var el = document.getElementsByClassName("legend");
	$(el).remove();

	//NATIONALITY LEGEND
	function legendStatus() {
			 // update visibility
			 isLegendHidden = !isLegendHidden;
			 var visibility = (isLegendHidden) ? "hidden" : "visible";

			 var data = {"klaster":["Sembuh","Dalam Perawatan","Meninggal","Tidak Diketahui"],
				"id":[1,2,3,4]};
			 ////console.log(data);

			 var color = d3.scaleLinear()
				 .range(d3.schemeCategory10)
				 .domain(data.id);

			 // load legend content (if it changes based on node)
			 // Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
			 var legend = d3
				 .select(".bottom-container")
				 .append("div")
				 .attr("class","legend")
				 .style("position", "absolute")
				 .style("padding", "4px")
				 .style("z-index", "0")
				 .style("top",0)
				 .style("visibility", visibility)
				 .append("svg")
				 .style("z-index", "0")
				 .style("width", "120px")
				 .style("height","200px")
				 .selectAll("g")
				 .data(data.id)
				 .enter()
				 .append("g")
				 .attr("transform", function(d, i) { return "translate(0," + i * 19 + ")"; });

			 legend.append("rect")
				 .attr("width", 13)
				 .attr("height", 13)
				 .style("fill", warnaStatus);

			 legend.append("text")
				 .data(data.klaster)
				 .attr("x", 24)
				 .attr("y", 7)
				 .style("fill","white")
				 .style("font-family","Lato")
				 .style("font-size",9)
				 .attr("dy", ".35em")
				 .text(function(d) { return d; });

			 // place tooltip where cursor was
			 return legend.style("visibility", visibility);
	}

	legendStatus();

	isLegendHidden = true;
	};

////////////////////////////////////////////////////////////////////////////////////////////////////
//COLOR BY UMUR
////////////////////////////////////////////////////////////////////////////////////////////////////
function colorAge(){
	var domain = [0,10,20,30,40,50,60,70,80,90,100];

	var warnaAge = d3.scaleQuantile()
	.domain(domain)
	.range(["#77e531","#78d33c","#7ac047","#7bae52","#7c9b5d","#7d8968","#7e7772","#815288","#823f93","#8608b4","black"]);

	node
		.attr("r", radius)
		.style("fill", function(d) {return warnaAge(d.umur);})
		.style("stroke", "white")
		.style("stroke-width", 3)

	var el = document.getElementsByClassName("legend");
	$(el).remove();

	//NATIONALITY LEGEND
	function legendAge() {
			 // update visibility
			 isLegendHidden = !isLegendHidden;
			 var visibility = (isLegendHidden) ? "hidden" : "visible";

			 var data = {"klaster":["0-9 tahun","10-19 tahun","20,29 tahun","30-39 tahun","40-49 tahun","50-59 tahun","60-69 tahun","70-79 tahun","80-89 tahun","90-99 tahun","Tidak Diketahui"],
				"id":[1,2,3,4,5,6,7,8,9,10,11]};
			 ////console.log(data);

			 var color = d3.scaleLinear()
				 .range(["#77e531","#78d33c","#7ac047","#7bae52","#7c9b5d","#7d8968","#7e7772","#815288","#823f93","#8608b4","black"])
				 .domain(data.id);

			 // load legend content (if it changes based on node)
			 // Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
			 var legend = d3
				 .select(".bottom-container")
				 .append("div")
				 .attr("class","legend")
				 .style("position", "absolute")
				 .style("padding", "4px")
				 .style("z-index", "0")
				 .style("top",0)
				 .style("visibility", visibility)
				 .append("svg")
				 .style("z-index", "0")
				 .style("width", "105px")
				 .style("height","210px")
				 .selectAll("g")
				 .data(data.id)
				 .enter()
				 .append("g")
				 .attr("transform", function(d, i) { return "translate(0," + i * 19 + ")"; });

			 legend.append("rect")
				 .attr("width", 13)
				 .attr("height", 13)
				 .style("fill", color);

			 legend.append("text")
				 .data(data.klaster)
				 .attr("x", 24)
				 .attr("y", 7)
				 .style("fill","white")
				 .style("font-family","Lato")
				 .style("font-size",9)
				 .attr("dy", ".35em")
				 .text(function(d) { return d; });

			 // place tooltip where cursor was
			 return legend.style("visibility", visibility);
	}

	legendAge();

	isLegendHidden = true;
};

//update the position after each simulation tick
function ticked() {
	link
		.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });

	node
		.attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });

	idText
		.attr("x", function(d){ return d.x; })
		.attr("y", function(d){ return d.y; });
};


////////////////////////////////////////////////////////////////////////////////////////////////////
// UI EVENTS
////////////////////////////////////////////////////////////////////////////////////////////////////

function dragstarted(d) {
	if (!d3.event.active) simulation.alphaTarget(0.3).restart();
	d.fx = d.x;
	d.fy = d.y;
};

function dragged(d) {
	d.fx = d3.event.x;
	d.fy = d3.event.y;
};

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0.0001);
  d.fx = null;
  d.fy = null;
};

// convenience function to update everything (run after UI input)
function updateAll() {
    updateForces();
    updateDisplay();
};


////////////////////////////////////////////////////////////////////////////////////////////////////
// TOOLTIP
////////////////////////////////////////////////////////////////////////////////////////////////////
function clickNode(node) {
       // update visibility
       isTooltipHidden = !isTooltipHidden;
       var visibility = (isTooltipHidden) ? "hidden" : "visible";

       // load tooltip content (if it changes based on node)
       loadTooltipContent(node);

       if (isTooltipHidden) {
         unPinNode(node);
       }

       // place tooltip where cursor was
       return tooltip.style("visibility", visibility);
  };

  // reset nodes to not be pinned
  function unPinNode(node) {
     node.fx = null;
     node.fy = null;
  };

	// reset nodes to not be pinned
	function unPinLegend(legend) {
		 legend.fx = null;
		 legend.fy = null;
	};

  // add html content to tooltip
  function loadTooltipContent(node) {
      var htmlContent = "<div>";
      htmlContent += "<h4>Kasus #" + node.id + "<\/h4>"
      htmlContent += "<table>"
      htmlContent += "<tr><td width=\"30%\">Jenis Kelamin: <\/td> <td><strong>" + node.gender +"<\/strong><\/td><\/tr>"
      htmlContent += "<tr><td width=\"30%\">Umur: <\/td> <td><strong>" + node.umurtext +"<\/strong><\/td><\/tr>"
			htmlContent += "<tr><td width=\"30%\">Status: <\/td> <td><strong>" + node.status +"<\/strong><\/td><\/tr>"
			htmlContent += "<tr><td width=\"30%\">Rumah Sakit: <\/td> <td><strong>" + node.rs +"<\/strong><\/td><\/tr>"
			htmlContent += "<tr><td width=\"30%\">Kewarganegaraan: <\/td> <td><strong>" + node.wn +"<\/strong><\/td><\/tr>"
      htmlContent += "<tr><td width=\"30%\">Tanggal Pengumuman: <\/td> <td><strong>" + node.pengumuman +"<\/strong><\/td><\/tr>"
      htmlContent += "<tr><td width=\"30%\">Asal Penularan: <\/td> <td><strong>" + node.penularan +"<\/strong><\/td><\/tr>"
      htmlContent += "<tr><td width=\"30%\">Provinsi <\/td> <td><strong>" + node.provinsi +"<\/strong><\/td><\/tr>"
      tooltip.html(htmlContent);
  };

  // add tooltip to HTML body
  var tooltip = d3.select(".bottom-container")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("padding", "4px")
    .style("z-index", "10")
    .style("width", "350px")
		.style("left","52px")
    .style("margin", "auto")
    .style("background-color", "rgba(255, 255, 255, 0.9)")
    .style("visibility", "hidden")
    .style("font-family", "Lato")
		.style("top","100px")
    .text("");

function zoom_actions(){
    g.attr("transform", d3.event.transform)
}
