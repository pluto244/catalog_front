import { Provider, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store, persistor, RootState } from './AppStore';
import '@/06_shared/ui/base.css';
import { appRouter } from './AppRouter';
import { PersistGate } from 'redux-persist/integration/react';
import { Loader } from '@/06_shared/ui/Loader/Loader';
import { useGetMeQuery } from '@/06_shared/api/api';
import { useEffect } from 'react';
import { setSession, clearSession } from '@/05_entities/session/sessionSlice';

const AppInitializer: React.FC = () => {
    const dispatch = store.dispatch;
    const { data: user, isError, isSuccess } = useGetMeQuery();
    const isInitialized = useSelector((state: RootState) => state.session.isInitialized);

    useEffect(() => {
        if (isSuccess && user) {
            dispatch(setSession({ 
                userId: user.id, 
                role: user.role, 
                name: user.name,
                followedProductIds: user.idOfFollowedProductsList
            }));
        }
        if (isError) {
            dispatch(clearSession());
        }
    }, [isSuccess, isError, user, dispatch]);

    if (!isInitialized) {
        return <Loader />;
    }
    
    return <RouterProvider router={appRouter()} />;
}


export function AppEnter() {
    return (
        <Provider store={store}>
            <PersistGate loading={<Loader />} persistor={persistor}>
                <AppInitializer />
            </PersistGate>
        </Provider>
    )
}
