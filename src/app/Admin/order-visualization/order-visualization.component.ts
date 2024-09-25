import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { ProductService } from '../../Service/product.service';
import { AdminService } from '../../Service/admin.service';

@Component({
  selector: 'app-order-visualization',
  standalone: true,
  imports: [],
  templateUrl: './order-visualization.component.html',
  styleUrls: ['./order-visualization.component.css']
})
export class OrderVisualizationComponent implements OnInit {
  @ViewChild('lineChart') private lineChartRef!: ElementRef;
  orderDetails: any = [];
  isOrderIsEmpty: boolean = false;
  isLoading: boolean = false;
  chart!: Chart;

  constructor(private productService: ProductService, private adminService: AdminService) {
    Chart.register(...registerables);
  }

  status: string = "delivered";

  ngOnInit(): void {
    this.getOrderDetails(this.status);
  }

  getOrderDetails(status: any) {
    this.isLoading = true;
    this.productService.getAllOrderDetails(status).subscribe(
      response => {
        this.isLoading = false;
        this.orderDetails = response;
        if (this.orderDetails.length === 0) {
          this.isOrderIsEmpty = true;
        } else {
          this.isOrderIsEmpty = false;
          this.createChart();
        }
      },
      error => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  createChart() {
    const canvas = this.lineChartRef.nativeElement as HTMLCanvasElement;

    if (this.chart) {
      this.chart.destroy();
    }

    // Group orders by month and sum the prices
    const monthlyData = this.groupOrdersByMonth(this.orderDetails);

    this.chart = new Chart(canvas.getContext('2d')!, {
      type: 'line' as ChartType,
      data: {
        labels: monthlyData.map(data => data.month), // Months as labels
        datasets: [
          {
            label: 'Total Order Value by Month',
            data: monthlyData.map(data => data.totalPrice), // Sum of prices
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Month'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Price'
            }
          }
        }
      } as ChartOptions
    });
  }

  // Helper function to group orders by month and sum their prices
  groupOrdersByMonth(orders: any[]): { month: string, totalPrice: number }[] {
    const groupedData: { [key: string]: number } = {};

    orders.forEach(order => {
      const createdDate = new Date(order.createdDate);
      const orderMonth = `${createdDate.toLocaleString('default', { month: 'long' })} ${createdDate.getFullYear()}`; // Format as "Month Year"
      if (orderMonth) {
        if (!groupedData[orderMonth]) {
          groupedData[orderMonth] = 0;
        }
        groupedData[orderMonth] += order.amount; // Sum the prices
      }
    });

    console.log(groupedData);



    // Convert grouped data into an array of objects
    return Object.keys(groupedData).map(month => ({
      month,
      totalPrice: groupedData[month]
    }));
  }
}
