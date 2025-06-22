import { productsMock } from '@/06_shared/lib/server';
import { ProductPreviewCardDto, Status } from '../../model/types';

export function mockProductDto(): ProductPreviewCardDto[] {
  const data = productsMock
    .map(product => ({
      ...product,
      status: product.status as Status,
    }))

  return data;
}