
var editform = document.getElementById('edit-form');
var edittextarea = document.getElementById('edit-textarea');
var edittextareashadertop = document.getElementById('edit-textarea-shader-top');
var edittextareashaderbottom = document.getElementById('edit-textarea-shader-bottom');
var edittextareaplace = document.getElementById('edittextareaplace');
var edittextareasnapwrap = document.getElementById('edittextareasnapwrap');
var edittextareasnap = document.getElementById('edittextareasnap');
var edittextareasnaplocator = document.getElementById('edittextareasnaplocator');
var editpreview = document.getElementById('edit-preview');
var editpreviewwrap = document.getElementById('edit-preview-wrap');
var editbuttons = document.getElementById('edit-buttons');
var editstatusbar = document.getElementById('edit-status-bar');
var editcustombuttonholder = document.getElementById('edit-custom-buttons');
var edittitle = document.getElementById('edit-title');
var editimageuploader = document.getElementById('edit-imageuploader');
const editstoragecaretpositionname = 'edit-caret-position';
const editstoragemdtitlename = 'edit-md-title';
var editmdtitle = (typeof document.getElementById('textEditorTitle') != 'undefined' && null !== document.getElementById('textEditorTitle') && document.getElementById('textEditorTitle') ? document.getElementById('textEditorTitle') : false);
const editstorageziplastmodname = 'edit-zip-lastmod';

const editimagetype = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
const editpreviewpositioneridprefix = 'edit-positioner-';
const editpreviewpositionerclass = 'edit-positioners';
const editpreviewpositionbuttonclass = 'edit-position-buttons';
const editpreviewcaretcurrentclassname = 'edit-preview-caret-current';
var editpreviewpositions = [0];

const edittextarealineheight = parseFloat(document.defaultView.getComputedStyle(edittextarea,'').getPropertyValue('line-height'));
const editpreviewscrollthreshold = 50;
var edithtmlbodyoverflowystyle;

