<?php
    include('Database.php');
    session_start();
?>
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minesweeper - Belépés</title>
    <link rel="stylesheet" href="LoginRegister.css">
    <script>
        function RegisterOpen(){
        location.href = 'Register.php';
        }
        function ScoreOpen(){
            location.href = 'ScoreBoard.php';
        }
    </script>
</head>
<body>
    <div>
        <h1>Bejelentkezés</h1>
        <form action="Game.php" method="post">
            <input type="hidden" name="where" value="l">
            <label for="userName">Felhasználónév</label><br>
            <input type="text" name="userName" id="userName" required><br>
            <label for="pass">Jelszó</label><br>
            <input type="password" name="pass" id="pass" required><br>
            <button type="submit">Belépés</button>
            <button type="button" id="register" name="register" onclick="RegisterOpen()">Új Felhasználó</button>
            <button type="button" id="ScoreBoard" name="ScoreBoard" onclick="ScoreOpen()">Eredmények</button>
            <?php
            if(isset($_POST["hiba"])){
                if ($_POST["hiba"]=="0"){
                    echo "<p>Hibás felhasználónév vagy jelszó!</p>";
                }
                elseif($_POST["hiba"]=="1"){
                    echo "<p>Sikeres Regisztráció</p>";
                }
            }
            ?>
        </form>
    </div>
</body>
</html>