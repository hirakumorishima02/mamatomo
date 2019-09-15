
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

    dataRef.once("value").then(function(snapshot) {
        document.getElementById("Name"+i).innerHTML = snapshot.child("Name").val();
    });
    dataRefPoint.once("value").then(function(snapshot) {
        document.getElementById("Point"+i).innerHTML = snapshot.child("GoodPoint").val() - snapshot.child("BadPoint").val();
    });
    dataRefPoint.once("value").then(function(snapshot) {
        document.getElementById("TuhoCount"+i).innerHTML = snapshot.child("TuhoCount").val();
    });
};

for(var i = 1; i < 5; i++) {
    getDate(i);
};
