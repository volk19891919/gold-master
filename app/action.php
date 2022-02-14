<?php

$recepient = "volk19891919@yandex.ru";
$sitename = "Stomo-stom";

$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$forma = trim($_POST["forma"]);
$message = "Имя: $name \nТелефон: $phone \nС какой формы: $forma";

$pagetitle = "Заявка с лендинга \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");