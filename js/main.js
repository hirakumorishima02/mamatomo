
var database = firebase.database();
count = 0;

// 読み込み処理
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

function notEmpty(value) {
    var result;
    switch (typeof value) {
    case 'string':
        // 文字の0を除く
        result = (value && value != 0);
        break;
    case 'object':
        // 配列の中身の数チェック
        result = (value && Object.keys(value).length);
        break;
    default:
        result = value;
    }
    return Boolean(result);
}

for (var i = 1; i <= 20; i++) {
    var dataRef = database.ref('/'+ i);
    dataRef.on("value", function(snapshot) {
        if(notEmpty(snapshot.child("Name").val())) {
            count += 1;
        }
    });
}
var timeoutGetData = function timeout() {
    for(var i = 1; i <= count; i++) {
        getDate(i);
        console.log(count);
    };
}

setTimeout(timeoutGetData, 2000);


// 書き込み処理
document.getElementById('write').addEventListener('click', function() {
    var Name = document.getElementById("name").value;
    var Tell = document.getElementById("tell").value;
    var countAddOne = count + 1;
    firebase.database().ref('/' + countAddOne).set({
      Name: Name,
      Point: {
          TuhoCount:0,
          GoodPoint:0,
          BadPoint:0,
      },
      Tell: Tell
    }).then(function(){
      alert('町内会に登録完了！');
      window.location.reload();
    });
});