import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CwtaskListComponent } from './cwtask-list/cwtask-list.component';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule, 
        RouterOutlet, 
        CwtaskListComponent, 
        RouterLink, 
        CommonModule,  
        AppComponent   
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: '1' } } }  // Mock ActivatedRoute
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Initialize component
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have title as "Case Worker Tasks Management Sysem"', () => {
    expect(component.title).toBe('Case Worker Tasks Management Sysem');
  });
});

