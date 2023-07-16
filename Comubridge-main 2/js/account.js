// account related class and functionalities


//error message showing
function printErrorMessage(selectedIteam, errorMessage, color){
    $(`.errorMessageField`).text(errorMessage);
    $(`.errorMessageField`).css('color', color);
    $(selectedIteam).css({"border": `2px solid ${color}`});
}


//check in database for users
function checkPasswordInDatabase(userKey,password) 
{   
    let user = new userAccount();
    user.loadUserFromDatabase(userKey);
    return user.validatePassword(password);
}

function checkUserNameInDatabase(userKey) 
{
    return ((localStorage.getItem(`userData_${userKey}`)!=null)?true:false);
}

function getUserProfileFromDataBase(userKey) 
{ 
    let user = new userAccount();
    user.loadUserFromDatabase(userKey);
    return(user.getProfile());
}

class userAccount
{

    constructor() {
        this.usr = {};
        this.usr.name = this.usr.email = this.usr.contact = this.usr.username = this.usr.password= " ";
    }
    getProfile()
    {
        return JSON.stringify(this.usr);
    }
    loadUserFromDatabase(userKey)
    {
        const response = localStorage.getItem(`userData_${userKey}`);

        if(response!=null)
        {
           this.usr = JSON.parse(response);
           //console.log(this.usr);
        }
    }
    validatePassword(pswd)
    {   
        if(pswd==this.usr.password)
        {   
            sessionStorage.setItem("name",this.usr.name);
            return true;
        }
        else
        {
            return false;
        }
    }
    setAccountToLocalStorage()
    {
        localStorage.setItem("userData_"+this.Username,JSON.stringify(this.usr));//reduced size of user object using stingify
    }
    //name
    get Name()
    {
        return this.usr.name;
    }
    set Name(value)
    {
        this.usr.name = value;
    }
    //email
    get Email()
    {
        return this.usr.email;
    }
    set Email(value)
    {
        this.usr.email = value;
    }
    // contact
    get Contact()
    {
        return this.usr.contact;
    }
    set Contact(value)
    {
        this.usr.contact = value;
    }
    // username
    get Username()
    {
        return this.usr.username;
    }
    set Username(value)
    {
        this.usr.username = value;
    }
    // password
    get Password()
    {
        return this.usr.password;
    }
    set Password(value)
    {
        this.usr.password = value;
    }

}
