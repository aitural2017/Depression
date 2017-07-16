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
  authDomain: "twittai-3b1fe.firebaseapp.com",
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
var newArray = [];
var dps = []; //dataPoints.

dbRefObject.on('value', function(snapshot) {
  //preObject.innerText = JSON.stringify(snapshot.val());
  var user = JSON.stringify(snapshot.val());
  var obj = JSON.parse(user);
  //console.log(obj);

  for (var x in obj) {
    //save the entries to arrays
    tweetId[count] = obj[x].tweetId;
    followers_count[count] = obj[x].followers_count;
    tweet[count] = obj[x].text;
    count = count + 1;
  }

  var testArray = tweetId;
  newArray = compressArray(testArray);
  //newArray.sort();

  for (var i = 0; i < newArray.length; i++) {
    dps.push({
      y: newArray[i].count,
      label: newArray[i].value
    });
    //console.log(dps);
    console.log(newArray[i].count + " "+ newArray[i].value);
  }

  graph();
});



function graph() {
  var chart = new CanvasJS.Chart("chartContainer", {
    width:500,//in pixels
    height:2800,//in pixels
    title: {
      text: "Volume of Tweets per user"

    },
    animationEnabled: true,
    axisX: {
      interval: 1,
      gridThickness: 0,
      labelFontSize: 10,
      labelFontStyle: "normal",
      labelFontWeight: "normal",
      labelFontFamily: "Lucida Sans Unicode"

    },
    axisY2: {
      interlacedColor: "rgba(1,77,101,.2)",
      gridColor: "rgba(1,77,101,.1)"

    },

    data: [{
        type: "bar",
        name: "users",
        axisYType: "secondary",
        color: "#014D65",
        dataPoints: dps
      }

    ]
  });


  chart.render();

}



function compressArray(original) {

  var compressed = [];
  // make a copy of the input array
  var copy = original.slice(0);

  // first loop goes over every element
  for (var i = 0; i < original.length; i++) {

    var myCount = 0;
    // loop over every element in the copy and see if it's the same
    for (var w = 0; w < copy.length; w++) {
      if (original[i] == copy[w]) {
        // increase amount of times duplicate is found
        myCount++;
        // sets item to undefined
        delete copy[w];
      }
    }

    if (myCount > 0) {
      var a = new Object();
      a.value = original[i];
      a.count = myCount;
      compressed.push(a);
    }
  }

  return compressed;
};
