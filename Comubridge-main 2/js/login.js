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
    if(userLoggedIn)
    {   
        window.location.href = "index.html";
    }

    (async() =>{
        let response  = await include("/js/account.js");//@external file loaded
    
        if(response)
        {
             //forgot password

            $("#forgotpassword").click(function(){
                alert("Please create new comubridge account with same username and new password.");
                window.location.href="signup.html";
            });

            //username 
            $('#username').on('input', () => {
                if (!checkUserNameInDatabase($('#username').val())){
                    printErrorMessage("#username",'User not exists!','red');
                } 
                else if($('#username').val()=="")
                {
                    printErrorMessage("#username",'*Username is required','red');
                }
                else {
                    printErrorMessage("#username",'Username recognized;)','green');    
                }
            })

            $('#password').on('input', () => {
            
                if($('#password').val()=="")
                {
                    printErrorMessage("#password",'*Password is required','red');
                }
                else {
                    printErrorMessage("#password",'','none');    
                }
            })
            $('#password').on('focus', () => {
                printErrorMessage("#username",'','black');   
            })

            $("#loginbtn").click( () => {

                if($('#username').val()=="")
                {
                    printErrorMessage("#username",'*Username is required','red');
                }
                else if($('#password').val()=="")
                {
                    printErrorMessage("#password",'*password is required','red');
                }
                else if (!checkUserNameInDatabase($('#username').val())){
                    printErrorMessage("#username",'User not exists!','red');
                }
                else if (!checkPasswordInDatabase($('#username').val(),$('#password').val()))
                {
                    printErrorMessage("#password",'Password is not valid!','red');
                }
                else
                {         
                    printErrorMessage("#username",'','none');
                    printErrorMessage("#password",'','none');                               
                    printErrorMessage("",'Logging you in...','green');
                    
                    sessionStorage.setItem('userLoggedIn',true);
                    sessionStorage.setItem('userid',$('#username').val());

                    setTimeout(()=>{
                        window.location.href = "index.html";
                    },1200);
                    
                }
            });

            $(".forward").on('click', ()=>{
                
                if($('#username').val()=="")
                {
                    printErrorMessage("#username",'*Username is required','red');
                }
                else if (!checkUserNameInDatabase($('#username').val())){
                    printErrorMessage("#username",'User not exists!','red');
                }
                else
                {
                    //printErrorMessage("#username",'Enter password below','green');  
                    $("#redirection_link").toggle();
                
            
                    $("#singin_container form > h1").html($("#singin_container form > h1").html() == "Welcome onboard :)<br>Please Enter Your Password."?"Greetings, Dear User!":"Welcome onboard :)<br>Please Enter Your Password.")

                    $('.singin_details').toggleClass('show');

                    $("#password input[type=password]").filter(':visible').focus(); //not working
                    $("#password").triggerHandler( "focus" ); //! not working
                
                    $('.btn_wrapper').toggleClass('tx_align_left');

                    if($(".forward").text() == 'Next ')
                    {
                        $(".forward").html(`<i class="fa-light fa-arrow-left" style="user-select: auto;"></i> Back`)
                    }
                    else
                    {
                        $(".forward").html('Next <i class="fa-light fa-arrow-right" style="user-select: auto;"></i>')
                    }

                }
            });
        }
        else
        {
            window.location.href ="login.html";
        }
    
    })();


});