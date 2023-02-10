const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const WsProvider = require("@bot-whatsapp/provider/baileys");
const DBAdapter = require("@bot-whatsapp/database/mock");

const emojis = [
  "⚠️",
  "🤔",
  "💰",
  "⚡",
  "⬆️",
  "📡",
  "🙋",
  "🧑‍💻",
  "📑",
  "🔒",
  "💰",
  "👥",
  "🔧",
  "🔌",
  "⛰️",
  "🌽",
  "🏝️",
  "🏢",
  "🙏",
  "📎",
  "💳",
  "📄",
  "🛎️",
  "🏠",
  "🟩",
  "🟨",
];

const flowAlamor = addKeyword(["🏢 Matriz Alamor"]).addAnswer([
  "🏢 La *dirección* de nuestra matriz en Alamor es calle Guayaquil y avenida Río Amazonas, frente a Comercial Macas.\n",
  "🤖 ¡TinkiBot te saluda desde aquí!\n",
  "📱 Te recordamos que el *teléfono celular* solamente recibe mensajes de WhatsApp:",
  "📞 Nuestro *teléfono convencional* es:",
  "072 680 288",
]);

const flowCelica = addKeyword(["⛰️ Celica"]).addAnswer([
  "🏠 La *dirección* de nuestra sucursal Celica es calles García Moreno y 10 de agosto, a pocos pasos de CNT.\n",
  "📱 Estaremos gustosos de atenderte si nos contactas al *teléfono celular*:",
  "096 899 5286\n",
  "💬 O directamente al *WhatsApp*",
  "wa.me/593968995286",
]);

const flowPindal = addKeyword(["🌽 Pindal"]).addAnswer([
  "🏠 La *dirección* de nuestra sucursal Pindal es calles Loja e Isidro Ayora, diagonal a Banco Codesarrollo.\n",
  "📱 Estaremos gustosos de atenderte si nos contactas al *teléfono celular*",
  "096 971 0361.\n",
  "💬 O directamente al *WhatsApp*",
  "wa.me/593969710361",
]);

const flowZapotillo = addKeyword(["🏝️ Zapotillo"]).addAnswer([
  "🏠 La *dirección* de nuestra sucursal Zapotillo es calles Sucre, entre 24 de mayo y 18 de noviembre, junto a la Fiscalía.\n",
  "📱 Estaremos gustosos de atenderte si nos contactas al *teléfono celular*",
  "096 936 2482.\n",
  "💬 O directamente al *WhatsApp*",
  "wa.me/593969362482",
]);

const flowSucursales = addKeyword(["🏠 Sucursales"]).addAnswer(
  "Estamos ubicados en las siguientes cabeceras cantonales:",
  {
    buttons: [
      { body: "⛰️ Celica" },
      { body: "🌽 Pindal" },
      { body: "🏝️ Zapotillo" },
    ],
  }
);

const flowLocalizacion = addKeyword(["🏢 Oficinas"]).addAnswer(
  "Tenemos nuestra oficina matriz en Alamor y tres sucursales en Celica, Pindal y Zapotillo.",
  {
    buttons: [{ body: "🏢 Matriz Alamor" }, { body: "🏠 Sucursales" }],
  }
);

const flowServicios = addKeyword(["🛎️ Servicios"]).addAnswer([
  "🔗 En el siguiente enlace podrás encontrar nuestro *catálogo de servicios*:",
  "https://wa.me/c/593989681810",
]);

const flowCuentaPichincha = addKeyword(["🟨 Banco Pichincha"])
  .addAnswer([
    "🟨 A continuación te compartimos los datos de nuestra cuenta bancaria del *Banco Pichincha*.",
  ])
  .addAnswer(
    [
      "📌 *Tipo de cuenta*: Ahorros",
      "🔢 *Número*: 3992698800",
      "👤 *Titular*: VICTOR DANIEL MACAS CALDERON",
      "📄 *Cédula*: 1103809701",
      "✉️ *E-mail*: danielm129@hotmail.com",
    ],
    { delay: 2000 }
  )
  .addAnswer(
    [
      "No olvides que luego de hacer el pago debes enviarnos la *foto del comprobante* por este chat, junto con los *nombres completos* del titular del servicio.\n",
      "🤝 Muchas gracias.",
    ],
    { delay: 4000 }
  );

