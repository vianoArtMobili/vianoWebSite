<?php
ini_set("include_path", '/home/vianoart/php:' . ini_get("include_path"));
require_once "/home/vianoart/php/Mail.php";

// Încarcă datele SMTP din `phoconfig.php`
$config = include('/home/vianoart/phpconfig.php');

// Preia datele din formular
$name = isset($_POST['username']) ? htmlspecialchars($_POST['username']) : '';
$phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : '';
$subject = isset($_POST['subject']) ? htmlspecialchars($_POST['subject']) : '';
$email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
$message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : '';

// Verifică dacă sunt completate toate câmpurile
if (empty($name) || empty($phone) || empty($email) || empty($message)) {
  echo json_encode(['status' => 'error', 'message' => 'Toate câmpurile sunt obligatorii.']);
  exit; // Termină execuția scriptului
}

// Setează datele emailului
$from = $config['smtp_user']; // Adresa care trimite
$to = $config['to_email']; // Adresa care primește

$subject = "Mesaj nou de la $name";
$body = "Ai primit un mesaj de la $name ($email):\n\n$message";

$headers = array(
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/html; charset=UTF-8',
    'From' => $from,
    'Reply-To' => $email,
    'To' => $to,
    'Subject' => $subject
);

$smtp = Mail::factory('smtp', array(
    'host' => $config['host'],
    'auth' => true,
    'username' => $config['smtp_user'],
    'password' => $config['smtp_pass']
));

// Trimite emailul
$mail = $smtp->send($to, $headers, $body);

// Răspuns JSON în funcție de succesul trimiterii emailului
if (PEAR::isError($mail)) {
  echo json_encode(['status' => 'error', 'message' => 'Eroare la trimiterea mesajului: ' . $mail->getMessage()]);
} else {
  echo json_encode(['status' => 'success', 'message' => 'Mesaj trimis cu succes!']);
}
?>
