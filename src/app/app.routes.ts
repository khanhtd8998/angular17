import { Routes } from '@angular/router';
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

export const routes: Routes = [
    {
        path: "",
        component: UserLayoutComponent,
        children: [
            { path: "", redirectTo: "home", pathMatch: "full"},
            { path: "home", component: HomeComponent },
            { path: "products/:id", component: ProductDetailComponent },
            { path: "about", component: AboutComponent },
            { path: "contact", component: ContactComponent },
            { path: "login", component: LoginComponent },
        ]
    },
    {
        path: "admin",
        component: AdminLayoutComponent,
        children: [
            { path: "", redirectTo: "dashboard", pathMatch: "full"},
            { path: "dashboard", component: DashboardComponent },
            { path: "products/list", component: ProductListComponent },
            { path: "products/add", component: ProductAddComponent },
            { path: "products/edit/:id", component: ProductEditComponent }
        ]
    },
    { path: "**", component: NotfoundComponent }
];
