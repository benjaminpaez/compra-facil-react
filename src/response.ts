type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
};

type TData = {
  moda: {
    title: string;
    description: string;
    products: Product[];
  };
  calzados: {
    title: string;
    description: string;
    products: Product[];
  };
  relojes: {
    title: string;
    description: string;
    products: Product[];
  };
  perfumes: {
    title: string;
    description: string;
    products: Product[];
  };
};

export const dataArticles: TData = {
  moda: {
    title: "",
    description: "",
    products: [
      {
        id: 1,
        title: "Chaqueta de Cuero Premium",
        description:
          "Chaqueta de cuero genuino con forro interior y detalles en metal",
        price: 299.99,
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop",
      },
      {
        id: 2,
        title: "Vestido Elegante Negro",
        description: "Vestido de noche con detalles en encaje y corte ajustado",
        price: 199.99,
        image:
          "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop",
      },
      {
        id: 3,
        title: "Traje Formal Slim Fit",
        description:
          "Traje de lana italiana con corte moderno y ajuste perfecto",
        price: 399.99,
        image:
          "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=800&auto=format&fit=crop",
      },
      {
        id: 4,
        title: "Camisa de Seda Italiana",
        description: "Camisa de seda 100% con botones de madreperla",
        price: 149.99,
        image:
          "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&auto=format&fit=crop",
      },
      {
        id: 5,
        title: "Pantalón Chino Premium",
        description: "Pantalón de algodón stretch con acabado premium",
        price: 89.99,
        image:
          "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop",
      },
      {
        id: 6,
        title: "Blazer Casual",
        description:
          "Blazer versátil perfecto para ocasiones formales e informales",
        price: 179.99,
        image:
          "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=800&auto=format&fit=crop",
      },
      {
        id: 7,
        title: "Falda Plisada",
        description: "Falda plisada de alta calidad con cintura elástica",
        price: 79.99,
        image:
          "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&auto=format&fit=crop",
      },
      {
        id: 8,
        title: "Sweater de Cachemira",
        description: "Sweater 100% cachemira con cuello redondo",
        price: 249.99,
        image:
          "https://cdn.pixabay.com/photo/2016/03/27/19/31/fashion-1283863_1280.jpg",
      },
      {
        id: 9,
        title: "Jeans Premium",
        description: "Jeans de mezclilla premium con stretch",
        price: 129.99,
        image:
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop",
      },
      {
        id: 10,
        title: "Abrigo de Invierno",
        description: "Abrigo de lana con capucha y forro interior",
        price: 349.99,
        image:
          "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&auto=format&fit=crop",
      },
    ],
  },
  calzados: {
    title: "",
    description: "",
    products: [
      {
        id: 1,
        title: "Nike Air Max 270",
        description: "Zapatillas deportivas con tecnología Air Max",
        price: 159.99,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop",
      },
      {
        id: 2,
        title: "Adidas Ultraboost",
        description: "Zapatillas de running con tecnología Boost",
        price: 179.99,
        image:
          "https://images.pexels.com/photos/10134303/pexels-photo-10134303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 3,
        title: "New Balance 990",
        description: "Zapatillas clásicas con suela de goma",
        price: 189.99,
        image:
          "https://images.pexels.com/photos/30755567/pexels-photo-30755567/free-photo-of-elegante-zapatilla-de-ante-gris-sobre-fondo-blanco.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 4,
        title: "Puma RS-X",
        description: "Zapatillas retro con diseño futurista",
        price: 149.99,
        image:
          "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop",
      },
      {
        id: 5,
        title: "Nike Air Force Classic",
        description: "Zapatillas clásicas para todo andar",
        price: 89.99,
        image:
          "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&auto=format&fit=crop",
      },
      {
        id: 6,
        title: "Vans Old Skool",
        description: "Zapatillas con diseño icónico",
        price: 79.99,
        image:
          "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 7,
        title: "Jordan Air V6",
        description: "Zapatillas retro con suela de goma",
        price: 99.99,
        image:
          "https://images.pexels.com/photos/10112911/pexels-photo-10112911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 8,
        title: "Nike Jordan III",
        description: "Zapatillas urbanas de ultima tendencia",
        price: 129.99,
        image:
          "https://images.pexels.com/photos/20298292/pexels-photo-20298292/free-photo-of-zapatos-cuero-piel-nike.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 9,
        title: "Nike Air Force 210",
        description: "Zapatillas de ultima tecnologia",
        price: 119.99,
        image:
          "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        id: 10,
        title: "Converse All Stars",
        description: "Zapatillas clasicas neutrales",
        price: 139.99,
        image:
          "https://images.pexels.com/photos/4271579/pexels-photo-4271579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
  },
  relojes: {
    title: "",
    description: "",
    products: [
      {
        id: 1,
        title: "Rolex Submariner",
        description: "Reloj de buceo con caja de acero inoxidable",
        price: 8999.99,
        image:
          "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop",
      },
      {
        id: 2,
        title: "Omega Seamaster",
        description: "Reloj de buceo con resistencia al agua",
        price: 4999.99,
        image:
          "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=800&auto=format&fit=crop",
      },
      {
        id: 3,
        title: "TAG Heuer Carrera",
        description: "Reloj cronógrafo deportivo",
        price: 3999.99,
        image:
          "https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 4,
        title: "Cartier Santos",
        description: "Reloj elegante con caja cuadrada",
        price: 6999.99,
        image:
          "https://images.pexels.com/photos/404181/pexels-photo-404181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 5,
        title: "IWC Portugieser",
        description: "Reloj de pulsera clásico",
        price: 7999.99,
        image:
          "https://images.pexels.com/photos/8711225/pexels-photo-8711225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 6,
        title: "Breitling Navitimer",
        description: "Reloj cronógrafo con regla de cálculo",
        price: 5999.99,
        image:
          "https://images.pexels.com/photos/32040833/pexels-photo-32040833/free-photo-of-reloj-dorado.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 7,
        title: "Patek Philippe Nautilus",
        description: "Reloj deportivo elegante",
        price: 29999.99,
        image:
          "https://images.pexels.com/photos/23174727/pexels-photo-23174727/free-photo-of-blanco-y-negro-reloj-de-pulsera-hora-tiempo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 8,
        title: "Audemars Piguet Royal Oak",
        description: "Reloj deportivo con caja octogonal",
        price: 24999.99,
        image:
          "https://images.pexels.com/photos/15649361/pexels-photo-15649361/free-photo-of-moda-mano-reloj-de-pulsera-lujo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 9,
        title: "Jaeger-LeCoultre Reverso",
        description: "Reloj con caja reversible",
        price: 6999.99,
        image:
          "https://images.pexels.com/photos/28261820/pexels-photo-28261820/free-photo-of-madera-hora-tiempo-reloj-de-pulsera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 10,
        title: "Vacheron Constantin Overseas",
        description: "Reloj deportivo elegante",
        price: 19999.99,
        image:
          "https://images.pexels.com/photos/14525782/pexels-photo-14525782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
  },
  perfumes: {
    title: "",
    description: "",
    products: [
      {
        id: 1,
        title: "Chanel N°5",
        description: "Perfume icónico con notas florales",
        price: 299.99,
        image:
          "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop",
      },
      {
        id: 2,
        title: "Dior Sauvage",
        description: "Fragancia masculina con notas amaderadas",
        price: 199.99,
        image:
          "https://images.pexels.com/photos/12562775/pexels-photo-12562775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 3,
        title: "Tom Ford Black Orchid",
        description: "Perfume oriental con notas de chocolate",
        price: 249.99,
        image:
          "https://images.pexels.com/photos/30181058/pexels-photo-30181058/free-photo-of-duft.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 4,
        title: "Jo Malone Wood Sage",
        description: "Fragancia unisex con notas herbales",
        price: 179.99,
        image:
          "https://images.pexels.com/photos/8084464/pexels-photo-8084464.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 5,
        title: "Yves Saint Laurent Black Opium",
        description: "Perfume oriental con notas de café",
        price: 229.99,
        image:
          "https://images.pexels.com/photos/16445070/pexels-photo-16445070/free-photo-of-perfume-fondo-negro-cosmetico-frasco.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 6,
        title: "Gucci Bloom",
        description: "Perfume floral con notas de jasmín",
        price: 189.99,
        image:
          "https://images.pexels.com/photos/19251919/pexels-photo-19251919/free-photo-of-lujo-marca-logo-botella.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 7,
        title: "Bleu de Chanel",
        description: "Fragancia masculina con notas amaderadas",
        price: 219.99,
        image:
          "https://images.pexels.com/photos/9202894/pexels-photo-9202894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 8,
        title: "Channel Paris",
        description: "Fragancia acuática con notas cítricas",
        price: 169.99,
        image:
          "https://images.pexels.com/photos/1557980/pexels-photo-1557980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 9,
        title: "La Vie Est Belle",
        description: "Perfume dulce con notas de iris",
        price: 199.99,
        image:
          "https://images.pexels.com/photos/20020037/pexels-photo-20020037/free-photo-of-vaso-cristal-vidrio-botella.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: 10,
        title: "D&G The One",
        description: "Perfume oriental con notas de cacao",
        price: 209.99,
        image:
          "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
  },
};
