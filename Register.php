<?php
include('Database.php');
?>
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minesweeper - Regisztráció</title>
    <link rel="stylesheet" href="LoginRegister.css">
    <script>
        function LoginOpen(){
            location.href = 'index.php';
        }
        function ScoreOpen(){
            location.href = 'ScoreBoard.php';
        }
    </script>
</head>
<body>
<div>
    <h1>Regisztráció</h1>
    <form action="Game.php" method="post">
        <input type="hidden" name="where" value="r">
        <label for="userName">Felhasználónév</label><br>
        <input type="text" name="userName" id="userName" required><br>
        <label for="pass">Jelszó</label><br>
        <input type="password" name="pass" id="pass" required minlength="8"><br>
        <button type="submit">Regisztráció</button>
        <button type="button" id="login" name="login" onclick="LoginOpen()">Vissza a Belépéshez</button>
        <button type="button" id="ScoreBoard" name="ScoreBoard" onclick="ScoreOpen()">Eredmények</button>
        <?php
        if(isset($_POST["hiba"])){
            echo "<p>".$_POST["hiba"]."</p>";
        }
        ?>
    </form>
</div>

</body>
</html>