function getTS() {
  if (!Date.now) {
      Date.now = function() { return new Date().getTime(); }
  }
  return Math.floor(Date.now() / 1000);
}

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function editStringHtmlentities(str) {
  var h = document.getElementById("edithtmlentities");
  h.appendChild(document.createTextNode(str));
  var fn = h.innerHTML.replace(/\"/g, "&quot;").replace(/\'/g, "&#39;");
  h.innerHTML = '';
  return fn;
}

function editfreezebody() {
  edithtmlbodyoverflowystyle = document.body.parentNode.style.overflowY;
  document.body.parentNode.style.overflowY = 'hidden';
}

function editunfreezebody() {
  document.body.parentNode.style.overflowY = edithtmlbodyoverflowystyle;
}

// buttons for textarea

if (typeof editcustombuttonholder != 'undefined' && null !== editcustombuttonholder && editcustombuttonholder && typeof editCustomButtons != 'undefined' && null !== editCustomButtons && editCustomButtons) {
  editCustomButtons.forEach(function(button) {
    editcustombuttonholder.innerHTML += '<span id-title="'+(typeof button.title != 'undefined' && null !== button.title && button.title ? editStringHtmlentities(button.title) : 'Button')+'" class="edit-button edit-pointer" onmouseover="mdTitle(this.getAttribute(\'id-title\'))" onmouseout="mdTitle(\'\')" onclick="mdAddStyle(\''+(typeof button.text != 'undefined' && null !== button.text && button.text ? editStringHtmlentities(button.text) : '')+'\', \''+(typeof button.text2 != 'undefined' && null !== button.text2 && button.text2 ? editStringHtmlentities(button.text2) : '')+'\')">'+(typeof button.name != 'undefined' && null !== button.name && button.name ? editStringHtmlentities(button.name) : 'Button')+'</span>';
  });
}

edittitle.innerHTML = edittitle.dataset.defaulttext;

edittextarea.onkeydown = function(e) {
  var s = this.selectionStart;
  var modifier = (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey ? true : false);
  var k = e.key;
  if (k == 'Tab' && !modifier) {
    // Tab key insert 4 spaces
    e.preventDefault();
    this.value = this.value.substring(0, s) + '    ' + this.value.substring(this.selectionEnd);
    this.selectionEnd = s+4;
  } else if (k == 'Escape') {
    // Esc
    this.blur();
  } else if (k == 'Enter') {
    // Enter key auto add prefix including 4 spaces, >, -, *, +, numbered list
    var regexp = new RegExp('^((    )|(> )|(- )|(\\* )|(\\+ )|(([0-9]+). ))');
    if ((str = this.value.substring(this.value.substring(0, s).lastIndexOf("\n")+1).match(regexp)) !== null) {
      e.preventDefault();
      if (typeof str[8] !== 'undefined') {
        str = parseInt(str[8])+1+'. ';
      } else {
        str = str[1];
      }
      this.value = this.value.substring(0, s) + "\n" + str + this.value.substring(this.selectionEnd);
      this.selectionEnd = s+str.length+1;
    }
  } else if (k == 'b' && e.ctrlKey == true) {
    // ctrl-b
    e.preventDefault();
    e.stopPropagation();
    mdAddStyle('**');
  } else if (k == 'i' && e.ctrlKey == true) {
    // ctrl-i
    e.preventDefault();
    e.stopPropagation();
    mdAddStyle('_');
  } else if (k == 'u' && e.ctrlKey == true) {
    // ctrl-u
    e.preventDefault();
    e.stopPropagation();
    mdAddStyle('<u>', '</u>');
  } else if (k == '1' && e.ctrlKey == true) {
    // ctrl-1
    e.preventDefault();
    e.stopPropagation();
    mdAddHR('====');
  } else if (k == '2' && e.ctrlKey == true) {
    // ctrl-2
    e.preventDefault();
    e.stopPropagation();
    mdAddHR('----');
  } else if (k == '3' && e.ctrlKey == true) {
    // ctrl-3
    e.preventDefault();
    e.stopPropagation();
    mdAddHead('### ');
  } else if (k == '4' && e.ctrlKey == true) {
    // ctrl-4
    e.preventDefault();
    e.stopPropagation();
    mdAddHead('#### ');
  } else if (k == '5' && e.ctrlKey == true) {
    // ctrl-5
    e.preventDefault();
    e.stopPropagation();
    mdAddHead('##### ');
  } else if (k == '6' && e.ctrlKey == true) {
    // ctrl-6
    e.preventDefault();
    e.stopPropagation();
    mdAddHead('###### ');
  } else if (k == '{') {
    // {
    e.preventDefault();
    e.stopPropagation();
    mdAddStyle('{', '}', false);
  } else if (k == '[') {
    // [
    e.preventDefault();
    e.stopPropagation();
    mdAddStyle('[', ']', false);
  } else if (k == '(') {
    // (
    e.preventDefault();
    e.stopPropagation();
    mdAddStyle('(', ')', false);
  } else if (k == '<') {
    // <
    e.preventDefault();
    e.stopPropagation();
    mdAddStyle('<', '>', false);
  } else if (k == '"') {
    // "
    e.preventDefault();
    e.stopPropagation();
    mdAddStyle('"', '"', false);
  } else if (k == '\'') {
    // '
    e.preventDefault();
    e.stopPropagation();
    mdAddStyle('\'', '\'', false);
  }
}

function mdTitle(str) {
  if (str.length) {
    edittitle.innerHTML = str;
  } else {
    edittitle.innerHTML = edittitle.dataset.defaulttext;
  }
}

function mdFocus(a,d = false) {
  edittextarea.setSelectionRange(a,(d === false ? a : d));
  edittextarea.focus();
}

function mdTextTrim(str) {
  //var output = '';
  //for (var i = 0; i < str.length; i++) {
  //  if (str.charCodeAt(i) <= 127)
  //    output += str.charAt(i);
  //}
  //return output;
  return str;
  //return str.trim().replace(/[\r\n]{2,}/gmi, "\n\n") + "\n\n";
}

function mdAddHead(str) {
  // Header, add str before
  var a = edittextarea.selectionStart;
  var d = edittextarea.selectionEnd;
  var p = edittextarea.value.substring(0,a).lastIndexOf('\n')+1; // Start of line
  if (edittextarea.value.substr(p, str.length) == str) {
    // Remove str if already added
    edittextarea.value = mdTextTrim(edittextarea.value.substring(0,p) + edittextarea.value.substring(p+str.length));
    a = a-str.length;
    d = d-str.length;
  } else {
    // Add str
    edittextarea.value = mdTextTrim(edittextarea.value.substring(0,p) + str + edittextarea.value.substring(p));
    a = a+str.length;
    d = d+str.length;
  }
  mdFocus(a,d);
}

function mdAddStyle(str, closing = false, remove = true) {
  // Style, bold, italic, add str before and after
  var a = edittextarea.selectionStart;
  var d = edittextarea.selectionEnd;
  if (remove && edittextarea.value.substr(a-str.length, str.length) == str) {
    // Remove str if already added
    edittextarea.value = mdTextTrim(edittextarea.value.substring(0,a-str.length) + edittextarea.value.substring(a,d) + edittextarea.value.substring(d+(closing !== false ? closing : str).length));
    a = a-str.length;
    d = d-str.length;
  } else {
    // Add str
    edittextarea.value = mdTextTrim(edittextarea.value.substring(0,a) + str + edittextarea.value.substring(a,d) + (closing !== false ? closing : str) + edittextarea.value.substring(d));
    a = a+str.length;
    d = d+str.length;
  }
  mdFocus(a,d);
}

function mdAddURL(url = '', image = false, title = '', text = '', select = false, caption = '') {
  // Url, image
  var a = edittextarea.selectionStart;
  var d = edittextarea.selectionEnd;
  edittextarea.value = mdTextTrim(edittextarea.value.substring(0,a) + (str = (sBefore = (image ? (edittextarea.value.substring(0,a).match(/[\n\r]{2,}$/) ? '' : "\n")+'<figure markdown="1">'+"\n"+'<span style="display:block;margin-left:auto;margin-right:auto;max-width:auto;">'+"\n"+'!' : (!a || edittextarea.value.substring(a-1,1).match(/[\n\r\t\s]/) ? '' : ' ')) + '[' + (d > a ? edittextarea.value.substring(a,d) : text) + '](') + (s = (url ? url : '')) + ' "' + (d > a ? edittextarea.value.substring(a,d) : title) + '")' + (image ? "\n"+'</span>'+"\n"+'<figcaption markdown="1">'+"\n"+caption+'</figcaption>'+"\n"+'</figure>' + "\n\n" : (edittextarea.value.substring(d,1).match(/[\n\r\t\s]/) ? '' : ' '))) + edittextarea.value.substring(d));
  if (select)
    mdFocus((a = a + sBefore.length), a + s);
  else
    mdFocus(a + str.length);
}

function mdAddHR(str = '') {
  // New line, add newline after
  var a = edittextarea.selectionStart;
  var d = edittextarea.selectionEnd;
  if (!str)
    var p = d; // Insert a newline
  else
    var p = edittextarea.value.substring(d).indexOf("\n")+d+1; // Start of next line
  edittextarea.value = mdTextTrim(edittextarea.value.substring(0,p) + str + "\n" + edittextarea.value.substring(p));
  d = (a = p+str.length+1);
  mdFocus(a,d);
}

function mdAddImg(url, title, alt, caption = '', showPreview = true, image = true) {
  if (url !== true && url) {
    mdAddURL(url, image, title, alt, false, caption);
  }
  if (url !== true && !image) {
    mdAddHR();
    mdAddHR();
  }
  if (showPreview)
    hideImgUploader();
}

// syntax highlight in preview

var editpreviewhighlightelems;

function editSyntaxHighlight() {
  var editpreviewhighlightelems = editpreview.querySelectorAll('pre code');
  if (editpreviewhighlightelems.length) {
    editpreviewhighlightelems.forEach((block) => {
      hljs.highlightBlock(block);
    });
  }
}

// image in preview

function editshowPreviewImageNotFound(html) {
  var str = html.replace(/<img src="([^\/\"]+)" ([^>]+)\/>/gmi, function (match, p1, p2, offset, string) {
    return '<span class="edit-previewnoimage">Image not found. Please upload <span class="edit-previewnoimagename edit-upload-drop"><span class="edit-upload-button-wrap edit-pointer"><span class="edit-upload-button edit-pointer">' + p1 + '</span><span class="edit-upload-file-button-wrap edit-pointer"><input type="file" accept="image/*" class="edit-upload-file-button edit-pointer" name="files[]" onchange="uploadFileSelectHandler(event, this, \'' + p1 + '\');"></span><span class="edit-clear">&nbsp;</span></span></span></span>';
  }).replace(/<a href="([^\/\"]+)" ([^>]+)>/gmi, function (match, p1, p2, offset, string) {
    return '<span class="edit-previewnoimage">File not found. Please upload <span class="edit-previewnoimagename edit-upload-drop"><span class="edit-upload-button-wrap edit-pointer"><span class="edit-upload-button edit-pointer">' + p1 + '</span><span class="edit-upload-file-button-wrap edit-pointer"><input type="file" class="edit-upload-file-button edit-pointer" name="files[]" onchange="uploadFileSelectHandler(event, this, \'' + p1 + '\');"></span><span class="edit-clear">&nbsp;</span></span></span></span>';
  }).replace(/<a href=/gmi, '<a onclick="window.open(this.href, \'_blank\');" href=');

  if (editpreview.innerHTML !== '<div>'+str+'</div>') {

    regstr = '(<p class="'+editpreviewpositionerclass+'" id="'+editpreviewpositioneridprefix+'[0-9]+" data-edit-position="([0-9]+)"></p>)([\r\n]*';
    var reg = new RegExp(regstr + '<[a-z0-9]+)([^>]*>)', 'gmi');
    var reg_filter = new RegExp(regstr + '</[a-z0-9]+>)', 'gmi');

    previewhtml = str.replace(reg, function(match, p1, p2, p3, p4) {
      cls = p4.trim().match(/(^| )+class="([^\"]*)"/);
      if (null !== cls && null !== cls[2])
        cls = cls[2];
      else
        cls = '';
      return p1+p3+' class="'+editpreviewpositionbuttonclass+' '+cls+'" data-edit-position="'+p2+'" onclick="if(editLargeScreen()){mdFocus('+p2+','+p2+');setTimeout(function(){edittextarea.focus();},10);}" ' + p4.trim().replace(/(^| )*class="[^\"]*"/, '');
    }).replace(reg_filter, function(match, p1, p2, p3) {
      if (p2 == '-1')
        return match;
      var i = editpreviewpositions.indexOf(parseInt(p2));
      if (i > -1)
        editpreviewpositions.splice(i, 1);
      return p3;
    });
    if (typeof editpreview.children != 'undefined' && null !== editpreview.children && editpreview.children.length)
      editpreview.removeChild(editpreview.children[0]);
    editautoScrollCurrentElementId = '';
    var elem = document.createElement('div');
    elem.innerHTML = previewhtml;
    editpreview.appendChild(elem);
    setTimeout(function(){
      editautoUpdate();
      editSyntaxHighlight();
      MathJax.typeset();
      //renderMathInElement(editpreview);
    },10);

    wstr = editpreview.innerHTML.trim().replace(/<[^>]+>/gmi, '').trim();
    document.getElementById('edit-status-word-count').innerHTML = 'Word: ' + (!wstr.length ? 0 : wstr.split(/[\r\n\t\s]+/gmi).length) + ' Characters: ' + wstr.replace(/[\r\n]+[\s\t]+/gmi, '').replace(/[\s\t]+[\r\n]+/gmi, '').replace(/[\t]+/gmi, ' ').replace(/[\r\n]+/gmi, '').length;

  }

}

var mdAddPositionerCondition;
var mdAddPositionerStartIndex = 0, mdAddPositionerOutputStr = '';

function mdAddPositioner(str) {
  var reg = new RegExp('\n\n([^\n])', 'm');
  mdAddPositionerCondition = true;
  mdAddPositionerStartIndex = 0;
  mdAddPositionerOutputStr = '';
  editpreviewpositions = [0];

  str.replace(/^([\r\n\s]*)---([\r\n]+)((.(?!(\.\.\.)))*.)\.\.\.([\r\n]*)/si, function(match) {
    mdAddPositionerStartIndex = match.length - 2;
    mdAddPositionerOutputStr = '<p style="display:none;"></p>';
    return match;
  });
  while (mdAddPositionerCondition) {
    mdAddPositionerCondition = false;
    str.substring(mdAddPositionerStartIndex).replace(reg, function(match, p1, offset, string) {
      mdAddPositionerCondition = true;
      var pos = mdAddPositionerStartIndex+offset+match.length-1;
      editpreviewpositions.push(pos);
      mdAddPositionerOutputStr += string.substring(0, offset) + "\n\n" + '<p class="'+editpreviewpositionerclass+'" id="'+editpreviewpositioneridprefix+pos+'" data-edit-position="'+pos+'">' + '</p>' + "\n";
      mdAddPositionerStartIndex = pos;
      return match;
    });
  }
  mdAddPositionerOutputStr = '<p class="'+editpreviewpositionerclass+'" id="'+editpreviewpositioneridprefix+'0" data-edit-position="0">' + '</p>' + "\n" + mdAddPositionerOutputStr + str.substring(mdAddPositionerStartIndex)+'<p class="'+editpreviewpositionerclass+'" id="'+editpreviewpositioneridprefix+'-1" data-edit-position="-1">' + '</p><p></p>';

  return mdAddPositionerOutputStr;
}

function editshowPreview() {
  if (typeof editconverter != 'undefined' && null !== editconverter) {
    html = editconverter.makeHtml(mdAddPositioner(edittextarea.value));
    if (editdb) {
      var requestFile = editdbtxn(editdbfilestorename);
      requestFile.getAll().onsuccess = function(e) {
        var files = e.target.result;
        if (files.length) {
          files.forEach(function(file) {
            var fn_encoded = encodeURIComponent(file.name);
            if (html.indexOf('<a href="'+fn_encoded+'"') !== -1) {
              html = html.replace(new RegExp('<a href="'+fn_encoded+'"', 'g'), '<a onclick="event.preventDefault();event.stopPropagation();" href="file://'+fn_encoded+'"');
            } else {
              editdbtxn(editdbfilestorename).delete(file.name);
            }
          });
        }
        var requestImg = editdbtxn(editdbimgstorename);
        requestImg.getAll().onsuccess = function(e) {
          var imgs = e.target.result;
          if (imgs.length) {
            imgs.forEach(function(img) {
              var fn_encoded = encodeURIComponent(img.name);
              if (html.indexOf('<img src="'+fn_encoded+'"') !== -1) {
                html = html.replace(new RegExp('<img src="'+fn_encoded+'"', 'g'), '<img src="'+img.Value.data.replace('data:image/svg;', 'data:image/svg+xml;')+'" data-image-name="'+img.name+'"');
              } else if (html.indexOf('data-image-name="'+img.name+'"') === -1) {
                editdbtxn(editdbimgstorename).delete(img.name);
              }
            });
          }
          editshowPreviewImageNotFound(html);
        }
      }
    } else
      editshowPreviewImageNotFound(html);
  }
}

// Image uploader

function showImgUploader() {
  editimageuploader.classList.add('edit-show');
  editfreezebody();
}
function hideImgUploader() {
  editimageuploader.classList.remove('edit-show');
  editunfreezebody();
}

// Image from Unsplash

function insertUnsplashImg(src, link, author_name, author_link, description) {
  mdAddImg(src, description, 'image', 'Photo by <a href="' + author_link + '" target="_blank" title="Author">' + author_name + '</a> on <a href="' + link + '" target="_blank" title="Unsplash">Unsplash</a>' + "\n");
}

function editAllowUnsplash() {
  return (window.XMLHttpRequest && typeof texteditor.dataset.unsplashProxyUrl != 'undefined' && null !== texteditor.dataset.unsplashProxyUrl && texteditor.dataset.unsplashProxyUrl ? true : false);
}

function editSearchUnsplashValidate(p = 1) {
  if (editAllowRecaptcha)
    grecaptcha.execute(editimageuploaderunsplashrecaptchawidgetid);
  else
    editSearchUnsplash(false, p);
}

function editSearchUnsplash(recaptcha = false, p = 1) {
  s = editform.elements['img_unsplash'].value;
  if (editAllowUnsplash()) {
    var url = texteditor.dataset.unsplashProxyUrl + '?' + (recaptcha ? (typeof texteditor.dataset.unsplashProxyParameterRecaptcha != 'undefined' && null !== texteditor.dataset.unsplashProxyParameterRecaptcha && texteditor.dataset.unsplashProxyParameterRecaptcha ? texteditor.dataset.unsplashProxyParameterRecaptcha : 'r') + '=' + recaptcha + '&' : '') + (typeof texteditor.dataset.unsplashProxyParameterSearch != 'undefined' && null !== texteditor.dataset.unsplashProxyParameterSearch && texteditor.dataset.unsplashProxyParameterSearch ? texteditor.dataset.unsplashProxyParameterSearch : 's') + '=' + encodeURIComponent(s) + '&' + (typeof texteditor.dataset.unsplashProxyParameterPage != 'undefined' && null !== texteditor.dataset.unsplashProxyParameterPage && texteditor.dataset.unsplashProxyParameterPage ? texteditor.dataset.unsplashProxyParameterPage : 'p') + '=' + p;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200 && xhr.responseText) {

          var html = '';
          data = JSON.parse(xhr.responseText);
          photos = (typeof data.results == 'undefined' ? data : data.results);
          if (photos) {
            photos.forEach(function(photo) {
              if (typeof photo.urls != 'undefined' && photo.urls) {
                html += '<span class="edit-imageuploaderunsplashImageWrappers"><img class="edit-imageuploaderunsplashImages edit-pointer" src="' + photo.urls.small + '" data-src="' + (typeof photo.urls.regular != 'undefined' && photo.urls.regular ? photo.urls.regular : (typeof photo.urls.small != 'undefined' && photo.urls.small ? photo.urls.small : photo.urls.thumb)) + '" data-link="' + photo.links.html + '" data-author-name="' + editStringHtmlentities(photo.user.name) + '" data-author-link="' + photo.user.links.html + '" data-description="' + (t = (photo.description ? editStringHtmlentities(photo.description.replace(/[\r\n\t\s]+/gm, ' ')) : '')) + '" onclick="insertUnsplashImg(this.dataset.src, this.dataset.link, this.dataset.authorName, this.dataset.authorLink, this.dataset.description);" /><a class="edit-imageuploaderunsplashImageLinks" href="' + photo.links.html + '" target="_blank" title="' + (t = (t ? t : 'Link')) + '">' + t.substring(0, 20) + '</a></span>';
              }
            });
            if (typeof data.total_pages == 'undefined' || data.total_pages > p)
              html += '<span id="edit-imageuploaderunsplashImageLoader" class="edit-imageuploaderunsplashImageLoader edit-pointer" onclick="this.parentNode.removeChild(this);editSearchUnsplash(false, ' + (p + 1) + ');">Load More...</span>';
            editimageuploaderunsplashimages.innerHTML = (p == 1 ? '' : editimageuploaderunsplashimages.innerHTML) + html;
          } else
            editimageuploaderunsplashimages.innerHTML = '';

        }
      }
    }
    xhr.send();
    if (typeof document.getElementById(editimageuploaderunsplashrecaptchaelementid) != 'undefined' && null !== document.getElementById(editimageuploaderunsplashrecaptchaelementid)) {
      document.getElementById(editimageuploaderunsplashrecaptchaelementid).parentNode.removeChild(document.getElementById(editimageuploaderunsplashrecaptchaelementid));
      editGenerateRecaptchaElement();
      editimageuploaderunsplashrecaptchawidgetid = false;
    }
  }
}

