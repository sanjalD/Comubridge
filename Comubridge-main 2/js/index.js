function include(file) {
    return new Promise(
        resolve => {
            var script = document.createElement('script');
            script.src = file;
            script.type = 'text/javascript';
            script.defer = true;
            document.getElementsByTagName('head').item(0).appendChild(script);
            resolve(true);
        },
        reject => {
            reject(false);
        }
    );
}

function showHideOutput(element)
{
    $('.output_subsec').each(function() {
        $(this).addClass("hide");
    });
    $("."+element+"_output").removeClass("hide");
    
}


//TODO 1: @API CALLING CODE  
//?   POV:    IT IS JUST FOR EXPLAINATION PURPOSE ACTUAL CODE MAY BE DIFFERENT BASED ON
//?           YOUR API {INPUT-OUTPUT} SUCH AS AUDIO/VIDEO/BRAIL
//?           I AM SHOWING FOR TEXT {INPUT-OUTPUT} API CALLING SAMPLE




//TODO 2: @EXAMPLE OF TEXT BASED API {INPUT-OUTPUT} HANDLING ON FRONTEND>>UI: 
/*

     We will use JQuery Post method as it is secured rest of the other method I am
     Posting below

     $(document).ready(function(){ //?INSIDE READY METHOD YOU WILL CAN AN API

            $("button").click(function(){


                    //* for taking input from textarea you can use below

                    $("#ID_of_textArea_Element").val(); //? this will get you data whatever typed in textbox

                    $.post("aws_hosted_api.php",    //? API URL
                    {                               //? API PARAMETER
                        input_mode: "Donald Duck",  //? HERE YOU CAN PASS INPUT MODE 
                        data: "file.mp4 or data"    //? AND DATA/FILE/BUFFER CONTENT  it may varies depenfing upon your API structure
                        
                    },
                    function(data, status){
                        alert("Data: " + data + "\nStatus: " + status); //? here you will get API response in data variable

                        $(".className").val(data); //? any method for displaying data in UI can be used
                        $(".className").text(data);
                        $(".className").html(data);

                        //* ----- OR ------------

                        $("#elementID").val(data); //? any method for displaying data in UI can be used
                        $("#elementID").text(data);
                        $("#elementID").html(data);
                    });
            });
    });


*/




//TODO 3: @OTHER EXAMPLES OF API CALLING
/*

1) only for data fetching simple without any  input

$(document).ready(function(){
  $("button").click(function(){
    $.ajax({url: "demo_test.txt", success: function(result){
      $("#div1").html(result);
    }});
  });
});


2) same as above but method name is different but purpose is same

$(document).ready(function(){
  $("button").click(function(){
    $("#div1").load("demo_test.txt", function(responseTxt, statusTxt, xhr){
      if(statusTxt == "success")
        alert("External content loaded successfully!");
      if(statusTxt == "error")
        alert("Error: " + xhr.status + ": " + xhr.statusText);
    });
  });
});


3) get method using jquery ajax

$("button").click(function(){
  $.get("demo_test.asp", function(data, status){
    alert("Data: " + data + "\nStatus: " + status);
  });
});


4) post method using jquery and ajax

$("button").click(function(){
  $.post("demo_test_post.asp",
  {
    name: "Donald Duck",
    city: "Duckburg"
  },
  function(data, status){
    alert("Data: " + data + "\nStatus: " + status);
  });
});


5) simple javascript 

const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
      document.getElementById("txtHint").innerHTML = this.responseText;
    }
  xmlhttp.open("GET", "gethint.php?q=" + str);
  xmlhttp.send();

*/

$(document).ready(function(){

    function printErrorMessage(selectIteam, ErrorMSG, color, option) {
        $(`#${selectIteam}`).text(ErrorMSG);
        $(`#${selectIteam}`).css({"color": color, "border": `2px solid ${color}` });
    }
    $('.home_options').each(function() {
            $(this).click(()=>{
                $('.output_subsec').each(function() {
                    $(this).addClass("hide");
                });
            $('.home_options').each(function() {$(this).removeClass("active_btn")});
            $('.input_sec').each(function() {$(this).addClass("hide")});
            $(this).addClass("active_btn");
            let cname = $(this).text().trim();
            $("#"+cname+"_output").removeClass("hide");
            })
        });
    
    let userLoggedIn = sessionStorage.getItem('userLoggedIn');
    if(!userLoggedIn)
    {   
        window.location.href = "login.html";
    }

    (async() =>{
        let response  = await include("/js/account.js");//@external file loaded
    
        if(response)
        {
            $("#nameid").text(sessionStorage.getItem('name').toString());
            $("#logoutnavbutton").click(function(){
                console.log("logged out");
                sessionStorage.clear();
                window.location.href = "login.html";
            });
        
        }
        else
        {
            window.location.href ="index.html";
        }
    
        })();
    
});

