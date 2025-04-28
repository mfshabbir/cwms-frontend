import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateCwtaskComponent } from './update-cwtask.component';
import { CwtaskService } from '../cwtask.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('UpdateCwtaskComponent', () => {
  let component: UpdateCwtaskComponent;
  let fixture: ComponentFixture<UpdateCwtaskComponent>;
  let mockCwtaskService: jasmine.SpyObj<CwtaskService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    mockCwtaskService = jasmine.createSpyObj('CwtaskService', ['getCWTaskById', 'updateCWTaskById']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRoute = jasmine.createSpyObj('ActivatedRoute', [], { snapshot: { params: { id: 1 } } });

    await TestBed.configureTestingModule({
      providers: [
        { provide: CwtaskService, useValue: mockCwtaskService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCwtaskComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct ID and task data', () => {
    const mockTask = { id: 1, strTitle:'title', strDescription:'des',strStatus: 'Active', dueDateTime: new Date('2025-04-28T12:00:00Z') };
    mockCwtaskService.getCWTaskById.and.returnValue(of(mockTask));

    component.ngOnInit();

    expect(component.id).toBe(1);
    expect(component.cwTask).toEqual(mockTask);
    expect(component.selectedStatus).toBe('Active');
  });

  it('should navigate to task list when cancel is invoked', () => {
    component.cancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/cwtasks']);
  });

  it('should determine if due date is in the past', () => {
    component.cwTask.dueDateTime = new Date('2024-01-01T12:00:00Z');
    expect(component.isDueDateInPast()).toBeTrue();

    component.cwTask.dueDateTime = new Date('2030-01-01T12:00:00Z');
    expect(component.isDueDateInPast()).toBeFalse();
  });

  it('should call update service and navigate on form submit', () => {
    component.id = 1;
    component.cwTask = { id: 1, strTitle:'title', strDescription:'des',strStatus: 'Active', dueDateTime: new Date('2025-04-28T12:00:00Z') };
    mockCwtaskService.updateCWTaskById.and.returnValue(of({}));

    component.onSubmit();

    expect(mockCwtaskService.updateCWTaskById).toHaveBeenCalledWith(1, component.cwTask);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/cwtasks']);
  });
});