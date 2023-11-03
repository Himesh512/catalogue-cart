import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CommonService {
    dataUrl: string = 'assets/products.json';
    public dummyData: Array<any> = [];
    public userProductList: Array<any> = [];
    public productList: Array<any> = [];

    public updateBadgeCount$ = new Subject();
    public addedItemNotify$ = new Subject();
    public totalAmount$ = new Subject();
    public productListNotify$ = new Subject();

    constructor(private http: HttpClient) { 
        this.productList = JSON.parse(localStorage.getItem('InvetoryData') || '[]');
    }

    public getDummyData() {
        this.http.get(this.dataUrl).subscribe((resp: any) => {
            console.log(resp);
            this.dummyData = resp;
            localStorage.setItem('InvetoryData',JSON.stringify(this.dummyData));
            this.productList = this.dummyData;
            if(this.productList && this.productList.length > 0){
                this.setUserProductListOnLoad();
                this.updateBadgeCount();
                this.updateTotalAmount();
                this.updateInventoryListOnLoad(this. productList);
                this.setUserProductList();
                this.setInventoryProductList();
            }
        });
    }

    private findItemInUserBucket(product: any) {
       return this.userProductList.findIndex((item) => item.id === product.id);
    }

    private findItemInInventoryBucket(product:any){
        return this.productList.findIndex((item) => item.id === product.id);
    }

    public addProductToCart(productData:any) {
        //TO DO Valid Date Max Qty
        let itemIndex = this.findItemInUserBucket(productData);
        let inventoryItemIndex = this.findItemInInventoryBucket(productData);
        if(itemIndex > -1) {
            this.userProductList[itemIndex].numberOfItems++;
        } else {
            productData.numberOfItems = 1;
            this.userProductList.push(productData);
        }
        
        this.productList[inventoryItemIndex].selectedQty++;
        this.productList[inventoryItemIndex].stock--;
        console.log("stock = addProductToCart =>", this.productList[inventoryItemIndex].stock);
        this.setInventoryProductList();
        this.updateBadgeCount();
        this.updateTotalAmount();
        this.addedItemNotify$.next(this.userProductList);
        this.productListNotify$.next(this.productList);
        this.setUserProductList();
    }

    public reduceItemInCart(productData: any) {
        let itemIndex = this.findItemInUserBucket(productData);
        if(itemIndex > -1) {
            let item = this.userProductList[itemIndex];
            if(item.numberOfItems > 0) {
                this.userProductList[itemIndex].numberOfItems--;
                let inventoryItemIndex = this.findItemInInventoryBucket(productData);
                this.productList[inventoryItemIndex].selectedQty--;
                this.productList[inventoryItemIndex].stock++;
                console.log("stock = reduceItemInCart =>", this.productList[inventoryItemIndex].stock);
                if(item.numberOfItems === 0) {
                    this.removeItemFromCart(productData);
                } 
            } 
            this.productListNotify$.next(this.productList);
            this.setInventoryProductList();
        }
        this.updateBadgeCount();
        this.updateTotalAmount();
        this.addedItemNotify$.next(this.userProductList);
        this.setUserProductList();


    }

    public removeItemFromCart (productData: number) {
        let itemIndex = this.findItemInUserBucket(productData);
        const removedItem = this.userProductList.splice(itemIndex, 1)[0] as any;
        this.updateBadgeCount();
        this.updateTotalAmount();
        this.addedItemNotify$.next(this.userProductList);
        this.setUserProductList();
        let inventoryItemIndex = this.findItemInInventoryBucket(productData);
        this.productList[inventoryItemIndex].stock += removedItem?.selectedQty;
        this.productList[inventoryItemIndex].selectedQty = 0;
        console.log("stock = removeItemFromCart =>", this.productList[inventoryItemIndex].stock);
        this.productListNotify$.next(this.productList);
        this.setInventoryProductList();
    }

    private getTotalCountOfCart() {
        return this.userProductList.reduce((a, item) => {
            return a + item.selectedQty;
        }, 0);
    }

    private updateBadgeCount() {
        const cartCount = this.getTotalCountOfCart();
        this.updateBadgeCount$.next(cartCount);
    }

    private getTotalAmountOfCart() {
        return this.userProductList.reduce((a, item) => {
            return a + (item.price * item.selectedQty);
        }, 0);
    }

    private updateTotalAmount() {
        const toatlAmount = this.getTotalAmountOfCart();
        this.totalAmount$.next(toatlAmount);
    }

    public setUserProductList(){
        localStorage.setItem('CartItems',JSON.stringify(this.userProductList));
    }

    public setInventoryProductList(){
        localStorage.setItem('InvetoryData',JSON.stringify(this.productList));
    }

    public setItemView (ListView: string) {
        localStorage.setItem('ListView', JSON.stringify(ListView));
    }

    private setUserProductListOnLoad() {
        let CartItems: Array<any> = JSON.parse(localStorage.getItem('CartItems') || '[]');
        this.userProductList = CartItems;
        this.addedItemNotify$.next(this.userProductList);
    }

    public updateInventoryListOnLoad(ProductListData:any){
        if(this.userProductList && this.userProductList.length > 0){
            ProductListData.map((item:any)=>{
                this.userProductList.map((cartItem:any)=>{
                    if(cartItem.id == item.id){
                        console.log("cartItem===>",cartItem)
                        item.selectedQty = cartItem.numberOfItems;
                    }
                });
            });
        }
        
        this.productListNotify$.next(this.productList);
        this.setInventoryProductList();
    }

    isFewQtyLeft(cartItem: any) {
        let inventoryItemIndex = this.findItemInInventoryBucket(cartItem);
        if(inventoryItemIndex) {
            return !!(this.productList[inventoryItemIndex].stock < 6);
        }

        return false;
    }
}