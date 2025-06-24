import { SubmitHandler, useForm } from 'react-hook-form';
import css from './LoginForm.module.css'
import { Input } from '@/06_shared/ui/Input/Input';
import { Button } from '@/06_shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/06_shared/model/hooks';
import { setSession } from '@/05_entities/session/sessionSlice';
import { useLoginMutation } from '@/06_shared/api/api';
import { useEffect } from 'react';

type FormFields = {
  email: string
  password: string
}

export function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    watch,
    trigger,
  } = useForm<FormFields>({
    mode: 'onChange'
  });

  const email = watch('email');
  const password = watch('password');

  useEffect(() => {
    trigger('email');
    trigger('password');
  }, [email, password, trigger]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const userData = await login(data).unwrap();
      
      dispatch(setSession({ 
        userId: userData.id, 
        role: userData.role, 
        name: userData.name,
        followedProductIds: userData.idOfFollowedProductsList
      }));
      navigate('/')
    } catch (error) {
      setError('root', {
        message: 'Неверный логин или пароль'
      })
    }
  }

  return (
    <form className={css.form_login} onSubmit={handleSubmit(onSubmit)}>
      <h1>Вход</h1>
      <div className={css.container}>
        <label htmlFor='email' className={css.label}>Логин</label>
        <Input
          id='email'
          register={register('email', { required: 'Логин не может быть пустым' })}
        />
        <div className={css.error_block}>
          {errors.email && <span className={css.error_message}>
            {errors.email.message}
          </span>}
        </div>
        <label htmlFor='password' className={css.label}>Пароль</label>
        <Input
          id='password'
          type='password'
          register={register('password', { required: 'Пароль не может быть пустым' })}
        />
        <div className={css.error_block}>
          {errors.password && <span className={css.error_message}>
            {errors.password.message}
          </span>}
        </div>
      </div>
      <Button isLoading={isSubmitting} type={'submit'}>
        Войти в систему
      </Button>
      <div className={css.error_block}>
        {errors.root && <span className={css.error_message}>{errors.root.message}</span>}
      </div>
    </form>
  );
};
