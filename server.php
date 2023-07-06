<?php 
    $string = file_get_contents('data/todo_list.json');

    $array = json_decode($string, true);

    if(isset($_POST['todoItem'])){
        array_push(array: $_POST['todoItem']);
        $arrayEncode = json_encode($array);

        file_put_contents('data/todo_list.json', $arrayEncode);
    }

    header('Content-Type: application/json');
    echo json_encode($array);
?>