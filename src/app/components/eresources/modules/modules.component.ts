import { AuthService } from "./../../../services/auth.service";
import { ModulesService } from "./../../../services/modules.service";
import { MODULE } from "./../../../models/module.model";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-modules",
  templateUrl: "./modules.component.html",
  styleUrls: ["./modules.component.css"]
})
export class ModulesComponent implements OnInit {
  constructor(
    private modulesService: ModulesService,
    private _snackBar: MatSnackBar,
    private authService:AuthService
  ) {}

  modules: MODULE = new MODULE();
  ngOnInit() {
    this.authService.isUserLoggedIn("/modules");
  }

  onSubmit() {
    console.log("calling");
    this.modulesService.addModule(this.modules).subscribe(data => {
      this._snackBar.open(data.message, "close", { duration: 5000 });
    });
  }

  isFilesUploaded() {
    if (!this.modules.module_pdf) {
      this._snackBar.open("Please upload module Pdf", "close", {
        duration: 5000
      });
      return false;
    }
    return true;
  }
  onPdfPicked(file: FileList) {
    this.modules.module_pdf = file.item(0);
    // var reader = new FileReader();
    // reader.onload = (event: any) => {
    //   this.modules.module_link = event.target.result;
    // };
    // reader.readAsDataURL(this.modules.module_pdf);
  }
}
