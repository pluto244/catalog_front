import { CreateProductForm } from "@/03_widgets/CreateProductForm"
import { useParams } from "react-router-dom";

export const ProductFormPage = () => {
  const { id } = useParams();
  const formMode = id ? 'edit' : 'add';

  return (
    <CreateProductForm formMode={formMode} productId={id}/>
  )
}