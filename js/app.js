var turned = [];//what is currently turned
var ids = ["one","two","three","four","five","six","seven","eight"];//all ids of individual cards
var pair = [];//it contains card and what picture it has
var points = 0;//total points
var timeStarted = false;//if the timer started or not
var count = 30;
var started = false;
//shortcuts
var idTime = document.getElementById("time");
var idPoint= document.getElementById("points");
var idfinish = document.getElementById("finish");
var idStart = document.getElementById("start");
//sets new random pictures to the cards
function setup(){
	pair=[];
	var pic=[1,1,2,2,3,3,4,4];//the name of each pic x2
	for (var i = 0; i < 8; i++) {//loops 8x for each card
		document.getElementById(ids[i]).style.display="inline";//makes cards visible
		var randomNumber =  Math.floor(Math.random() * (pic.length));//asssigns random number
		document.getElementsByClassName("back")[i].style.backgroundImage = "url('./assets/"+pic[randomNumber]+".png')";
		pair.push([ids[i],pic[randomNumber]]);
		pic.splice(randomNumber, 1);
	}
}
setup();
function clock(){
	if(points==4&&count>0){
		clearInterval(clock);
	}
	else if(count==0&&points<4){
		clearInterval(clock);
		for (var i = 0; i < 8; i++) {
			document.getElementsByClassName("card")[i].style.display="none";
		}
		idfinish.innerHTML="WOWOW so bad<br>You're score: "+points+"<br><button id='finishBut' onclick='finish()''>AGAIN!</button>";
		idfinish.style.display='inline';
	}
	else{
		count-=1;
		if(count<10){
			idTime.innerHTML="Time: 0:0"+count;
		}
		else{
			idTime.innerHTML="Time: 0:"+count;
		}
	}
}
function start(){
	started=true;
	idStart.parentNode.removeChild(idStart);
	document.getElementById("container").style.filter="blur(0px)";
}
function finish(){
	idfinish.style.display="none";
	started=true;
	setup();
	idTime.innerHTML="Time: 0:30";
	idPoint.innerHTML="Correct: 0";
	points=0;
	count=30;
	//resets all variables
}
function press(idName) {
	if(started==true){
		if (timeStarted==false&&count==30){
			timeStarted=true;
			var time =setInterval(clock, 1000);
		}
		var box = document.getElementById(idName);
		box.style.transform = 'rotateY(180deg)';
		if((turned[0]==idName||turned[1]==idName)==false)
		{
			turned.push(idName);
		}
		if(turned.length == 2){
			setTimeout(function(){
				var first =document.getElementById(turned[0]);
				var second =document.getElementById(turned[1]);
				var x =ids.indexOf(turned[0]);
				var y =ids.indexOf(turned[1]);
				first.style.transform = 'rotateY(0deg)';
				second.style.transform = 'rotateY(0deg)';
				if(pair[x][1]==pair[y][1])
				{
					first.style.display="none";
					second.style.display="none";
					points += 1;
					idPoint.innerHTML="Correct: "+points;
					if(points==4&&count>0){
						started=false;
						idfinish.innerHTML="WOW YOU'RE SO GOOD WOW<br>You're Time: "+count+" seconds!<br><button id='finishBut' onclick='finish()''>AGAIN!</button>";
						idfinish.style.display='inline';
					}
				}
				turned = [];
			}, 400);
		}
	}
}