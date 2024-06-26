import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { UserLayoutComponent } from './components/layouts/user-layout/user-layout.component';
import { HomeComponent } from './pages/user/home/home.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/product/dashboard/dashboard.component';
import { ProductListComponent } from './pages/admin/product/product-list/product-list.component';
import { ProductAddComponent } from './pages/admin/product/product-add/product-add.component';
import { ProductDetailComponent } from './pages/user/product-detail/product-detail.component';
import { ProductEditComponent } from './pages/admin/product/product-edit/product-edit.component';
import { AboutComponent } from './pages/user/about/about.component';
import { ContactComponent } from './pages/user/contact/contact.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { ForgotPasswordComponent } from './pages/user/forgot-password/forgot-password.component';
import { CartComponent } from './pages/user/cart/cart.component';
import { CheckoutComponent } from './pages/user/checkout/checkout.component';
import { CheckoutDoneComponent } from './pages/user/checkout-done/checkout-done.component';
import { ProductPageComponent } from './pages/user/product-page/product-page.component';
import { NgModule } from '@angular/core';
import { CategoryListComponent } from './pages/admin/category/category-list/category-list.component';
import { CategoryAddComponent } from './pages/admin/category/category-add/category-add.component';
import { AuthGuard } from './services/auth_guard/auth-guard.service';

export const routes: Routes = [
    {
        path: "",
        component: UserLayoutComponent,
        children: [
            { path: "", component: HomeComponent },
            { path: "product-page/:search", component: ProductPageComponent },
            { path: "products/:id", component: ProductDetailComponent },
            { path: "about", component: AboutComponent },
            { path: "contact", component: ContactComponent },
            { path: "login", component: LoginComponent },
            { path: "register", component: RegisterComponent },
            { path: "forgot-password", component: ForgotPasswordComponent },
            { path: "cart", component: CartComponent },
            { path: "checkout", component: CheckoutComponent },
        ]
    },
    { path: "checkout/done", component: CheckoutDoneComponent },
    {
        path: "admin",
        canActivate: [AuthGuard],
        component: AdminLayoutComponent,
        children: [
            { path: "", redirectTo: "dashboard", pathMatch: "full"},
            { path: "dashboard", component: DashboardComponent },
            { path: "products/list", component: ProductListComponent },
            { path: "products/add", component: ProductAddComponent },
            { path: "products/edit/:id", component: ProductEditComponent },
            { path: "categories/list", component: CategoryListComponent },
            { path: "categories/add", component: CategoryAddComponent },
        ]
    },
    { path: "notfound", component: NotfoundComponent },
    { path: "**", redirectTo: "/notfound" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }