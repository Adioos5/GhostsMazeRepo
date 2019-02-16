var playerPos = 48;
var ghostsPos = 0;
var isPlayable = true;
var nums  = [playerPos+1,playerPos-1,playerPos+6,playerPos+7,playerPos+8,playerPos-6,playerPos-7,playerPos-8];
var scarySound = new Audio("music/scary.mp3");
var beepSound = new Audio("music/beep.mp3");
var tickingSound = new Audio("music/tickin.mp3");

function generateTiles(){
	insideDiv = "";
	
	for (i = 0 ; i<49 ; i++){
		insideDiv += '<div class = "casualTile" id = "t'+i+'" onclick = "move('+i+')"></div>';
		if((i+1)%7==0) insideDiv += '<div style = "clear:both;"></div>';
	}
	document.getElementById("board").innerHTML = insideDiv;
	document.getElementById("t"+playerPos).style.border = "3px solid blue";
	document.getElementById("t0").style.border = "3px solid red";
	
	document.getElementById("t40").setAttribute("class","nearbyTile");
	document.getElementById("t41").setAttribute("class","nearbyTile");
	document.getElementById("t47").setAttribute("class","nearbyTile");

	addImages();
}

window.onload = generateTiles;

function addImages(){
	document.getElementById("t0").innerHTML = '<img width = "70" height = "70" src = "img/duszek.jpg" class= "boardImages"/>';
	document.getElementById("t"+playerPos).innerHTML = '<img width = "70" height = "70" src = "img/gracz.jpg" class = "boardImages"/>';
}

function move(tileNumber){
	
	if(document.getElementById("t"+tileNumber).className == "nearbyTile"){
		document.getElementById("ghostsNav").innerHTML = '<img width = "150" height = "150" src = "img/duszek.jpg"/><br/>Ghost is moving... <br/><br/><img width = "200" height = "200" src = "img/move.png"/>';
	
		document.getElementById("playersNav").innerHTML = '<img width = "150" height = "150" src = "img/gracz.jpg"/><br/>Player is waiting... <br/><br/><img width = "200" height = "200" src = "img/clepsydra.jpg"/>';
		
		//zmiana komórek po przejściu
		document.getElementById("t"+playerPos).innerHTML = '';
		document.getElementById("t"+playerPos).style.border = "3px solid white";
		playerPos = tileNumber;
		document.getElementById("t"+playerPos).innerHTML = '<img width = "70" height = "70"src = "img/gracz.jpg" class = "boardImages"/>';
		document.getElementById("t"+playerPos).style.border = "3px solid blue";
		
		for(i=0;i<49;i++){
			if (document.getElementById("t"+i).className == "nearbyTile") document.getElementById("t"+i).setAttribute("class","casualTile");
		}
		nums = [playerPos+1,playerPos-1,playerPos+6,playerPos+7,playerPos+8,playerPos-6,playerPos-7,playerPos-8];
		
		var isWon = false;
		if(playerPos == 0){
			isWon = true;
			setTimeout(winGame,1000);
		}
		tickingSound.play();
		if(isWon==false){
		if(isDead() == true) setTimeout(endGame, 1000);
		else setTimeout(moveGhost, 1000);
		}
	}
	
}
function findNearbyTiles(){
		document.getElementById("playersNav").innerHTML = '<img width = "150" height = "150" src = "img/gracz.jpg"/><br/>Player is moving... <br/><br/><img width = "200" height = "200" src = "img/move.png"/>';
		document.getElementById("ghostsNav").innerHTML = '<img width = "150" height = "150" src = "img/duszek.jpg"/><br/>Ghost is waiting... <br/><br/><img width = "200" height = "200" src = "img/clepsydra.jpg"/>';
		for(i=0;i<nums.length;i++){		
			if(nums[i]>=0 && nums[i]<=48) document.getElementById("t"+nums[i]).setAttribute("class","nearbyTile");
		}
}
function moveGhost(){
	
	document.getElementById("t"+ghostsPos).innerHTML = '';
	document.getElementById("t"+ghostsPos).style.border = "3px solid white";
	
    ghostsPos = Math.floor((Math.random() * 48) + 1);
	
	document.getElementById("t"+ghostsPos).innerHTML = '<img width = "70" height = "70"src = "img/duszek.jpg" class = "boardImages"/>';
	document.getElementById("t"+ghostsPos).style.border = "3px solid red";

	if(ghostsPos!=0){
		document.getElementById("t0").style.border = "3px solid green";
		document.getElementById("t0").style.backgroundColor = "#48ba28";
	}
	
	if(isDead() == true){
		setTimeout(endGame, 1000);
		tickingSound.pause();
		tickingSound.currentTime = 0;
	}else{
		tickingSound.pause();
		tickingSound.currentTime = 0;
		findNearbyTiles();
	}
}

function isDead(){
	for(i=0;i<nums.length;i++){
		if (ghostsPos == nums[i] || ghostsPos == playerPos){
			document.getElementById("ghostsNav").innerHTML = "";
			document.getElementById("playersNav").innerHTML = "";
			beepSound.play();
			return true;
		}
	}
	return false;
}

function endGame(){
	tickingSound.pause();
	tickingSound.currentTime = 0;
	
	beepSound.pause();
	new Audio("music/hpTheme.mp3").play();
	
	document.getElementById("container").innerHTML = "<br/>Defeat";
	document.getElementById("container").style.fontSize = "100px";
}

function winGame(){
	tickingSound.pause();
	tickingSound.currentTime = 0;
	
	beepSound.pause();
	new Audio("music/hpTheme.mp3").play();
	
	document.getElementById("container").innerHTML = "<br/>Victory";
	document.getElementById("container").style.fontSize = "100px";
}