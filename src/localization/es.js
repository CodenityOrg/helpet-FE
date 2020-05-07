export default {
  home: {
    introMessage: `
      Encuentra a tu <span class="slogan__title--bold">mascota</span>
      <br>
      perdida o ayuda a una a encontrar su hogar
    `,
    sloganMessage: 'Porque las mascotas son los mejores amigos',
    startButton: 'Comienza',
    learnButton: 'Aprende como',
    howToMessage: 'Descubre como ayudar a las mascotas a regresar a su hogar!'
  },
  login: {
    sloganMessage: 'Inicia sesión y ayuda a una mascota a regresar a su hogar',
    fbLoginButton: 'Iniciar sesión con Facebook',
    emailText: 'O usa tu email',
    forgotPasswordText: 'Olvidaste tu contraseña?',
    placeholders: {
      email: 'Email',
      password: 'Password'
    },
    notAccountText: 'No tienes una cuenta ?',
    createAccountText: 'Crea una cuenta aquí',
    loginButton: 'Iniciar sesión',
    incorrectLogin: `Tu usuario o contraseña son incorrectos  <br> <b>   'Por favor inténtelo nuevamente'</b>`
  },
  register: {
    title: 'Registrate',
    fbButton: 'Registrate con Facebook',
    otherOptionText: 'o también con',
    placeholders: {
      name: 'Nombres',
      lastName: 'Apellidos',
      phone: 'Teléfono (Optional)',
      email: 'Email',
      password: 'Contraseña'
    },
  },
  profile: {
    title: 'Información personal',
    note: 'Nota: Es importante registrar tus datos para que las personas puedan contactarte rápidamente :)' ,
    inputs: {
      name: 'Nombres',
      lastname: 'Apellidos',
      email: 'Email',
      phone: 'Teléfono',
      facebook: 'Facebook'
    }
  },
  navigation: {
    button: {
      login: 'Iniciar sesión',
      register: 'Registrate',
      posts: 'Publicaciones',
      contact: 'Contacto',
      logout: 'Cerrar sesión'
    }
  },
  publications: {
    newPost: 'Nueva publcación',
    filterButton: 'Filtrar por...',
    orderButton: 'Ordenar por...',
    filters: {
      losts: 'Perdidos',
      found: 'Encontrados',
      recent: 'Mas recientes',
      old: 'Antiguos'
    },
    post: {
      descriptionLabel: 'Descripción',
      addressLabel: 'Ultimo lugar visto',
      characteristic: 'Caracteristicas',
      showMore: 'Mostrar mas',
      contactButton: 'Contactar'
    },
    mapAlert: 'Estamos ubicándote, espere un momento'
  },
  contact: {
    title: 'Enviar mensaje',
    message: 'Podrás ponerte en contacto con nosotros por cualquier duda',
    placeholders: {
      fullname: 'Nombre completo',
      email: 'Correo',
      message: 'Mensaje'
    },
    sendButton: 'Enviar',
    developedBy: 'Desarrollado por',
    errors: {
      fullname: '* Nombre requerido',
      message: '* Mensaje requerido',
      email: '* Ingrese un email válido'
    }
  },
  postRegister: {
    title: 'Información de la mascota',
    selectImage: 'Seleccionar imagen',
    placeholders: {
      title: 'Titulo',
      description: 'Descripción',
      address: 'Dirección',
    },
    options: {
      lost: 'Perdido',
      found: 'Encontrado'
    },
    acceptButton: 'Aceptar'
  },
  footer: {
    privacy: 'Privacidad y Términos de Uso',
    cookies: {
      message: 'Este sitio usa cookies para analizar tráfico y mejorar tu experiencia. ',
      infoButton: 'Más información'
    }
  },
  terms: {
    beforeContent:'Acepto los',
    afterContent:'Terminos de uso y condiciones',
    content:
      `<h1 class="text-center font-weight-bold">Política de Privacidad, Términos de Uso y Cookies</h1>
      <p>Podrás ponerte en contacto con nosotros por cualquier duda.</p>
      <p>El presente documento legal se entiende aceptado si navega por nuestro sitio web.</p>
      <h2 id="obj">Objetivo</h2>
      <p>El objetivo de Helpet es ayudar a encontrar tantas mascotas perdidas como sea posible y reunir
          mascotas encontradas con sus dueños.</p>
      <h2 id="terms">Términos y condiciones</h2>
      <p>Helpet no interviene ni tiene posesión de las mascotas publicadas por los usuarios, por ello no
          será responsable respecto de la existencia o legitimidad de las publicaciones de los usuarios.</p>
      <p>Cada Usuario conoce y acepta ser el exclusivo responsable por las publicaciones que realiza.</p>
      <p>Debido a que Helpet no tiene ninguna participación durante todo el tiempo en que se hace una
          publicación, ni en el posterior acuerdo entre las partes, no será responsable por el efectivo
              cumplimiento de las obligaciones asumidas por los Usuarios. El Usuario conoce y acepta que al
              realizar acuerdos con otros Usuarios o terceros lo hace bajo su propio riesgo.</p>
      <p>En ningún  caso Helpet será responsable por cualquier daño y/o perjuicio que haya podido sufrir
          el Usuario, debido a los acuerdos realizadas o no realizadas entre usuarios respecto a las mascotas
              publicados a través de Helpet.</p>
      <h2 id="priv">Sobre la política de privacidad</h2>
      <p>La presente Política de Privacidad establece los términos en que Helpet usa y protege la información que es proporcionada por sus usuarios al momento de utilizar su sitio web. Esta organización está comprometida con la seguridad de los datos de sus usuarios cumpliendo el Reglamento General de Protección de Datos (RGPD). Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado, lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento. Sin embargo esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y enfatizamos revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios.</p>
      <h3 id="info">Información que es recogida</h3>
      <p>Nuestro sitio web podrá recoger información personal por ejemplo: Nombre, información de contacto como por ejemplo su dirección de correo electrónico e información demográfica y geográfica, las fotos que suba de su mascota, etc.</p>
      <h4 id="use">Uso de la información recogida</h4>
      <p>Nuestro sitio web emplea la información con el fin de proporcionar el mejor servicio posible, particularmente para mantener un registro de usuarios, así como para mejorar nuestros servicios.</p>
      <p>Igualmente nos cede derechos sobre las imágenes enviadas para editarlas/publicarlas, al igual que con los textos de los anuncios. Si no quiere autorizar que podamos usar sus fotos/textos, no debe crear una publicación en nuestro sitio, es decir que no debe usar nuestro servicio para buscar a su mascota.</p>
      <p>Las publicaciones una vez creadas, serán borrados si la persona que los ha creado lo solicita (bien porque la mascota se ha encontrado o por cualquier otro motivo), usted es el responsable de solicitar que se borren las publicaciones si así lo desea y comprobar que se borraron, si no se solicita se mantendrán publicados para que todo el mundo pueda verlos y encontrarlos en el caso de que sea necesario en un futuro (quizás su mascota no aparezca pronto, pero más adelante sí, por ello conviene no borrar las publicaciones en un tiempo).</p>
      <p>Helpet no se responsabiliza por el uso indebido o abusivo del contenido de su base de datos y se reserva el derecho de suprimir aquellos contenidos que resulten inveraces, inexactos o no cumplan con los requisitos establecidos (no están autorizadas publicaciones de venta de animales, canjes, etc).</p>
      <p>Helpet está altamente comprometido para cumplir con el compromiso de mantener su información segura. Actualizamos nuestros sistemas para intentar asegurarnos de que no exista ningún acceso no autorizado.</p>
      <h3 id="cookies">Cookies</h3>
      <p>Una cookie se refiere a un fichero que es enviado con la finalidad de solicitar permiso para almacenarse en su ordenador, al aceptar dicho fichero se crea y la cookie sirve entonces para tener información respecto al tráfico web, y también facilita las futuras visitas a una web recurrente. Otra función que tienen las cookies es que con ellas las web pueden reconocerte individualmente y por tanto brindarte el mejor servicio personalizado de su web.</p>
      <p>Nuestro sitio web emplea las cookies para poder identificar las páginas con fines estadísticos y de una mejor prestación del servicio. Usted puede eliminar las cookies en cualquier momento desde su ordenador. Sin embargo las cookies ayudan a proporcionar un mejor servicio de los sitios web, estas no dan acceso a información de su ordenador ni de usted, a menos de que usted así lo quiera y la proporcione directamente. Usted puede aceptar o negar el uso de cookies, sin embargo la mayoría de navegadores aceptan cookies automáticamente pues sirve para tener un mejor servicio web. También usted puede cambiar la configuración de su ordenador para declinar las cookies. Si se declinan es posible que no pueda utilizar algunos de nuestros servicios (podrían dar error).</p>
      <h3 id="links">Enlaces a Terceros</h3>
      <p>Este sitio web pudiera contener enlaces a otros sitios que pudieran ser de su interés. Una vez que usted de clic en estos enlaces y abandone nuestra página, ya no tenemos control sobre al sitio al que es redirigido y por lo tanto no somos responsables de los términos o privacidad ni de la protección de sus datos en esos otros sitios terceros. Dichos sitios están sujetos a sus propias políticas de privacidad por lo cual es recomendable que los consulte para confirmar que usted está de acuerdo con estas.</p>
      <h3 id="your-info">Control de su información personal</h3>
      <p>En cualquier momento usted puede restringir la recopilación o el uso de la información personal que es proporcionada a nuestro sitio web, en cuyo caso suspenderemos el servicio</p>
      <p>Este sitio web no venderá, cederá ni distribuirá la información personal que es recopilada, salvo que sea requerido en un proceso de disputa como por ejemplo por un juez con un orden judicial.</p>
      <p>Helpet se reserva el derecho de cambiar los presentes términos en cualquier momento.</p>`
  }
};
