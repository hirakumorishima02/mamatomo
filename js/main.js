
var database = firebase.database();

async function getDate(i) {

    var tr = document.createElement('tr');
    tr.id = 'row'+i;
    await document.getElementById('wrapper').appendChild(tr);

    var td = document.createElement('td');
    td.id = 'Name'+i;
    await document.getElementById('row'+i).appendChild(td);

    var td = document.createElement('td');
    td.id = 'Point'+i;
    await document.getElementById('row'+i).appendChild(td);

    var td = document.createElement('td');
    td.id = 'TuhoCount'+i;
    await document.getElementById('row'+i).appendChild(td);

    var dataRef = database.ref('/'+ i);
    var dataRefPoint = database.ref('/'+ i +'/Point');

    dataRef.on("value", function(snapshot) {
        document.getElementById("Name"+i).innerHTML = snapshot.child("Name").val();
    });
    dataRefPoint.on("value", function(snapshot) {
        document.getElementById("Point"+i).innerHTML = snapshot.child("GoodPoint").val() - snapshot.child("BadPoint").val();
    });
    dataRefPoint.on("value", function(snapshot) {
        document.getElementById("TuhoCount"+i).innerHTML = snapshot.child("TuhoCount").val();
    });
};

for(var i = 1; i < 5; i++) {
    getDate(i);
};


// function writeUserData() {
//     var Name = document.getElementById("name").value;
//     var Tell = document.getElementById("tell").value;
//     console.log(Name);
//     console.log(Tell);
//     database.ref('mamatomo-no-yami/6').set({
//       Name: Name,
//       Point: "",
//       Tell : Tell
//     });
// }


document.getElementById('write').addEventListener('click', function() {
    var Name = document.getElementById("name").value;
    var Tell = document.getElementById("tell").value;
    firebase.database().ref('/3').set({
      Name: Name,
      Point: {
          TuhoCount:0,
          GoodPoint:0,
          BadPoint:0,
      },
      Tell: Tell
    }).then(function(){
      alert('町内会に登録完了！');
    });
});