var editimageuploaderunsplash = document.getElementById('edit-imageuploaderunsplash');
var editimageuploaderunsplashimages = document.getElementById('edit-imageuploaderunsplashimages');

if (editAllowUnsplash()) {
  editimageuploaderunsplash.classList.add('edit-show');
  editSearchUnsplash();
}

// Recaptcha
var editimageuploaderunsplashrecaptchaelement = document.getElementById('edit-imageuploaderunsplash-recaptcha');
var editimageuploaderunsplashrecaptchaelementid = '';
var editimageuploaderunsplashrecaptchawidgetid = false;

function editGenerateRecaptchaElement() {
  editimageuploaderunsplashrecaptchaelementid = Math.random().toString(36).substring(2, 8);
  var recaptchadiv = document.createElement('div');
  recaptchadiv.id = editimageuploaderunsplashrecaptchaelementid;
  recaptchadiv.dataset.sitekey = texteditor.dataset.recaptchaKey;
  recaptchadiv.dataset.callback = 'editSearchUnsplash';
  recaptchadiv.dataset.size = 'invisible';
  editimageuploaderunsplashrecaptchaelement.appendChild(recaptchadiv);
}
if (editAllowRecaptcha) {
  editform.classList.add('edit-allow-recaptcha');
  editGenerateRecaptchaElement();
}

