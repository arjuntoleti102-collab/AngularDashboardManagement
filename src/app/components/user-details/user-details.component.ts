import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-user-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-details.component.html',
    styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
    user: User | null = null;
    loading = true;
    error: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private location: Location
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.userService.getUserById(+id).subscribe({
                next: (user) => {
                    this.user = user;
                    this.loading = false;
                },
                error: (err) => {
                    this.error = 'Failed to load user details.';
                    this.loading = false;
                }
            });
        }
    }

    goBack(): void {
        this.location.back();
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

    getHandle(name: string): string {
        return name.toLowerCase().replace(/\s+/g, '');
    }
}
