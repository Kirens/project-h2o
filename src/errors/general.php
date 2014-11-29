<?php

switch($_SERVER["REDIRECT_STATUS"]){
    case 400:
        $title = "400 Bad Request";
        $description = "The request can not be processed due to bad syntax";
    break;

    case 401:
        $title = "401 Unauthorized";
        $description = "The request has failed authentication";
    break;

    case 403:
        $title = "403 Forbidden";
        $description = "The server refuses to response to the request";
    break;

    case 404:
        $title = "404 Not Found";
        $description = "The resource requested can not be found.";
    break;

    case 500:
        $title = "500 Internal Server Error";
        $description = "There was an error which doesn't fit any other error message";
    break;

    case 502:
        $title = "502 Bad Gateway";
        $description = "The server was acting as a proxy and received a bad request.";
    break;

    case 504:
        $title = "504 Gateway Timeout";
        $description = "The server was acting as a proxy and the request timed out.";
    break;
}
//header("HTTP/1.0".$title." ".$description);
?>
<!DOCTYPE html>
<!--[if lt IE 8 ]><html class="no-js ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="no-js ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 8)|!(IE)]><!--><html class="no-js" lang="sv" xml:lang="sv"> <!--<![endif]-->
<head>

   <!--- Basic Page Needs
   ================================================== -->
   <meta charset="utf-8">
    <title>404 | Project-H2O</title>
    <meta name="description" content="">
    <meta name="author" content="">

   <!-- Mobile Specific Metas
   ================================================== -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <!-- CSS
    ================================================== -->
   <link rel="stylesheet" href="/css/default.css">
    <link rel="stylesheet" href="/css/layout.css">
   <link rel="stylesheet" href="/css/media-queries.css">

   <!-- Script
   ================================================== -->
    <script src="/js/modernizr.js"></script>

   <!-- Favicons
    ================================================== -->
    <link rel="shortcut icon" href="/favicon.ico" >

</head>

<body>

   <!-- Header
    ================================================== -->
    <header>
        <div class="row">
            <div class="twelve columns">
                <div class="logo">
                    <a href="/"><img alt="Logga" src="/res/logo.png"></a>
                </div>

                <nav id="nav-wrap">
                    <a class="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
                    <a class="mobile-btn" href="#" title="Hide navigation">Hide navigation</a>
                    <ul id="nav" class="nav">
                        <li><a href="/">Hem.</a></li>
                        <li>
                            <a >Projektet.</a>
                            <ul>
                                <li><a href="/projektet#bostader">Bostader</a></li>
                                <li><a href="/projektet#naturen">Naturen</a></li>
                                <li><a href="/projektet#offentligt">Offentligt</a></li>
                                <li><a href="/projektet#detaljer">Detaljer</a></li>
                            </ul>
                        </li>
                        <li><a href="/omoss">Om oss.</a></li>
                        <li><a href="/kontakt">Kontakt.</a></li>
                    </ul> <!-- end #nav -->
                </nav> <!-- end #nav-wrap -->
            </div>
        </div>
    </header>
    <!-- Header End -->

   <!-- Page Title
   ================================================== -->
   <div id="page-title">

      <div class="row">

         <div class="ten columns centered text-center">
            <h1><?php echo $title; ?><span>.</span></h1>

            <p>Vi kan inte hitta sidan du söker. Detta kan bero på ett stavfel i adressen. Om du vet vad du söker kan du säkert hitta det på <a href="projektet">projekt-sidan</a></p>
         </div>

      </div>

   </div> <!-- Page Title End-->

   <!-- footer
   ================================================== -->
   <footer>

      <div class="row">

         <div class="twelve columns">

            <ul class="footer-nav">
                <li><a href="/">Hem.</a></li>
                <li><a href="/projektet">Projektet.</a></li>
                <li><a href="/omoss">Om oss.</a></li>
                <li><a href="/kontakt">Kontakt.</a></li>
             </ul>

            <ul class="footer-social">
                <li><a href="https://twitter.com/H2O_sthlm"><i class="fa fa-twitter"></i></a></li>
                <li><a href="https://plus.google.com/112810321311413261003"><i class="fa fa-google-plus"></i></a></li>
                <li><a href="https://www.facebook.com/H2O.stockholm"><i class="fa fa-facebook"></i></a></li>
            </ul>

            <ul class="copyright">
               <li>Copyright &copy; 2014 Project-H2O</li>
               <li>Design by <a href="http://www.styleshout.com/">Styleshout</a></li>
            </ul>

         </div>

         <div id="go-top"><a title="Back to Top" href="#">Go To Top</a></div>

      </div>

   </footer>
   <!-- Footer End-->
</body>
</html>
