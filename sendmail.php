<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master\src\Exception.php';
require 'PHPMailer-master\src\PHPMailer.php';
require 'PHPMailer-master\src\SMTP.php';

$mail = new PHPMailer(true);
$mail -> CharSet = 'UTF-8';
$mail->setLanguage('ru', 'PHPMailer-master\language');
$mail->IsHTML(true);

//От кого письмо
$mail->setForm('hmm2002@yandex.ru', 'Fixper');

//кому
$mail->addAddress('hmm2002@yandex.ru');

//тема 
$mail->Subject = 'Перезвонить новому пользователю'

//тело письма
$body = '<h1>Новый пользователь оставил заявку на сайте fixper.ru</h1>';

$body = '<p><strong>Имя пользователя: '.$POST['name'].'</p>';
$body = '<p><strong>Телефон пользователя: '.$POST['phone'].'</p>';

$mail->Body = $body;

if (!$mail->send()) {
    $message = 'Ошибка';
}
else {
    $message = 'Данные отправлены!';
}

$response = ['message' => $message];

header("Content-type: application/json");
echo json_encode($response);