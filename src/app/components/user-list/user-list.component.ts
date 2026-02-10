import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { SearchFilterComponent } from '../search-filter/search-filter.component';

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [CommonModule, SearchFilterComponent],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
    users: User[] = [];
    filteredUsers: User[] = [];
    cities: string[] = [];
    loading = true;
    error: string | null = null;
    searchTerm = '';
    selectedCity = '';

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.userService.getUsers().subscribe({
            next: (users) => {
                this.users = users;
                this.filteredUsers = users;
                this.cities = [...new Set(users.map(user => user.address.city))].sort();
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Failed to load users. Please try again later.';
                this.loading = false;
            }
        });
    }

    onSearch(term: string): void {
        this.searchTerm = term.toLowerCase();
        this.applyFilters();
    }

    onCityFilter(city: string): void {
        this.selectedCity = city;
        this.applyFilters();
    }

    applyFilters(): void {
        this.filteredUsers = this.users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(this.searchTerm) ||
                user.email.toLowerCase().includes(this.searchTerm);
            const matchesCity = !this.selectedCity || user.address.city === this.selectedCity;
            return matchesSearch && matchesCity;
        });
    }

    navigateToDetails(userId: number): void {
        this.router.navigate(['/user', userId]);
    }

    getInitials(name: string): string {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }

    getAvatarColor(id: number): string {
        const colors = [
            '#6366f1', // Indigo
            '#10b981', // Emerald
            '#f59e0b', // Amber
            '#ef4444', // Red
            '#3b82f6', // Blue
            '#8b5cf6', // Violet
            '#ec4899', // Pink
        ];
        return colors[id % colors.length];
    }
}
