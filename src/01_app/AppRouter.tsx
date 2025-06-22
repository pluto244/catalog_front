import { ReactElement } from "react"
import { useSelector } from "react-redux";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { baseLayout } from "./layouts/baseLayouts";
import { NotFoundPage } from "@/02_pages/notFound";
import { MainPage } from "@/02_pages/main";
import { ProfilePage } from "@/02_pages/profile/ui/ProfilePage/ProfilePage";
import { ProductPage } from "@/02_pages/product/ui/ProductPage/ProductPage";
import { ProductFormPage } from "@/02_pages/newProduct";
import { LoginPage } from "@/02_pages/login";
import { Roles } from "@/05_entities/user/api/types";

type AuthGuardProps = {
  children: ReactElement
}

function AuthGuard({ children }: AuthGuardProps) {
  const isAuthorized = useSelector((state: RootState) => state.session.userId)

  if (!isAuthorized)
    return <Navigate to='/login' />

  return children
}

function AdminGuard({ children }: AuthGuardProps) {
  const isAdmin = useSelector((state: RootState) => state.session.role);

  if (isAdmin === Roles.ROLE_ADMIN)
    return <Navigate to='/' />

  return children
}

export function appRouter() {
  return createBrowserRouter([
    {
      element: baseLayout,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: '/',
          element: (
            <AuthGuard>
              <MainPage />
            </AuthGuard>
          ),
        },
        {
          path: '/profile/:id',
          element: (
            <AuthGuard>
              <AdminGuard>
                <ProfilePage />
              </AdminGuard>
            </AuthGuard>
          ),
        },
        {
          path: '/product/:id',
          element: (
            <AuthGuard>
              <ProductPage />
            </AuthGuard>
          ),
        },
        {
          path: '/product/:id/edit',
          element: (
            <AuthGuard>
              <AdminGuard>
                <ProductFormPage />
              </AdminGuard>
            </AuthGuard>
          ),
        },
        {
          path: 'addNewProduct',
          element: (
            <AuthGuard>
              <AdminGuard>
                <ProductFormPage />
              </AdminGuard>
            </AuthGuard>
          ),
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
      ],
    },
  ])
}