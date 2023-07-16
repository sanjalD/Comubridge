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

            //otp related functions

            function generateOTP(){
                const otp = Math.floor(1000 + Math.random() * 9000);
                console.log(`$Your OTP is: ${otp}`); //@remove intentionally kept for debugging purposes
                alert("Your OTP is " + otp + " for Comubridge account verification. Don't share it with anyone. Please do remember it.");
                sessionStorage.setItem("comubridge_otp",otp);
            }

            function optTimer() {
                $("#otp_timer").prop("disabled", true);
                let counter = 61;//60 second otp and 1 second (hide to show) animation 
                let timer = setInterval(function () {
                    $('#otp_timer').text(`I haven't received a code(0:${counter>=10?counter:'0'+counter})`);
                    counter--;
                    if (counter == -1) {
                        clearInterval(timer);
                        $('#otp_timer').text(`I haven't received a code`);
                        $('#otp_timer').addClass('enable');
                        $("#otp_timer").removeAttr('disabled');
                    }
                }, 1000)
            }


            function filldata(index) {
                for (let i = index; i < otp_input_txtboxs.length; i++) {
                    otp_input_txtboxs[i].value = clipData.shift();
                }
            }
            
            function hasNoValue(index) {
                if (values[index] || values[index] === 0)
                    return false;
                return true;
            }
        
            //signup form first section
            $(".forward").on('click', ()=>{


                if($('#username').val()=="")
                {
                    printErrorMessage("#username",'*Username is required','red');
                }
                else if(!(/^[A-z0-9A-Z]{8,256}$/.test($('#username').val()))) 
                {
                    printErrorMessage("#username",'Only alphanumeric characters are allowed and username must be 8-256 characters long.','red');
                }
                else if (checkUserNameInDatabase($('#username').val())){
                    printErrorMessage("#username",'Username is not available','red');
                }
                else
                {
                    printErrorMessage("#username",'','none');
                    $("#redirection_link").toggle();
                    $("#name").focus();//not working

                    $('.singup_details').toggleClass('show');
                    setTimeout(function(){
                        $("#name").filter(":visible").focus();
                    }, 12);//not working
                    $('.btn_wrapper').toggleClass('tx_align_left');

                    if($(".forward").text() == 'Next')
                    {
                        $(".forward").html(`<i class="fa-light fa-arrow-left" style="user-select: auto;"></i>Back`)
                    }
                    else
                    {
                        $(".forward").html('Next<i class="fa-light fa-arrow-right" style="user-select: auto;"></i>')
                    }
                }
            })


            //signup form second section
            $('#username').on('input', () => {
                if (checkUserNameInDatabase($('#username').val())){
                    printErrorMessage("#username",'Username is not available','red');
                } 
                else if(!(/^[A-z0-9A-Z]{8,256}$/.test($('#username').val()))) 
                {
                    printErrorMessage("#username",'Only alphanumeric characters are allowed and username must be 8-256 characters long.','red');
                }
                else if($('#username').val()=="")
                {
                    printErrorMessage("#username",'*Username is required','red');
                }
                else {
                    printErrorMessage("#username",'Username is available','green');    
                }
            })

            $('#name').on('input', () => {
                if($('#name').val()=="") {
                    printErrorMessage("#name",'*Name is required','red');
                }
                else
                {
                    printErrorMessage("#name",'','green');
                }
            })

            $('#email').on('input', () => {
                if($('#email').val()=="") {
                    printErrorMessage("#email",'*Email is required','red');
                }
                else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($('#email').val()))) 
                {
                    printErrorMessage("#email",'Email is not valid!','red');
                }
                else
                {
                    printErrorMessage("#email",'','green');
                }
            })

            $('#contact_no').on('input', () => {
                if($('#contact_no').val()=="") {
                    printErrorMessage("#contact_no",'*Mobile number is required','red');
                }
                else if(!(/^[+91][0-9]{11}$/.test($('#contact_no').val().toString()))) 
                {
                    printErrorMessage("#contact_no",'Mobile number is not valid!','red');
                }
                else
                {
                    printErrorMessage("#contact_no",'','green');
                }
            })

            $('#password').on('input', () => {
                if($('#password').val()=="") {
                    printErrorMessage("#password",'*Password is required','red');
                }
                else if(!(/^[A-z0-9A-Z]{8,16}$/.test($('#password').val().toString()))) 
                {
                    printErrorMessage("#password",'Only alphanumeric characters are allowed and password must be 8-256 characters long.','red');
                }
                else
                {
                    printErrorMessage("#password",'','green');
                }
            })

            $('#confirm_password').on('input', () => {
                if($('#confirm_password').val()=="") {
                    printErrorMessage("#confirm_password",'*Confirmation of password is required','red');
                }
                else if($('#confirm_password').val()!=$('#password').val()) 
                {
                    printErrorMessage("#confirm_password",'Both passwords doesn\'t match!','red');
                }
                else
                {
                    printErrorMessage("#confirm_password",'','green');
                }
            })
            
            //signup form final validation
            $("#continue").on('click',()=>{
                if($('#username').val()!="")
                {   
                    printErrorMessage("#username",'','none');
                
                    if($('#name').val()!="")
                    {
                        printErrorMessage("#name",'','none');

                        if($('#email').val()!="")
                        {
                            printErrorMessage("#email",'','none');

                            if($('#contact_no').val()!="")
                            {
                                printErrorMessage("#contact_no",'','none');

                                if($('#password').val()!="")
                                {
                                    printErrorMessage("#password",'','none');

                                    if($('#confirm_password').val()!=""&&$('#confirm_password').val()==$('#password').val())
                                    {
                                        printErrorMessage("#confirm_password",'','none');
                                        $("#singup_container").toggleClass("hide");
                                        $("#otp_container").toggleClass("hide");
                                        generateOTP();

                                    }
                                    else
                                    {
                                        printErrorMessage("#confirm_password",'*Confirmation of password is required','red');
                                    }

                                }
                                else
                                {
                                    printErrorMessage("#password",'*Password is required','red');
                                }

                            }
                            else
                            {
                                printErrorMessage("#contact_no",'*Mobile number is required','red');
                            }

                        }
                        else
                        {
                            printErrorMessage("#email",'*Email is required','red');
                        }
                    
                    }
                    else
                    {
                        printErrorMessage("#name",'*Name is required','red');
                    }
                }
                else
                {
                    printErrorMessage("#username",'*Username is required','red');
                }

            
            });
            
            //otp verification code section

            if(!$("otp_container").is('hide'))
            {
                $('#otp_timer').removeClass('enable')
                optTimer();
            }

            $('#otp_timer').on('click', function () {

                generateOTP();
                $('#otp_timer').removeClass('enable')
                optTimer();
                otp_input_txtboxs.forEach((tag, index) => {
                    $(tag).css({"border": `none`});
                });
                otp_input_txtboxs[0].focus();
            })

            $("#verifyotpbtn").click(function () 
            {   let otp_input = "";

                otp_input_txtboxs.forEach((tag,index)=>{
                    otp_input += $(tag).val();
                })
                
                if(jQuery.isEmptyObject(otp_input)) // if empty OTP
                {
                    otp_input_txtboxs.forEach((tag, index) => {
                        $(tag).css({"border": `2px solid red`});
                    });
                    otp_input_txtboxs[0].focus();
                }
                else
                {   
                    otp_input_txtboxs.forEach((tag, index) => {
                        $(tag).css({"border": `none`});
                    });

                    if(sessionStorage.getItem("comubridge_otp")==otp_input) // correct otp
                    {   
                        sessionStorage.removeItem("comubridge_otp"); // remove otp from session

                        function createUserAccount()
                        {

                            return new Promise(resolve=>{
                            // console.log("Account creation requested..");
                                let user = new userAccount();
                            // console.log("Account creation : request granted!");
                                user.Name = $('#name').val();
                                user.Email = $('#email').val();
                                user.Contact = $('#contact_no').val();
                                user.Username = $('#username').val();
                                user.Password = $('#password').val();
                                user.setAccountToLocalStorage();
                                //console.log("Account creation : accounts parameter given!");
                                resolve("AccountCreationSuccessful");
                                //console.log("Promise resolved:)");
                            },reject=>{
                                reject("AccountCreationError");//Account not created!
                                //console.log("Promise rejected:(");
                            });
                        
                        }

                        //asnychronous working of account creation
                        (async () => {
                            
                            let newAccount = await createUserAccount();
                            
                            //console.log(newAccount);

                            (newAccount=="AccountCreationError")?
                            printErrorMessage("",'Account not created!please try again later.','red')
                            :printErrorMessage("",'Comubridge local account created successfully:)','green');  
                            
                            setTimeout(()=>{ window.location.href="login.html";},1500);
                        
                        })();
                
                        
                    }
                    else
                    {
                        printErrorMessage("",'Invalid OTP entered!','red');
                        otp_input_txtboxs[0].focus();
                    }
                }
            });

            var otp_input_txtboxs = document.querySelectorAll(".otp_input");
            let values = Array(4);
            let clipData;
            otp_input_txtboxs[0].focus();

            
            otp_input_txtboxs.forEach((tag, index) => {
                $(tag).on('keyup', (event) => {
                    if (event.code === "Backspace" && hasNoValue(index)) {
                        if (index > 0) otp_input_txtboxs[index - 1].focus();
                    }

                    //else if any input move focus to next or out
                    else if (tag.value !== "") {
                        (index < otp_input_txtboxs.length - 1) ? otp_input_txtboxs[index + 1].focus(): tag.blur();
                    }

                    //add val to array to track prev vals
                    values[index] = event.target.value;
                });

                $(tag).on('input', () => {
                    //replace digit if already exists
                    if (tag.value > 10) {
                        tag.value = tag.value % 10;
                    }
                    $(tag).css({"border": `none`});
                });

                $(tag).on('paste', (event) => {
                    event.preventDefault();
                    clipData = event.clipboardData.getData("text/plain").split('');
                    filldata(index);
                })
            })
        }
        else
        {
            window.location.href ="signup.html";
        }
            
        })();
});


