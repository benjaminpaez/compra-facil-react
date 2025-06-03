type TCard = {
  image: string;
  title: string;
  description: string;
  price: number;
};
export function Card({ image, title, description, price }: TCard) {
  return (
    <section className="grid grid-rows-[178px, 1fr, 60px] block w-full max-w-sm mx-auto rounded-lg shadow-xl hover:shadow-lg transition-shadow duration-300 bg-[#FFF7F1] overflow-hidden">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      </div>

      <div className="p-2 gap-2">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{description}</p>
      </div>
      <div className="flex  p-2 ">
        <span className="text-2xl font-bold text-[#236f24]">$ {price}</span>
      </div>
    </section>
  );
}