const flowCuentaLoja = addKeyword(["🟩 Banco de Loja"])
  .addAnswer([
    "🟩 A continuación te compartimos los datos de nuestra cuenta bancaria del *Banco de Loja*.",
  ])
  .addAnswer(
    [
      "📌 *Tipo de cuenta*: Corriente",
      "🔢 *Número*: 2903035613",
      "👤 *Titular*: COMERCIALIZADORA MACAS CALDERON CONECTATE CIA LTDA",
      "📄 *RUC*: 0190460878001",
      "✉️ *E-mail*: conectatecialtda@gmail.com",
    ],
    { delay: 2000 }
  )
  .addAnswer(
    [
      "No olvides que luego de hacer el pago debes enviarnos la *foto del comprobante* por este chat, junto con los *nombres completos* del titular del servicio.\n",
      "🤝 Muchas gracias.",
    ],
    { delay: 4000 }
  );

const flowCuentasBancarias = addKeyword(["📄 Datos de las cuentas"]).addAnswer(
  ["Por favor, elige la entidad bancaria"],
  {
    buttons: [{ body: "🟩 Banco de Loja" }, { body: "🟨 Banco Pichincha" }],
  }
);

const flowMetodosDePago = addKeyword(["💳 Métodos de Pago"]).addAnswer(
  [
    "Para pagar por el servicio ofrecido por CONÉCTATE puedes hacerlo *en efectivo* en nuestras oficinas.\n",
    "También puedes realizar un *depósito* o *transferencia* a las cuentas en Banco de Loja o Banco Pichincha",
  ],
  {
    buttons: [{ body: "🏢 Oficinas" }, { body: "📄 Datos de las cuentas" }],
  }
);

const flowComprobante = addKeyword(["📎 Registrar comprobante"]).addAnswer([
  "📎 Por favor, sube la *foto del comprobante* y escribe los *nombres completos* del titular del servicio.\n",
  "🧑‍💻 Luego, uno de nuestros asesores verificará el pago y habilitará el servicio, de ser el caso.\n",
  "😊 Muchas gracias.",
]);

const flowFactura = addKeyword(["📄 Solicitar factura"]).addAnswer(
  "Por favor, ingresa los *nombres completos* del titular del servicio, su *cédula* y su *correo electrónico*.",
  { capture: true },
  async (ctx, { flowDynamic, fallBack }) => {
    const content_msg = ctx.body;
    if (!emojis.some((emoji) => content_msg.includes(emoji))) {
      var msg = {
        body: `✅ Los datos han quedado registrados satisfactoriamente.\n
En la brevedad posible uno de nuestros asesores generará la factura y la enviará su correo electrónico.\n
🤝 Muchas gracias.`,
      };
      flowDynamic(msg);
    }
  }
);

const flowPromesa = addKeyword(["🙏 Promesa de pago"]).addAnswer(
  "Por favor, ayúdanos con los *nombres completos* del titular del servicio.",
  { capture: true },
  async (ctx, { flowDynamic, fallBack }) => {
    const content_msg = ctx.body;
    if (!emojis.some((emoji) => content_msg.includes(emoji))) {
      var msg = {
        body: `✅ Los datos han quedado registrados satisfactoriamente.\n
En la brevedad posible uno de nuestros asesores ingresará tu promesa de pago al sistema.
🤝 Muchas gracias.`,
      };
      flowDynamic(msg);
    }
  }
);

const flowError = addKeyword(["⚠️ Error en pagos"]).addAnswer([
  "Por favor, ayúdanos con los *nombres completos* del titular del servicio, la *localización* y *detalles* del problema.\n",
  "Uno de nuestros asesores verificará el error y procederá a solucionarlo.\n",
  "🤝 Muchas gracias.",
]);

const flowPagosOtros = addKeyword(["🤔 Otros"]).addAnswer(
  "Ponemos a tu disposición la siguientes opciones:",
  {
    buttons: [
      { body: "📄 Solicitar factura" },
      { body: "🙏 Promesa de pago" },
      { body: "⚠️ Error en pagos" },
    ],
  }
);

const flowPagos = addKeyword(["💰 Pagos"]).addAnswer(
  "Por favor, elige una de las opciones siguientes:",
  {
    buttons: [
      { body: "💳 Métodos de Pago" },
      { body: "📎 Registrar comprobante" },
      { body: "🤔 Otros" },
    ],
  }
);

