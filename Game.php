<?php

include("Database.php");

//bejelnetkezés
if(!isset($_POST["where"]))
{
    ?>
    <form id="back" name="back" action="index.php" method="post">
        <button type="submit" name="backButton" id="backButton"></button>
    </form>
    <script>
    document.querySelector("#back").submit();
    </script>
    <?php
}
if($_POST["where"] == "l"){
    $talalat = false;

    $command = "SELECT * FROM `users`;";
    $result = $conn->query($command);
    $rows = $result->fetchAll(PDO::FETCH_ASSOC);
    foreach ($rows as $row) {
        if($row["name"]==$_POST["userName"] && password_verify($_POST["pass"], $row["pass"])){
            include ("Minesweeper.html");
            echo "<p id='name' hidden='hidden'>".$_POST["userName"]."</p>";
            $talalat = true;
            break;
        }
    }

    if(!$talalat){
        ?>
        <form id="back" name="back" action="index.php" method="post">
            <input type="hidden" name="hiba" value="0">
            <button type="submit" name="backButton" id="backButton"></button>
        </form>
        <script>
            document.querySelector("#back").submit();
        </script>

        <?php
        exit;
    }
}
//regisztráció
elseif ($_POST["where"] == "r" && isset($_POST["userName"]) && isset($_POST["pass"])){
    $jo = true;
    $hibaKod = "";
    $command = "SELECT * FROM `users`;";
    $result = $conn->query($command);
    $rows = $result->fetchAll(PDO::FETCH_ASSOC);
    foreach ($rows as $row) {
        if($row["name"]==$_POST["userName"]){
            $jo = false;
            $hibaKod = "Ez a név már foglalt";
            break;
        }
    }
    if($_POST["userName"]=="" || strlen($_POST["pass"])<8){
        $jo = false;
        $hibaKod = "Nem Megfelelő adatok";
    }

    if(!$jo){
        ?>
        <form id="back" name="back" action="Register.php" method="post">
            <input type="hidden" name="hiba" value="<?php echo $hibaKod; ?>">
            <button type="submit" name="backButton" id="backButton"></button>
        </form>
        <script>
            document.querySelector("#back").submit();
        </script>

        <?php
        exit();
    }
    else{
        $command = $conn->prepare("INSERT INTO users VALUES(:_userName, :_pass);");
        $command->execute([
            "_userName" => $_POST["userName"],
            "_pass" => password_hash($_POST["pass"], PASSWORD_DEFAULT)
        ]); 
        ?>
        <form id="back" name="back" action="index.php" method="post">
            <input type="hidden" name="hiba" value="1">
            <button type="submit" name="backButton" id="backButton"></button>
        </form>
        <script>
            document.querySelector("#back").submit();
        </script>

        <?php
        exit();
    }
}
//fallback
else{
    ?>
    <form id="back" name="back" action="index.php" method="post">
        <input type="hidden" name="hiba" value="0">
        <button type="submit" name="backButton" id="backButton"></button>
    </form>
    <script>
        document.querySelector("#back").submit();
    </script>

    <?php
    exit();
}

