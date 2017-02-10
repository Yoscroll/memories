var turned = [];
var pic=[1,1,2,2,3,3,4,4];
var ids = ["one","two","three","four","five","six","seven","eight"];
var pair = [];
var points = 0;
for (var i = 0; i < 8; i++) {
	var randomNumber =  Math.floor(Math.random() * (pic.length));
	console.log(pic[randomNumber]);
	var back=document.getElementsByClassName("back")[i];
	back.style.backgroundImage = "url('./assets/"+pic[randomNumber]+".png')";
	pair.push([ids[i],pic[randomNumber]]);
	pic.splice(randomNumber, 1);
}
function press(idName) {
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
				document.getElementById("points").innerHTML="Correct: "+points;
				if(points==4){
					var idfinish = document.getElementById("finish");
						idfinish.innerHTML="WOW YOU'RE SO GOOD WOW<br>Wanna time your self?<br>Check out my brached repo";
						idfinish.style.display='inline';
					}
			}
			turned = [];
		}, 400);
	}
}