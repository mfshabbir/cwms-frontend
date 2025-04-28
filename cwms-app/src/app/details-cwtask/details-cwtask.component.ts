import { Component, OnInit } from '@angular/core';
import { Cwtask } from '../cwtask';
import { CwtaskService } from '../cwtask.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-cwtask',
  imports: [CommonModule],
  templateUrl: './details-cwtask.component.html',
  styleUrl: './details-cwtask.component.css'
})
export class DetailsCwtaskComponent implements OnInit{
   // component to show details of tasks
  id!:number;
  cwTask: Cwtask = new Cwtask() ;
  constructor (private cwtaskService : CwtaskService,
    private route: ActivatedRoute,
    private router : Router  ){}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.cwtaskService.getCWTaskById(this.id).subscribe( data =>{
      this.cwTask = data;
    });
  }

}
