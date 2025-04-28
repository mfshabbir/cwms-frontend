import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsCwtaskComponent } from './details-cwtask.component';
import { CwtaskService } from '../cwtask.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';  // Used to mock observables
import { CommonModule } from '@angular/common';

// Mock CwtaskService
class MockCwtaskService {
  getCWTaskById(id: number) {
    return of({ id, strTitle: 'Test Task', strDescription: 'Test Task Description', strStatus: 'Active', dueDateTime: new Date() });  // Mock data
  }
}

// Mock ActivatedRoute
class MockActivatedRoute {
  snapshot = { params: { id: 1 } };  // Mock ID parameter
}

// Mock Router
class MockRouter {
  navigate() {
    return true;  // Mock navigate method to avoid actual routing
  }
}

describe('DetailsCwtaskComponent', () => {
  let component: DetailsCwtaskComponent;
  let fixture: ComponentFixture<DetailsCwtaskComponent>;
  let mockCwtaskService: CwtaskService;
  let mockRouter: Router;
  let mockActivatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, DetailsCwtaskComponent],  // Include the standalone component
      providers: [
        { provide: CwtaskService, useClass: MockCwtaskService },  // Use mock service
        { provide: Router, useClass: MockRouter },  // Use mock router
        { provide: ActivatedRoute, useClass: MockActivatedRoute },  // Use mock ActivatedRoute
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCwtaskComponent);
    component = fixture.componentInstance;
    mockCwtaskService = TestBed.inject(CwtaskService);
    mockRouter = TestBed.inject(Router);
    mockActivatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();  // Initialize component
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch CWTask data on initialization', () => {
    spyOn(mockCwtaskService, 'getCWTaskById').and.callThrough();
    
    component.ngOnInit();

    expect(mockCwtaskService.getCWTaskById).toHaveBeenCalledWith(1);  // ID should be 1 from mock ActivatedRoute
    expect(component.cwTask.strTitle).toBe('Test Task');
    expect(component.cwTask.strDescription).toBe('Test Task Description');
  });
});
