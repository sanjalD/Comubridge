var UserProfile = "";

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


$(document).ready(function(){
    

    let userLoggedIn = sessionStorage.getItem('userLoggedIn');
    if(!userLoggedIn)
    {   
        window.location.href = "login.html";
    }
    (async() =>{

        let response  = await include("/js/account.js");//@external file loaded
    
        if(response)
        {
            $("#logoutnavbutton").click(function(){
                console.log("logged out");
                sessionStorage.clear();
                window.location.href = "login.html";
            });
            $("#nameid").text(sessionStorage.getItem('name').toString());
            setTimeout(()=>{
                UserProfile = JSON.parse(getUserProfileFromDataBase(sessionStorage.getItem('userid').toString()));
                // console.log(UserProfile);
                $("#fullname").val(UserProfile.name);
                $("#email").val(UserProfile.email);
                let arr = ("+"+UserProfile.contact).split("");
                arr.splice(3,0," ");
                $("#contact").val(arr.join(""));
            },500);

            $("#updatebtn").click(function(){
               alert("Reset your account details by creting new account with same username.")
            });

            $("#communicate").click(function(){
                window.location.href = "index.html";
             });

            $("#logoutbtn").click(function(){
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