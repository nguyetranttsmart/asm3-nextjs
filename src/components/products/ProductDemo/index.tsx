import { useEffect, useState } from "react";
import { IProduct } from "../type";

type ProductProps = {
  priceMin: number;
  priceMax: number;
};
export default function ProductDemo({ priceMin, priceMax }: ProductProps) {
  const [products, setProducts] = useState<IProduct[]>([]);

  const parsePrice = (priceStr: string): number => {
    return Number(priceStr.replace(/[^0-9]/g, ""));
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/get-products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data: IProduct[] = await res.json();
      const filteredProduct = data.filter((product: IProduct) => {
        const price = parsePrice(product.price);
        return price >= priceMin && price < priceMax;
      });
      setProducts(filteredProduct);
    };
    fetchData();
  }, [priceMin, priceMax]);

  return <div></div>;
}
