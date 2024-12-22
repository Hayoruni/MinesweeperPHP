<?php
    include ("Database.php");
?>
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minesweeper - Eredmények</title>
    <link rel="stylesheet" href="LoginRegister.css">
    <script>
        function Back(){
            location.href = 'index.php';
        }
        function EasyClick(){
            location.href = 'ScoreBoard.php?mod=easy';
        }
        function MediumClick(){
            location.href = 'ScoreBoard.php?mod=medium';
        }
        function HardClick(){
            location.href = 'ScoreBoard.php?mod=hard';
        }
    </script>
</head>
<body>
    <h1>Eredmények</h1>
    <?php if(isset($_GET['mod'])){
        switch ($_GET['mod']) {
            case 'easy': echo "<h2>Könnyű</h2>";
                break;
            case 'medium': echo "<h2>Közepes</h2>";
                break;
            case 'hard': echo "<h2>Nehéz</h2>";
                break;
        }
    }?>
    <button class="ScoreButton" name="Easy" id="Easy" type="button" onclick="EasyClick()">Könnyű</button>
    <button class="ScoreButton" name="Medium" id="Medium" type="button" onclick="MediumClick()">Közepes</button>
    <button class="ScoreButton" name="Hard" id="Hard" type="button" onclick="HardClick()">Nehéz</button>
    <table>
        <tr>
            <th>Hely</th>
            <th>Mód</th>
            <th>Név</th>
            <th>Idő</th>
        </tr>
        <?php
        //ha nincs GET
        if(!isset($_GET["mod"])){
            $command = "SELECT * FROM scoreboard;";
            $result = $conn->query($command);
            $rows = $result->fetchAll(PDO::FETCH_ASSOC);
            usort($rows, fn($a, $b) => $a['ido'] - $b['ido']); // sort idő alapján
            $index = 0;
            $elozo = $rows[0];
            $elozo['ido'] = "-1";
            foreach ($rows as $row) {
                if($row['ido'] != $elozo['ido']) $index++;
                $elozo = $row;
                echo "<tr><td>".$index."</td><td>".$row['mod'] . "</td><td>" . $row['nev'] . "</td><td>" . $row['ido'] . "</td></tr>";
            }
        }
        //ha van GET
        elseif ($_GET["mod"] == "easy" || $_GET["mod"] == "medium" || $_GET["mod"] == "hard") {
            $command = $conn->prepare("SELECT * FROM scoreboard WHERE scoreboard.mod = :_mod ;");
            $command->execute([
                "_mod" => $_GET["mod"]
            ]);
            $rows = $command->fetchAll(PDO::FETCH_ASSOC);
            usort($rows, fn($a, $b) => $a['ido'] - $b['ido']); // sort idő alapján
            if(count($rows) < 1){
                echo '</table>';
                echo '<button name="Back" id="Back" type="button" onclick="Back()">Vissza</button>';
                return;
            }
            $index = 0;
            $elozo = $rows[0];
            $elozo['ido'] = "-1";
            foreach ($rows as $row) {
                if($row['ido'] != $elozo['ido']) $index++;
                $elozo = $row;
                echo "<tr><td>".$index."</td><td>".$row['mod'] . "</td><td>" . $row['nev'] . "</td><td>" . $row['ido'] . "</td></tr>";
            }
        }
        //ha hibás a GET vissazdob a Loginhoz
        else{
            echo "<script>Back()</script>";
        }
        ?>
    </table>
    <button name="Back" id="Back" type="button" onclick="Back()">Vissza</button>
</body>
</html>