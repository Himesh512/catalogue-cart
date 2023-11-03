import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonService } from "./services/common.service";

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        CommonService
    ],
    exports: []
})

export class ShareModule { }