 var comments = document.getElementsByClassName("comment-content")[0]
    function search(){
        var query = document.getElementById("search").value;
         console.log("search............for: " + query)
         var nodesArray = Array.prototype.slice.call(document.querySelectorAll(".sample-comments"));
         console.log("found: " + nodesArray[0].innerText)
        // debugger;
        // var result = [].slice.call(document.querySelectorAll("xmp"))
        nodesArray.forEach(function(x){
             var txt = x.querySelector("xmp").innerText;
             if (txt.toLowerCase().indexOf(query.toLowerCase()) == -1)
                x.style.display = "none";
            else
                x.style.display = "block";
        })
        //  results = nodesArray.filter(function(x){
        //    // alert("innerText=" + x.innerText)
        //     var txt = x.querySelector("xmp").innerText;
        //      if (txt.toLowerCase().indexOf(query.toLowerCase()) > -1)
        //         return x;
        //  })
        //  console.log("found: " + results.join(""))
        //  comments.innerHTML = results.join("")
    }
    var deleteEntrys = document.getElementsByClassName("delete");
    function myPopup(){
        var noteId = this.parentElement.parentElement.parentElement.dataset.id
      if (confirm('deleteing  ' + this.parentElement.parentElement.innerText)) {
        confirm('i will delete: ' + this.parentElement.parentElement.parentElement.dataset.id)
         // send a api call deleteing dataset(id)
        //  $.post( "ajax/test.html", function( data ) {
        //     $( ".result" ).html( data );
        //   });
         $.post('note/delete/'+noteId,function(data){
            
            alert('Deleting....' + data); //For now i have just added an alert.
        }); 
      }
    }
    // Assign a click event handler to every element:
    for(var i=0; i<deleteEntrys.length; i++) {
        deleteEntrys[i].onclick = myPopup;
    }
    function displayCommentEditor(){
      document.getElementsByClassName('enter-comment')[0].classList.remove('hide');
        document.getElementsByClassName('latest-comments')[0].classList.add('hide');
        notes.time.value = new Date().toLocaleTimeString()
    }
  //  document.forms["myform"].submit()

    function checkform() {
        document.getElementsByClassName('enter-comment')[0].classList.add('hide');
        document.getElementsByClassName('latest-comments')[0].classList.remove('hide');
        return true;
    }
function cancelNote() {
    checkform();
}
    notes.onsubmit = checkform;