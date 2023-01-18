import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { BankService } from '../../services/bank.service';
import { debounceTime, fromEvent, Subject, takeUntil, tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'homebanking-transfers-page',
    templateUrl: './transfers-page.component.html',
    styleUrls: ['./transfers-page.component.scss'],
})
export class TransfersPageComponent implements AfterViewInit {
    private readonly destroy$ = new Subject();

    transfers: any;
    dataSource: any = new MatTableDataSource();
    displayedColumns: string[] = [
        'createdAt',
        'description',
        'transactionValue',
        'newWalletValue',
    ];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild('transfersRefresh') refreshButton!: MatButton;

    recipientNameForm: FormControl = new FormControl();
    recipientEmailForm: FormControl = new FormControl();
    descriptionForm: FormControl = new FormControl();
    walletIDForm: FormControl = new FormControl();
    fundsForm: FormControl = new FormControl();

    constructor(private bankService: BankService, private router: Router) {}

    ngAfterViewInit() {
        fromEvent(this.refreshButton._elementRef.nativeElement, 'click')
            .pipe(
                debounceTime(250),
                tap(() => {
                    this.refreshTransfers();
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
        this.refreshTransfers();
    }

    goToHome() {
        this.router.navigateByUrl('home');
    }

    makeTransfer() {
        this.bankService
            .makeTransfer(this.walletIDForm.value, this.fundsForm.value, {
                recipientName: this.recipientNameForm.value,
                recipientEmail: this.recipientEmailForm.value,
                description: this.descriptionForm.value,
            })
            .subscribe({
                next: () => {
                    this.refreshTransfers();
                    this.descriptionForm.reset();
                    this.recipientEmailForm.reset();
                    this.walletIDForm.reset();
                    this.descriptionForm.reset();
                    this.fundsForm.reset();
                },
                error: (error) => {
                    alert(error.error.feedback);
                    this.fundsForm.reset();
                },
            });
    }

    refreshTransfers() {
        this.bankService.getTransfers().subscribe((data: any) => {
            this.transfers = this.mapTransfers(<any[]>data.transfers);
            this.dataSource = new MatTableDataSource<any>(this.transfers);
            this.dataSource.paginator = this.paginator;
            this.paginator.firstPage();
        });
    }

    mapTransfers(transfers: any) {
        return transfers.map((transfer: any) => {
            transfer.createdAt = new Date(transfer.createdAt).toLocaleString();
            transfer.transactionValue =
                transfer.transactionValue.toLocaleString();
            transfer.newWalletValue = transfer.newWalletValue.toLocaleString();
            return transfer;
        });
    }
}