// Image local upload

function editAllowUploadLocal() {
  return (window.File && window.FileList && window.FileReader ? true : false);
}

var editimageuploaderlocal = document.getElementById('edit-imageuploaderlocal');
var editimageuploaderlocaldrop = document.getElementById('edit-upload-drop');
var editimageuploaderlocaldragTimeout;

if (editAllowUploadLocal()) {
  editimageuploaderlocal.classList.add('edit-show');
  var filedrop = document.getElementsByTagName("body")[0];
  filedrop.addEventListener("dragover", uploadFileDragHover, false);
  filedrop.addEventListener("dragleave", uploadFileDragHover, false);
  filedrop.addEventListener("drop", uploadCancelDrag, false);
}

function uploadFileDragHover(e) {
  e.stopPropagation();
  e.preventDefault();
  if (e.type == "dragover") {
    out = false;
    editimageuploaderlocaldrop.classList.add("edit-upload-drag");
  } else if (e.type == "dragleave") {
    out = true;
    clearTimeout(editimageuploaderlocaldragTimeout);
    editimageuploaderlocaldragTimeout = setTimeout(function() {
      if (out) {
        editimageuploaderlocaldrop.classList.remove("edit-upload-drag");
      }
    }, 100);
  } else {
    editimageuploaderlocaldrop.classList.remove("edit-upload-drag");
  }
}

