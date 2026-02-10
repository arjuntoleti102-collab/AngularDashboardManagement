import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-search-filter',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './search-filter.component.html',
    styleUrl: './search-filter.component.css'
})
export class SearchFilterComponent implements OnInit {
    @Input() cities: string[] = [];
    @Output() searchChange = new EventEmitter<string>();
    @Output() cityChange = new EventEmitter<string>();

    searchControl = new FormControl('');
    cityControl = new FormControl('');

    ngOnInit(): void {
        this.searchControl.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(value => {
            this.searchChange.emit(value || '');
        });

        this.cityControl.valueChanges.subscribe(value => {
            this.cityChange.emit(value || '');
        });
    }
}
