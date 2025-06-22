import { Provider} from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from './AppStore';
import '@/06_shared/ui/base.css';
import { appRouter } from './AppRouter';



export function AppEnter() {
    
    return (
        <Provider store={store}>
            <RouterProvider router={appRouter()} />
        </Provider>
    )
}
