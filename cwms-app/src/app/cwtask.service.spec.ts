import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CwtaskService } from './cwtask.service';
import { Cwtask } from './cwtask';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('CwtaskService', () => {
  let service: CwtaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule to mock HTTP calls
      providers: [CwtaskService]
    });
    service = TestBed.inject(CwtaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure no outstanding HTTP requests are made after each test
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the list of CW tasks', () => {
    const mockCwtasks: Cwtask[] = [
      { id: 1, strTitle: 'Task 1', strDescription: 'Description 1', strStatus: 'Active', dueDateTime: new Date() },
      { id: 2, strTitle: 'Task 2', strDescription: 'Description 2', strStatus: 'Inactive', dueDateTime: new Date() }
    ];

    service.getCWTasksList().subscribe(cwtasks => {
      expect(cwtasks.length).toBe(2);
      expect(cwtasks).toEqual(mockCwtasks);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/cwtasks');
    expect(req.request.method).toBe('GET');
    req.flush(mockCwtasks);  // Simulate the response
  });

  it('should create a CW task', () => {
    const newCwtask: Cwtask = { id: 3, strTitle: 'New Task', strDescription: 'New Task Description', strStatus: 'Active', dueDateTime: new Date() };

    service.creatCwTask(newCwtask).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/cwtasks');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCwtask);
    req.flush({});  // Simulate successful creation
  });

  it('should get CW task by ID', () => {
    const mockCwtask: Cwtask = { id: 1, strTitle: 'Task 1', strDescription: 'Description 1', strStatus: 'Active', dueDateTime: new Date() };

    service.getCWTaskById(1).subscribe(cwtask => {
      expect(cwtask).toEqual(mockCwtask);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/cwtasks/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCwtask);  // Simulate response for single CW task
  });

  it('should update a CW task', () => {
    const updatedCwtask: Cwtask = { id: 1, strTitle: 'Updated Task', strDescription: 'Updated Description', strStatus: 'Inactive', dueDateTime: new Date() };

    service.updateCWTaskById(1, updatedCwtask).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/cwtasks/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedCwtask);
    req.flush({});  // Simulate successful update
  });

  it('should delete a CW task', () => {
    service.deleteCWTaskById(1).subscribe(response => {
      expect(response).toBe('OK');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/cwtasks/1');
    expect(req.request.method).toBe('DELETE');
    req.flush('OK');  // Simulate response for deletion
  });
});

