function valiadteInput() {
    var msg="";
    var username=document.getElementById("username").value;
    var pass=document.getElementById("password").value;
    var cpass=document.getElementById("confirmPassword").value;


    if(username=="" || pass == "" || cpass== "" ) {
        document.getElementById("submit").disabled=true;
    }
    else if(pass!=cpass) {
        msg = "Opps, i think the passwords does not match";
        document.getElementById("submit").disabled=true;
    }
    else
        document.getElementById("submit").disabled=false;
        document.getElementById("message").innerHTML=msg;
}