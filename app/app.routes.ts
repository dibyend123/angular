import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {NewPasswordComponent} from "./new-password/new-password.component";
import {SecurehomeComponent} from "./securehome/securehome.component";

const homeRoutes: Routes = [
	{
		path:'',
		redirectTo:'/login',
		pathMatch:'full'

	},
	{
		path:'login',
		component:LoginComponent,		

	},
	{
		path:'securehome',
		component:SecurehomeComponent,
	}
];


const routes:Routes = [
{
	path:'',
	children:[
		...homeRoutes,
		{
			path:'',
			component:LoginComponent
		}
	]

},
{
	path:'home',
	children:[
		 {path: 'newPassword', component: NewPasswordComponent}
	]	
}


];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);