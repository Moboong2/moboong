<?php
unlink('./data/sample'.basename($_POST['review-id']).'/review'.'/'.basename($_POST['review-title'])); //부모디렉토리의 다른 파일이 삭제 될수도 있기에.
header('Location: /detailpage.php?id='.basename($_POST['review-id']));
?>