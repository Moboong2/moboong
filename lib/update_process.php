<?php
file_put_contents('./data/sample'.$_POST['review-id'].'/review'.'/'.$_POST['review-title'], $_POST['review-contents']);
header('Location: /detailpage.php?id='.$_POST['review-id']);
?>