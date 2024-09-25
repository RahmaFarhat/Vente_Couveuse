import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../Service/admin.service';
import { response } from 'express';
import { User } from '../../Interface/user';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users: any[] = [];

  constructor(private adminService: AdminService) {
    Chart.register(...registerables);

  }

  ngOnInit(): void {
    this.getAllUsers();
  }
  roleCounts = { ADMIN: 0, USER: 0, CUSTOMER: 0 };
  totalUser: number = 0

  getAllUsers(): void {
    this.adminService.getAllUsers().subscribe(
      response => {
        this.users = response
        this.totalUser = this.users.length;

        // Calculate the role distribution
        this.users.forEach(user => {
          let isAdmin = false;
          let isUser = false;
          user.roles.forEach((role: string) => {
            if (role.includes("ADMIN")) {
              this.roleCounts.ADMIN++;
              isAdmin = true;  // Mark as Admin

            } else if (role.includes("USER")) {
              this.roleCounts.USER++;
              isUser = true
            }
          });
          if (isUser && !isAdmin) {
            this.roleCounts.CUSTOMER++;
          }
        });

        this.renderChart();  // Render chart after data is processed

      },
      error => {
        console.error("Error in getting data", error);
      }
    );
  }

  // Function to render the bar chart
  renderChart(): void {
    const chart = new Chart('userChart', {
      type: 'bar',
      data: {
        labels: ['ADMIN', 'USER', 'CUSTOMER'],
        datasets: [{
          label: 'Number of Users',
          data: [this.roleCounts.ADMIN, this.roleCounts.USER, this.roleCounts.CUSTOMER],
          backgroundColor: ['#1f77b4', '#ff5733', '#97f037'],  // Color for ADMIN and USER bars
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