function uploadCancelDrag(e) {
  e.stopPropagation();
  e.preventDefault();
  editimageuploaderlocaldrop.classList.remove("edit-upload-drag");
}

function uploadFileSelectHandler(e, input = false, fn = '') {
  if (typeof e.target != 'undefined' || typeof e.dataTransfer != 'undefined') {
    uploadFileDragHover(e);
    var files = e.target.files || e.dataTransfer.files;
  } else
    var files = e;

  if ((n = files.length)) {
    edittextarea.setSelectionRange(edittextarea.selectionEnd, edittextarea.selectionEnd);
    var reader = new FileReader();

    if (fn === true && n == 1 && files[0].name.substring(files[0].name.lastIndexOf('.')+1) === 'zip') {
      // Import zip
      if (!edittextarea.value.trim() || confirm('Overwrite the post?')) {
        reader.onload = (function(e) {
          var zip = new JSZip();
          zip.loadAsync(e.target.result).then(function(contents) {
            var i = 0;
            var obj = Object.keys(contents.files);
            var n = obj.length;
            obj.forEach(function(filename) {
              i++;
              return function(filename, i, n) {
                zip.file(filename).async('blob').then(function(content) {
                  if (editimagetype.indexOf((t = filename.substring(filename.lastIndexOf('.')+1))) > -1) {
                    var f = new File([content], filename, {type: 'image/'+t});
                  } else
                    var f = new File([content], filename);
                  uploadFileSelectHandlerFileReader([f], 0, 1, true, input, (i == n ? true : false));
                });
              }(filename, i, n);
            });
          });
        });
        reader.readAsArrayBuffer(files[0]);
      }

    } else
      uploadFileSelectHandlerFileReader(files, 0, n, fn, input);

  }
}

function uploadFileSelectHandlerFileReader(files, i, n, fn, input, preview = 0) {
  // fn === true: import

  var f = files[i];
  var name = f.name;
  var type = f.type;
  var size = f.size;
  var lastMod = f.lastModified;

  var reader = new FileReader();

  reader.onload = (function(name, type, size, lastMod, i, n, fn) {
    return function(e) {

      editdbtxn((editimagetype.indexOf(name.substring(name.lastIndexOf('.')+1)) > -1 ? editdbimgstorename : editdbfilestorename)).add({'name': (fn === true ? name : (fn ? fn : name)), 'Value': {'data': e.target.result, 'timestamp': getTS()}});
      if (fn === true && (name.indexOf('.md') == name.length - 3 || name.indexOf('.markdown') == name.length - 9)) {
        var blob = new Blob([e.target.result]);
        var mdf = new FileReader();
        mdf.onloadend = function(){
          edittextarea.value = mdTextTrim(mdf.result);
        };
        mdf.readAsText(blob);
        if (editmdtitle) {
          editmdtitle.value = editGetMdSuffix(name);
          if (window.localStorage)
            window.localStorage.setItem(editstoragemdtitlename, editmdtitle.value);
        }
      } else
        mdAddImg((fn === true ? false : (fn ? '' : encodeURIComponent(name))), name, name, '', (fn === true ? false : (i == n-1 ? true : false)), (editimagetype.indexOf(name.substring(name.lastIndexOf('.')+1)) > -1 ? true : false));

      if (i < n-1)
        uploadFileSelectHandlerFileReader(files, i+1, n, fn, input, preview);
      else if (preview === 0) {
        if (fn !== true)
          preview = true;
        else
          preview = false;
      }

      if (preview && input)
        input.value = '';

    };
  })(name, type, size, lastMod, i, n, fn);

  if (editimagetype.indexOf(name.substring(name.lastIndexOf('.')+1)) > -1) {
    reader.readAsDataURL(f);
  }else
    reader.readAsArrayBuffer(f);

}

// Save

