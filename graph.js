"use strict";
var ctx;
var graphStartX;
var graphStartY;
var x = graphStartX;
var y = graphStartY;
var graphValues = [];
var newValue;
var moveUp;
var startValueMarker;
var purchaseValue;
var startValue = 10000;
var currentValue = startValue;
var loopInterval
var graphValueWidth = 5;
var graphValueHeight = 50;
var graphSpeedY;
var balance = 10000;
var shareStartValue = 50;
var shareValue = shareStartValue;
var chance = 2;
var draw = true;
var timePerFrame = 100;


$(document).ready(function init(){
    
    ctx = $("#gameCanvas")[0].getContext("2d"); 
    
    //$('body').css('margin', '0');  //No margins
    //$('body').css('overflow', 'hidden'); //Hide scrollbars
    //$('body').css('background', 'white');
    
    ctx.canvas.width = $(window).width() - 400;
    ctx.canvas.height = $(window).height();
    graphStartX = (ctx.canvas.width/1.1);
    graphStartY = (ctx.canvas.height/2);
    x = graphStartX;
    y = graphStartY;
    startValueMarker = y;
    $(window).resize(setCanvas);
    //setCanvas();
    
    $("#graphSpeed").change(function(){
        clearInterval(loopInterval);
        timePerFrame = $("#graphSpeed").val() * 2;
        loopInterval = setInterval(loop, timePerFrame)
    });
    $("#graphWidth").change(function(){
        graphValueWidth = $("#graphWidth").val() / 10 + 1;
    });
    loopInterval = setInterval(loop, timePerFrame);
});

function loop() {
    
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    addNewGraphValue();
    moveGraph();
    drawGraph();
    drawStartMarker();
    drawData();
}

function addNewGraphValue(){
    var newGraphValue = new Object();
    newGraphValue.fromX = x;
    newGraphValue.fromY = y;
    x += graphValueWidth;
    newValue = ((Math.random() * graphValueHeight) - graphValueHeight / chance)
    if(newValue > 0){
        newGraphValue.color = "#0080FF";
        moveUp = true;
        chance = 3;
    } else {
        newGraphValue.color = "#0080FF"; // #0080FF
        moveUp = false;
        chance = 1.5;
    }
    y += newValue;
    currentValue += newValue;
    newGraphValue.toX = x;
    newGraphValue.toY = y;
    newGraphValue.value = newValue;
    graphValues.push(newGraphValue);
    
}

function moveGraph(){
    
    y -= newValue;
    for(var i = graphValues.length - 1; i > 0; i--){
        graphValues[i].fromX -= graphValueWidth;
        graphValues[i].toX -= graphValueWidth;
        if(moveUp == false){
            graphValues[i].toY += Math.abs(newValue);
            graphValues[i].fromY += Math.abs(newValue);
            
        } else {
            graphValues[i].toY -= Math.abs(newValue);
            graphValues[i].fromY -= Math.abs(newValue);
            
        }
        
    }
    if(moveUp == false){
        startValueMarker += Math.abs(newValue);

    } else {
        startValueMarker -= Math.abs(newValue);

    }
    
    
}

function drawGraph() {
    
    x -= graphValueWidth;
    for(var i = graphValues.length - 1; i > 0; i--){
        
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.moveTo(graphValues[i].fromX, graphValues[i].fromY);
        ctx.lineTo(graphValues[i].toX, graphValues[i].toY);
        ctx.strokeStyle = graphValues[i].color;
        ctx.lineWidth = "4";
        ctx.stroke()
    
        if(graphValues[i].fromX < 0 && graphValues[i].toX < 0){
            graphValues.splice(i, 1);
        }
    }
    
}
function drawData(){
    shareValue -= newValue/100;
    $("#currentValue").html(Number.parseFloat(shareValue).toFixed(2) + " SEK");
    if(shareValue > shareStartValue){
        $("#valueChange").css("color", "#0080FF");
    } else {
        $("#valueChange").css("color", "red");
    }
    
    var percentage = (shareValue / shareStartValue * 100) - 100;
    var difference = shareValue - shareStartValue
    if (percentage >= 0){
        $("#valueChange").html("+" + Number.parseFloat(percentage).toFixed(2) + "% (" + Number.parseFloat(difference).toFixed(2) + ")")
    } else {
        $("#valueChange").html(Number.parseFloat(percentage).toFixed(2) + "% (" + Number.parseFloat(difference).toFixed(2) + ")")
    }
    
}

function setCanvas(){
    ctx.canvas.width = $(window).width() - 400;
    ctx.canvas.height = $(window).height();
    graphStartX = (ctx.canvas.width/1.5);
    graphStartY = (ctx.canvas.height/2);
    x = graphStartX;
    y = graphStartY;
}

function drawStartMarker(){
    //console.log(startValueMarker);
    ctx.beginPath();
    ctx.setLineDash([5, 15]);
    ctx.moveTo(ctx.canvas.width, startValueMarker);
    ctx.lineTo(0, startValueMarker);
    ctx.strokeStyle = "grey";
    ctx.lineWidth = "1";
    ctx.stroke()
}