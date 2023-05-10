import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountServiceService } from '../services/account-service.service';
import { accountServiceList } from '../models/accountService';
import { account, loginAccount } from '../models/account';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss'],
})
export class ManageAccountComponent {
  /**
   *
   */
  constructor(
    private modalService: NgbModal,
    private accountService: AccountServiceService,
    private router: Router
  ) {}

  //data to display to table
  data = new accountServiceList();
  ngOnInit() {
    this.accountService.getUser().subscribe((repon) => {
      if (repon.success) {
        this.data.data = repon.data;
      }
    });
  }
  //check add new account or edit account
  isAddAccount = false;
  //edit
  accountEdit!: account;
  //open model to add account
  openVerticallyCentered2(content: any) {
    this.passwordChange = '';
    this.isAddAccount = true;
    this.accountEdit = new account();
    this.modalService.open(content, { centered: true });
  }
  //confirm add account
  addAccount(email: string, userName: string, password: string) {
    const newAccount = new loginAccount();
    newAccount.userName = email;
    newAccount.nameDisplay = userName;
    newAccount.passwordHash = password;
    this.accountService
      .RegisterUser(email, userName, password)
      .subscribe((acc) => {
        if (acc.success) {
          this.accountService.getUser().subscribe((repon) => {
            if (repon.success) {
              this.data.data = repon.data;
            }
          });
        } else {
          console.log('add account fails');
        }
      });
  }

  //open model to edit account
  openVerticallyCentered(content: any, account: account) {
    this.passwordChange = '';
    this.isAddAccount = false;
    this.ischangePassword = false;
    this.accountEdit = account;
    console.log(this.accountEdit);
    //mở chi tiết
    this.modalService.open(content, { centered: true });
  }
  //confirm edit account
  editAcoount(email: string, userName: string, password: string) {
    if (this.ischangePassword) {
      this.accountEdit.userName = email;
      this.accountEdit.nameDisplay = userName;
      this.accountEdit.passwordHash = password;
    } else if (!this.ischangePassword) {
      this.accountEdit.userName = email;
      this.accountEdit.nameDisplay = userName;
      alert('Chức năng thay đổi mật khẩu của người dùng chưa được cập nhật');
    }
    console.log(this.accountEdit);
  }

  //open model to delete
  openScrollableContent(longContent: any, account: account) {
    this.accountEdit = account;
    this.modalService.open(longContent, { scrollable: true });
    console.log(account);
  }

  //confirm delete account
  deleteAccount(){
    this.accountService.deleteUser(this.accountEdit.id).subscribe(
      (repon)=>{
        if(repon.success){
          this.data.data = repon.data;
        }
      }
    );
  }

  //check box confirm change pass word
  ischangePassword = false;
  changePassword() {
    this.ischangePassword = !this.ischangePassword;
    console.log(this.ischangePassword);
  }
  //save temp password
  passwordChange = '';
  goBack() {
    this.router.navigate(['/']);
  }

  //reload data
  reloadData() {
    this.accountService.getUser().subscribe((repon) => {
      if (repon.success) {
        this.data.data = repon.data;
      }
    });
  }
  
}