function editGetMdSuffix(str) {
  return (!str || str.toLowerCase().substr(-3) == '.md' || str.toLowerCase().substr(-9) == '.markdown' ? str : str+'.md');
}
function editGetMdTitle(show_default = true) {
  return (editmdtitle && typeof editmdtitle.value != 'undefined' && null !== editmdtitle.value && editmdtitle.value ? editGetMdSuffix(editmdtitle.value) : (show_default ? 'post.md' : ''));
}

function editUploadZip() {
  return (window.fetch && typeof texteditor.dataset.zipUploaderUrl != 'undefined' && null !== texteditor.dataset.zipUploaderUrl && texteditor.dataset.zipUploaderUrl ? texteditor.dataset.zipUploaderUrl : false);
}

function editdownload(blob, name) {

  var type = blob.type;
  var size = blob.size;

  var reader = new FileReader();
  reader.onload = (function(name, type, size) {
    return function(e) {

      const link = document.getElementById('editdownload');

      link.href = 'data:attachment/file;base64,'+e.target.result.substring(e.target.result.indexOf(',')+1);
      link.download = name;
      link.click();

    };

  })(name, type, size);
  reader.readAsDataURL(blob);

}

function editexport(download = true) {

  var zip = new JSZip();
  zip.file(editGetMdTitle(), edittextarea.value);

  var requestFile = editdbtxn(editdbfilestorename);
  requestFile.getAll().onsuccess = function(e) {
    var files = e.target.result;
    if (files.length) {
      files.forEach(function(file) {
        zip.file(file.name, file.Value.data);
      });
    }
    var requestImg = editdbtxn(editdbimgstorename);
    requestImg.getAll().onsuccess = function(e) {
      var imgs = e.target.result;
      if (imgs.length) {
        imgs.forEach(function(img) {
          zip.file(img.name, img.Value.data.substring(img.Value.data.indexOf(',')+1), {base64: true});
        });
      }

      zip.generateAsync({type:"blob"})
      .then(function(blob) {

        var d = new Date();
        var fn = "textEditor_export_"+d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)+'_'+('0'+d.getHours()).slice(-2)+'-'+('0'+d.getMinutes()).slice(-2)+".zip";

        if ((url = editUploadZip())) {
          var f = new FormData();
          f.append((typeof texteditor.dataset.zipUploaderParameter != 'undefined' && null !== texteditor.dataset.zipUploaderParameter && texteditor.dataset.zipUploaderParameter ? texteditor.dataset.zipUploaderParameter : 'file'), blob);
          const option = {
            method: "POST",
            body: f
          }
          if (typeof texteditor.dataset.zipUploaderCredential != 'undefined' && null !== texteditor.dataset.zipUploaderCredential && texteditor.dataset.zipUploaderCredential == 'true')
            option['credentials'] = 'include';
          fetch(url, option)
          .then(res => res.json())
          .then(result => {

            if (window.localStorage) {
              var t = new Date();
              window.localStorage.setItem(editstorageziplastmodname, Math.floor(t.getTime() / 1000));
            }

            if (typeof editZipUploaderCallbackFunc != 'undefined' && null !== editZipUploaderCallbackFunc && isFunction(editZipUploaderCallbackFunc))
              editZipUploaderCallbackFunc(JSON.stringify(result));

            if (download)
              editdownload(blob, fn);

          })
          .catch((error) => {
            console.log('Error: ', error);
          });
        } else if (download)
          editdownload(blob, fn);

      });

    }
  }

}

// Auto scroll preview

var editautoScrollCurrentElementId = '';

function editautoScroll() {

  var s = (edittextarea.selectionDirection == 'forward' ? edittextarea.selectionEnd : edittextarea.selectionStart) + 1;
  var currentPositionElem, nextPositionElem;

  if (s >= editpreviewpositions[editpreviewpositions.length - 1]) {
    p = editpreview.offsetHeight;
    currentPositionElem = nextPositionElem = document.getElementById(editpreviewpositioneridprefix+'-1');
  } else {

    var positions = editpreviewpositions.slice(0);
    positions.push(s);
    positions.sort(function(a, b){return a - b});

    var posIndex = positions.indexOf(s);

    var posBefore = (posIndex > 0 ? positions[posIndex - 1] : positions[0]);
    var posAfter = positions[posIndex + 1];

    if (typeof document.getElementById(editpreviewpositioneridprefix+posBefore) != 'undefined' && null !== (elemBefore = document.getElementById(editpreviewpositioneridprefix+posBefore)))
      currentPositionElem = elemBefore;
    else
      currentPositionElem = document.getElementById(editpreviewpositioneridprefix+'0');

    if (typeof document.getElementById(editpreviewpositioneridprefix+posAfter) != 'undefined' && null !== (elemAfter = document.getElementById(editpreviewpositioneridprefix+posAfter)))
      nextPositionElem = elemAfter;
    else
      nextPositionElem = document.getElementById(editpreviewpositioneridprefix+editpreviewpositions[editpreviewpositions.length - 1]);

    if (typeof (e = currentPositionElem.nextElementSibling) != 'undefined' && null !== e)
      var scrollBefore = e.offsetTop;
    else
      var scrollBefore = 0;

    if (typeof (e = nextPositionElem.nextElementSibling) != 'undefined' && null !== e)
      var scrollAfter = e.offsetTop;
    else
      var scrollAfter = editpreview.offsetHeight;

    var p = (scrollAfter - scrollBefore <= editpreviewwrap.offsetHeight * 0.75 ? scrollBefore - editpreviewwrap.offsetHeight / 2 + 3 * edittextarealineheight : scrollBefore);

  }

  // Auto scroll preview

  if (editLargeScreen())
    editpreview.parentNode.scrollTop = p;

  // Highlight preview current element

  if (typeof currentPositionElem != 'undefined' && null !== currentPositionElem && typeof currentPositionElem.id != 'undefined' && currentPositionElem.id) {

    if (currentPositionElem.id != editautoScrollCurrentElementId) {
      if (typeof (ppelem = document.getElementById(editautoScrollCurrentElementId)) != 'undefined' && null !== ppelem) {
        ppelem.classList.remove(editpreviewcaretcurrentclassname);
        if (typeof (helem = ppelem.nextElementSibling) != 'undefined' && null !== helem)
          helem.classList.remove(editpreviewcaretcurrentclassname);
      }
      if (typeof (nhelem = currentPositionElem.nextElementSibling) != 'undefined' && null !== nhelem)
        nhelem.classList.add(editpreviewcaretcurrentclassname);
      currentPositionElem.classList.add(editpreviewcaretcurrentclassname);
    }

    editautoScrollCurrentElementId = currentPositionElem.id;

  }

}

