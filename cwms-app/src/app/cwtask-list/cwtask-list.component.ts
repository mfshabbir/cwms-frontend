import { Component, OnInit } from '@angular/core';
import { Cwtask } from '../cwtask';
import { CommonModule } from '@angular/common';
import { CwtaskService } from '../cwtask.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cwtask-list',
  imports: [CommonModule],
  templateUrl: './cwtask-list.component.html',
  styleUrl: './cwtask-list.component.css'
})
export class CwtaskListComponent implements OnInit {
  // component to show list all of tasks
  cwtasks!: Cwtask[] 
  constructor(private cwtaskService : CwtaskService,
              private router : Router  ){}
  ngOnInit(): void {
        this.getCWTasks();
  }
  private getCWTasks(){
    this.cwtaskService.getCWTasksList().subscribe( data => {
        this.cwtasks = data;
    });
  }
  //called from update component
  updateCwTask(id: number)
  {
      this.router.navigate(['update-cwtask',id]);
  }
  //called from delete component
  deleteCwTask(id: number)
  {
    if(confirm('Are you sure you want to delete this Task'))
    this.cwtaskService.deleteCWTaskById(id).subscribe( data => {
      alert('Task deleted successfully')
      this.getCWTasks();
      })
  }
  //called from cw task list component
  detailsCwTask(id: number)
  {
      this.router.navigate(['cwtask-details',id]);
  }


}
