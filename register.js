
$(function(){
  
    $('#wrapper-register-form').submit(function(e){
        
        e.preventDefault(); //내장된 이벤트를 차단하는 명령

        $(this).find('.wrapper-register-alert-padding').empty().hide();

        let username = $('#wrapper-register-info-username').val();
        console.log(username);
        
        if($('#wrapper-register-info-username').val()==""){
            alert("이름을 입력해주세요");
            $("wrapper-register-info-username").focus();
            return false;
        }
        if (!validateName(username)){
            $('#wrapper-register-info-username').next().next();
            alert('이름형식에 맞게 입력해주세요');
            return false;
        }
        
         let email = $('#wrapper-register-info-user-email').val();
         console.log(email);
         if($("#wrapper-register-info-user-email").val() == ""){ 
            alert("이메일을 입력해주세요"); 
            $("wrapper-register-info-user-email").focus(); 
            return false;
        }
         if (!validateEmail(email)) {
             $('#wrapper-register-info-user-email').next().next();
             alert('형식에 맞게 이메일 주소를 입력해주세요')
             return false;
            
         }
         
        let phone = $('#wrapper-register-info-user-phone') .val();
        console.log(phone);
         if($("#wrapper-register-info-user-phone").val() == ""){ 
            alert("전화번호를 입력해주세요"); 
            $("wrapper-register-info-user-email").focus(); 
            return false;
        }
        if(!validPhone(phone)){
            $('#wrapper-register-info-user-phone').next().next();
            alert('숫자만 입력해주세요');
            return false;
        }
        let password = $('#wrapper-register-info-user-password').val();
        console.log(password);
        if(!validatePassword(password)){
            $('#wrapper-register-info-user-password').next().next();
            alert('대문자와 숫자가 포함된 최소 8자 문자열이여야 합니다.');
            return false;
        }
        let confirm = $('#wrapper-register-info-user-confirm').val();
        console.log(confirm);
        if(password !== confirm){
            $('#wrapper-register-info-user-confirm').next().next();
            alert('비밀번호가 일치하지 않습니다');
            return false;
        }

        let accept = $('#wrapper-register-accept-btn:checked').val();
        
        if(!accept){
            $('#wrapper-register-accept-btn').next().next();
            alert('필수 체크 항목을 체크해주세요');
            return false;
        }

        submit(email,password);
    });
})

function validateName(username){
    let chkName = /^[가-힣]+$/;
    return chkName.test(username);
}


function validateEmail(email) {
    let chkEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return chkEmail.test(email);
  }
  
  function validatePassword(password) {
    let chkPassword = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
    return chkPassword.test(password);
  }

function validPhone(phone){
    let chkphone = /^[0-9]*$/;
    return chkphone.test(phone);
}

function submit(confirm,username,email,password){
    var params = {
        email:email,
        password:password,
        username:username,
        confirm:confirm
    };
    $.post('some-api-url',params,function(r){
        console.log(r);
    });
}