// Add shader for focus mode

var editshaderpositionTop = 0, editshaderpositionBottom = 0, editsnaptimeout;
var editsnapratio;

function editshader(positionTop = false, positionBottom = false, textareascrolltop = false) {

  if (!editLargeScreen())
    return false;

  edittextareashadertop.style.top = edittextarea.offsetTop + 'px';
  edittextareashaderbottom.style.bottom = editform.offsetHeight - (edittextarea.offsetTop + edittextarea.offsetHeight) + 'px';

  if (positionTop === false)
    positionTop = editshaderpositionTop;
  else
    editshaderpositionTop = positionTop;
  if (positionBottom === false)
    positionBottom = editshaderpositionBottom;
  else
    editshaderpositionBottom = positionBottom;

  edittextareashadertop.style.height = Math.min(Math.max(0, (positionTop == 0 ? 0 : positionTop - (textareascrolltop !== false ? textareascrolltop : edittextarea.scrollTop)) - 10), edittextarea.offsetHeight) + 'px'
  edittextareashaderbottom.style.height = Math.min(Math.max(0, (positionBottom == 0 ? 0 : edittextarea.offsetHeight - (positionBottom - (textareascrolltop !== false ? textareascrolltop : edittextarea.scrollTop)))), edittextarea.offsetHeight) + 'px'

  if (textareascrolltop !== false)
    return true;

  clearTimeout(editsnaptimeout);
  edittextareasnapwrap.classList.add('edit-show');
  editsnaptimeout = setTimeout(function(){edittextareasnapwrap.classList.remove('edit-show');}, 3000);

  var editsnaplocatortop = edittextarea.scrollTop * editsnapratio;
  var editsnaplocatorheight = (edittextarea.offsetHeight) * editsnapratio;
  var editsnaplocatorthreshold = edittextareasnapwrap.offsetHeight / 2 - editsnaplocatorheight / 2;

  edittextareasnapwrap.scrollTo(0, editsnaplocatortop - editsnaplocatorthreshold);
  edittextareasnaplocator.style.top = (editsnaplocatortop - 100 * editsnapratio) + 'px';
  edittextareasnaplocator.style.bottom = edittextareasnapwrap.offsetHeight - editsnaplocatortop - editsnaplocatorheight - 100 * editsnapratio + 'px';

}

edittextarea.addEventListener('scroll', function(e){editshader();});

// Auto scroll textarea to make caret in center

var editautoScrollTextareaTimeout;

function editcancelAutoScrollTextarea() {
  clearTimeout(editautoScrollTextareaTimeout);
}

edittextarea.addEventListener('touchstart', editcancelAutoScrollTextarea);
edittextarea.addEventListener('mousedown', editcancelAutoScrollTextarea);
edittextarea.addEventListener('keydown', editcancelAutoScrollTextarea);

function editautoScrollTextarea() {

  clearTimeout(editautoScrollTextareaTimeout);

  editautoScrollTextareaTimeout = setTimeout(function() {

    var caretPosition = (edittextarea.selectionDirection == 'forward' ? edittextarea.selectionEnd : edittextarea.selectionStart);
    var caretTop = edittextarea.selectionStart;
    var caretBottom = edittextarea.selectionEnd;

    edittextareasnap.innerText = edittextareaplace.innerText = edittextarea.value + '\n';

    var positionMax = edittextareaplace.offsetHeight;
    edittextareaplace.innerText = '';

    var r = edittextareasnap.offsetWidth / (edittextarea.offsetWidth - parseFloat(document.defaultView.getComputedStyle(edittextarea,'').getPropertyValue('padding-left')) - parseFloat(document.defaultView.getComputedStyle(edittextarea,'').getPropertyValue('padding-right')));
    edittextareasnap.style.fontSize = r * parseFloat(document.defaultView.getComputedStyle(edittextarea,'').getPropertyValue('font-size')) + 'px';
    edittextareasnap.style.lineHeight = r * parseFloat(document.defaultView.getComputedStyle(edittextarea,'').getPropertyValue('line-height')) + 'px';
    editsnapratio = edittextareasnap.offsetHeight / positionMax;

    edittextareaplace.innerText = edittextarea.value.substring(0, caretPosition+1) + '\n';
    var positionCenter = edittextareaplace.offsetHeight;
    edittextareaplace.innerText = '';

    if ((i = edittextarea.value.substring(0, edittextarea.selectionStart+1).lastIndexOf("\n\n")) == -1)
      var positionTop = 0;
    else {
      edittextareaplace.innerText = edittextarea.value.substring(0, i + 1) + '\n';
      var positionTop = edittextareaplace.offsetHeight;
      edittextareaplace.innerText = '';
    }

    if ((i = edittextarea.value.substring(edittextarea.selectionEnd).indexOf("\n\n")) == -1) {
      var positionBottom = 0;
    } else {
      edittextareaplace.innerText = edittextarea.value.substring(0, i + 1 + edittextarea.selectionEnd) + '\n';
      var positionBottom = edittextareaplace.offsetHeight;
      edittextareaplace.innerText = '';
    }

    var edittextareapaddingbottom = parseFloat(document.defaultView.getComputedStyle(edittextarea,'').getPropertyValue('padding-bottom'));

    if (editLargeScreen())
      var tst = Math.max(0, Math.min(positionMax + edittextareapaddingbottom, Math.floor( (positionCenter - edittextarea.offsetHeight / 2) / (2 * edittextarealineheight) ) * 2 * edittextarealineheight + 2 * edittextarealineheight));
    else
      var tst = positionCenter - 6 * edittextarealineheight;

    edittextarea.scrollTo(0, tst);

    editshader(positionTop, positionBottom, tst);

  }, 10);

}

edittextarea.addEventListener('keyup', editautoScrollTextarea);
edittextarea.addEventListener('focus', editautoScrollTextarea);
edittextarea.addEventListener('click', editautoScrollTextarea);
window.addEventListener('resize', editautoScrollTextarea);

