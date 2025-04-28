import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CwtaskListComponent } from './cwtask-list.component';
import { CwtaskService } from '../cwtask.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Cwtask } from '../cwtask';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('CwtaskListComponent', () => {
  let component: CwtaskListComponent;
  let fixture: ComponentFixture<CwtaskListComponent>;
  let cwtaskServiceMock: jasmine.SpyObj<CwtaskService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CwtaskService', ['getCWTasksList', 'deleteCWTaskById']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, CommonModule],
      declarations: [], // No need to declare since it's a standalone component
      providers: [
        { provide: CwtaskService, useValue: spy },
        { provide: Router, useValue: routerSpy },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CwtaskListComponent);
    component = fixture.componentInstance;
    cwtaskServiceMock = TestBed.inject(CwtaskService) as jasmine.SpyObj<CwtaskService>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Mock the service method to return a list of tasks
    const mockCwtasks: Cwtask[] = [
      { id: 1, strTitle: 'Task 1', strDescription: 'Task 1 description', strStatus: 'Active', dueDateTime: new Date('2025-05-01T10:00:00') },
      { id: 2, strTitle: 'Task 2', strDescription: 'Task 2 description', strStatus: 'Inactive', dueDateTime: new Date('2025-06-01T10:00:00') }
    ];
    cwtaskServiceMock.getCWTasksList.and.returnValue(of(mockCwtasks));
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should fetch the list of CW tasks on init', () => {
    fixture.detectChanges();
    expect(cwtaskServiceMock.getCWTasksList).toHaveBeenCalled();
    expect(component.cwtasks.length).toBe(2);  // Since we mock two tasks
  });

  it('should navigate to update-cwtask on updateCwTask()', () => {
    const taskId = 1;
    component.updateCwTask(taskId);
    expect(routerMock.navigate).toHaveBeenCalledWith(['update-cwtask', taskId]);
  });

  it('should delete a task and refresh the task list', () => {
    const taskId = 1;
    cwtaskServiceMock.deleteCWTaskById.and.returnValue(of({}));  // Simulate successful deletion
    
    spyOn(window, 'alert');  // Spy on alert to confirm it gets called
    component.deleteCwTask(taskId);

    // Confirm alert is shown
    expect(window.alert).toHaveBeenCalledWith('Task deleted successfully');
    // Ensure getCWTasks is called to refresh the task list after deletion
    expect(cwtaskServiceMock.getCWTasksList).toHaveBeenCalled();
  });

  it('should navigate to task details on detailsCwTask()', () => {
    const taskId = 1;
    component.detailsCwTask(taskId);
    expect(routerMock.navigate).toHaveBeenCalledWith(['cwtask-details', taskId]);
  });
});
