# textEditor

A What-You-WhoCares-Is-What-You-Get texteditor for html page

## FEATURE

- Markdown
- Live preview
- Auto-scrolling preview panel to match caret position
- Auto-scrolling textarea with caret in focus (Typewriter mode)
- Focusing on current editing block (Focus mode)
- Support LaTeX with Chemical equations
- Syntax highlighting
- Spelling check
- Image uploading and preview
- Search and insert image from Unsplash (Requires server support)
- Optional Google Recaptcha support for Unsplash search box
- Auto-saving
- Import and Export .md and other uploaded files

## USAGE

### editor

Create a `<div>` with `id="textEditor"` for the editor

You may have some configurations as following

```
<div id="textEditor"

  data-texteditor-url="" // Required, url to the directory of the textEditor files
  data-mobile-device-width="" // Optional, if set, textEditor shows different style when device width is smaller than the value

  data-unsplash-proxy-url="" // Optional, if set, textEditor will show images from Unsplash for inserting into post
  data-unsplash-proxy-parameter-search="" // Optional, default to be 's', parameter for search term
  data-unsplash-proxy-parameter-page="" // Optional, default to be 'p', parameter for page number

  data-recaptcha-key="" // Optional, if set, unsplash url will receive recaptcha auth code for each request
  data-unsplash-proxy-parameter-recaptcha="" // Optional, default to be 'r', parameter for recaptcha code

>

</div>
```

You may also define custom buttons as following

```
<script>
var editCustomButtons = [
  {
    'title': 'Button 1 description',
    'name': 'Button 1 text',
    'text': 'Text to be added before caret, backslash escaped',
    'text2': 'Text to be added after caret, backslash escaped'
  },
  {
    'title': 'Button 2 description',
    'name': 'Button 2 text',
    'text': 'Text to be added before caret, backslash escaped',
    'text2': 'Text to be added after caret, backslash escaped'
  }
];
</script>
```

You can optionally create an `<input>` with `id="extEditorTitle"` and when exporting, the .md file will be named after the value in that input field

### preview

Create a `<div>` with `id="textPreview"` for the preview panel

### initialize

Add `<script src="texteditor.js"></script>` before `</body>`

## UNSPLASH SUPPORT

### unsplash-proxy.php

To use Unsplash, server support is needed

The textEditor will make a GET request to the server and the server needs to return a json string containing the search result from Unsplash search photo api

You may use the included `unsplash-proxy.php` for accessing Unsplash search photo api

Simply use
```
include('unsplash-proxy.php');
$texteditor_unsplash_proxy = new texteditor_unsplash_proxy('YOUR_UNSPLASH_ACCESS_KEY', 'YOUR_UNSPLASH_SECRET_KEY');
echo $texteditor_unsplash_proxy->search($_GET['SEARCH_TERM'], $_GET['PAGE_NUMBER']);
```

You could use `data-unsplash-proxy-parameter-search` and `data-unsplash-proxy-parameter-page` to define the SEARCH_TERM and PAGE_NUMBER parameters to be sent via GET to the server

Unsplash developer account needed

### Recaptcha

You could enable Recaptcha for Unsplash so that the Unsplash request sent to the server will include the Recaptcha code

Your server will then have to verify the code before returning the json result

Google Recaptcha account needed

## UPLOADING ZIP SUPPORT

To upload zip file with `.md` file and all relevant images and binary files when clicking `Save` button, simply include the following in the aforementioned `<div id="textEditor">`
```
data-zip-uploader-url="" // The URL to upload the zip file to, if set, the zip file will be sent via "POST" request in "multipart/form-data" type
data-zip-uploader-parameter="" // Optional, the parameter for the zip file, default to be "file"
data-zip-uploader-credential="" // Optional, include credential header (cookie) with the POST request, default to be "false"
data-zip-url="" // Optional, the URL to download the zip file, if set, the zip file will be downloaded via "GET" request and be imported on page load
data-zip-url-credential="" // Optional, include credential header (cookie) with the GET request, default to be "false"
```

Optionally, you may also define a callback function as `editZipUploaderCallbackFunc` to be called once the uploading is finished

```
<script>
const editZipUploaderCallbackFunc = function(text) {
  if (text) {
    console.log(text);
  }
}
</script>
```

This is useful to upload the `.zip` file to ephemeral services such as [file.io](https://file.io) and send the resulting link to server for cross-device syncing service without eating up your server's disk space

Note: [transfer.sh](https://transfer.sh) does not have an `access-control-allow-origin` header set, and sending `POST` requests from browser would be forbidden

## LICENSE

MIT License

