
var planets = [
	{
		radius: 0.3,
		size: 0.03,
	},
	{
		radius: 0.5,
		size: 0.06
	},
	{
		radius: 0.7,
		size: 0.08,
		planets: [
			{radius: 0.2, size: 0.02}, 
			{radius: 0.4, size: 0.05, planets: [
				{radius: 0.1, size: 0.01}
			]}
		]
	},
	{
		radius: 1.2,
		size: 0.05,
		planets: [
			{radius: 0.2, size: 0.03}
		]
	}
];

function makeSystem(elem_selector) {
	var e = document.getElementById(elem_selector);
	var ctx = e.getContext("2d");

	// Save logical size
	var width = e.width;
	var height = e.height;

	// Scale for retina displays
	if (typeof(window.devicePixelRatio) != "undefined") {
		var r = window.devicePixelRatio;
		e.width *= r;
		e.height *= r;
		ctx.scale(r, r);
	}

	var start = Date.now();
	var period = 1000;
	var radius = e.height * 0.7;

	ctx.translate(width / 2, height / 2);

	function render(system) {

		if (typeof(system) == "undefined") {
			system = planets;
			ctx.clearRect(-width / 2, -height / 2, width, height);
		}

		for (var i = 0; i < system.length; i++) {
			var p = system[i];

			var radius = height / 2 * p.radius;
			var size = height / 2 * p.size;
			var period = Math.pow(p.radius, 2.0 / 3) * 1000;

			var x = radius * Math.sin(Date.now() / (2 * Math.PI * period));
			var y = radius * Math.cos(Date.now() / (2 * Math.PI * period));

			ctx.fillStyle = "rgb(0, 255, 0)";
			ctx.beginPath();
			ctx.arc(x, y, size, 0, 2 * Math.PI, false);
			ctx.closePath();
			ctx.fill();

			ctx.strokeStyle = "rgb(0, 255, 0)"
			ctx.beginPath();
			ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
			ctx.closePath();
			ctx.stroke();

			if (typeof(p.planets) != "undefined") {
				ctx.save();
				ctx.translate(x, y);
				render(p.planets);
				ctx.restore();
			}
		}
	}

	setInterval(render, 30);
}
