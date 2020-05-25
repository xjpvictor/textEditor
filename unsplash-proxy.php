<?php

class texteditor_unsplash_proxy {

  private $access_key;
  private $secret_key;

  function __construct($unsplash_access_key = false, $unsplash_secret_key = false) {

    if (!$unsplash_access_key)
      die('Access Key must be set');

    if (!$unsplash_secret_key)
      die('Secret Key must be set');

    $this->access_key = $unsplash_access_key;
    $this->secret_key = $unsplash_secret_key;

  }

  function api_list_photos($query, $page = 1, $per_page = 50) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://api.unsplash.com/'.($query && is_string($query) ? 'search/' : '').'photos?page='.(is_numeric($page) ? max(1, $page) : 1).($query && is_string($query) ? '&query='.urlencode($query) : '').($per_page && is_numeric($per_page) && $per_page > 0 ? '&per_page='.$per_page : ''));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
      'Authorization: Client-ID '.$this->access_key,
    ));
    $result = curl_exec($ch);
    curl_close($ch);
    if (!$result || !($data = json_decode($result, 1)))
      return false;
    if ($query && is_string($query)) {
      if (isset($data['results']) && $data['results'])
        return $data;
    } else {
      if (isset($data) && $data)
        return $data;
    }
    return false;
  }

  function search($search_term, $page = 1) {

    $data = $this->api_list_photos($search_term, (isset($page) && is_numeric($page) && $page > 0 ? $page : 1));

    $photos = (isset($data['results']) ? $data['results'] : $data);

    if (!$photos)
      return false;

    return $data;

  }

}

?>
