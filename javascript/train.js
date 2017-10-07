// Initialize Firebase
var config = {
    apiKey: "AIzaSyChCciIPK8mfAUalbGPkfFwbReOXg6BLvo",
    authDomain: "trains-88d21.firebaseapp.com",
    databaseURL: "https://trains-88d21.firebaseio.com",
    projectId: "trains-88d21",
    storageBucket: "",
    messagingSenderId: "156695774770"
};

firebase.initializeApp(config);

//reference to the database service
var database = firebase.database();
//Initial variables
var name;
var time;
 var ftt;
var dest;

$(document).ready(function(){
    
    // On Click of Button get values and push to firebase
    $("#submit").on("click", function() {
        event.preventDefault();
        name = $("#trainname").val().trim();
        dest = $("#destinationname").val().trim();
        time = $("#time").val().trim();
        ftt = $("#freq").val().trim();
        database.ref().push({
            name: name,
            dest: dest,
            time: time,
            ftt: ftt
        });
    });
    
    //for every child added show the needed information
    database.ref().on("child_added", function(snapshot) {
        
        //Log everything that's coming out of snapshot
        //var now = moment().format("X");
        //console.log(now)
        //console.log(snapshot.val());
        //console.log(snapshot.val().name);
        //console.log(snapshot.val().dest);
        //console.log(snapshot.val().time);
        //console.log(snapshot.val().ftt);

        var fbname =snapshot.val().name;
        var fbdest =snapshot.val().dest;
        var fbtime =snapshot.val().time;
        var fbftt =snapshot.val().ftt;
        var nextA;
        var minA;
        
        //time conversion
        // var nowconvert = moment(fbtime).format("X")
        var timeConverted = moment(fbtime, "HH:mm").subtract(1, "years");
        //console.log(timeConverted.format("X"))
        var newtimeConv = parseInt(timeConverted.format("X"))
        //console.log(newtimeConv)

        var nowConverted = moment().subtract(1,"year")
        var newConv = parseInt(nowConverted.format("X"))
        //console.log(newConv)

        var diff = newtimeConv-newConv
        //console.log(diff)

        if (diff > 0){
        nextA = fbtime
        var minA = Math.round(diff/60)
        //console.log(minA)
        }

        else if (diff <= 0) {
        var now1 = nowConverted.add(1,"year")
        var time1 = timeConverted.add(1,"year")

        console.log(now1,time1)

        var now2min = parseInt(now1.format("X"))
        var time2min = parseInt(time1.format("X"))

        //console.log(now2min,time2min)

        diff2 = Math.round((now2min-time2min)/60);
        console.log(diff2)

        minA =(fbftt-(diff2%fbftt))

        nextAp = moment(now1).add(minA,"minutes")

        nextA=moment(nextAp).format("HH:mm")
        console.log(nextA)
       }
       
       $("tbody").append("<tr><td>" + fbname + "</td><td>" + fbdest + 
                        "</td><td>" + fbftt + "</td><td>" + nextA + 
                        "</td><td>" + minA + 
                        "</td>") 
        $("input").val("")   
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
});