const flowAcelerar = addKeyword(["⚡ Acelerar internet"])
  .addAnswer(
    "Por favor, ayúdanos con los *nombres completos* del titular del servicio y la *localización*.",
    { capture: true },
    async (ctx, { flowDynamic }) => {
      const content_msg = ctx.body;
      if (!emojis.some((emoji) => content_msg.includes(emoji))) {
        var msg = {
          body: `🧐 Te compartimos a continuación un enlace a un *test de velocidad* de tu conexión a internet. 🔗 \nfast.com`,
        };
        flowDynamic(msg);
      }
    }
  )
  .addAnswer(
    [
      "Por favor, *accede* al enlace, *espera* hasta que termine la prueba y *envíanos* una captura de los resultados.",
    ],
    {
      delay: 3000,
    }
  )
  .addAnswer(
    [
      "Tus datos quedarán registrados en este chat y en la brevedad posible el equipo de asesores te ayudará con este inconveniente.",
    ],
    {
      delay: 3000,
    }
  )
  .addAnswer(
    [
      "Ten presente que el servicio de soporte se provee siempre y cuando estés al día con los pagos.\n",
      "🤝 Estamos para servirte.",
    ],
    { delay: 3000 }
  );

const flowContraseñaSelfFibra = addKeyword(["⬆️ Fibra óptica"])
  .addAnswer(
    "Por favor, ayúdanos con los *nombres completos* del titular del servicio.",
    { capture: true },
    async (ctx, { flowDynamic }) => {
      const content_msg = ctx.body;
      if (!emojis.some((emoji) => content_msg.includes(emoji))) {
        var msg = {
          body: `✅ Estimad@ ${content_msg}, los datos han quedado registrados satisfactoriamente.\n`,
        };
        flowDynamic(msg);
      }
    }
  )
  .addAnswer([
    "🧑‍💻 El equipo de asesores revisará lo más breve posible si el dispositivo permite el cambio de contraseña por parte del usuario y le notificaremos oportunamente.\n",
    "🤝 Muchas gracias.",
  ]);

const flowContraseñaSelfAntenaTPL = addKeyword(["TP-Link"]).addAnswer(
  "Te compartimos el manual en formato PDF. Recuerda que si requieres ayuda de parte de los técnicos, estaremos atentos para hacerlo.",
  {
    media:
      "https://www.keepandshare.com/doc26/113345/manual-routers-tplink-pdf-307k?dn=y&dnad=y",
  }
);

const flowContraseñaSelfAntenaQPC = addKeyword(["Otro router"]).addAnswer(
  "Por favor, ayúdanos con el modelo del equipo.",
  { capture: true },
  async (ctx, { flowDynamic }) => {
    const content_msg = ctx.body;
    if (!emojis.some((emoji) => content_msg.includes(emoji))) {
      var msg = {
        body: `Uno de los asesores te ayudará en la brevedad posible con los pasos a seguir.
  🤝 Estamos para servirte.`,
      };
      flowDynamic(msg);
    }
  }
);

const flowContraseñaSelfAntenaOtro = addKeyword(["QPCOM"]).addAnswer(
  "Te compartimos el manual en formato PDF. Recuerda que si requieres ayuda de parte de los técnicos, estaremos atentos para hacerlo.",
  {
    media:
      "https://www.keepandshare.com/doc26/113351/manual-routers-qpcom-pdf-693k?dn=y&dnad=y",
  }
);

const flowContraseñaSelfAntena = addKeyword(["📡 Antena"]).addAnswer(
  [
    "🔎 Por favor, revisa tu router y dinos si es uno de las siguientes modelos: *QPCOM*, *TP-Link* u *otro router*. Los nombres puedes encontrarlos en la base del router.\n",
    "📘 Luego, te compartiremos el manual respectivo en formato PDF. Recuerda que si requieres ayuda de parte de los técnicos, estaremos atentos para hacerlo.\n",
    "🤝 Gracias de antemano.",
  ],
  {
    buttons: [{ body: "TP-Link" }, { body: "QPCOM" }, { body: "Otro router" }],
  }
);

const flowContraseñaSelf = addKeyword(["🙋 Por mi cuenta"]).addAnswer(
  "🔍 ¿Tu internet llega por fibra óptica o por antena?",
  {
    buttons: [{ body: "⬆️ Fibra óptica" }, { body: "📡 Antena" }],
  }
);

