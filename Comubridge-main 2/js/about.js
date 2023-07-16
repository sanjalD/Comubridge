$(document).ready(function(){
    
    let userLoggedIn = sessionStorage.getItem('userLoggedIn');
    if(!userLoggedIn)
    {   
        window.location.href = "login.html";
    }
    $("#logoutnavbutton").click(function(){
        console.log("logged out");
        sessionStorage.clear();
        window.location.href = "login.html";
    });
    
    $("#nameid").text(sessionStorage.getItem('name').toString());

});