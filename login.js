/*
$(function(){
  
    $('#wrapper-login-form').submit(function(e){
        
        e.preventDefault(); //내장된 이벤트를 차단하는 명령

        $(this).find('.wrapper-login-alert-padding').empty().hide();

       
         let email = $('#wrapper-login-info-user-email').val();
         console.log(email);
         if($("#wrapper-login-info-user-email").val() == ""){ 
            alert("이메일을 입력해주세요"); 
            $("wrapper-register-info-user-email").focus(); 
            return false;
        }
         if (!validateEmail(email)) {
             $('#wrapper-login-info-user-email').next().next();
             alert('형식에 맞게 이메일 주소를 입력해주세요')
             return false;
            
         }
        
        let password = $('#wrapper-login-info-user-password').val();
        console.log(password);
        if(!validatePassword(password)){
            $('#wrapper-login-info-user-password').next().next();
            alert('비밀번호가 일치하지 않습니다');
            return false;
        }
   
        submit(email,password);
    });
})



function validateEmail(email) {
    let chkEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return chkEmail.test(email);
  }
  
  function validatePassword(password) {
    let chkPassword = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
    return chkPassword.test(password);
  }


function submit(email,password){
    var params = {
        email:email,
        password:password,
       
    };
    $.post('some-api-url',params,function(r){
        console.log(r);
    });
}
*/
let express = require('express');

// 세션용 모듈

let session = require('express-session');
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({extended:false}))
// 세션모듈의 설정


app.use(session({
    secret: 'a98yhfi&o2u3bn0(rfuw-gvjoiah3@0945u23r#',
    resave: false,
    saveUninitialized: true
}));



app.get('/count', function(req, res){


    if(req.session.count){


        req.session.count++;    


    }


    else{


        req.session.count = 1;


    }


    res.send('count : ' + req.session.count);


});



// 사용자 페이지, 세션값 유무에 따라서 다른 메세지를 표시


app.get('/welcome', function(req, res){


    if(req.session.displayName){


        res.send(`


            <h2>Hello, ${req.session.displayName} </h2>


            <a href="/auth/logout">logout</a>


        `);


    } else {


        res.send(`


            <h2>Please login..</h2>


            <a href="/auth/login">login</a>


        `);


    }


});



// 로그인 폼 페이지


app.get('/auth/login', function(req, res){


    var output = `


    <h1>Login</h1>


    <form action="/auth/login" method="post" >


        <p>


            <input type="text" name="username" placeholder="username" />


        </p>


        <p>


            <input type="password" name="password" placeholder="password" />


        </p>


            <input type="submit" />


    </form>


    `;


    res.send(output);


});



// 로그아웃 처리 - 세션 삭제 후 리다이렉트


app.get('/auth/logout', function(req, res){


    delete req.session.displayName;


    res.redirect('/welcome');


});



// 로그인 처리 - 아이디와 패스워드 비교해서 일치하면 세션에 값을 부여하고 리다이렉트


app.post('/auth/login', function(req, res){


    var user = {


        username:'lovelydai',


        password:'111111',


        displayName:'woosokism'


    };



    var uname = req.body.username;


    var pwd = req.body.password;


    


    if(uname === user.username && pwd === user.password){


        req.session.displayName = user.displayName;


        res.redirect('/welcome');


    } else {


        res.send('Who are you? <a href="/auth/login">login</a>');


    }



    res.send(uname);


});



app.listen(3003, function(){


    console.log('Connected 3003 port!!!');


});