import React from 'react';
import {  ProductMainPageCategory } from '@/05_entities/product/model/types';
import { ChooseCategoryButton } from '@/06_shared/ui/ChooseCategoryButton/ChooseCategoryButton';


interface ProductFilterButtonsProps {
    currentCategory:  ProductMainPageCategory;
    categories:  ProductMainPageCategory[];
    onCategoryChange: (category:  ProductMainPageCategory) => void ;
}

export const ProductFilterButtons: React.FC<ProductFilterButtonsProps> = ({
    
    currentCategory,
    categories,
    onCategoryChange,
    
}) => {

    return (
        <div className="category-buttons">
            {categories.map(category => (
                <ChooseCategoryButton
                    key={category}
                    isActive={currentCategory === category}
                    onClick={() => onCategoryChange(category)}
                    label={
                        category === ProductMainPageCategory.All ? ProductMainPageCategory.All :
                        category === ProductMainPageCategory.Favorites ? ProductMainPageCategory.Favorites :
                        // category === ProductCategory.ToDo ? ProductCategory.ToDo :
                        // category === ProductCategory.UserProducts ? ProductCategory.UserProducts : 
                        // category === ProductCategory.Archive ? ProductCategory.Archive  : 
                        ''
                    }
                />
            ))}
        </div>
    );
};
