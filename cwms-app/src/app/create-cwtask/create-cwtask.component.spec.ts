import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCwtaskComponent } from './create-cwtask.component';
import { CwtaskService } from '../cwtask.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';  // Used to mock observables
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Mock CwtaskService
class MockCwtaskService {
  creatCwTask() {
    return of({});  // Mock the response
  }
}

// Mock Router
class MockRouter {
  navigate() {
    return true; // Mock navigate method to avoid actual routing
  }
}

describe('CreateCwtaskComponent', () => {
  let component: CreateCwtaskComponent;
  let fixture: ComponentFixture<CreateCwtaskComponent>;
  let mockCwtaskService: CwtaskService;
  let mockRouter: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, CreateCwtaskComponent],
      providers: [
        { provide: CwtaskService, useClass: MockCwtaskService },  // Use mock service
        { provide: Router, useClass: MockRouter },  // Use mock router
        DatePipe  // Use actual DatePipe for date formatting
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCwtaskComponent);
    component = fixture.componentInstance;
    mockCwtaskService = TestBed.inject(CwtaskService);
    mockRouter = TestBed.inject(Router);
    fixture.detectChanges();  // Initialize component
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentDateTime with formatted current date', () => {
    const now = new Date();
    const expectedDateTime = now.toISOString().slice(0, 16); // expected format for datetime-local
    expect(component.currentDateTime).toBe(expectedDateTime);
  });

  it('should call saveCWTask() and navigate to /cwtasks on successful save', () => {
    // Spy on goToCwTasksList to check if it was called
    spyOn(component, 'goToCwTasksList');
    // Spy on CwtaskService to check if creatCwTask() is called
    spyOn(mockCwtaskService, 'creatCwTask').and.callThrough();

    // Set up mock data for cwTask
    component.cwTask = {id: 0, strTitle:'',strDescription:'' , strStatus: 'Active' ,dueDateTime: new Date() };

    component.saveCWTask();

    // Check if creatCwTask() was called
    expect(mockCwtaskService.creatCwTask).toHaveBeenCalled();
    // Check if goToCwTasksList() was called
    expect(component.goToCwTasksList).toHaveBeenCalled();
  });

  it('should call goToCwTasksList() when cancel() is invoked', () => {
    spyOn(mockRouter, 'navigate'); // Spy on the navigate method

    component.cancel();

    // Check if navigate() was called with the correct URL
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/cwtasks']);
  });

  it('should return true when dueDateTime is in the past', () => {
    component.cwTask.dueDateTime = new Date(Date.now() - 3600 * 1000);  // 1 hour ago
    expect(component.isDueDateInPast()).toBeTrue();
  });

  it('should return false when dueDateTime is not in the past', () => {
    component.cwTask.dueDateTime = new Date(Date.now() + 3600 * 1000);  // 1 hour in the future
    expect(component.isDueDateInPast()).toBeFalse();
  });

  it('should return false when dueDateTime is not set', () => {
    component.cwTask.dueDateTime = null as any;
    expect(component.isDueDateInPast()).toBeFalse();
  });
});







