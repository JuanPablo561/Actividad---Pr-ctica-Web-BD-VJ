<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Página de perfil personal">
    <title>Mi Perfil - Mi Sitio Web</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Source+Serif+4:wght@600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: var(--ink-navy);">
        <div class="container">
            <a class="navbar-brand" href="index.html">Mi Sitio Web</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Abrir menú">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navMenu">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="index.html">Inicio</a></li>
                    <li class="nav-item"><a class="nav-link" href="tags.html">Etiquetas HTML</a></li>
                    <li class="nav-item"><a class="nav-link active" href="profile.html">Perfil</a></li>
                    <li class="nav-item"><a class="nav-link" href="form.html">Formulario</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <header class="page-header text-center">
        <div class="container">
            <h1>Mi Perfil</h1>
            <p id="intro-text" class="mb-0">Un poco sobre mí.</p>
        </div>
    </header>

    <main class="content-section">
        <div class="container">

            <div id="perfil-mensaje" class="alert d-none" role="alert"></div>

            <div class="row justify-content-center" id="perfil-contenido">
                <div class="col-md-8 col-lg-6 text-center">
                    <img src="https://placehold.co/200x200?text=Foto" alt="Foto de perfil">

                    <p>
                        <strong>Nombre:</strong> <span id="profile-name">Cargando...</span><br />
                        <strong>Correo:</strong> <span id="profile-email">Cargando...</span><br />
                        <strong>Miembro desde:</strong> <span id="profile-created">Cargando...</span><br />
                        <strong>Carrera:</strong> Ingeniería en Sistemas<br />
                        <strong>Ciudad:</strong> Monterrey, Nuevo León, México
                    </p>

                    <p class="highlight">
                        Estudiante de programación<sup>*</sup>, apasionado por el desarrollo web
                        y las nuevas tecnologías.<br />
                        <sub>*Carrera y ciudad son datos de ejemplo; nombre, correo y fecha
                        vienen de la REST-API.</sub>
                    </p>

                    <button id="btn-logout" class="btn btn-outline-secondary">Cerrar sesión</button>
                </div>
            </div>

            <section class="content-section alt-bg mt-4">
                <div class="container">
                    <h2>Sobre mí</h2>
                    <p>
                        Me gusta aprender cosas nuevas relacionadas con el desarrollo web,
                        especialmente <strong>HTML</strong>, <strong>CSS</strong> y <strong>JavaScript</strong>.
                        En un futuro me gustaría especializarme en desarrollo full-stack.
                    </p>
                </div>
            </section>

        </div>
    </main>

    <footer>
        <p class="mb-0">&copy; 2026 Mi Sitio Web de Práctica. Todos los derechos reservados.</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="config.js"></script>
    <script src="script.js"></script>
</body>
</html>