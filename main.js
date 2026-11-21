// ==========================================
// CONEXIÓN CON SUPABASE
// ==========================================

const SUPABASE_URL = "https://ujtqakxxtdbdvtqgcwzo.supabase.co";
const SUPABASE_KEY = "sb_publishable_IYzL2vwSNHHX-KTs-eghtQ_YeRV5yiK"
const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase conectado correctamente");

// ==========================================
// MOODBOARD JOURNAL - JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. ELEMENTOS PRINCIPALES
    // ==========================================

    const searchInput = document.getElementById('searchInput');

    const musicContainer = document.getElementById('musicContainer');
    const outfitsContainer = document.getElementById('outfitsContainer');
    const animeContainer = document.getElementById('animeContainer');
    const albumsContainer = document.getElementById('albumsContainer');

    const musicSection = document.getElementById('canciones');
    const outfitsSection = document.getElementById('outfitsModa');
    const animeGallery = document.getElementById('animeGallery');
    const albumsGallery = document.getElementById('albumsGallery');

    const favoritesContainer =
        document.getElementById('favoritesContainer');

    // Función para obtener SIEMPRE todas las tarjetas actuales.
    function obtenerTarjetas() {
        return document.querySelectorAll('.content-card');
    }

    // ==========================================
    // 2. DATOS DE LAS GALERÍAS
    // ==========================================

    const canciones = [
        { nombre: 'No Blueberries', artista: 'DPR IAN' },
        { nombre: 'So I Danced', artista: 'DPR IAN' },
        { nombre: 'The Show', artista: 'DPR IAN' },
        { nombre: 'Nerves', artista: 'DPR IAN' },
        { nombre: 'TALKING', artista: 'North West' },
        { nombre: 'LEGACY', artista: 'North West' },
        { nombre: 'D!e', artista: 'North West' },
        { nombre: 'PIERCING ON MY HAND', artista: 'North West' },
        { nombre: 'MALVIAJAR', artista: 'Turro Baby' },
        { nombre: 'Emotes', artista: 'Turro Baby' },
        { nombre: 'Lovebombing', artista: 'Turro Baby' },
        { nombre: 'Wacha Flequilluda', artista: 'Turro Baby' },
        { nombre: 'Morocha', artista: 'Turro Baby' },
        { nombre: 'Rojo Profundo', artista: 'Dillom' },
        { nombre: 'OPA', artista: 'Dillom' },
        { nombre: 'Minas', artista: 'Dillom' },
        { nombre: 'LA PRIMERA', artista: 'Dillom' },
        { nombre: 'MINIMI', artista: 'Dillom' },
        { nombre: 'Cirugía', artista: 'Dillom' },
        { nombre: 'Elephant2', artista: 'Rojuu' },
        { nombre: 'Twilight', artista: 'Rojuu' },
        { nombre: 'Lucky', artista: 'Rojuu' },
        { nombre: 'melasuda - Bonus Track', artista: 'Rojuu' },
        { nombre: 'Dame brillo', artista: 'Rojuu' },
        { nombre: 'Umi', artista: 'Rojuu' },
        { nombre: 'IIIegal', artista: 'PinkPantheress' },
        { nombre: 'Pain', artista: 'PinkPantheress' },
        { nombre: 'My Love Mine All Mine', artista: 'Mitski' },
        { nombre: 'Washing Machine Heart', artista: 'Mitski' },
        { nombre: 'CHIHIRO', artista: 'Billie Eilish' }
    ];

    const animes = [
        'Ganbare! Nakamura-kun!!',
        'Lovely Complex',
        'Ponyo',
        'Your Name',
        'A Silent Voice',
        'The Fragrant Flower Blooms with Dignity',
        'NaNa',
        'The Promised Neverland',
        'Naruto',
        'La vida desastrosa de Saiki K.',
        'Frieren',
        'Haikyu!!',
        'Kimi ni Todoke',
        'You and I Are Polar Opposites',
        'JoJo no Kimyō na Bōken',
        'MASHLE MAGIC AND MUSCLES',
        'Los diarios de la boticaria',
        'Mi Vecino Totoro',
        'My Dress-Up Darling',
        'Attack On Titan',
        'Hunter X Hunter',
        'Chainsaw Man',
        'DanDaDan',
        'My Hero Academia',
        'Death Note'
    ];

    const albumes = [
        { nombre: 'Twilight', artista: 'bôa', archivo: 'Twilight - bôa.jpg' },
        { nombre: 'DEMON DAYS', artista: 'Gorillaz', archivo: 'DEMON DAYS - Gorillaz.jpg' },
        { nombre: '神様はじめました／神様お願い', artista: 'Hanae', archivo: '神様はじめました／神様お願い - Hanae.jpg' },
        { nombre: 'From Tokyo With Love', artista: 'ATARASHII GAKKO!', archivo: 'From Tokyo With Love - ATARASHII GAKKO!.jpg' },
        { nombre: 'Abbey Road', artista: 'The Beatles', archivo: 'Abbey Road - The Beatles.jpg' },
        { nombre: 'Use Your IIIusion I', artista: "Guns N' Rose", archivo: "Use Your IIIusion I - Guns N' Rose.jpg" },
        { nombre: 'BABYMETAL', artista: 'BABYMETAL', archivo: 'BABYMETAL - BABYMETAL.jpg' },
        { nombre: 'deathmetal', artista: 'Pachiko', archivo: 'deathmetal - Pachiko.jpg' },
        { nombre: 'Mutter', artista: 'Rammstein', archivo: 'Mutter - Rammstein.jpg' },
        { nombre: 'Master Of Puppets', artista: 'METALLICA', archivo: 'Master Of Puppets - METALLICA.jpg' },
        { nombre: 'Fear Of The Dark', artista: 'Iron Maiden', archivo: 'Fear Of The Dark - Iron Maiden.jpg' },
        { nombre: 'Significant other', artista: 'Limp Bizkit', archivo: 'Significant other - Limp Bizkit.jpg' },
        { nombre: 'Rust In Peace', artista: 'Megadeth', archivo: 'Rust In Peace - Megadeth.jpg' },
        { nombre: 'Issues', artista: 'Korn', archivo: 'Issues - Korn.jpg' },
        { nombre: 'Razorblade Romance', artista: 'HIM', archivo: 'Razorblade Romance - HIM.jpg' },
        { nombre: 'Fallen', artista: 'Evanescence', archivo: 'Fallen - Evanescence.jpg' },
        { nombre: 'The Bends', artista: 'Radiohead', archivo: 'The Bends - Radiohead.jpg' }
    ];

    // ==========================================
    // 3. FUNCIONES AUXILIARES
    // ==========================================

    function abrirGaleria(galeria) {
        if (!galeria) return;

        galeria.style.display = 'block';

        galeria.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    function abrirYouTube(busqueda) {
        const texto = encodeURIComponent(busqueda);

        window.open(
            `https://www.youtube.com/results?search_query=${texto}`,
            '_blank',
            'noopener,noreferrer'
        );
    }

    function crearTarjeta({
        id,
        categoria,
        nombre,
        descripcion,
        imagen,
        alHacerClick
    }) {
        const card = document.createElement('article');

        card.className = 'content-card';
        card.dataset.category = categoria;
        card.dataset.id = id;

        card.innerHTML = `
            <div class="card-img">
                <img src="${imagen}" alt="${nombre}" loading="lazy">
            </div>

            <div class="card-info">
                <span class="card-category">${categoria.toUpperCase()}</span>
                <h3></h3>
                <p></p>
            </div>
        `;

        // Usar textContent evita interpretar los nombres como HTML.
        card.querySelector('h3').textContent = nombre;
        card.querySelector('p').textContent = descripcion;

        if (typeof alHacerClick === 'function') {
            card.addEventListener('click', alHacerClick);
        }

        return card;
    }

    // ==========================================
    // 4. GALERÍA DE MODA
    // ==========================================

    if (outfitsContainer) {
        for (let i = 1; i <= 33; i++) {
            const outfitCard = crearTarjeta({
                id: `outfit-${i}`,
                categoria: 'moda',
                nombre: `Outfit ${i}`,
                descripcion: 'Inspiración de moda para tu moodboard.',
                imagen: `Moda/Outfit${i}.0.jpg`
            });

            outfitsContainer.appendChild(outfitCard);
        }
    }

    const modaCard = document.getElementById('modaCard');

    if (modaCard) {
        modaCard.addEventListener('click', () => {
            abrirGaleria(outfitsSection);
        });
    }

    // ==========================================
    // 5. GALERÍA DE MÚSICA
    // ==========================================

    if (musicContainer) {
        canciones.forEach((cancion, index) => {
            const musicCard = crearTarjeta({
                id: `cancion-${index + 1}`,
                categoria: 'musica',
                nombre: cancion.nombre,
                descripcion: cancion.artista,
                imagen: `musica/${cancion.nombre}.jpg`,
                alHacerClick: () => {
                    abrirYouTube(
                        `${cancion.nombre} ${cancion.artista}`
                    );
                }
            });

            musicContainer.appendChild(musicCard);
        });
    }

    const musicaCard = document.getElementById('musicaCard');

    if (musicaCard) {
        musicaCard.addEventListener('click', () => {
            abrirGaleria(musicSection);
        });
    }

    // ==========================================
    // 6. GALERÍA DE ANIME
    // ==========================================

    if (animeContainer) {
        animes.forEach((anime, index) => {
            const animeCard = crearTarjeta({
                id: `anime-${index + 1}`,
                categoria: 'anime',
                nombre: anime,
                descripcion: 'Una historia para descubrir.',
                imagen: `Anime/${anime}.jpg`
            });

            animeContainer.appendChild(animeCard);
        });
    }

    const animeCard = document.getElementById('animeCard');

    if (animeCard) {
        animeCard.addEventListener('click', () => {
            abrirGaleria(animeGallery);
        });
    }

    // ==========================================
    // 7. GALERÍA DE ÁLBUMES
    // ==========================================

    if (albumsContainer) {
        albumes.forEach((album, index) => {
            const albumCard = crearTarjeta({
                id: `album-${index + 1}`,
                categoria: 'albumes',
                nombre: album.nombre,
                descripcion: album.artista,
                imagen: `Albumes/${album.archivo}`,
                alHacerClick: () => {
                    abrirYouTube(
                        `${album.nombre} ${album.artista} album`
                    );
                }
            });

            albumsContainer.appendChild(albumCard);
        });
    }

    const albumMainCard = document.getElementById('albumCard');

    if (albumMainCard) {
        albumMainCard.addEventListener('click', () => {
            abrirGaleria(albumsGallery);
        });
    }

    // ==========================================
    // 8. FAVORITOS
    // ==========================================

    let favorites = [];

    try {
        favorites = JSON.parse(
            localStorage.getItem('moodboardFavorites')
        ) || [];

        if (!Array.isArray(favorites)) {
            favorites = [];
        }
    } catch (error) {
        favorites = [];
    }

    function guardarFavoritos() {
        localStorage.setItem(
            'moodboardFavorites',
            JSON.stringify(favorites)
        );
    }

    function mostrarFavoritos() {
        if (!favoritesContainer) return;

        favoritesContainer.innerHTML = '';

        if (favorites.length === 0) {
            favoritesContainer.innerHTML = `
                <p class="empty-message">
                    Todavía no agregaste favoritos.
                </p>
            `;
            return;
        }

        const favoriteGrid = document.createElement('div');
        favoriteGrid.className = 'content-grid';

        obtenerTarjetas().forEach(card => {
            const cardId = card.dataset.id;

            if (favorites.includes(cardId)) {
                const copia = card.cloneNode(true);

                const favoriteButton =
                    copia.querySelector('.favorite-button');

                if (favoriteButton) {
                    favoriteButton.remove();
                }

                favoriteGrid.appendChild(copia);
            }
        });

        favoritesContainer.appendChild(favoriteGrid);
    }

    function prepararBotonesFavoritos() {
        obtenerTarjetas().forEach((card, index) => {

            // Dar un ID a las tarjetas que no tengan uno.
            if (!card.dataset.id) {
                card.dataset.id = `tarjeta-${index + 1}`;
            }

            // Evitar botones duplicados.
            if (card.querySelector('.favorite-button')) {
                return;
            }

            const favoriteButton =
                document.createElement('button');

            favoriteButton.className = 'favorite-button';
            favoriteButton.type = 'button';
            favoriteButton.setAttribute(
                'aria-label',
                'Agregar a favoritos'
            );

            const cardId = card.dataset.id;

            if (favorites.includes(cardId)) {
                favoriteButton.classList.add('favorite-active');
                favoriteButton.textContent = '♥';
            } else {
                favoriteButton.textContent = '♡';
            }

            card.appendChild(favoriteButton);

            favoriteButton.addEventListener('click', event => {
                event.stopPropagation();

                if (favorites.includes(cardId)) {
                    favorites = favorites.filter(
                        id => id !== cardId
                    );

                    favoriteButton.classList.remove(
                        'favorite-active'
                    );

                    favoriteButton.textContent = '♡';

                } else {
                    favorites.push(cardId);

                    favoriteButton.classList.add(
                        'favorite-active'
                    );

                    favoriteButton.textContent = '♥';
                }

                guardarFavoritos();
                mostrarFavoritos();
            });
        });
    }

    // Preparar favoritos DESPUÉS de crear las galerías.
    prepararBotonesFavoritos();
    mostrarFavoritos();

    // ==========================================
    // 9. BUSCADOR
    // ==========================================

    if (searchInput) {
        searchInput.addEventListener('input', function () {

            const searchText = this.value
                .toLowerCase()
                .trim();

            const galleries = [
                musicSection,
                outfitsSection,
                animeGallery,
                albumsGallery
            ].filter(Boolean);

            // Si el buscador está vacío, restaurar las tarjetas.
            if (!searchText) {
                obtenerTarjetas().forEach(card => {
                    card.style.display = '';
                });

                galleries.forEach(gallery => {
                    gallery.style.display = 'none';
                });

                return;
            }

            const resultadosPorGaleria = new Map();

            galleries.forEach(gallery => {
                resultadosPorGaleria.set(gallery, 0);
            });

            obtenerTarjetas().forEach(card => {
                const texto = card.textContent.toLowerCase();

                const coincide = texto.includes(searchText);

                card.style.display = coincide ? '' : 'none';

                if (coincide) {
                    const gallery = card.closest(
                        '#canciones, #outfitsModa, #animeGallery, #albumsGallery'
                    );

                    if (gallery && resultadosPorGaleria.has(gallery)) {
                        resultadosPorGaleria.set(
                            gallery,
                            resultadosPorGaleria.get(gallery) + 1
                        );
                    }
                }
            });

            // Mostrar solamente las galerías con resultados.
            resultadosPorGaleria.forEach((cantidad, gallery) => {
                gallery.style.display =
                    cantidad > 0 ? 'block' : 'none';
            });
        });
    }

    // ==========================================
    // 10. FILTROS DE CATEGORÍAS
    // ==========================================

    function filtrarCategoria(categoria) {
        if (!categoria) return;

        if (searchInput) {
            searchInput.value = '';
        }

        const galleries = [
            musicSection,
            outfitsSection,
            animeGallery,
            albumsGallery
        ].filter(Boolean);

        galleries.forEach(gallery => {
            gallery.style.display = 'none';
        });

        obtenerTarjetas().forEach(card => {
            card.style.display =
                card.dataset.category === categoria ? '' : 'none';
        });

        const secciones = {
            musica: musicSection,
            moda: outfitsSection,
            anime: animeGallery,
            albumes: albumsGallery
        };

        const seccion = secciones[categoria];

        if (seccion) {
            seccion.style.display = 'block';

            seccion.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            const contentSection =
                document.querySelector('.content-section');

            if (contentSection) {
                contentSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    }

    document.querySelectorAll('.category-card').forEach(button => {
        button.addEventListener('click', function () {
            filtrarCategoria(this.dataset.category);
        });
    });

    // ==========================================
    // 11. CATEGORÍAS DEL SIDEBAR
    // ==========================================

    document.querySelectorAll('.btn-category').forEach(button => {

        button.addEventListener('click', function () {

            const categoryName = this.textContent
                .trim()
                .toLowerCase();

            let categoria = '';

            if (categoryName.includes('música')) {
                categoria = 'musica';
            } else if (categoryName.includes('moda')) {
                categoria = 'moda';
            } else if (categoryName.includes('anime')) {
                categoria = 'anime';
            } else if (
                categoryName.includes('álbumes') ||
                categoryName.includes('albumes')
            ) {
                categoria = 'albumes';
            }

            filtrarCategoria(categoria);
        });

    });

    // ==========================================
    // 12. BOTÓN MIS FAVORITOS
    // ==========================================

    const favoritesLink = document.querySelector(
        'a[href="#favoritos"]'
    );

    if (favoritesLink) {
        favoritesLink.addEventListener('click', () => {
            setTimeout(mostrarFavoritos, 100);
        });
    }

    // ==========================================
    // 13. TARJETAS CON ENLACES A YOUTUBE
    // ==========================================

    const nuevosSonidos =
        document.querySelector('.card-musica');

    if (nuevosSonidos) {
        nuevosSonidos.addEventListener('click', () => {
            abrirYouTube(
                'DPR IAN Rojuu Dillom PinkPantheress Mitski'
            );
        });
    }

    const playlistCreativa =
        document.querySelector('.playlist-creativa');

    if (playlistCreativa) {
        playlistCreativa.addEventListener('click', () => {
            window.open(
                'https://youtube.com/playlist?list=PLwcqypU6LzpqFRTyW3VVBxJBnyfc6zKTX',
                '_blank',
                'noopener,noreferrer'
            );
        });
    }

    const sonidosAlternativos =
        document.querySelector('.sonidos-alternativos');

    if (sonidosAlternativos) {
        sonidosAlternativos.addEventListener('click', () => {
            window.open(
                'https://youtube.com/playlist?list=RDs3a4OQR-10M&playnext=1',
                '_blank',
                'noopener,noreferrer'
            );
        });
    }

   // ==========================================
// 14. REGISTRO, INICIO DE SESIÓN Y MI PERFIL
// ==========================================

const btnPerfil = document.getElementById('btnPerfil');
const btnRegister = document.querySelector('.btn-register');

// REGISTRO
const registerModal = document.getElementById('registerModal');
const closeRegister = document.getElementById('closeRegister');
const registerForm = document.getElementById('registerForm');

// INICIO DE SESIÓN
const loginModal = document.getElementById('loginModal');
const closeLogin = document.getElementById('closeLogin');
const loginForm = document.getElementById('loginForm');
const goToRegister = document.getElementById('goToRegister');
const goToLogin = document.getElementById('goToLogin');

// PERFIL
const profileModal = document.getElementById('profileModal');
const closeProfile = document.getElementById('closeProfile');
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const logoutBtn = document.getElementById('logoutBtn');


// ==========================================
// MOSTRAR PERFIL
// ==========================================

function mostrarPerfil(usuario) {

    if (!usuario) return;

    if (profileName) {
        profileName.textContent =
            usuario.user_metadata?.nombre || 'Usuario';
    }

    if (profileEmail) {
        profileEmail.textContent =
            usuario.email || '';
    }
}


// ==========================================
// COMPROBAR SESIÓN
// ==========================================

async function comprobarSesion() {

    try {

        const { data, error } =
            await supabaseClient.auth.getSession();

        if (error) {
            console.error(
                'Error al comprobar sesión:',
                error
            );
            return;
        }

        const usuario = data.session?.user;

        if (usuario) {
            mostrarPerfil(usuario);
        }

    } catch (error) {

        console.error(
            'Error de sesión:',
            error
        );

    }
}

comprobarSesion();


// ==========================================
// BOTÓN MI PERFIL
// ==========================================

if (btnPerfil) {

    btnPerfil.addEventListener('click', async () => {

        try {

            const { data, error } =
                await supabaseClient.auth.getSession();

            if (error) {
                alert('No se pudo comprobar la sesión.');
                console.error(error);
                return;
            }

            const usuario = data.session?.user;

            // SI YA INICIÓ SESIÓN
            if (usuario) {

                mostrarPerfil(usuario);

                if (profileModal) {
                    profileModal.style.display = 'flex';
                }

            }

            // SI NO INICIÓ SESIÓN
            else {

                if (loginModal) {
                    loginModal.style.display = 'flex';
                }

            }

        } catch (error) {

            console.error(error);

            alert(
                'Ocurrió un error al comprobar la sesión.'
            );

        }

    });

}


// ==========================================
// BOTÓN EXPLORAR / REGISTRARSE
// ==========================================

if (btnRegister) {

    btnRegister.addEventListener('click', () => {

        if (loginModal) {
            loginModal.style.display = 'none';
        }

        if (registerModal) {
            registerModal.style.display = 'flex';
        }

    });

}


// ==========================================
// REGISTRO
// ==========================================

if (registerForm) {

    registerForm.addEventListener(
        'submit',
        async event => {

            event.preventDefault();

            const nombre =
                document
                    .getElementById('registerName')
                    .value
                    .trim();

            const correo =
                document
                    .getElementById('registerEmail')
                    .value
                    .trim();

            const password =
                document
                    .getElementById('registerPassword')
                    .value;

            if (!nombre || !correo || !password) {

                alert(
                    'Completa todos los campos.'
                );

                return;
            }

            const boton =
                registerForm.querySelector(
                    'button[type="submit"]'
                );

            boton.disabled = true;
            boton.textContent =
                'Creando cuenta...';

            try {

                const { data, error } =
                    await supabaseClient.auth.signUp({

                        email: correo,

                        password: password,

                        options: {
                            data: {
                                nombre: nombre
                            }
                        }

                    });

                if (error) {
                    throw error;
                }

                if (data.session) {

                    mostrarPerfil(data.user);

                    registerModal.style.display =
                        'none';

                    if (profileModal) {
                        profileModal.style.display =
                            'flex';
                    }

                    alert(
                        `¡Bienvenido/a a Moodboard, ${nombre}!`
                    );

                } else {

                    registerModal.style.display =
                        'none';

                    alert(
                        '¡Cuenta creada! Revisa tu correo para confirmar el registro.'
                    );
                }

                registerForm.reset();

            } catch (error) {

                console.error(
                    'Error de registro:',
                    error
                );

                alert(
                    'No se pudo crear la cuenta: ' +
                    error.message
                );

            } finally {

                boton.disabled = false;
                boton.textContent =
                    'Registrarse';

            }

        }
    );

}


// ==========================================
// INICIAR SESIÓN
// ==========================================

if (loginForm) {

    loginForm.addEventListener(
        'submit',
        async event => {

            event.preventDefault();

            const correo =
                document
                    .getElementById('loginEmail')
                    .value
                    .trim();

            const password =
                document
                    .getElementById('loginPassword')
                    .value;

            if (!correo || !password) {

                alert(
                    'Completa todos los campos.'
                );

                return;
            }

            const boton =
                loginForm.querySelector(
                    'button[type="submit"]'
                );

            boton.disabled = true;
            boton.textContent =
                'Iniciando sesión...';

            try {

                const { data, error } =
                    await supabaseClient.auth
                        .signInWithPassword({

                            email: correo,

                            password: password

                        });

                if (error) {
                    throw error;
                }

                mostrarPerfil(data.user);

                loginModal.style.display =
                    'none';

                if (profileModal) {
                    profileModal.style.display =
                        'flex';
                }

                loginForm.reset();

                alert(
                    '¡Bienvenido/a a Moodboard Journal!'
                );

            } catch (error) {

                console.error(
                    'Error de inicio de sesión:',
                    error
                );

                alert(
                    'No se pudo iniciar sesión. Revisa tu correo y contraseña.'
                );

            } finally {

                boton.disabled = false;
                boton.textContent =
                    'Iniciar sesión';

            }

        }
    );

}


// ==========================================
// IR DE LOGIN A REGISTRO
// ==========================================

if (goToRegister) {

    goToRegister.addEventListener(
        'click',
        () => {

            if (loginModal) {
                loginModal.style.display =
                    'none';
            }

            if (registerModal) {
                registerModal.style.display =
                    'flex';
            }

        }
    );

}


// ==========================================
// IR DE REGISTRO A LOGIN
// ==========================================

if (goToLogin) {

    goToLogin.addEventListener(
        'click',
        () => {

            if (registerModal) {
                registerModal.style.display =
                    'none';
            }

            if (loginModal) {
                loginModal.style.display =
                    'flex';
            }

        }
    );

}


// ==========================================
// CERRAR REGISTRO
// ==========================================

if (closeRegister) {

    closeRegister.addEventListener(
        'click',
        () => {

            if (registerModal) {
                registerModal.style.display =
                    'none';
            }

        }
    );

}


// ==========================================
// CERRAR LOGIN
// ==========================================

if (closeLogin) {

    closeLogin.addEventListener(
        'click',
        () => {

            if (loginModal) {
                loginModal.style.display =
                    'none';
            }

        }
    );

}


// ==========================================
// CERRAR PERFIL
// ==========================================

if (closeProfile) {

    closeProfile.addEventListener(
        'click',
        () => {

            if (profileModal) {
                profileModal.style.display =
                    'none';
            }

        }
    );

}


// ==========================================
// CERRAR SESIÓN
// ==========================================

if (logoutBtn) {

    logoutBtn.addEventListener(
        'click',
        async () => {

            const { error } =
                await supabaseClient.auth.signOut();

            if (error) {

                alert(
                    'No se pudo cerrar la sesión.'
                );

                console.error(error);

                return;
            }

            if (profileModal) {
                profileModal.style.display =
                    'none';
            }

            alert(
                'Sesión cerrada correctamente.'
            );

        }
    );

}


// ==========================================
// CERRAR MODALES HACIENDO CLIC AFUERA
// ==========================================

if (registerModal) {

    registerModal.addEventListener(
        'click',
        event => {

            if (
                event.target ===
                registerModal
            ) {

                registerModal.style.display =
                    'none';

            }

        }
    );

}


if (loginModal) {

    loginModal.addEventListener(
        'click',
        event => {

            if (
                event.target ===
                loginModal
            ) {

                loginModal.style.display =
                    'none';

            }

        }
    );

}


if (profileModal) {

    profileModal.addEventListener(
        'click',
        event => {

            if (
                event.target ===
                profileModal
            ) {

                profileModal.style.display =
                    'none';

            }

        }
    );

}

  
    // CERRAR PERFIL
    if (closeProfile) {
        closeProfile.addEventListener('click', () => {
            profileModal.style.display = 'none';
        });
    }

    // CERRAR SESIÓN
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            const { error } =
                await supabaseClient.auth.signOut();

            if (error) {
                alert('No se pudo cerrar la sesión.');
                return;
            }

            if (profileModal) {
                profileModal.style.display = 'none';
            }

            alert('Sesión cerrada correctamente.');
        });
    }


    // ==========================================
    // 15. CERRAR MODALES AL HACER CLIC AFUERA
    // ==========================================

    if (registerModal) {
        registerModal.addEventListener('click', event => {
            if (event.target === registerModal) {
                registerModal.style.display = 'none';
            }
        });
    }

    if (profileModal) {
        profileModal.addEventListener('click', event => {
            if (event.target === profileModal) {
                profileModal.style.display = 'none';
            }
        });
    }
});

