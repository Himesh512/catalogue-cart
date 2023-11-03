import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from './Shared/services/common.service';
import { JsonPipe } from '@angular/common';
import { Observable, Subject, Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

	private addedItemNotifySub !: Subscription;
	private totalAmountSub !: Subscription;
	private productListNotifySub !: Subscription;
	private updateBadgeCountSub !: Subscription;
	public productList: Array<any> = [];
	public userProductList: Array<any> = [];
	public userProfile: any = {};
	public listView: string = 'list';
	public cartQty: number = 0;
	public totalCartAmount: number = 0;
	public isFetchingData: boolean = true;

	constructor(
		private commonService: CommonService,
		private _snackBar: MatSnackBar
	) {
		this.commonService.getDummyData();
	}

	ngOnInit() {
		this.getListView();
		this.subscriptionListners();
	}

	subscriptionListners() {
		this.addedItemNotifySub = this.commonService.addedItemNotify$.subscribe((userPrdList: any) => {
			this.userProductList = userPrdList;
		});

		this.productListNotifySub = this.commonService.productListNotify$.subscribe((userPrdList: any) => {
			this.productList = userPrdList;
			setTimeout(() => {
				this.isFetchingData = false;
			}, 1000);
		});

		this.updateBadgeCountSub = this.commonService.updateBadgeCount$.subscribe((cartCount: any) => {
			this.cartQty = cartCount;
		});

		this.totalAmountSub = this.commonService.totalAmount$.subscribe((totalAmount: any) => {
			this.totalCartAmount = totalAmount;
		});
	}

	ngOnDestroy() {
		this.addedItemNotifySub.unsubscribe();
		this.productListNotifySub.unsubscribe();
		this.updateBadgeCountSub.unsubscribe();
		this.totalAmountSub.unsubscribe();
	}

	public getListView() {
		this.listView = JSON.parse(localStorage.getItem('ListView') || 'false');
		this.toggleItemView(this.listView);
	}

	public addToCart(productData: any) {
		this.commonService.addProductToCart(productData);
	}

	toggleItemView(isListView: string) {
		this.listView = isListView;
		this.commonService.setItemView(this.listView);
	}

	increaseItemInCart(cartItem: any) {
		if (cartItem?.selectedQty >= cartItem?.limitPurchaseQty) {
			this._snackBar.open("Sorry, you can not buy more Quantity.", "", {
				duration: 2000,
				horizontalPosition: 'end',
				verticalPosition: 'bottom',
			});
			return;
		}

		this.commonService.addProductToCart(cartItem);
	}

	reduceItemInCart(cartItem: any) {
		this.commonService.reduceItemInCart(cartItem);
	}

	removeItemFromCart(cartItem: any) {
		this.commonService.removeItemFromCart(cartItem);
	}

	isFewQtyLeft(cartItem: any) {
		return this.commonService.isFewQtyLeft(cartItem);
	}
}
