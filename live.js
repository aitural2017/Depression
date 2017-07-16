/*
    var config = {
      apiKey: "AIzaSyCP8aHtynxf8Lqcru3zAbRpGhtCxhn__mM",
      authDomain: "something-75243.firebaseapp.com",
      databaseURL: "https://something-75243.firebaseio.com",
      projectId: "something-75243",
      storageBucket: "something-75243.appspot.com",
      messagingSenderId: "540256173009"
    };
    firebase.initializeApp(config);
*/
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDX2BZZNc3jz1IeiTHmEUEgwAZdlT5U-1E",
  authDomain: "twittai-3b1fe.firebaseapp.com/tweets",
  databaseURL: "https://twittai-3b1fe.firebaseio.com",
  projectId: "twittai-3b1fe",
  storageBucket: "twittai-3b1fe.appspot.com",
  messagingSenderId: "312441540310"
};
firebase.initializeApp(config);
//var database = firebase.database();
// Get elements
var preObject = document.getElementById('object');
//create references
var dbRefObject = firebase.database().ref("tweets/");
var tweetId = [];
var followers_count = [];
var tweet = [];
var count = 0;
var firstPrint = true;
var firstPrintCount = 0;

dbRefObject.on('value', function(snapshot) {
  //preObject.innerText = JSON.stringify(snapshot.val());
  var user = JSON.stringify(snapshot.val());
  //console.log(user);
  var obj = JSON.parse(user);
  //console.log(obj);

  for (var x in obj) {
    console.log(obj[x].tweetId);
    console.log(obj[x].followers_count);
    console.log(obj[x].text);

    //save the entries to arrays
    tweetId[count] = obj[x].tweetId;
    followers_count[count] = obj[x].followers_count;
    tweet[count] = obj[x].text;
    count = count + 1;
  }
  if (firstPrint) {
    print();
    firstPrintCount = count - 1;
    firstPrint = false;
  } else {
    addRow();
  }

});

function print() {
  var txt = "";
  txt += "<table id='myTable' border='1'>";
  txt += "<tr><td>ID</td><td>FOLLOWERS</td><td>TWEET</td></tr>";
  for (var i = 0; i < count; i++) {
    //console.log(id[i], followers_count[i], tweet[i]);
    if (tweet[i].search("fuck") != "-1" || tweet[i].search("kill") != "-1" || tweet[i].search("helpless") != "-1" || tweet[i].search("cry") != "-1" || tweet[i].search("suffer") != "-1" || tweet[i].search("suicide") != "-1" || tweet[i].search("Fuckin") != "-1") {
      txt += "<tr><td style='background-color:#F4836B'>" + tweetId[i] + "</td><td style='background-color:#F4836B'>" + followers_count[i] + "</td><td style='background-color:#F4836B'>" + tweet[i] + "</td></tr>";
    } else if (tweet[i].search("lol") != "-1" || tweet[i].search("haha") != "-1"|| tweet[i].search("😊") != "-1" || tweet[i].search("😂") != "-1") {
      txt += "<tr><td style='background-color:#00cc00'>" + tweetId[i] + "</td><td style='background-color:#00cc00'>" + followers_count[i] + "</td><td style='background-color:#00cc00'>" + tweet[i] + "</td></tr>";
    } else {
      txt += "<tr><td style='background-color:#F1ED6D'>" + tweetId[i] + "</td><td style='background-color:#F1ED6D'>" + followers_count[i] + "</td><td style='background-color:#F1ED6D'>" + tweet[i] + "</td></tr>";
    }


  }
  txt += "</table>";
  document.getElementById("display").innerHTML = txt;
};

function addRow() {
  var table = document.getElementById("myTable");
  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = tweetId[count - 1];
  cell2.innerHTML = followers_count[count - 1];
  cell3.innerHTML = tweet[count - 1];
  if (tweet[count - 1].search("fuck") != "-1" || tweet[count - 1].search("kill") != "-1" || tweet[count - 1].search("helpless") != "-1" || tweet[count - 1].search("cry") != "-1" || tweet[count - 1].search("suffer") != "-1" || tweet[count - 1].search("suicide") != "-1" || tweet[count - 1].search("Fuckin") != "-1") {
    cell1.style.backgroundColor = '#F4836B';
    cell2.style.backgroundColor = '#F4836B';
    cell3.style.backgroundColor = '#F4836B';
  } else if (tweet[count - 1].search("lol") != "-1" || tweet[count - 1].search("haha") != "-1"|| tweet[count - 1].search("😊") != "-1" || tweet[count - 1].search("😂") != "-1") {
    cell1.style.backgroundColor = '#00cc00';
    cell2.style.backgroundColor = '#00cc00';
    cell3.style.backgroundColor = '#00cc00';
  } else {
    cell1.style.backgroundColor = '#F1ED6D';
    cell2.style.backgroundColor = '#F1ED6D';
    cell3.style.backgroundColor = '#F1ED6D';
  }
};

function otherPrint() {
  var txt = "";
  txt += "<table border='1'>";
  for (var i = firstPrintCount; i < count; i++) {
    console.log(id[i], followers_count[i], tweet[i]);
    txt += "<tr><td>" + id[i] + "</td><td>" + followers_count[i] + "</td><td>" + tweet[i] + "</td></tr>";
  }
  txt += "</table>";
  document.getElementById("display").innerHTML = txt;
};
