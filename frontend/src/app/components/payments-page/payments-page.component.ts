import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { BankService } from '../../services/bank.service';
import { MatButton } from '@angular/material/button';
import { debounceTime, fromEvent, Subject, takeUntil, tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'homebanking-payments-page',
    templateUrl: './payments-page.component.html',
    styleUrls: ['./payments-page.component.scss'],
})
export class PaymentsPageComponent implements AfterViewInit, OnDestroy {
    private readonly destroy$ = new Subject();

    payments: any;
    dataSource: any = new MatTableDataSource();
    displayedColumns: string[] = [
        'createdAt',
        'description',
        'transactionValue',
        'newWalletValue',
    ];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild('paymentsRefresh') refreshButton!: MatButton;
    paymentButtonEnabled = true;

    referenceForm: FormControl = new FormControl();
    entityForm: FormControl = new FormControl();
    fundsForm: FormControl = new FormControl();

    constructor(private bankService: BankService, private router: Router) {}

    ngAfterViewInit() {
        //Prevents button click spam
        fromEvent(this.refreshButton._elementRef.nativeElement, 'click')
            .pipe(
                debounceTime(250),
                tap(() => {
                    this.refreshPayments();
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
        this.refreshPayments();
    }

    goToHome() {
        this.router.navigateByUrl('home');
    }

    makePayment() {
        this.paymentButtonEnabled = false;
        this.bankService
            .makePayment(
                this.entityForm.value,
                this.referenceForm.value,
                this.fundsForm.value
            )
            .subscribe({
                next: () => {
                    this.refreshPayments();
                    this.referenceForm.reset();
                    this.entityForm.reset();
                    this.fundsForm.reset();
                    this.paymentButtonEnabled = true;
                },
                error: (error) => {
                    this.paymentButtonEnabled = true;
                    this.fundsForm.reset();
                    alert(error.error.feedback);
                },
            });
    }

    refreshPayments() {
        this.bankService.getPayments().subscribe((data: any) => {
            this.payments = this.mapPayments(<any[]>data.payments);
            this.dataSource = new MatTableDataSource<any>(this.payments);
            this.dataSource.paginator = this.paginator;
            this.paginator.firstPage();
        });
    }

    //Map payment objects to better display on the table
    private mapPayments(payments: any) {
        return payments.map((payment: any) => {
            payment.createdAt = new Date(payment.createdAt).toLocaleString();
            payment.transactionValue =
                payment.transactionValue.toLocaleString();
            payment.newWalletValue = payment.newWalletValue.toLocaleString();
            return payment;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next('');
        this.destroy$.complete();
    }
}
