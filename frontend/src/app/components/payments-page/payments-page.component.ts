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

    referenceForm: FormControl = new FormControl();
    entityForm: FormControl = new FormControl();
    fundsForm: FormControl = new FormControl();

    @ViewChild('paymentsRefresh') refreshButton!: MatButton;

    constructor(private bankService: BankService, private router: Router) {}

    ngAfterViewInit() {
        fromEvent(this.refreshButton._elementRef.nativeElement, 'click')
            .pipe(
                debounceTime(250),
                tap(() => {
                    console.log('refreshing test');
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
                },
                error: (error) => {
                    alert(error.error.feedback);
                    this.fundsForm.reset();
                }
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

    mapPayments(payments: any) {
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
