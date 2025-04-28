import { Component, OnInit } from '@angular/core';
import { CwtaskService } from '../cwtask.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Cwtask } from '../cwtask';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-cwtask',
  imports: [FormsModule,CommonModule],
  templateUrl: './update-cwtask.component.html',
  styleUrl: './update-cwtask.component.css'
})
export class UpdateCwtaskComponent implements OnInit {
  id!:number;
  cwTask: Cwtask = new Cwtask();
  statuses: String[] = ['Active', 'Inactive', 'Completed'];
  selectedStatus: String = ''; 
  currentDateTime: string = '';
  constructor(private cwtaskService : CwtaskService,
            private route: ActivatedRoute,
            private router : Router  ){}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id)
    {
      this.cwtaskService.getCWTaskById(this.id).subscribe( data =>{
        this.cwTask = data;
        this.selectedStatus = this.cwTask.strStatus;
        const now = new Date();
      this.currentDateTime = now.toISOString().slice(0,16); // Format for datetime-local
      });
    }
  }
  onSubmit(){
    this.cwTask.strStatus = this.selectedStatus;
    this.cwtaskService.updateCWTaskById(this.id, this.cwTask).subscribe( data => {
      this.goToCwTasksList();
    })
  }
  goToCwTasksList()
  {
      this.router.navigate(['/cwtasks']);
  }
  isDueDateInPast(): boolean {
    if (!this.cwTask.dueDateTime) {
      return false; 
    }
    
    const selectedDateTime = new Date(this.cwTask.dueDateTime);
    const now = new Date();
  
    return selectedDateTime.getTime() < now.getTime();
  }
  cancel()
  {
    this.goToCwTasksList();
  }

}
