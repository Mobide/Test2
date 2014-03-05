<?php
  require_once("inc/php_language_detection.php");  
  	
  main();
 
	function main()
	{
		$language = "es";    
    $browserLanguageMatch = checkBrowserLanguagesMatch('es', 'en', 'eu', 'fr', 'ru', 'ja'); 
    if($browserLanguageMatch != null)
    {
			$language = $browserLanguageMatch;
		}		
		$curURL = "http://". $_SERVER['HTTP_HOST'] . "/bartolo2";			
		$newURL = $curURL . "/". $language; 		
		header('Location: '.$newURL);	
	}
	
  function checkBrowserLanguagesMatch($lang1Key, $lang2Key, $lang3Key, $lang4Key, $lang5Key, $lang6Key)
  {
    $user_languages = get_languages( 'data' );    
    foreach($user_languages as $value)
    {
      if($value[0] == $lang1Key || $value[1] == $lang1Key)
      {
        return $lang1Key;
      }
      else if($value[0] == $lang2Key || $value[1] == $lang2Key)
      {
        return $lang2Key;
      }
      else if($value[0] == $lang3Key || $value[1] == $lang3Key)
      {
        return $lang3Key;
      }
	  else if($value[0] == $lang4Key || $value[1] == $lang4Key)
      {
        return $lang4Key;
      }
      else if($value[0] == $lang5Key || $value[1] == $lang5Key)
      {
        return $lang5Key;
      }
      else if($value[0] == $lang6Key || $value[1] == $lang6Key)
      {
        return $lang6Key;
      }
    }    
    return null; 
  }
	
?>