class App {
  static #deptos;
  static #localidades;
  static #urlDeptos = `https://raw.githubusercontent.com/proyecto26/colombia/refs/heads/master/departments.json`;
  static #urlCidades = `https://raw.githubusercontent.com/proyecto26/colombia/refs/heads/master/cities.json`;

  static async main() {
    App.#deptos = await App.fetchJSON(App.#urlDeptos);
    App.#localidades = await App.fetchJSON(App.#urlCidades);
    const LISTAOPCIONES = document.querySelectorAll("#main-menu a");
    LISTAOPCIONES.forEach((opcion) =>
      opcion.addEventListener("click", App.#mainMenu)
    );
    const LOGO = document.querySelector("#logo");
    LOGO.addEventListener("click", App.#Inicio);
  }

  static async fetchJSON(url) {
    try {
      const RESPONSE = await fetch(url);
      if (!RESPONSE.ok)
        throw new Error(`Problema en intentar recuperar los datos de ${url}`);
      return await RESPONSE.json();
    } catch (error) {
      console.error(`Al intentar recuperar los datos genero un: ${error}`);
    }
  }

  static #mainMenu = async (e) => {
    let opcion = "ninguna";
    if (e != undefined) {
      e.preventDefault();
      opcion = e.target.text;
      console.log(`Has seleccionado: ${opcion}`);
      switch (opcion) {
        case "Catalogo de Productos":
          await App.#loadPage("resources/html/inicio.html", "main");
          App.#loadImages();
          break;
        case "Comprar":
          await App.#loadPage("./resources/html/comprar.html", "main");

          break;
        case "Acerca de...":
          await App.#loadPage("./resources/html/acerca.html", "main");

          break;
        case "Contacto":
          await App.#loadPage("./resources/html/contacto.html", "main");
          App.#formularioContacto();
          break;
        default:
          console.log(`La opcion ${opcion} no fue implementada`);
          break;
      }
    }
  };

  static async #loadPage(url, contenedor = null) {
    try {
      const PAGINA = await fetch(url);
      if (!PAGINA.ok) throw new Error(`No fue possible acessar la url ${url}`);
      const HTML = await PAGINA.text();
      const ELEMENTO = document.querySelector(contenedor);
      if (!ELEMENTO)
        throw new Error(
          `El container no existe o esta mal definido ${contenedor}`
        );
      ELEMENTO.innerHTML = HTML;
    } catch (error) {
      console.error(error);
    }
  }

  static #formularioContacto() {
    let optionsDeptos = ``;
    App.#deptos.data.forEach((item) => {
      optionsDeptos += `<option value = ${item.id}>${item.name}</option>`;
    });

    const DEPTOS = document.querySelector("#select-departamentos");
    if (!DEPTOS) throw new Error("No fue possible selecionar elemento");

    DEPTOS.innerHTML = optionsDeptos;
    DEPTOS.addEventListener("change", (e) =>
      App.#selecionarLocalidades(e.target.value)
    );
    DEPTOS.dispatchEvent(new Event("change"));
  }

  static #filtrarDeptos(id) {
    return App.#localidades.data.filter((data) => data.departmentId == id);
  }

  static #selecionarLocalidades(depto) {
    try {
      const CIUDADES = App.#filtrarDeptos(depto);
      console.log(CIUDADES);

      let optionsLocalidades = ``;
      CIUDADES.forEach(
        (ciudad) =>
          (optionsLocalidades += `<option value = ${ciudad.id}>${ciudad.name}</option>`)
      );
      const LOCALIDADES = document.querySelector("#select-localidad");
      LOCALIDADES.innerHTML = optionsLocalidades;
    } catch {
      console.error("Error al seleccionar las localidades");
    }
  }

  static #Inicio = async (e) => {
    e.preventDefault();
    await App.#loadPage("resources/html/inicio.html", "main");
    App.#loadImages();
  };

  static #loadImages() {
    let img = ``;
    for (let i = 1; i <= 14; i++) {
      img += `
    <li>
    <div class="img-card iCard-style3">
      <div class="card-content">
        <div class="card-image">
          <span class="card-title">Comida</span>
          <img
            src="imgs/productos/img${i}.jpg"
          />
        </div>

        <div class="card-text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis temporibus omnis similique eveniet vel dolores? Rerum deleniti cum odio. Blanditiis qui architecto impedit delectus officia esse maxime et ducimus id!
          </p>
        </div>
      </div>

      <div class="card-link">
        <a href="#" title="Read Full">
          <span>Agregar al Carrito</span>
        </a>
      </div>
    </div>
  </li>`;
    }

    for (let i = 1; i <= 6; i++) {
      img += `
    <li>
    <div class="img-card iCard-style3">
      <div class="card-content">
        <div class="card-image">
          <span class="card-title">Comida</span>
          <img
            src="imgs/productos/imgJpeg${i}.jpeg"
          />
        </div>

        <div class="card-text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis temporibus omnis similique eveniet vel dolores? Rerum deleniti cum odio. Blanditiis qui architecto impedit delectus officia esse maxime et ducimus id!
          </p>
        </div>
      </div>

      <div class="card-link">
        <a href="#" title="Read Full">
          <span>Agregar al Carrito</span>
        </a>
      </div>
    </div>
  </li>`;
    }
    const UL = document.querySelector("#lista-imagenes");
    UL.innerHTML = img;
  }
}

App.main();
