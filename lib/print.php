<?php
// 단일 태그
function print_single($str)
{
    echo file_get_contents("data/sample" . $_GET['id'] . "/" . $str);
}
// 불특정 복수의 태그 생성
function print_multi($str)
{
    $list = scandir('./data/sample' . $_GET['id'] . '/' . $str);
    $i = 0;
    while ($i < count($list)) {
        if ($list[$i] != '.') {
            if ($list[$i] != '..') {
                $text = file_get_contents('data/sample' . $_GET['id'] . '/' . $str . '/' . $list[$i]);
                echo "<p>$text</p>";
            }
        }
        $i = $i + 1;
    }
}
// 불특정 복수의 태그 생성
function print_multi_with_title($str)
{
    $basename = basename($_GET['id']); //부모디렉토리에서 조회하는 걸 막음.
    $list = scandir('./data/sample' . $basename . '/' . $str);
    $i = 0;
    while ($i < count($list)) {
        if ($list[$i] != '.') {
            if ($list[$i] != '..') {
                $text = htmlspecialchars(file_get_contents('data/sample' . $basename . '/' . $str . '/' . $list[$i])); //XSS를 막음. script태그로 장난 못치게.
                echo "<p>$list[$i]<br>$text</p>";
            }
        }
        $i = $i + 1;
    }
}