const flowContraseñaAyuda = addKeyword(["🧑‍💻 Necesito ayuda"]).addAnswer(
  "Por favor, ayúdanos con los *nombres completos* del titular del servicio.",
  { capture: true },
  async (ctx, { flowDynamic }) => {
    const content_msg = ctx.body;
    if (!emojis.some((emoji) => content_msg.includes(emoji))) {
      var msg = {
        body: `Finalmente, ingresa la *contraseña*. Tus datos quedarán registrados y en la brevedad posible el equipo técnico te brindará el servicio de soporte.\n
🤝 Gracias de antemano.`,
      };
      flowDynamic(msg);
    }
  }
);

const flowContraseña = addKeyword(["🔒 Cambio de contraseña"]).addAnswer(
  "🔍 Por favor, indícanos si quieres hacer el cambio por tu cuenta o que te ayudemos desde las oficinas.",
  {
    buttons: [{ body: "🙋 Por mi cuenta" }, { body: "🧑‍💻 Necesito ayuda" }],
  }
);

const flowFinSoporte = addKeyword([
  "🔌 Reconectar internet",
  "📡 Arreglar canales",
  "🔧 Cambiar equipos",
])
  .addAnswer(
    "Por favor, ayúdanos con los *nombres completos* del titular del servicio y la *localización*.",
    { capture: true },
    async (ctx, { flowDynamic }) => {
      const content_msg = ctx.body;
      if (!emojis.some((emoji) => content_msg.includes(emoji))) {
        var msg = {
          body: "✅ Tus datos han sido registrados satisfactoriamente. En la brevedad posible el equipo de asesores te ayudará a solventar este inconveniente.",
        };
        flowDynamic(msg);
      }
    }
  )
  .addAnswer(
    [
      "Ten presente que el servicio de soporte se provee siempre y cuando estés al día con los pagos.\n",
      "🤝 Muchas gracias.",
    ],
    { delay: 3000 }
  );

const flowCambioDomicilio = addKeyword(["🚚 Cambio de domicilio"]).addAnswer(
  "Por favor, ayúdanos con los *nombres completos* del titular del servicio, la *localización actual* de los equipos y la *nueva dirección* a trasladar.",
  { capture: true },
  async (ctx, { flowDynamic }) => {
    const content_msg = ctx.body;
    if (!emojis.some((emoji) => content_msg.includes(emoji))) {
      var msg = {
        body: `✅ Tus datos han sido registrados satisfactoriamente. En la brevedad posible el equipo de asesores procederá a dar el servicio de soporte.\n
🤝 Muchas gracias.`,
      };
      flowDynamic(msg);
    }
  }
);

const flowSoporteExtras = addKeyword(["📑 Ingresar requerimiento"])
  .addAnswer(
    "Por favor, ayúdanos con los *nombres completos* del titular del servicio, la *localización* y *detalles* del problema.",
    { capture: true },
    async (ctx, { flowDynamic }) => {
      const content_msg = ctx.body;
      if (!emojis.some((emoji) => content_msg.includes(emoji))) {
        var msg = {
          body: "✅ Tus datos han sido registrados satisfactoriamente. En la brevedad posible el equipo de asesores te ayudará a solventar este inconveniente.",
        };
        flowDynamic(msg);
      }
    }
  )
  .addAnswer(
    [
      "Ten presente que el servicio de soporte se provee siempre y cuando estés al día con los pagos.\n",
      "🤝 Muchas gracias.",
    ],
    { delay: 4000 }
  );

const flowSoporteOtros = addKeyword(["⚠️ Otros"]).addAnswer(
  "Por favor, especifica cómo te podemos ayudar:",
  {
    buttons: [
      { body: "📡 Arreglar canales" },
      { body: "🔒 Cambio de contraseña" },
      { body: "📑 Ingresar requerimiento" },
    ],
  }
);

const flowSoporteEquipos = addKeyword(["📡 Equipos"]).addAnswer(
  "Por favor, especifica cómo te podemos ayudar:",
  {
    buttons: [
      { body: "🚚 Cambio de domicilio" },
      { body: "🔧 Cambiar equipos" },
    ],
  }
);

const flowSoporteConexion = addKeyword(["🔌 Conexión"]).addAnswer(
  "Por favor, especifica cómo te podemos ayudar:",
  {
    buttons: [
      { body: "🔌 Reconectar internet" },
      { body: "⚡ Acelerar internet" },
    ],
  }
);

