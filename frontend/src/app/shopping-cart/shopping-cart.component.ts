import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  subtotal: number = 0;
  itemTable: FormGroup;
  control: FormArray;
  touchedRows: any;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.itemTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.addRow();
  }

  ngAfterOnInit(): void {
    this.control = this.itemTable.get('tableRows') as FormArray;
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      name: [''],
      price: [''],
      isEditable: [true]
    });
  }

  addRow(): void {
    const control = this.itemTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control = this.itemTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  confirmRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  saveItemDetails() {
    console.log(this.itemTable.value);
  }

  get formControls() {
    const control = this.itemTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.itemTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls
      .filter(row => row.touched)
      .map(row => row.value);
    this.calculateSubtotal();
    console.log(this.touchedRows);
  }

  
  calculateSubtotal() {
    /*
    const rows: FormArray = this.itemTable.getRawValue()["tableRows"];
    for (let row in rows) {
      console.log(row["price"]);
    }*/
    this.subtotal = 0;
    const parsedJson = JSON.parse(JSON.stringify(this.itemTable.value))["tableRows"];
    let prices: number[] = [];
    console.log(parsedJson);
    for (let key in parsedJson) {
      this.subtotal += parsedJson[key]["price"];
    }
  }
}
