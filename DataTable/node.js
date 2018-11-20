var asc = true;
var k = 0;

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
//usage:
readTextFile("http://localhost:3000/getdata", function(text){
    var data = JSON.parse(text);
    localStorage.setItem('data',JSON.stringify(data));
    var table_html = "";
    table_html+='<tr>'+
                '<th id="name" onclick="sorting(this.id)">Name</th>'+
                '<th id="desig" onclick="sorting(this.id)">Designation</th>'+
                '<th id="exp" onclick="numberAs(this.id)">Experience</th>'+
                '</tr>'
    for (var i = 0; i < data.length; i++)
    {  
        table_html += 
            '<tr>'+
            '<td>' + data[i].name + '</td>'+
            '<td>' + data[i].designation + '</td>'+
            '<td>' + data[i].experience + '</td>'       
        table_html += '</tr>'       
    }   
    document.getElementById("datatable").innerHTML = table_html;
});

//search text
function myFunction() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("datatable");
    tr = table.getElementsByTagName("tr");
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
                    '<th id="exp" onclick="numberAs(this.id)">Experience</th>'+
                    '</tr>'
        for (var i = 0; i < arr.length; i++)
        {  
            table_html += 
                '<tr>'+
                '<td>' + arr[i].name + '</td>'+
                '<td>' + arr[i].designation + '</td>'+
                '<td>' + arr[i].experience + '</td>'       
            table_html += '</tr>'       
        }   
        document.getElementById("datatable").innerHTML = table_html;  
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
                '<th id ="exp" onclick="numberAs(this.id)">Experience</th>'+
                '</tr>'
    for (var i = 0; i < arr.length; i++)
    {  
        table_html1 += 
            '<tr>'+
            '<td>' + arr[i].name + '</td>'+
            '<td>' + arr[i].designation + '</td>'+
            '<td>' + arr[i].experience + '</td>'       
            table_html1 += '</tr>'       
    }   
    document.getElementById("datatable").innerHTML = table_html1; 
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
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("datatable");
    var page_span = document.getElementById("page");
 
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";
    var table_html1 = "";
    listing_table.innerHTML = "";
    table_html1+='<tr>'+
                '<th id="name" onclick="sorting(this.id)">Name</th>'+
                '<th id="desig" onclick="sorting(this.id)">Designation</th>'+
                '<th id ="exp" onclick="numberAs(this.id)">Experience</th>'+
                '</tr>'
        
    for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < arr.length; i++) {
       
        table_html1 += 
            '<tr>'+
            '<td>' + arr[i].name + '</td>'+
            '<td>' + arr[i].designation + '</td>'+
            '<td>' + arr[i].experience + '</td>'       
            table_html1 += '</tr>'          
      
    }
    listing_table.innerHTML += table_html1;
    page_span.innerHTML = page;

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages()
{
    return Math.ceil(arr.length / records_per_page);
}

window.onload = function() {
    changePage(1);
};
 
//show new textbox
function openTextbox(){
    document.getElementById("newData").style.display ="block";
    document.getElementById("myInput").style.display ="none";
}

//add new
function addNew(){
    list =[];
    var arr = JSON.parse(localStorage.data);
    var id = JSON.parse(localStorage.data).length;
    //id++;
    var name = document.getElementById("newName").value;
    var desg = document.getElementById("newDesg").value;
    var exp = document.getElementById("newExp").value;
  
        var arrayText = {id:id,name:name,designation: desg, experience:exp};
        arr.push(arrayText);
        var dataNew = localStorage.setItem('data',JSON.stringify(arr));
        var myJsonObject = arr;
        myJsonObject.arrayText = true;
       myJsonObject = JSON.stringify(myJsonObject);

       postdata(myJsonObject);
       
        document.getElementById("newName").value = "";
        document.getElementById("newDesg").value = "";
        document.getElementById("newExp").value = "";

        document.getElementById("newData").style.display ="none";
        document.getElementById("myInput").style.display ="block";
}

function postdata(myJsonObject) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("datatable").innerHTML = this.responseText;
      }
    };
    xhttp.open("POST", "http://localhost:3000/postdata", true);
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send(myJsonObject);
  }

