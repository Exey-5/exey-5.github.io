<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>¡Gracias!</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700&amp;subset=cyrillic" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <link rel="apple-touch-icon" sizes="57x57" href="img/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="img/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="img/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="img/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="img/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="img/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="img/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="img/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="img/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="img/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="img/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="img/favicon-16x16.png">
    <link rel="manifest" href="img/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="img/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
</head>
<!-- Facebook Pixel Code -->
<!-- <script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '509715339623543');
  fbq('track', 'PageView');
  fbq('track', 'Lead');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=509715339623543&ev=PageView&noscript=1"
/></noscript> -->
<!-- End Facebook Pixel Code -->
<body>
<div class="wrap">
    <header class="header">
        <div class="header__left">
            <div class="header__title">
                ¡Gracias!
            </div>
            <div class="header__description">
                <h3>Por favor, no apague su teléfono de contacto.</h3>
                ¡Su pedido está registrado y nuestros empleados ya han emepzado a realizarlo! En el tiempo más cercano el administrador se comunica con Usted para precisar los detalles.
            </div>
        </div>
        <div class="header__right">
            <div class="header__info">
                <div class="header__info-title">
                    Información sobre el pedido:
                </div>
                <div class="header__info-order">
                    <?= $order ?>                    </div>
                <div class="header__info-phone">
                    <?= $phone ?>                    </div>
                <div class="header__info-name">
                    <?= $name ?>                    </div>
            </div>
        </div>
    </header>
    <main class="main-content">
        <h1 class="main-content__title">
            ¿CÓMO OBTENER EL MÁXIMO RESULTADO DE SU COMPRA? </h1>
        <div class="main-content__description">
            ¡Obtenga una instrucción detallada, conozca como utilizar su compra con un 100% de eficacia!
        </div>
        <div class="form-block">
            <div class="form-block__left">
                <div class="form-block__left-info">
                    ¡Confirme su e-mail durante 2 horas para obtener una instrucción detallada de uso de nuestros productos, para lograr mejores resultados!
                </div>
                <div class="form-block__left-discount">
                    ¡Además, le regalaremos un descuento constante de 75% para todas las compras! ¡Siga nuestras promociones!
                </div>
            </div>
            <div class="form-block__right">
                <div class="form-wrap">
                    <div class="form-wrap__title">
                        ¡Deje su e-mail y le enviaremos una instrucción detallada de uso de nuestros productos!
                    </div>
                    <form action="#" class="main-form" method="POST">
                        <input type="email" name="email" class="main-form__email" placeholder="¡Deje su e-mail…"
                               required="">
                        <button type="submit" class="main-form__button">Recibir la instrucción</button>
                    </form>
                </div>
            </div>
        </div>
    </main>
    <footer class="footer">
        <div class="footer__text">
            No revelamos sus datos personales y no transferimos la información que Usted deja a terceros. Al hacer clic en el botón, Usted acepta recibir noticias sobre promociones, descuentos y actualizaciones.
        </div>
    </footer>
</div>
<script src="js/jquery-2.2.4.min.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $("form.main-form").on("submit", function () {
            $.post(
                "https://system.trackerlead.biz/user/subscribe",
                {feedback_email: $("input.main-form__email").val(), orderid: "<?= $order ?>"}
            );
            $(this).fadeOut("fast", function () {
                $(this).parent().append("<p style='font-size: 1.2em; line-height: 2em; text-align: center;'>¡Gracias!</p>");
            });
            return false;
        });
    });
</script>
</body>
</html>