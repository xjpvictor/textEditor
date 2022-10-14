
var texteditor = document.getElementById('textEditor');
var texteditorpreview = document.getElementById('textPreview');

if (typeof texteditor != 'undefined' && null !== texteditor && texteditor && typeof texteditor.dataset.texteditorUrl != 'undefined' && null !== texteditor.dataset.texteditorUrl && texteditor.dataset.texteditorUrl && typeof texteditorpreview != 'undefined' && null !== texteditorpreview && texteditorpreview) {

  /*
   * Load style.css
   */

  var textpreviewcss = document.createElement('link');
  textpreviewcss.rel = 'stylesheet';
  textpreviewcss.href = texteditor.dataset.texteditorUrl + '/style.css';
  document.head.appendChild(textpreviewcss);

  /*
   * Load showdown.js
   */

  var editconverter = null;
  var mdconverterscript = document.createElement('script');
  mdconverterscript.type = 'text/javascript';
  mdconverterscript.src = 'https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js';
  document.body.appendChild(mdconverterscript);
  mdconverterscript.onload = function() {
    editconverter = new showdown.Converter({
      noHeaderId: true,
      tables: true
    });
  };

  /*
   * Load jszip.js
   */

  var editzip = null;
  var jszipscript = document.createElement('script');
  jszipscript.type = 'text/javascript';
  jszipscript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.3.0/jszip.min.js';
  document.body.appendChild(jszipscript);

  /*
   * Load syntax highlight
   */

  // xcode.css
  var textpreviewhighlightcss = document.createElement('link');
  textpreviewhighlightcss.rel = 'stylesheet';
  textpreviewhighlightcss.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/styles/xcode.min.css';
  document.head.appendChild(textpreviewhighlightcss);

  // highlight.js
  var highlightscript = document.createElement('script');
  highlightscript.type = 'text/javascript';
  highlightscript.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/highlight.min.js';
  document.body.appendChild(highlightscript);

  /*
   * Load recaptcha api.js
   */

  var editAllowRecaptcha = (typeof texteditor.dataset.recaptchaKey != 'undefined' && null !== texteditor.dataset.recaptchaKey && texteditor.dataset.recaptchaKey ? true : false);
  if (editAllowRecaptcha && (typeof grecaptcha == 'undefined' || null === grecaptcha)) {
    var recaptchascript = document.createElement('script');
    recaptchascript.type = 'text/javascript';
    recaptchascript.src = 'https://www.google.com/recaptcha/api.js';
    document.body.appendChild(recaptchascript);
  }

  /*
   * Load Katex (removed)
   */

  //// katex.css
  //var textpreviewkatexcss = document.createElement('link');
  //textpreviewkatexcss.rel = 'stylesheet';
  //textpreviewkatexcss.href = 'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css';
  //textpreviewkatexcss.integrity = 'sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq';
  //textpreviewkatexcss.crossOrigin = 'anonymous';
  //document.head.appendChild(textpreviewkatexcss);

  //// katex.js
  //var katexscript = document.createElement('script');
  //katexscript.type = 'text/javascript';
  //katexscript.src = 'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js';
  //katexscript.integrity = 'sha384-y23I5Q6l+B6vatafAwxRu/0oK/79VlbSz7Q9aiSZUvyWYIYsd+qj+o24G5ZU2zJz';
  //katexscript.crossOrigin = 'anonymous';
  //document.body.appendChild(katexscript);
  //katexscript.onload = function() {
  //  // mhchem.js
  //  var mhchemscript = document.createElement('script');
  //  mhchemscript.type = 'text/javascript';
  //  mhchemscript.src = 'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/mhchem.min.js';
  //  mhchemscript.integrity = 'sha384-oa0lfxCGjaU1LdYckhq8LZcP+JTf8cyJXe69O6VE6UrShzWveT6KiCElJrck/stm';
  //  mhchemscript.crossOrigin = 'anonymous';
  //  document.body.appendChild(mhchemscript);
  //  mhchemscript.onload = function() {
  //    // auto-render.js
  //    var katexautorenderscript = document.createElement('script');
  //    katexautorenderscript.type = 'text/javascript';
  //    katexautorenderscript.src = 'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/auto-render.min.js';
  //    katexautorenderscript.integrity = 'sha384-kWPLUVMOks5AQFrykwIup5lo0m3iMkkHrD0uJ4H5cjeGihAutqP0yW0J6dpFiVkI';
  //    katexautorenderscript.crossOrigin = 'anonymous';
  //    document.body.appendChild(katexautorenderscript);
  //  };
  //};

  //// webfontloader.js
  //window.WebFontConfig = {
  //  custom: {
  //    families: ['KaTeX_AMS', 'KaTeX_Caligraphic:n4,n7', 'KaTeX_Fraktur:n4,n7',
  //      'KaTeX_Main:n4,n7,i4,i7', 'KaTeX_Math:i4,i7', 'KaTeX_Script',
  //      'KaTeX_SansSerif:n4,n7,i4', 'KaTeX_Size1', 'KaTeX_Size2', 'KaTeX_Size3',
  //      'KaTeX_Size4', 'KaTeX_Typewriter'],
  //  },
  //};

  //var katexfontscript = document.createElement('script');
  //katexfontscript.type = 'text/javascript';
  //katexfontscript.src = 'https://cdn.jsdelivr.net/npm/webfontloader@1.6.28/webfontloader.js';
  //katexfontscript.integrity = 'sha256-4O4pS1SH31ZqrSO2A/2QJTVjTPqVe+jnYgOWUVr7EEc=';
  //katexfontscript.crossOrigin = 'anonymous';
  //document.body.appendChild(katexfontscript);

  /*
   * Load MathJax
   */

  var polyfillscript = document.createElement('script');
  polyfillscript.type = 'text/javascript';
  polyfillscript.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
  polyfillscript.crossOrigin = 'anonymous';
  document.body.appendChild(polyfillscript);
  MathJax = {
    loader: {
      load: ['[tex]/autoload']
    },
    tex: {
      packages: {
        '[+]': ['autoload']
      },
      inlineMath: [['\\(', '\\)']]
    },
    svg: {
      fontCache: 'global'
    },
    chtml: {
      scale: 1.1,
      minScale: .5,
      mtextFont: '',
      unknownFamily: 'serif',
      mathmlSpacing: false,
      exFactor: .5
    }
  };
  var mathjaxscript = document.createElement('script');
  mathjaxscript.type = 'text/javascript';
  mathjaxscript.id = 'MathJax-script';
  mathjaxscript.async = true;
  mathjaxscript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml-full.js';
  mathjaxscript.crossOrigin = 'anonymous';
  document.body.appendChild(mathjaxscript);

  /*
   * Load texteditor.html
   */

  var texteditorxhr = new XMLHttpRequest();
  texteditorxhr.open("GET", texteditor.dataset.texteditorUrl + '/texteditor.html', true);
  texteditorxhr.onreadystatechange = function() {
    if (texteditorxhr.readyState == 4) {
      if (texteditorxhr.status == 200) {

        texteditor.innerHTML = texteditorxhr.responseText;

        // Load edit.js
        var texteditorscript = document.createElement('script');
        texteditorscript.type = 'text/javascript';
        texteditorscript.src = texteditor.dataset.texteditorUrl + '/edit.js';
        document.body.appendChild(texteditorscript);

      }
    }
  }
  texteditorxhr.send();

  /*
   * Load textpreview.html
   */

  var textpreviewxhr = new XMLHttpRequest();
  textpreviewxhr.open("GET", texteditor.dataset.texteditorUrl + '/textpreview.html', true);
  textpreviewxhr.onreadystatechange = function() {
    if (textpreviewxhr.readyState == 4) {
      if (textpreviewxhr.status == 200) {
        texteditorpreview.innerHTML = textpreviewxhr.responseText;
      }
    }
  }
  textpreviewxhr.send();

}
