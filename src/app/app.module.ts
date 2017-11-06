import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
} from '@angular/material';


import { AppComponent } from './app.component';
import { DashboardComponent } from './modul/dashboard/dashboard.component';
import { FormOrderComponent } from './modul/form-order/form-order.component';
import { FormOrderItemComponent } from './modul/form-order-item/form-order-item.component';
import { HistoryComponent } from './modul/history/history.component';
import { SettingComponent } from './modul/setting/setting.component';
import { LoginComponent } from './modul/login/login.component';
import { ClickGoBack } from './directive/click-go-back';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductService} from './service/product.service';
import {LoginService} from './service/login.service';
import {CartService} from './service/cart.service';
import {PostService} from './service/post.service';
import {OrderService} from "./service/order.service";
import { FormCheckoutComponent } from './modul/form-checkout/form-checkout.component';
import { FormAddressComponent } from './modul/form-address/form-address.component';
import { ChangepasswordComponent } from './modul/changepassword/changepassword.component';
import { ChattingComponent } from './modul/chatting/chatting.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FormOrderItemComponent,
    FormOrderComponent,
    HistoryComponent,
    SettingComponent,
    LoginComponent,
    ClickGoBack,
    FormCheckoutComponent,
    FormAddressComponent,
    ChangepasswordComponent,
    ChattingComponent
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatTableModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'history',
        component: HistoryComponent
      },
      {
        path: 'setting',
        component: SettingComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'form-order/:id',
        component: FormOrderComponent
      },
      {
          path: 'form-order-item/:id',
          component: FormOrderItemComponent
      },
      {
          path: 'form-order-item/:id/:idProd',
          component: FormOrderItemComponent
      },
      {
        path: 'form-checkout',
        component: FormCheckoutComponent
      },
      {
        path: 'form-address',
        component: FormAddressComponent
      },
      {
        path: 'changepassword',
        component: ChangepasswordComponent
      },
      {
        path: 'chatting',
        component: ChattingComponent
      }
    ])
  ],
  providers: [
    ProductService,
    LoginService,
    CartService,
    PostService,
    OrderService
  ],
  bootstrap: [AppComponent],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatTableModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ]

})

export class AppModule {}
