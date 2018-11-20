var asc = true;
var k = 0;

$(document).ready(function(){
    $.getJSON("data.json", function(result){
        //console.log(result);
        bindData(result);
        changePage(1);
    });
});

//bind table
function bindData(data){
    localStorage.setItem('data',JSON.stringify(data));
    var table_html = "";
    table_html+='<tr>'+
                '<th id="name" onclick="sorting(this.id)">Name</th>'+
                '<th id="desig" onclick="sorting(this.id)">Designation</th>'+
                '<th id="exp" onclick="numberAs(exp)">Experience</th>'+
                '</tr>'

    $.each(data, function(i, field){
        table_html += 
        '<tr>'+
        '<td>' + field.name + '</td>'+
        '<td>' + field.designation + '</td>'+
        '<td>' + field.experience + '</td>'       
        table_html += '</tr>'      
    }); 
    $("#datatable").html(table_html);  
}
//search text
function myFunction() {
    var input, filter, table, tr, td, i;
    filter = $("#myInput").val().toUpperCase();
    tr = $(datatable).find('> tr');
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
    // var ages = [1,2,3,4,5,6,7,8,9,0];
    // document.getElementById("datatable").innerHTML = ages.filter(checkAdult);
  }

//   function checkAdult(age) {
//     input = document.getElementById("myInput").value;
//     if(age == parseInt(input)){
//         console.log(input, age)
//     }
//}

//sorting
function sorting(id){
    var arr = JSON.parse(localStorage.data);
    if(asc){
        function compare(a,b){
            asc = false;

            if(id != "name"){
                if (a.designation < b.designation)
                return -1;
                if ( a.designation > b.designation)
                return 1;
                return 0;
            }else{
                if (a.name < b.name)
                return -1;
                if ( a.name > b.name)
                return 1;
                return 0;
            }
        }
    }else{
        function compare(a,b){
            asc = true;

            if(id != "name"){
                if (a.designation > b.designation)
                return -1;
                if ( a.designation < b.designation)
                return 1;
                return 0;
            }else{
                if (a.name > b.name)
                return -1;
                if ( a.name < b.name)
                return 1;
                return 0;
            }
        }
    }
        arr.sort(compare);   
        var table_html = "";
        
        table_html+='<tr>'+
                    '<th id="name" onclick="sorting(this.id)">Name</th>'+
                    '<th id="desig" onclick="sorting(this.id)">Designation</th>'+
                    '<th id="exp" onclick="numberAs(exp)">Experience</th>'+
                    '</tr>'
            $.each(arr, function(i, field){
                //console.log(field);
                table_html += 
                '<tr>'+
                '<td>' + field.name + '</td>'+
                '<td>' + field.designation + '</td>'+
                '<td>' + field.experience + '</td>'       
                table_html += '</tr>'      
            }); 
        $("#datatable").html(table_html);    
}

//sorting numbers
function numberAs(id) {
        var arr = JSON.parse(localStorage.data);
    if(asc){
        function number(a,b){
            asc = false;
            return a.experience-b.experience;
        }
    }else{
        function number(a,b){
            asc = true;
            return b.experience-a.experience;
        }
    }
       arr.sort(number);
    var table_html1 = "";
    table_html1+='<tr>'+
                '<th id="name" onclick="sorting(this.id)">Name</th>'+
                '<th id="desig" onclick="sorting(this.id)">Designation</th>'+
                '<th id ="exp" onclick="numberAs(exp)">Experience</th>'+
                '</tr>'
            $.each(arr, function(i, field){
                // table = document.getElementById("datatable");
                // tr = table.getElementsByTagName("tr");
                // for (i = 0; i < tr.length; i++) {
                //   td = tr[i].getElementsByTagName("td")[0];
                //   if (td) {
                //     if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                //       tr[i].style.display = "";
                //     } else {
                //       tr[i].style.display = "none";
                //     }
                //   }       
                // }
                //for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < arr.length; i++) {
                console.log(field);
                table_html1 += 
                '<tr>'+
                '<td>' + arr[i].name + '</td>'+
                '<td>' + arr[i].designation + '</td>'+
                '<td>' + arr[i].experience + '</td>'       
                table_html1 += '</tr>'  
               // }    
            });  
        $("#datatable").html(table_html1);  
}

 //pagination
var current_page = 1;
var records_per_page = 2;

var arr = JSON.parse(localStorage.data);

function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}
    
function changePage(page)
{
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    $("#datatable").val("");
    $("#datatable").html("");
    var table_html1 = "";
    $("#datatable").val("");
    $("#datatable").html("");
    table_html1+='<tr>'+
                '<th id="name" onclick="sorting(this.id)">Name</th>'+
                '<th id="desig" onclick="sorting(this.id)">Designation</th>'+
                '<th id ="exp" onclick="numberAs(exp)">Experience</th>'+
                '</tr>'
                
    for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < arr.length; i++) {
       
        table_html1 += 
            '<tr>'+
            '<td>' + arr[i].name + '</td>'+
            '<td>' + arr[i].designation + '</td>'+
            '<td>' + arr[i].experience + '</td>'       
            table_html1 += '</tr>'          
      
    }
    $("#datatable").html(table_html1);
    $("#page").text(page);

    if (page == 1) {
        $("#btn_prev").hide();
    } else {
        $("#btn_prev").show();
    }

    if (page == numPages()) {
        $("btn_next").hide();
    } else {
        $("#btn_next").show();
    }
}

function numPages()
{
    return Math.ceil(arr.length / records_per_page);
}
 
//show new textbox
function openTextbox(){
    $("#newData").show();
    $("#myInput").hide();
}

//add new
function addNew(){
    list =[];
    var arr = JSON.parse(localStorage.data);
    var id = JSON.parse(localStorage.data).length;
    //id++;
    var name = $("#newName").val(); 
    var desg = $("#newDesg").val();
    var exp =  $("#newExp").val(); 
  
        var arrayText = {id:id,name:name,designation: desg, experience:exp};
        arr.push(arrayText);
        localStorage.setItem('data',JSON.stringify(arr));
        var myJsonObject = arr;
        myJsonObject.arrayText = true;
       myJsonObject = JSON.stringify(myJsonObject);

       postdata(myJsonObject);
       
        $("#newName").val('');
        $("#newDesg").val('');
        $("#newExp").val('');

        $("#newData").hide();
        $("#myInput").show();
}

  function postdata(myJsonObject) {
  var data = JSON.parse(myJsonObject);
    $.ajax({
        url: 'http://localhost:4000/postdata',
        type: 'POST',
        data: {data},
        success: function(data){
            //On ajax success do this
            //location.reload(true);
            },
        error: function(xhr, ajaxOptions, thrownError) {
            //On error do this
                if (xhr.status == 200) {

                    //alert(ajaxOptions);
                }
                else {
                    //alert(xhr.status);
                    alert(thrownError);
                }
            }
    });
}

