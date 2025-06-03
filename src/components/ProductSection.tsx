import { Card } from "./Card";
import ContainerProducts from "./ContainerProducts";

type ProductSectionProps = {
  title: string;
  description: string;
  products: Array<{
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
  }>;
};

export default function ProductSection({
  title,
  description,
  products,
}: ProductSectionProps) {
  return (
    <ContainerProducts title={title} description={description}>
      {products.map((product) => (
        <Card
          key={product.id}
          image={product.image}
          description={product.description}
          price={product.price}
          title={product.title}
        />
      ))}
    </ContainerProducts>
  );
}
