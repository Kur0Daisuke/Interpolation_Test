const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 5;

var A = {
	x: 150,
	y: 300
}

var B = {
	x: 500,
	y: 75
}

var C = {
	x: 80,
	y:130
}

var D = {
	x: 300,
	y: 300
}

var E = {
	x: 600,
	y: 100
}

function VLerp(A,B,t) {
	return {
		x: Lerp(A.x,B.x,t),
		y: Lerp(A.y,B.y,t),
		radius: 10,
	}
}

function Lerp(A,B,t) {
	return A + (B-A)*t;
}

function drawPoints(x,y,radius, style) {
	ctx.beginPath();
	ctx.fillStyle=style
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.fill()
	ctx.stroke();
}

function DrawLine(S,E, style) {
	ctx.beginPath();
	ctx.moveTo(S.x, S.y);
	ctx.lineTo(E.x, E.y);
	ctx.strokeStyle = style;
	ctx.stroke();
}

function Animate() {
	ctx.clearRect(0,0,canvas.width, canvas.height)

	DrawLine(A,B,"rgba(0, 166, 255, 0.42)")
	DrawLine(B,C,"rgba(0, 166, 255, 0.42)")
	DrawLine(C,D,"rgba(0, 166, 255, 0.42)")
	DrawLine(D,E,"rgba(0, 166, 255, 0.42)")

	drawPoints(A.x,A.y,10,"rgba(0, 166, 255, 0.42)");
	drawPoints(B.x,B.y,10,"rgba(0, 166, 255, 0.42)");
	drawPoints(C.x,C.y,10,"rgba(0, 166, 255, 0.42)");
	drawPoints(D.x,D.y,10,"rgba(0, 166, 255, 0.42)");
	drawPoints(E.x,E.y,10,"rgba(0, 166, 255, 0.42)");

	var sec = new Date().getTime()/1500
	var t = (Math.sin(sec)+1)/2;

	var pointBetweenAB = VLerp(A,B,t)

	var pointBetweenBC = VLerp(B,C,t)

	var pointBetweenCD = VLerp(C,D,t)
	var pointBetweenDE = VLerp(D,E,t)

	drawPoints(pointBetweenAB.x,pointBetweenAB.y,10,"rgba(0, 166, 255, 0.42)")
	drawPoints(pointBetweenBC.x,pointBetweenBC.y,10,"rgba(0, 166, 255, 0.42)")
	drawPoints(pointBetweenCD.x,pointBetweenCD.y,10,"rgba(0, 166, 255, 0.42)")
	drawPoints(pointBetweenDE.x,pointBetweenDE.y,10,"rgba(0, 166, 255, 0.42)")

	var pointBetweenCurve1 = VLerp(pointBetweenAB,pointBetweenBC,t)
	var pointBetweenCurve2 = VLerp(pointBetweenBC,pointBetweenCD,t)
	var pointBetweenCurve3 = VLerp(pointBetweenCurve1,pointBetweenCurve2,t)
	var pointBetweenCurve4 = VLerp(pointBetweenCD,pointBetweenDE,t)
	var pointBetweenCurve5 = VLerp(pointBetweenCurve3,pointBetweenCurve4,t)

	drawPoints(pointBetweenCurve1.x,pointBetweenCurve1.y,10,"rgba(0, 166, 255, 0.42)")
	drawPoints(pointBetweenCurve2.x,pointBetweenCurve2.y,10,"rgba(0, 166, 255, 0.42)")
	DrawLine(pointBetweenAB,pointBetweenBC,"rgba(0, 166, 255, 0.42)")
	DrawLine(pointBetweenBC,pointBetweenCD,"rgba(0, 166, 255, 0.42)")

	DrawLine(pointBetweenCurve1,pointBetweenCurve2,"rgba(0, 166, 255, 0.42)")
	DrawLine(pointBetweenCurve3,pointBetweenCurve5,"rgba(0, 166, 255, 0.42)")
	DrawLine(pointBetweenBC,pointBetweenCurve3,"rgba(0, 166, 255, 0.42)")

	DrawLine(B,pointBetweenCurve1,"rgba(0, 166, 255, 0.42)")
	DrawLine(C,pointBetweenCurve2,"rgba(0, 166, 255, 0.42)")

	drawPoints(pointBetweenCurve3.x,pointBetweenCurve3.y,10,"rgba(0, 166, 255, 0.42)");
	drawPoints(pointBetweenCurve4.x,pointBetweenCurve4.y,10,"rgba(0, 166, 255, 0.42)");
	drawPoints(pointBetweenCurve5.x,pointBetweenCurve5.y,10,"#FFF");
	requestAnimationFrame(Animate)	
}
Animate()

