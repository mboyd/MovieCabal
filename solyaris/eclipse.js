function makeEclipse(elem_selector) {
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

	var i = 0;
	var ox = 0, oy = 0;

	function render() {
		var s1x = width / 2;
		var s1y = height / 2;
		var s1r = Math.min(width, height) * 0.3;

		if (i++ % 10 == 0 || true) {			
			ox = (Math.random() - 0.5) * 3;
			oy = (Math.random() - 0.5) * 3;
		}

		s1x += ox;
		s1y += oy;

		ctx.clearRect(0, 0, width, height);

		for (var r = s1r; r > 0; r-= 2) {
			ctx.strokeStyle = "rgb(0, 255, 0)";
			ctx.beginPath();
			ctx.arc(s1x, s1y, r, 0, 2 * Math.PI, false);
			ctx.closePath();
			ctx.stroke();
		}

		var s2x = s1x + radius * Math.sin(Date.now() / (2 * Math.PI * period));
		var s2y = (s1y - radius) + radius * Math.cos(Date.now() / (2 * Math.PI * period));
		s2y = height - s2y;
		var s2r = s1r;

		for (var r = s2r; r > 0; r -= 2) {
			ctx.strokeStyle = "rgb(0, 255, 0)";
			ctx.beginPath();
			ctx.arc(s2x, s2y, r, 0, 2 * Math.PI, false);
			ctx.closePath();
			ctx.stroke();
		}
	}

	setInterval(render, 30);
}