// Auto update database and preview at end of key stroke

var editautoUpdateTimeout;

edittextarea.addEventListener('keydown', function(e) {
  clearTimeout(editautoUpdateTimeout);
  editpreview.classList.add('edittyping');
});

function editautoUpdate() {

  clearTimeout(editautoUpdateTimeout);

  editautoUpdateTimeout = setTimeout(function() {

    if (window.localStorage) {
      // Save caret position
      window.localStorage.setItem(editstoragecaretpositionname, (edittextarea.selectionDirection == 'forward' ? edittextarea.selectionEnd : edittextarea.selectionStart));
    }

    if (typeof edittextarea.dataset.value == 'undefined' || null === edittextarea.dataset.value || edittextarea.dataset.value !== edittextarea.value.trim()) {
      // Update preview
      edittextarea.dataset.value = edittextarea.value.trim();
      editshowPreview();
      if (editdb)
        // Update indexeddb
        editdbtxn(editdbmdstorename).put({'text':edittextarea.value, 'timestamp':getTS()}, 1);
    } else {
      // Scroll preview
      editautoScroll();
      editpreview.classList.remove('edittyping');
    }

  }, 500);

}

edittextarea.addEventListener('keyup', editautoUpdate);
edittextarea.addEventListener('focus', editautoUpdate);
edittextarea.addEventListener('click', editautoUpdate);
window.addEventListener('resize', editautoUpdate);

// Toggle mobile device

function editLargeScreen() {
  if (typeof texteditor.dataset.mobileDeviceWidth != 'undefined' && null !== texteditor.dataset.mobileDeviceWidth && texteditor.dataset.mobileDeviceWidth) {
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    if (vw <= texteditor.dataset.mobileDeviceWidth) // || vh >= texteditor.dataset.mobileDeviceWidth)
      // Mobile
      return false;
  }
  // Desktop
  return true;
}

function editToggleMobile() {
  if (editLargeScreen()) {
    // Desktop
    document.body.classList.remove('texteditor-mobile-device');
    edittextarea.style.height = 'auto';
    editFormToggle(0)
  } else {
    // Mobile
    document.body.classList.add('texteditor-mobile-device');
    edittextarea.style.height = window.innerHeight - edittextarea.offsetTop - editstatusbar.offsetHeight + 'px';
  }
}

window.addEventListener('resize', editToggleMobile);
window.addEventListener('load', editToggleMobile);

// Edit form toggle

function editFormToggle(on = true) {
  if (on) {
    editform.classList.add('editing');
    editfreezebody();
  } else {
    editform.classList.remove('editing');
    editunfreezebody();
  }
}

// Initialize

// IndexedDB

const editdbname = "texteditorDB";
const editdbver = '1';
const editdbmdstorename = 'md';
const editdbimgstorename = 'img';
const editdbfilestorename = 'file';
var editdb = false;

function editdbtxn(storename) {
  return editdb.transaction([editdbmdstorename, editdbimgstorename, editdbfilestorename], "readwrite").objectStore(storename);
}

if (window.indexedDB) {
  // Initialize indexedDB
  var openIndexedDB = window.indexedDB.open(editdbname, editdbver);
  openIndexedDB.onsuccess = function(e) {
    // Read from existing indexeddb
    editdb = e.target.result;
    var request = editdbtxn(editdbmdstorename);
    request.get(1).onsuccess = function(e) {
      if (typeof e.target.result.text != 'undefined' && null !== e.target.result.text)
        edittextarea.value = mdTextTrim(e.target.result.text.trim());
      mdFocus((window.localStorage && null !== (cp = window.localStorage.getItem(editstoragecaretpositionname)) && !isNaN(parseInt(cp)) && cp >= 0 && cp <= edittextarea.value.length ? cp : 0));
      setTimeout(function(){edittextarea.blur();edittextarea.focus();},10);
    }
  }
  openIndexedDB.onupgradeneeded = function(e) {
    // New indexeddb created
    editdb = e.target.result;
    var editdbmdStore = editdb.createObjectStore(editdbmdstorename, {autoIncrement: true});
    var editdbimgStore = editdb.createObjectStore(editdbimgstorename, {keyPath: 'name'});
    var editdbfileStore = editdb.createObjectStore(editdbfilestorename, {keyPath: 'name'});
  }
}

if (editmdtitle && window.localStorage) {

  if (!editGetMdTitle(0))
    editmdtitle.value = editGetMdSuffix(window.localStorage.getItem(editstoragemdtitlename));

  window.localStorage.setItem(editstoragemdtitlename, editGetMdSuffix(editmdtitle.value));

  editmdtitle.addEventListener('change', function(e){
    editmdtitle.value = editGetMdSuffix(editmdtitle.value);
    window.localStorage.setItem(editstoragemdtitlename, editGetMdTitle(0));
  });

}

if (window.fetch && typeof texteditor.dataset.zipUrl != 'undefined' && null !== texteditor.dataset.zipUrl && texteditor.dataset.zipUrl) {
  // Download zip file

  if (typeof texteditor.dataset.zipUrlLastmod == 'undefined' || null === texteditor.dataset.zipUrlLastmod || !texteditor.dataset.zipUrlLastmod || !window.localStorage || !window.localStorage.getItem(editstorageziplastmodname) || texteditor.dataset.zipUrlLastmod > (window.localStorage.getItem(editstorageziplastmodname) * 1 + 1)) {

    var url = (typeof texteditor.dataset.zipurlProxyUrl != 'undefined' && null !== texteditor.dataset.zipurlProxyUrl && typeof texteditor.dataset.zipurlProxyParameter != 'undefined' && null !== texteditor.dataset.zipurlProxyParameter ? texteditor.dataset.zipurlProxyUrl + '?' + texteditor.dataset.zipurlProxyParameter + '=' + encodeURIComponent(texteditor.dataset.zipUrl) : texteditor.dataset.zipUrl);
    fetch(url)
    .then(res => res.blob())
    .then(blob => {
      var f = new File([blob], 'post.zip', {type: 'application/x-zip-compressed'});
      uploadFileSelectHandler([f], false, true);
    });

  }

}

