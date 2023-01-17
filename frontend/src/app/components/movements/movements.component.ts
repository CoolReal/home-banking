import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
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
export class MovementsComponent implements OnInit, OnDestroy, AfterViewInit {
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

    ngOnInit() {
        this.refreshMovements();
    }

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
    }

    refreshMovements() {
        this.bankService.getMovements().subscribe((data: any) => {
            this.movements = this.mapMovements(
                <any[]>data.movementList.movements
            );
            this.dataSource = new MatTableDataSource<any>(this.movements);
            this.dataSource.paginator = this.paginator;
            this.paginator.firstPage();
        });
    }

    private mapMovements(movements: any) {
        return movements.map((movement: any) => {
            movement.createdAt = new Date(movement.createdAt).toLocaleString();
            movement.transactionValue =
                movement.transactionValue.toLocaleString();
            movement.newWalletValue = movement.newWalletValue.toLocaleString();
            return movement;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next('');
        this.destroy$.complete();
    }
}
