<?php
    include ("Database.php");
    if(isset($_GET["name"]) && isset($_GET["time"]) && isset($_GET["mod"])){
        $command = $conn->prepare("INSERT INTO scoreboard VALUES(:_name, :_time, :_mod);");
        $command->execute([
            "_name" =>  $_GET["name"],
            "_time" => $_GET["time"],
            "_mod" => $_GET["mod"]
          ]);
    }