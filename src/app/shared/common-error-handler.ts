import {ErrorHandler, Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class CommonErrorHandler implements ErrorHandler {

  constructor(private snackBar: MatSnackBar) {}

  handleError(error: any): void {
    console.error(error);
    /*
    this.snackBar.open(
      error.message,
      undefined,
      {duration: 3000, panelClass: ['sb-error']}
    );
    */
  }



}
