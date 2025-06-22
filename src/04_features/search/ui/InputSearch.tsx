import css from './InputSearch.module.css';
import { fetchSearchResults } from '../api/searchApi';
import { InputSearchProps } from '../model/types';
import { Button } from '@/06_shared/ui/Button/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/06_shared/ui/Input/Input';


type FormFields = {
    name: string
}

export const InputSearch = ({ onApiResponse }: InputSearchProps) => {
    
    const {
        register, 
        handleSubmit,
        formState: {isSubmitting},
      } = useForm<FormFields>();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        fetchSearchResults(data.name)
        .then(onApiResponse)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={css.search}>
            <Input register={register('name')} id='name' placeholder='Найти'/>
            <Button isLoading={isSubmitting}>Поиск</Button>
        </form>
    );
};