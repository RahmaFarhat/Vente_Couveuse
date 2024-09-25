import { Routes } from '@angular/router';
import { MainContaierComponent } from './Component/main-contaier/main-contaier.component';
import { ContactUsComponent } from './Component/contact-us/contact-us.component';
import { AboutUsComponent } from './Component/about-us/about-us.component';
import { HomeComponent } from './Component/home/home.component';
import { SliderComponent } from './Component/slider/slider.component';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { FurnitureComponent } from './Component/furniture/furniture.component';
import { ProductDetailComponent } from './Component/product-detail/product-detail.component';
import { AdminComponent } from './Admin/admin.component';
import { DashbordcomponetComponent } from './Admin/dashbordcomponet/dashbordcomponet.component';
import { ProductComponent } from './Admin/product/product.component';
import { UsersComponent } from './Admin/users/users.component';
import { OtpComponent } from './Component/otp/otp.component';
import { AddProductComponent } from './Admin/add-product/add-product.component';
import { CartComponent } from './Component/cart/cart.component';
import { EditProductComponent } from './Admin/edit-product/edit-product.component';
import { DashboardCardsComponent } from './Component/dashboard-cards/dashboard-cards.component';
import { UserProfileComponent } from './Component/user-profile/user-profile.component';
import { UpdateUserComponent } from './Component/update-user/update-user.component';
import { BuyProductComponent } from './Component/buy-product/buy-product.component';
import { BuyProductResolverService } from './buy-product-resolver.service';
import { OrderConfirmationComponent } from './Component/order-confirmation/order-confirmation.component';
import { authGuard } from './Auth/auth.guard';
import { ForbiddenComponent } from './Component/forbidden/forbidden.component';
import { OrdersComponent } from './Admin/orders/orders.component';
import { MyOrdersComponent } from './Component/my-orders/my-orders.component';
import { orderGuardGuard } from './Auth/order-guard.guard';
import { OrderVisualizationComponent } from './Admin/order-visualization/order-visualization.component';
import { ForgotPasswordComponent } from './Component/forgot-password/forgot-password.component';

export const routes: Routes = [
    {
        path: '',
        component: MainContaierComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'slider', component: SliderComponent },
            { path: 'contact', component: ContactUsComponent },
            { path: 'about', component: AboutUsComponent },
            { path: 'furniture', component: FurnitureComponent },
            { path: 'product/:id', component: ProductDetailComponent },
            { path: 'forbidden', component: ForbiddenComponent },
            {
                path: 'cart',
                component: CartComponent,
                canActivate: [authGuard],
                data: { roles: ['USER'] }
            },
            {
                path: 'userdashbord',
                component: DashboardCardsComponent,
                canActivate: [authGuard],
                data: { roles: ['USER'] }
            },
            {
                path: 'userprofile',
                component: UserProfileComponent,
                canActivate: [authGuard],
                data: { roles: ['USER'] }
            },
            { path: 'updateuser', component: UpdateUserComponent },
            {
                path: 'orderplaced',
                component: OrderConfirmationComponent,
                canActivate: [authGuard, orderGuardGuard],
                data: { roles: ['USER'] }
            },
            {
                path: 'buyproduct',
                component: BuyProductComponent,
                canActivate: [authGuard],
                data: { roles: ['USER'] },
                resolve: {
                    productDetails: BuyProductResolverService
                }
            },
            {
                path: 'myorders',
                component: MyOrdersComponent,
                canActivate: [authGuard],
                data: { roles: ['USER'] },
            }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'verify-otp', component: OtpComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [authGuard],
        data: { roles: ['ADMIN'] },
        children: [
            { path: '', component: DashbordcomponetComponent },
            { path: 'product', component: ProductComponent },
            { path: 'users', component: UsersComponent },
            { path: 'addproduct', component: AddProductComponent },
            { path: 'product/:id', component: ProductDetailComponent },
            { path: 'editproduct/:id', component: EditProductComponent },
            { path: 'orders', component: OrdersComponent },
            { path: 'visualizationorders', component: OrderVisualizationComponent },

        ]
    },
    { path: '**', redirectTo: '' } // Redirect undefined routes to home
];
