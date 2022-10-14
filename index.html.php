<?php
if (!defined("include"))
  die("Error");
?>

<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
<meta name="format-detection" content="telephone=no">

<title>Simple Editor</title>

<link rel="canonical" href="<?php echo $url; ?>" />

<link rel="profile" href="http://gmpg.org/xfn/11" />

<link rel="stylesheet" href="style.css" type="text/css" media="all" />

<style>

@import url('https://fonts.googleapis.com/css2?family=Cousine:ital,wght@0,400;0,700;1,400;1,700&family=Merriweather:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Sarala:wght@400;700&family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

html,body,div,span,h1,p,a,img,b,u,i,ol,ul,li,table,tr,td,input,textarea{font-family:"Sarala","Lucida Sans Unicode","Lucida Grande","Noto Sans",Helvetica,Arial,sans-serif;font-size:14px;line-height:23px;text-rendering: optimizelegibility;}
html,body{height:100%;max-height:100%;margin:0;padding:0;max-width:100%;overflow-x:hidden;}
h1,h1 *{font-size:30px;line-height:1.5em;margin-top:0;padding-top:0.67em;}

.fontSerif,.fontSerif span,.fontSerif a{font-family:Merriweather,Baskerville,"Baskerville Old Face",Palatino,"Palatino Linotype","Noto Serif","Times New Roman",serif;}
.fontMono{font-family:"Cousine",Monaco,Menlo,"Source Code Pro","Noto Mono",Consolas,monospace;}
.clear{clear:both;display:block;overflow:hidden;visibility:hidden;width:0;height:0;}
.animate{transition:all .3s ease 0s;-webkit-transition:all .3s ease 0s;-moz-transition:all .3s ease 0s;-o-transition:all .3s ease 0s;}
.center{text-align:center;}
.textLeft{text-align:left;}
.textRight{text-align:right;}
.bold{font-weight:bold;}
.italic{font-style:italic;}
.underline{padding-bottom:.15em;border-bottom:1px solid #000;}
.borderAll{border:1px solid #999;}
.borderLeft{border-left:1px solid #999;}
.borderRight{border-right:1px solid #999;}
.borderTop{border-top:1px solid #999;}
.borderBottom{border-bottom:1px solid #999;}
.pointer:hover{cursor:pointer;}
.small{font-size:12px;}
.big{font-size:18px;}
.bigger{font-size:22px;}
.biggest{font-size:26px;}
.fontSizeInherit{font-size:inherit;}
.fullWidth{width:100%;max-width:100%;}
.halfWidth{width:50%;}
.floatLeft{float:left;}
.floatRight{float:right;}
.backgroundWhite{background:#fff;}
.displayBlock{display:block;}
.inlineBlock{display:inline-block;}
.displayInline{display:inline;}
.borderBox{box-sizing:border-box;}
.paddingTextLeftRight{padding:0 1em;}
.borderAll{box-shadow:0 0 1px 1px #ccc;}
.textStroke{-webkit-text-stroke:1px black;text-shadow:2px 2px 0 #000,-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000;}
.katex *:not(.fontsize-ensurer),.katex *:not(.sizing){font-family:unset;font-size:unset;}

a{color:#ff6c22;}
a:hover{color:#4285f4;}
a.noUnderline{text-decoration:none;}
p{font-size:1em;line-height:1.5em;margin-top:0;margin-bottom:0;}
hr{border-width:.6px;}
figure{display:block;margin:0;}
figcaption{line-height:1.2em;padding-top:5px;}
input[type="text"],input[type="password"],input[type="email"]{appearance:none;-webkit-appearance:none;-moz-appearance:none;padding:0px 3px;border:1px solid #aaa;border-radius:0;box-sizing:border-box;width:100%;margin:0;}

.container{width:100%;padding:10px 20px;box-sizing:border-box;}

#main{min-height:200px;padding-top:0;padding-bottom:0;max-width:1600px;margin-left:auto;margin-right:auto;}
#content{position:relative;}
#content p{margin-bottom:1em;word-wrap:break-word;}

.uid-qr{position:fixed;right:10px;bottom:10px;width:140px;box-shadow:0 0 1px 1px #999;background:#fff;}
.uid-qr p{padding:5px;margin:0 !important;}
.uid-qr .uid-qrcode{opacity:0;height:0;pointer-events:none;}
.uid-qr .uid-qrcode.on{opacity:1;height:auto;pointer-events:all;}
.uid-qr .uid-qrcode.animate{transition:height .3s ease 0s;-webkit-transition:height .3s ease 0s;-moz-transition:height .3s ease 0s;-o-transition:height .3s ease 0s;}

@media screen and (max-width:800px) {
#h1{padding-left:0;padding-right:0;}
.textEditor #edit-form{margin-left:.5px;}
#textEditorPreview,#edit-preview-wrap{height:auto !important;}
#edit-preview{min-height:50vh !important;}
#textEditorPreview{margin-top:20px;margin-bottom:20px;}
#textEditor,#textEditorTitleWrap,#textEditorPreview{width:100%;padding-left:0;padding-right:0;}
}

@media screen and (max-width:450px) {
.hideOnMobile{display:none !important;}
}
@media screen and (max-width:800px) and (min-width:450px) {
.hideOnTablet{display:none !important;}
}
@media screen and (max-width:1000px) and (min-width:800px) {
.hideOnDesktop{display:none !important;}
}
@media screen and (min-width:1000px) {
.hideOnWideScreen{display:none !important;}
}

</style>

<link rel="shortcut icon" href="favicon.ico" />
<link rel="apple-touch-icon" href="webapp-icon.png" />
<link rel="icon" href="webapp-icon.png" />

<script src='https://www.google.com/recaptcha/api.js'></script>

<script src="qrcode.js"></script>

</head>

<body>

<div id="main" class="container backgroundWhite animate">
<div id="content">


<div id="h1" class="textLeft borderBox fullWidth paddingTextLeftRight">

<h1 class="fontSerif">Simple Editor</h1>

</div>

<div id="textEditorTitleWrap" class="textLeft borderBox halfWidth paddingTextLeftRight" style="padding-bottom:2em;">
<input type="text" id="textEditorTitle" class="fullWidth" placeholder="Enter file name for .md" value="<?php echo (isset($_GET[$editor_link_parameter['filename']]) && $_GET[$editor_link_parameter['filename']] ? htmlentities($_GET[$editor_link_parameter['filename']]) : ''); ?>" />
<p class="hideOnDesktop hideOnWideScreen small"><br>Visit <a class="noUnderline small" href='<?php echo ($c = $url.'/?'.$edit_uid_parameter.'='.$edit_uid); ?>'><?php echo htmlentities($c); ?></a> on other device to continue your work...</p>
</div>
<div class="clear"></div>

<div id="textEditor" class="textLeft borderBox halfWidth floatLeft paddingTextLeftRight"

  data-texteditor-url="<?php echo $url; ?>"
  data-mobile-device-width="800"

  data-zip-uploader-url="https://file.io"
  data-zip-uploader-parameter="file"
  data-zip-uploader-credential="false"

  data-zip-url="<?php echo (isset($_GET[$editor_link_parameter['url']]) && $_GET[$editor_link_parameter['url']] ? htmlentities($_GET[$editor_link_parameter['url']]) : (file_exists($edit_zip_url_file) ? htmlentities(file_get_contents($edit_zip_url_file)) : '')); ?>"
  data-zip-url-credential="<?php echo (isset($_GET[$editor_link_parameter['url_credential']]) && $_GET[$editor_link_parameter['url_credential']] ? htmlentities($_GET[$editor_link_parameter['url_credential']]) : 'false'); ?>"
  data-zip-url-lastmod="<?php echo (isset($_GET[$editor_link_parameter['url']]) && $_GET[$editor_link_parameter['url']] ? '' : (file_exists($edit_zip_url_file) ? filemtime($edit_zip_url_file) : '')); ?>"
  data-zipurl-proxy-url="<?php echo $url; ?>"
  data-zipurl-proxy-parameter="<?php echo $zip_downloader_parameter; ?>"

<?php

if ($unsplash_access_key) {
  echo 'data-unsplash-proxy-url="'.$url.'"';
  echo 'data-unsplash-proxy-parameter-search="'.$unsplash_proxy_parameter_search.'"';
  echo 'data-unsplash-proxy-parameter-page="'.$unsplash_proxy_parameter_page.'"';
}

if (isset($recaptcha_pubkey) && $recaptcha_pubkey && isset($recaptcha_seckey) && $recaptcha_seckey) {
  echo 'data-recaptcha-key="'.$recaptcha_pubkey.'"';
  echo 'data-unsplash-proxy-parameter-recaptcha="'.$unsplash_proxy_parameter_recaptcha.'"';
}

?>

>

</div>

<div id="textEditorPreview" class="borderBox halfWidth floatRight paddingTextLeftRight">

<h2>Preview</h2>

<hr>

<div id="textPreview"></div>

<div class="clear"></div>

</div>

<div class="uid-qr hideOnTablet hideOnMobile animate">
<div id="uid-qrcode" class="uid-qrcode animate"></div>
<div><p class="center"><a class="noUnderline small" href="<?php echo $url.'/?'.$edit_uid_parameter.'='.$edit_uid; ?>" onmouseenter="document.getElementById('uid-qrcode').classList.add('on');" onmouseout="document.getElementById('uid-qrcode').classList.remove('on');">Continue on mobile...</a></p></div>
</div>
<script>
if (typeof(elemQS=document.getElementById('uid-qrcode')) != 'undefined' && elemQS != null)
  elemQS.innerHTML='';new QRCode(elemQS,{text:'<?php echo $url.'?'.$edit_uid_parameter.'='.$edit_uid; ?>',width:140,height:140});
</script>

<script>
const editCustomButtons = [
  //{
  //  'title': 'Add collage',
  //  'name': 'collage',
  //  'text': '\\n<section class="collage" markdown="1">\\n',
  //  'text2': '\\n</section>\\n'
  //},
  //{
  //  'title': 'Add slides',
  //  'name': 'slides',
  //  'text': '<div markdown="1" class="slides"><div markdown="1" class="slide">',
  //  'text2': '</div></div>'
  //},
];
const editZipUploaderCallbackFunc = function(text) {
  if (text) {
    data = JSON.parse(text);
    if (typeof data['link'] != 'undefined' && null !== data['link'] && data['link']) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "<?php echo $url.'/?'.$edit_uid_parameter.'='.$edit_uid.'&'.$zip_uploader_parameter.'='; ?>"+encodeURIComponent(data['link']));
      xhr.withCredentials = true;
      xhr.send();
    }
  }
}
</script>

<script src="texteditor.js"></script>

<script>
function outerHeight(elem) {
  var elemHeight = parseInt(document.defaultView.getComputedStyle(elem, '').getPropertyValue('height'));
  var elemMargin = parseInt(document.defaultView.getComputedStyle(elem, '').getPropertyValue('margin-top')) + parseInt(document.defaultView.getComputedStyle(elem, '').getPropertyValue('margin-bottom'));
  return (elemHeight+elemMargin);
}

function editorSetHeight() {
  setTimeout(function() {
    if (window.innerWidth > 800) {
      var vh = window.innerHeight - document.getElementById('h1').offsetHeight - document.getElementById('textEditorTitleWrap').offsetHeight - 20;
      document.getElementById('edit-textarea').style.height = (vh - document.getElementById('edit-buttons').offsetHeight - document.getElementById('edit-title').offsetHeight - document.getElementById('edit-status-bar').offsetHeight - 1 - 20) + 'px';
      document.getElementById('textEditorPreview').style.height = (vh) + 'px';
      document.getElementById('edit-preview-wrap').style.height = (vh - outerHeight(document.getElementById('textEditorPreview').children[0]) - outerHeight(document.getElementById('textEditorPreview').children[1])) + 'px';
    }
  }, 1);
}
window.addEventListener('resize', editorSetHeight);
window.addEventListener('load', editorSetHeight);
</script>

<script>
var setNotRobotCookie = true;

function notRobot() {
  document.cookie = "<?php echo $cookie_name_texteditor_uid.'_notrobot'; ?>=1;path=/";
  setNotRobotCookie = false;
  window.removeEventListener("mousemove", notRobot);
  window.removeEventListener("mousedown", notRobot);
  window.removeEventListener("keydown", notRobot);
  window.removeEventListener("touchstart", notRobot);
  window.removeEventListener("scroll", notRobot);
}

window.addEventListener("mousemove", notRobot);
window.addEventListener("mousedown", notRobot);
window.addEventListener("keydown", notRobot);
window.addEventListener("touchstart", notRobot);
window.addEventListener("scroll", notRobot);
</script>

<div class="clear"></div>
<!-- End of #content -->
</div>
<!-- End of #main -->
</div>

</body>
</html>

