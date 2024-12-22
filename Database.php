<?php
    function kapcsolodas($kapcsolati_szoveg, $felhasznalonev = '', $jelszo = '') {
        $pdo = new PDO($kapcsolati_szoveg, $felhasznalonev, $jelszo);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    }

    //$conn = kapcsolodas('mysql:host=mysql.caesar.elte.hu;dbname=nkristof;', 'nkristof', 'nemIgaziJelszo'); // ez elteshez ami feltöltve lesz
    $conn = kapcsolodas('mysql:host=localhost;dbname=test;', 'root', ''); // saját szerver

