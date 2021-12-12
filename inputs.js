"use strict";

var userSharesValue = 0;
var userStartBalance = 5000;
var userBalance = userStartBalance;
var totalBalance;
var ownedShares = 0;
var shareAmount = 0;
var purchaseprice = 0;
var totalPercentage;

$(document).ready(function init(){
    $("#buy").click(buy);
    $("#sell").click(sell);
    $("#selectAll").click(selectAll);
    var interval = setInterval(mainloop, 100);
});

function mainloop(){
    if($("#shares").val()){
        shareAmount = parseInt($("#shares").val(), 10);
        //console.log(shareAmount);
    }
    
    updateUserData();
}

function updateUserData(){
    
    totalBalance = userBalance + userSharesValue;
    userSharesValue = ownedShares * shareValue;
    totalPercentage = (totalBalance / userStartBalance) * 100 - 100;
    
    $("#totalBalance").html(Math.floor(totalBalance) + " kr" + " (" + Number.parseFloat(totalPercentage).toFixed(2) + "%)");
    $("#balance").html("Balance: " + Math.floor(userBalance) + " kr");
    $("#userSharesValue").html("Your shares: " + Math.floor(userSharesValue) + " kr");
    
    if(userSharesValue > purchaseprice){
        $("#userSharesValue").css("color", "#0080ff");
    } else if(userSharesValue == purchaseprice){
        $("#userSharesValue").css("color", "white");
    } else {
        $("#userSharesValue").css("color", "red");
    }
    
    if(totalBalance > userStartBalance){
        $("#totalBalance").html(Math.floor(totalBalance) + " kr" + " (+" + Number.parseFloat(totalPercentage).toFixed(2) + "%)");
        $("#totalBalance").css("color", "#0080ff");
    } else if (totalBalance == userStartBalance){
        $("#totalBalance").css("color", "white");
    } else {
        $("#totalBalance").css("color", "red");
    }
}
function buy(){
    console.log("bought shares!");
    if(shareAmount > 0 && userBalance > shareAmount * shareValue){
        userBalance -= shareAmount * shareValue;
        ownedShares += shareAmount;
        purchaseprice += shareAmount * shareValue;
    }
    console.log(ownedShares);
}
function sell(){
    
    if(shareAmount > 0 && shareAmount <= ownedShares){
        console.log("sold shares!");
        userBalance += shareAmount * shareValue;
        ownedShares -= shareAmount;
        purchaseprice -= shareAmount * shareValue;
    } else {
        alert("something went wrong when attempting to sell shares")
    }
    
}
function selectAll(){
    console.log("selected all");
    console.log(ownedShares);
    if(ownedShares > 0){
        $("#shares").attr("value", ownedShares);
    }
    
}