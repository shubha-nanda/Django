$(document).ready(function() {
    console.log("js page loaded");
    $('.center').hide();
    allRecords();
   
}); 

add=function(){
    $("#FirstName").val(null);
    $("#LastName").val(null);
    $("#Mobile").val(null);
    $("#City").val(null);
    $("#State").val(null);
    $("#id").val(null);
    $('.center').show();
}

closeForm=function(){
    console.log("close method called");
    $('.center').hide();
}





allRecords=function(){
    $.ajax({
        url: 'allRecords/',
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            ($('#Registration').DataTable()).destroy()
            // Prints the retrieved JSON data into a table
			$('#Registration').DataTable({
				data: data,
				columns: [
                    // { 'data':'id'},
					{ 'data': 'FirstName' },
					{ 'data': 'LastName' },
					{ 'data': 'Mobile' },
					{ 'data': 'City' },
                    { 'data': 'State' },     
                    {
                        'data': null,
                        'render': function (data, type, row) {
                         return '<button id="' + row.id + '" class="deleteButton" onclick="deleteRecord(this)" >Delete</button> / <button id="' + row.id +'" class="editButton" onclick="updateRecord(this)">Edit</button> '
                        }
                    }
            ]
			});
			 $('#Registration').show();
			}
    });

}

register = function () {
    $.ajax({
        url: 'Display/',
        type: "POST",
        dataType: 'JSON',
        data: JSON.stringify({ 'FirstName': $("#FirstName").val(), 'LastName': $("#LastName").val(),  'Mobile': $("#Mobile").val(), 'City': $("#City").val(),  'State': $("#State").val() }),
        success: function (data) {
            if (data.success == true) {
                allRecords();
                add();
            } else {
                alert("Please check Username/Passowrd/Allowed_IP");
            }
			}
    });
}


updateRecord=function(obj){
    var rowID = $(obj).attr('id');
    console.log("delete methodd"+rowID);  
   
    $.ajax({
        url: 'DisplayRecord/',
        type: 'POST',
        data: JSON.stringify({'id': rowID}),
        success: function (data) {

            console.log(data);
            data = JSON.parse(data)
            $("#FirstName").val(data.FirstName);
            $("#LastName").val(data.LastName);
            $("#Mobile").val(data.Mobile);
            $("#City").val(data.City);
            $("#State").val(data.State);
            $("#id").val(data.id);
            $('.center').show();
            
            console.log(data.id);


            }
    });


}


deleteRecord=function(obj){
    var rowID = $(obj).attr('id');
    console.log("delete methodd"+rowID);
    $.ajax({
        
        url: 'deleteRecord/',
        type: 'POST',
        dataType: 'JSON',
        data: JSON.stringify({'id': rowID}),
        success: function (data) {
            if (data.success == true) {
                allRecords();
            } else {
                alert("No records");
            }
			}
    });


}

Update = function () {
    $.ajax({
        url: 'Update/',
        type: 'POST',
        dataType: 'JSON',
        data: JSON.stringify({ 'id':$("#id").val(),'FirstName': $("#FirstName").val(), 'LastName': $("#LastName").val(),  'Mobile': $("#Mobile").val(), 'City': $("#City").val(),  'State': $("#State").val() }),
        success: function (data) {
            if (data.success == true) {
                allRecords();
                add();
            } else {
                alert("No Records");
            }
			}
    });
}
