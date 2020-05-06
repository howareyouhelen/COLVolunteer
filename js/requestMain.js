$(document).ready(function () {
    const list_div = document.querySelector("#list_div");
    var reqRef = db.collection("requestpost");

    reqRef.onSnapshot(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            list_div.innerHTML += "<div class= 'list-item'><p>items: </p>" 
                + doc.data().items 
                + "<p>need this by: </p>" 
                + doc.data().needbydate 
                + "<p>message: </p>" 
                + doc.data().message
                + "<input id='help_btn' class='btn btn-primary' type='submit' value='Help Me'/>"
                + "</div>"
        });
    });   
    
});
