import { Card, CardBody, Spacer } from "@heroui/react";

export const Policy = () => {
  return (
    <div className="flex justify-center p-5">
      <Card className="w-2/3">
        <CardBody>
          <p className="text-2xl">
            Políticas de privacidad de "SIGUE ADELANTE RADIO"
          </p>
          <Spacer y={5} />
          <p>
            En "SIGUE ADELANTE RADIO", nuestra aplicación de emisora de radio
            online, nos comprometemos a cumplir con las políticas del programa
            para desarrolladores de Google Play Store para brindar a nuestros
            usuarios una experiencia segura y de alta calidad. A continuación,
            se detallan los aspectos clave de nuestra aplicación:
          </p>
          <Spacer y={5} />
          <p className="pl-10">
            <span className="font-bold">Emisión de música en línea:</span>{" "}
            "SIGUE ADELANTE RADIO" es una aplicación que permite a los usuarios
            escuchar música en línea a través de una emisora de radio. Nos
            aseguramos de que el contenido de la emisora cumpla con los derechos
            de autor y contamos con los permisos y licencias necesarios para
            transmitir la música a nuestros usuarios.
          </p>
          <Spacer />
          <p className="pl-10">
            <span className="font-bold">Experiencia de usuario segura:</span>
            Valoramos la seguridad de nuestros usuarios y nos esforzamos por
            proporcionar una experiencia segura dentro de nuestra aplicación.
            Implementamos medidas de seguridad y privacidad para proteger la
            información personal de los usuarios y garantizar la
            confidencialidad de los datos.
          </p>
          <Spacer />
          <p className="pl-10">
            <span className="font-bold">Funcionalidad y rendimiento:</span>{" "}
            Nuestra aplicación está diseñada para ofrecer una funcionalidad
            estable y un rendimiento óptimo. Realizamos pruebas exhaustivas para
            asegurarnos de que la aplicación funcione correctamente y
            proporcionamos actualizaciones regulares para mejorar la experiencia
            del usuario y abordar cualquier problema técnico.
          </p>
          <Spacer />
          <p className="pl-10">
            <span className="font-bold">Contenido adecuado:</span>
            Nos aseguramos de que el contenido de "SIGUE ADELANTE RADIO" sea
            apropiado para todos los usuarios. No permitimos contenido ofensivo,
            discriminatorio o ilegal en nuestra aplicación. Además, nos
            aseguramos de que el contenido transmitido a través de la emisora
            cumpla con las directrices y regulaciones establecidas por las
            autoridades competentes.
          </p>
          <Spacer y={7} />
          <p>
            "SIGUE ADELANTE RADIO" es una aplicación gratuita que ofrece una
            experiencia de radio en línea de alta calidad para todos los amantes
            de la música. Valoramos el feedback de nuestros usuarios y estamos
            comprometidos en brindarles una experiencia satisfactoria.
          </p>
          <Spacer />
          <p>
            Si tienes alguna pregunta, comentario o inquietud sobre nuestra
            aplicación "SIGUE ADELANTE RADIO" o nuestras políticas, no dudes en
            contactarnos a través de los canales de soporte o información de
            contacto proporcionados en nuestra página web.
          </p>
        </CardBody>
      </Card>
    </div>
  );
};
