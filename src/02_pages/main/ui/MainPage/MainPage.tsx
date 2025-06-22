import { AddNewProduct } from '@/04_features/newProduct/addNewProduct'
import css from './Page.module.css'
import { MainCategoryWidget } from '@/03_widgets/Category/MainCategory/MainCategory'

  
export function MainPage() {
    return (
        <>
            <div className={css.container}>
                <h1>Цифровые продукты</h1>
                <AddNewProduct />
            </div>
            <MainCategoryWidget />
        </>
    )
}
