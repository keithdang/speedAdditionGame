var m_bCorrect;
var m_nNewScore=0;
var m_nBestScore=0;
var allScores=[];
var progBar=document.getElementById("myBar");
var answerDisplay=document.getElementById("answer");
var myVar;
var stats="";
var hardStats=[];
var normalStats=[];
var easyStats=[];
var mode="easy";
var arrLabels=[];
var count=1;
var nInterval=30;
var bToggleSound=true;

function setMode(val)
{
	clickNoise();
	switch(val)
	{
		case 1:
			mode="easy";
			nInterval=30;
			break;
		case 2:
			mode="normal";
			nInterval=20;
			break;
		case 3:
			mode="hard";
			nInterval=10;
			break;
	}
}

function toggleSound()
{
	var x = document.getElementById("soundOn");
    if (x.style.display === "none") {
        x.style.display = "block";
        bToggleSound=true;
        clickNoise();
    } else {
        x.style.display = "none";
        bToggleSound=false;
    }
    var y = document.getElementById("soundOff");
    if (y.style.display === "none") {
        y.style.display = "block";
    } else {
        y.style.display = "none";
    }
}

function showGame() {
    var x = document.getElementById("gameStarted");
    if (x.style.display === "none") {
        x.style.display = "block";
        initializeValues();
    } else {
        x.style.display = "none";
    }
    var y = document.getElementById("startMenu");
    if (y.style.display === "none") {
        y.style.display = "block";
    } else {
        y.style.display = "none";
    }
}

function replayGame() {
	m_nNewScore=0;
	answerDisplay.innerHTML=m_nNewScore;
	clickNoise();
    var x = document.getElementById("gameStarted");
    if (x.style.display === "none") {
        x.style.display = "block";
        initializeValues();
    } else {
        x.style.display = "none";
    }
    var y = document.getElementById("youLostPlayAgain");
    if (y.style.display === "none") {
        y.style.display = "block";
    } else {
        y.style.display = "none";
    }
}

function initializeValues()
{
	var progLeft=1;
	myVar=setInterval(lowerBar,nInterval);
	function lowerBar()
	{
		if (progLeft >= 100) {
	      	clearInterval(myVar);
	      	displayAnswer(false);
	    }
	    else
	    {
			progLeft++;
			progBar.style.width=progLeft+"%";
		}
	}
	
	var range=12;
	var num1=Math.round(Math.random()*range);
	var num2=Math.round(Math.random()*range);
	var numBool=Math.random();
	var total=num1+num2;
	if(numBool >0.5)
	{	
		m_bCorrect=false;
		if(numBool >0.25)
		{
			total+=2;
		}
		else
		{
			total-=2;
		}
	}
	else
	{
		m_bCorrect=true;
	}
	document.getElementById("equation").innerHTML=num1+"+"+num2+"="+total;

}

function clickTrue()
{
	if(m_bCorrect)
	{
		displayAnswer(true);		
	}
	else
	{
		displayAnswer(false);
	}
}

function clickFalse()
{
	if(!m_bCorrect)
	{
		displayAnswer(true);		
	}
	else
	{
		displayAnswer(false);
	}
}

function clickNoise()
{
	if(bToggleSound)
	{
		var bleep=new Audio();
		bleep.src="clickSound.mp3";
		bleep.play();
		bleep.currentTime=0;
	}
}

function displayAnswer(bCorrect)
{
	clickNoise();
	clearInterval(myVar);
	if(bCorrect)
	{
		m_nNewScore++;
		answerDisplay.innerHTML=m_nNewScore;
		initializeValues();	
	}
	else
	{		
		if(m_nNewScore>m_nBestScore)
		{
			m_nBestScore=m_nNewScore;
		}
		updateStatsInRespectiveMode(m_nNewScore);
		document.getElementById("newScore").innerHTML="New Score:"+m_nNewScore;
		document.getElementById("bestScore").innerHTML="Best Score:"+m_nBestScore;	
		document.getElementById("gameStarted").style.display="none";
		document.getElementById("youLostPlayAgain").style.display="block";
		displayLineGraph();
	}
}
function updateStatsInRespectiveMode(val)
{
	clickNoise();
	if(mode=="easy")
	{
		easyStats.push(val);
		updateLabelBar(arrLabels,easyStats);
	}
	else if(mode=="normal")
	{
		normalStats.push(val);
		updateLabelBar(arrLabels,normalStats);
	}
	else if(mode=="hard")
	{
		hardStats.push(val);
		updateLabelBar(arrLabels,hardStats);
	}
}
function updateLabelBar(labelBar,modeStat)
{
	if(labelBar.length<modeStat.length)
	{
		for(var i=labelBar.length;i<=modeStat.length;i++)
		{
			labelBar.push(count);
			count++;
		}
	}
}
function displayLineGraph()
{
	new Chart(document.getElementById("lineChart"), {
	  type: 'line',
	  data: {
	    labels: arrLabels,
	    datasets: [
	      { 
	        data: easyStats,
	        label: "Easy",
	        borderColor: "#3cba9f",
	        fill: false
	      },
	      { 
	        data: normalStats,
	        label: "Normal",
	        borderColor: "#ffff66",
	        fill: false
	      },
	      { 
	        data: hardStats,
	        label: "Hard",
	        borderColor: "#c45850",
	        fill: false
	      }
	    ]
	  },
	  options: {
	    title: {
	      display: true,
	      text: 'Game Play History'
	    }
	  }
	});	
}
