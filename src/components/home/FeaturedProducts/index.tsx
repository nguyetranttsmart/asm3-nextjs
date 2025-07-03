import { Carousel, Tabs } from "@/components/commons";
import ProductItem from "@/components/products/ProductItem";
import useProducts from "@/hooks/products/useProducts";
import styles from "./FeaturedProduct.module.css";
import TabItem from "./TabItem";
import Test from "../Test";

const a = [
  {
    key: "SUV",
    label: <TabItem label={"SUV"} iconUrl="/images/SUV.svg" />,
  },
  {
    key: "Hatch",
    label: <TabItem label={"Hatch"} iconUrl="/images/Hatch.svg" />,
  },
  {
    key: "Ute",
    label: <TabItem label={"Ute"} iconUrl="/images/Ute.svg" />,
  },
  {
    key: "Coupe",
    label: <TabItem label={"Coupe"} iconUrl="/images/Coupe.svg" />,
  },
  {
    key: "Sedan",
    label: <TabItem label={"Sedan"} iconUrl="/images/Sedan.svg" />,
  },
  {
    key: "Vip",
    label: <TabItem label={"Vip"} iconUrl="/images/Vip.svg" />,
  },
];

const FeaturedProducts = () => {
  return (
    <div className={styles.filteredProductSection}>
      <h2>Looking for a specific size11?</h2>
      <Tabs
        tabs={a}
        renderContent={(selectedItem) => {
          const products = useProducts({ typeId: selectedItem.key });
          return (
            <Test />
            // <Carousel
            //   items={products}
            //   renderItem={(item) => <ProductItem product={item} />}
            //   autoPlay={true}
            //   autoPlayInterval={3000}
            //   responsiveConfig={[
            //     { breakpoint: 1280, visibleCount: 3, itemToScroll: 3 },
            //     { breakpoint: 1024, visibleCount: 2, itemToScroll: 2 },
            //     { breakpoint: 768, visibleCount: 2, itemToScroll: 1 },
            //   ]}
            // />
          );
        }}
      ></Tabs>
    </div>
  );
};

export default FeaturedProducts;
