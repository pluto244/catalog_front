import { ProductPreviewCardDto, Status } from '@/05_entities/product/model/types';
import { productsMockCards } from '@/06_shared/lib/server/';



export const fetchSearchResults = async (query: string = ""): Promise<ProductPreviewCardDto[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(productsMockCards.map(product => ({
        ...product,
        status: product.status as Status,
      })).filter(product => product.status === Status.APPROVED).filter(product => product.title.includes(query)));
    })
  })
};