const flowSoporte = addKeyword(["🔧 Soporte"])
  .addAnswer(
    "ℹ️ Recuerda que el servicio de soporte se realiza en un *plazo de 24 horas*."
  )
  .addAnswer("Por favor, indícanos en qué área necesitas ayuda.", {
    delay: 2000,
    buttons: [
      { body: "🔌 Conexión" },
      { body: "📡 Equipos" },
      { body: "⚠️ Otros" },
    ],
  });

const flowRedesSociales = addKeyword(["👥 Redes sociales"]).addAnswer([
  "Encuéntranos en las siguientes redes sociales:\n",
  "🔵 *Facebook*:\nfacebook.com/conectateinternetec\n",
  "🟣 *Instagram*:\ninstagram.com/conectate_mc\n",
  "⚫ *TikTok*:\ntiktok.com/@conectate.ec",
]);

const flowNosotros = addKeyword(["🧑‍💻 Conócenos"])
  .addAnswer([
    "🧑‍💻 *CONÉCTATE* 👨‍🔧 es una empresa proveedora de servicio de internet seguro, rápido y confiable en la región sur del Ecuador.",
  ])
  .addAnswer(
    [
      "📧 Nuestro *correo electrónico* es",
      "conectate_ec@hotmail.com\n",
      "ℹ️ Los *teléfonos* y *direcciones* dependerán de la oficina a la que te quieras contactar.\n",
      "👥 También ponemos a tu disposición nuestras *redes sociales*.",
    ],
    {
      delay: 3000,
    }
  )
  .addAnswer("Por favor, indícanos la información que buscas.", {
    delay: 4000,
    buttons: [
      { body: "🛎️ Servicios" },
      { body: "🏢 Oficinas" },
      { body: "👥 Redes sociales" },
    ],
  });

const flowPrincipal = addKeyword([
  "chatbot",
  "hola",
  "hey",
  "hello",
  "menu",
  "menú",
  "conéctate",
  "conectate",
  "tinkibot",
])
  .addAnswer([
    "👋 ¡Hola! Soy TinkiBot, el *Asistente Virtual* de *CONÉCTATE* 🤖\n",
  ])
  .addAnswer(
    [
      "🗓️ El *horario de atención* en nuestra *agencia matriz* de Alamor es de lunes a domingo de 08:00 AM a 05:00 PM.\n",
      "🏠 Y en las *sucursales*, de lunes a viernes de 08:00 AM a 05:00 PM y los domingos de 08:00 AM a 12:00 PM.",
    ],
    { delay: 2000 }
  )
  .addAnswer(
    [
      "⚠️ Recuerda que las *fechas de pago* del internet son del 1 al 10 de cada mes y suspensión por mora el 11.",
    ],
    { delay: 4000 }
  )
  .addAnswer("Por favor, selecciona la opción de tu preferencia.", {
    delay: 3000,
    buttons: [
      { body: "🔧 Soporte" },
      { body: "💰 Pagos" },
      { body: "🧑‍💻 Conócenos" },
    ],
  });

const main = async () => {
  const adapterDB = new DBAdapter();
  const adapterFlow = createFlow([
    flowPrincipal,
    flowAlamor,
    flowCelica,
    flowComprobante,
    flowError,
    flowLocalizacion,
    flowMetodosDePago,
    flowPagos,
    flowPindal,
    flowServicios,
    flowSoporte,
    flowZapotillo,
    flowAcelerar,
    flowContraseña,
    flowContraseñaSelf,
    flowContraseñaSelfFibra,
    flowContraseñaSelfAntena,
    flowContraseñaSelfAntenaTPL,
    flowContraseñaSelfAntenaQPC,
    flowContraseñaAyuda,
    flowFinSoporte,
    flowCuentaLoja,
    flowCuentaPichincha,
    flowNosotros,
    flowRedesSociales,
    flowSoporteConexion,
    flowSoporteEquipos,
    flowSoporteOtros,
    flowSoporteExtras,
    flowPagosOtros,
    flowPromesa,
    flowSucursales,
    flowCuentasBancarias,
    flowFactura,
    flowContraseñaSelfAntenaOtro,
    flowCambioDomicilio,
  ]);
  const adapterProvider = createProvider(WsProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
