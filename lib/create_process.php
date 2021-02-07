<?php
$conn = mysqli_connect("localhost", "root", "h123123", "mogang");

$sql = "
INSERT INTO review(userid, title, description, created, pageid)
VALUE('{$_POST['review-userid']}','{$_POST['review-title']}', '{$_POST['review-description']}', NOW(), '{$_POST['page-id']}')
";

$result = mysqli_query($conn, $sql);

if($result === false){
    echo '저장하는 과정에서 문제가 생겼습니다. 관리자에게 문의하세요.';
    error_log(mysqli_error($conn));
} else {
    echo "리뷰를 추가하였습니다.";
}

header('Location: /detailpage.php?id='.basename($_POST['page-id']));
?>