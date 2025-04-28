import { Component, OnInit } from '@angular/core';
import { Cwtask } from '../cwtask';
import { FormsModule } from '@angular/forms';
import { CwtaskService } from '../cwtask.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-cwtask',
  imports: [FormsModule,CommonModule],
  templateUrl: './create-cwtask.component.html',
  styleUrl: './create-cwtask.component.css',
  providers: [DatePipe]
})
export class CreateCwtaskComponent implements OnInit{
   // component to create new task
  cwTask : Cwtask = new Cwtask();
  statuses: String[] = ['Active', 'Inactive', 'Completed'];
  currentDateTime: string = '';
  
  constructor(private cwTaskService: CwtaskService, 
              private router : Router , 
              private datePipe: DatePipe){}
  ngOnInit(): void {
    const now = new Date();
    this.currentDateTime = now.toISOString().slice(0,16); // Format for datetime-local
  }
  // save task
  saveCWTask(){
       this.cwTaskService.creatCwTask(this.cwTask).subscribe(data =>{
       this.goToCwTasksList();
      });
      
  }
  //go to show list of all tasks component
  goToCwTasksList()
  {
      this.router.navigate(['/cwtasks']);
  }

  onSubmit(){
    this.saveCWTask(); 
  }
  // user can not select date and time in past
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
