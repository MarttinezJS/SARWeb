import { Accordion, AccordionItem } from "@nextui-org/react";
import { EmptyElement } from "../atomics";

interface EventAppoint {
  title: string;
  scheduledDate: string;
  description: string;
}

const events: EventAppoint[] = [
  // {
  //   title: "Evento 1",
  //   scheduledDate: "2/10/2024",
  //   description:
  //     "Nullam laoreet felis tempus, convallis urna in, egestas velit. Sed eget est finibus, aliquam elit vel, finibus lacus. Pellentesque mi ipsum, rhoncus in ex eget, dictum maximus turpis. Phasellus tempor imperdiet tortor a sagittis. Nullam luctus neque ut convallis congue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus odio a consectetur placerat. Morbi tempor mauris tellus, sit amet scelerisque diam interdum convallis. Mauris condimentum velit nec est pretium, ac mollis mauris mattis. ",
  // },
  // {
  //   title: "Evento 2",
  //   scheduledDate: "2/10/2024",
  //   description:
  //     "Nullam laoreet felis tempus, convallis urna in, egestas velit. Sed eget est finibus, aliquam elit vel, finibus lacus. Pellentesque mi ipsum, rhoncus in ex eget, dictum maximus turpis. Phasellus tempor imperdiet tortor a sagittis. Nullam luctus neque ut convallis congue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus odio a consectetur placerat. Morbi tempor mauris tellus, sit amet scelerisque diam interdum convallis. Mauris condimentum velit nec est pretium, ac mollis mauris mattis. ",
  // },
  // {
  //   title: "Evento 3",
  //   scheduledDate: "2/10/2024",
  //   description:
  //     "Nullam laoreet felis tempus, convallis urna in, egestas velit. Sed eget est finibus, aliquam elit vel, finibus lacus. Pellentesque mi ipsum, rhoncus in ex eget, dictum maximus turpis. Phasellus tempor imperdiet tortor a sagittis. Nullam luctus neque ut convallis congue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus odio a consectetur placerat. Morbi tempor mauris tellus, sit amet scelerisque diam interdum convallis. Mauris condimentum velit nec est pretium, ac mollis mauris mattis. ",
  // },
];

const EventsComponent = () => {
  return (
    <div className="">
      <div className="text-center font-bold text-secondary text-2xl my-5">
        Eventos
      </div>
      {events.length > 0 ? (
        <Accordion>
          {events.map((e) => (
            <AccordionItem title={e.title} subtitle={e.scheduledDate}>
              {e.description}
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <EmptyElement />
      )}
    </div>
  );
};

export default EventsComponent;
