import { Carousel } from "react-responsive-carousel";
import { CardNews } from "./CardNews";

interface New {
  title: string;
  image: string;
  text: string;
}
const news: New[] = [
  {
    title: "Titulo 1",
    image: "https://nextui.org/images/hero-card-complete.jpeg",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, vero. Quasi quisquam corporis officia. Accusantium omnis alias quam vero, porro eveniet laborum quibusdam nam perspiciatis voluptatem. Quam, eveniet. Quae, vel.",
  },
  {
    title: "Titulo 2",
    image: "https://nextui.org/images/hero-card-complete.jpeg",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, vero. Quasi quisquam corporis officia. Accusantium omnis alias quam vero, porro eveniet laborum quibusdam nam perspiciatis voluptatem. Quam, eveniet. Quae, vel.",
  },
  {
    title: "Titulo 3",
    image: "https://nextui.org/images/hero-card-complete.jpeg",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, vero. Quasi quisquam corporis officia. Accusantium omnis alias quam vero, porro eveniet laborum quibusdam nam perspiciatis voluptatem. Quam, eveniet. Quae, vel.",
  },
];

export const CarouselNews = () => {
  return (
    <Carousel
      infiniteLoop
      autoPlay
      stopOnHover
      showThumbs={false}
      className="flex items-center"
    >
      {news.map((value, i) => (
        <div className="flex justify-center" key={i}>
          <CardNews {...value} imageUrl={value.image} />
        </div>
      ))}
    </Carousel>
  );
};
