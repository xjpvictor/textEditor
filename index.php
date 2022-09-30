<?php
define("include", true);

include(__DIR__.'/config.php');

function get_randomstring($length = 32, $allow_symbol = false) {
  $characters = '0123456789abcdefghijklmnopqrstuvwxyz'.($allow_symbol ? '!@#$%^&*()-_=+|?~,.<>\'";:{}[]' : '');
  $randomString = '';
  for ($i = 0; $i < $length; $i++) {
    $randomString .= $characters[rand(0, strlen($characters) - 1)];
  }
  return $randomString;
}

$text_editor_tmp_dir = __DIR__.'/tmp';
if (!file_exists($text_editor_tmp_dir))
  mkdir($text_editor_tmp_dir);

$cookie_name_texteditor_uid = '_se_utils_texteditor_uid';

$unsplash_proxy_parameter_search = 's';
$unsplash_proxy_parameter_page = 'p';
$unsplash_proxy_parameter_recaptcha = 'r';

$unsplash_recaptcha_cookie_name = $cookie_name_texteditor_uid.'_recaptcha';
$unsplash_recaptcha_cookie_salt = md5_file(__FILE__);

$unsplash_cache_valid = 180;

$zip_uploader_parameter = 'z';
$zip_downloader_parameter = 'zz';

$edit_uid_parameter = 'u';
$edit_uid = (isset($_GET[$edit_uid_parameter]) && $_GET[$edit_uid_parameter] ? $_GET[$edit_uid_parameter] : (isset($_COOKIE[$cookie_name_texteditor_uid]) && $_COOKIE[$cookie_name_texteditor_uid] ? $_COOKIE[$cookie_name_texteditor_uid] : get_randomstring(32)));

setcookie($cookie_name_texteditor_uid, $edit_uid, $timestamp + 2592000, '', '', (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] ? 1 : 0), 1);

$edit_zip_url_file = $text_editor_tmp_dir.'/zip_url.'.$edit_uid.'.txt';

if (isset($_GET[$unsplash_proxy_parameter_search]) && isset($unsplash_access_key) && $unsplash_access_key && isset($unsplash_secret_key) && $unsplash_secret_key) {
  // Unsplash proxy

  header('Content-type: application/json');

  $data = array();

  if (
    !$_GET[$unsplash_proxy_parameter_search] ||
    !(isset($recaptcha_pubkey) && $recaptcha_pubkey && isset($recaptcha_seckey) && $recaptcha_seckey) ||
    ($setcookie =
      (isset($_COOKIE[$unsplash_recaptcha_cookie_name]) && $_COOKIE[$unsplash_recaptcha_cookie_name] && $_COOKIE[$unsplash_recaptcha_cookie_name] == hash($hashAlgo, $edit_uid.$unsplash_recaptcha_cookie_salt)) ||
      (isset($_GET[$unsplash_proxy_parameter_recaptcha]) && $_GET[$unsplash_proxy_parameter_recaptcha] && recaptcha_verify($_GET[$unsplash_proxy_parameter_recaptcha], (isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '')))
    )
  ) {

    if (
      (isset($setcookie) && $setcookie)
    )
      setcookie($unsplash_recaptcha_cookie_name, (isset($_COOKIE[$unsplash_recaptcha_cookie_name]) && $_COOKIE[$unsplash_recaptcha_cookie_name] ? $_COOKIE[$unsplash_recaptcha_cookie_name] : hash($hashAlgo, $edit_uid.$unsplash_recaptcha_cookie_salt)), $timestamp + 2592000, '', '', (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] ? 1 : 0), 1);

    $cache_file = $text_editor_tmp_dir.'/unsplash-cache-'.hash('sha1', $_GET[strtolower(trim($unsplash_proxy_parameter_search))].($p = (isset($_GET[$unsplash_proxy_parameter_page]) ? $_GET[$unsplash_proxy_parameter_page] : 1))).'.json';

    if (file_exists($cache_file) && $timestamp - filemtime($cache_file) <= $unsplash_cache_valid) {
      echo file_get_contents($cache_file);
      exit;
    }

    include(__DIR__.'/unsplash-proxy.php');
    $texteditor_unsplash_proxy = new texteditor_unsplash_proxy($unsplash_access_key, $unsplash_secret_key);
    $data = ($texteditor_unsplash_proxy->search($_GET[$unsplash_proxy_parameter_search], $p));

    echo ($output = json_encode($data));

    file_put_contents($cache_file, $output, LOCK_EX);

  }

  exit;

}

if (isset($_GET[$zip_uploader_parameter]) && $_GET[$zip_uploader_parameter]) {
  // zip upload
  file_put_contents($edit_zip_url_file, $_GET[$zip_uploader_parameter]);
  exit;
}

if (isset($_GET[$zip_downloader_parameter]) && $_GET[$zip_downloader_parameter]) {
  // zip download
  include(__DIR__.'/zipurl-proxy.php');
  $texteditor_zipurl_proxy = new texteditor_zipurl_proxy();
  echo $texteditor_zipurl_proxy->download($_GET[$zip_downloader_parameter]);
  exit;
}

if (isset($html) && $html && file_exists($html))
  include($html);

file_put_contents($edit_zip_url_file, '');

exit;

