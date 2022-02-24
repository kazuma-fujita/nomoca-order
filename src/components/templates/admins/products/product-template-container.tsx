import { ProductTemplate } from 'components/templates/admins/products/product-template';
import { useProductList } from 'stores/use-product-list';

export const ProductTemplateContainer = () => {
  const fetchReturn = useProductList();
  return <ProductTemplate {...fetchReturn} />;
};
