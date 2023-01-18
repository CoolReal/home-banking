import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, Subject, takeUntil, tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatButton } from '@angular/material/button';
import { BankService } from '../../services/bank.service';

@Component({
    selector: 'homebanking-movements',
    templateUrl: './movements.component.html',
    styleUrls: ['./movements.component.scss'],
})
export class MovementsComponent implements OnDestroy, AfterViewInit {
    private readonly destroy$ = new Subject();
    movements: any;
    dataSource: any = new MatTableDataSource();
    displayedColumns: string[] = [
        'createdAt',
        'description',
        'transactionValue',
        'newWalletValue',
    ];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild('movementRefresh') refreshButton!: MatButton;

    constructor(private bankService: BankService) {}

    ngAfterViewInit() {
        fromEvent(this.refreshButton._elementRef.nativeElement, 'click')
            .pipe(
                debounceTime(250),
                tap(() => {
                    this.refreshMovements();
                }),
                takeUntil(this.destroy$)
            )
            .subscribe();
        this.refreshMovements();
    }

    refreshMovements() {
        this.bankService.getMovements().subscribe((data: any) => {
            this.movements = this.mapMovements(<any[]>data.movementList);
            this.dataSource = new MatTableDataSource<any>(this.movements);
            this.dataSource.paginator = this.paginator;
            this.paginator.firstPage();
        });
    }

    // Receives the entire movement list, joins all types of movements, makes their data better suited for table reading and then sorts by most recent
    private mapMovements(movementList: any) {
        const internalMovements = movementList.internalMovements;
        const transfers = movementList.transfers;
        const payments = movementList.payments;
        let allMovements = internalMovements.concat(transfers).concat(payments);
        allMovements = allMovements.map((movement: any) => {
            movement.newDate = new Date(movement.createdAt);
            movement.createdAt = movement.newDate.toLocaleString();
            return movement;
        });
        allMovements.sort((a: any, b: any) => {
            return b.newDate.getTime() - a.newDate.getTime();
        });
        return allMovements;
    }

    ngOnDestroy(): void {
        this.destroy$.next('');
        this.destroy$.complete();
    }
}
