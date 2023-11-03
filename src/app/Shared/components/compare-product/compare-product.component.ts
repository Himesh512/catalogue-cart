import { Component, Input, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-compare-product',
	templateUrl: './compare-product.component.html',
	styleUrls: ['./compare-product.component.scss']
})
export class CompareProductComponent implements OnInit, OnDestroy {

	public productCompareList: Array<any> = []
	public cloneProductList: Array<any> = [];
	public isComparing: boolean = false;

	constructor(
		private commonService: CommonService,
		private _snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<CompareProductComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {

	}

	ngOnDestroy(): void {
		this.isComparing = false;
	}

	ngOnInit() {
		console.log('data===>', this.data);
		this.cloneProductList = JSON.parse(JSON.stringify(this.data.productList));
	}

	addProductTolist(product: any) {
		if (product.isSelected && this.productCompareList && this.productCompareList.length < 3) {
			this.productCompareList.push(product);
		} else {
			this._snackBar.open("Sorry, you can not compare more than three products.", "", {
				duration: 2000,
				horizontalPosition: 'center',
				verticalPosition: 'top',
			});
			product.isSelected = false;
		}
	}

	removeProductFromList(index: any) {
		this.productCompareList.splice(index, 1);
	}

	close() {
		this.dialogRef.close();
	}

	compareProducts() {
		this.isComparing = true;
	}

}
