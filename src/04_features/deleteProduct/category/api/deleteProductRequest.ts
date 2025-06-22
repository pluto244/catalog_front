import { ProductId } from '@/05_entities/product';

export const deleteProductRequest = (productId: ProductId): Promise<void> => {
  // TODO: запрос на удаление
  console.log('выполнение запроса')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // fetch('https://jsonplaceholder.typicode.com/todos/1')
      fetch('https://jsonplaceholder.typicode.com/todos/18765432')
        .then(response => {
          if (response.ok) {
            resolve()
          } else {
            reject(new Error('Ошибка при удалении продукта'))
          }
        })
        .catch(() => {
          reject(new Error('Ошибка при удалении продукта'))
        })
    }, 2000)
  })
}