import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { entryGuard } from './entry.guard';
import { of, throwError } from 'rxjs';

describe('entryGuard', () => {
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });

    httpClient = TestBed.inject(HttpClient);
  });

  it(
    'should resolve to true when the HTTP request is successful',
    waitForAsync(async () => {
      // Arrange
      const filePath = 'sample-file-path';
      spyOn(httpClient, 'get').and.returnValue(of(new Blob()));

      // Act
      const guardFunction = entryGuard(filePath);
      const result = await guardFunction();

      // Assert
      expect(result).toBeTrue();
      expect(httpClient.get).toHaveBeenCalledWith(filePath, { responseType: 'json' });
    })
  );

  it(
    'should resolve to false when the HTTP request fails',
    waitForAsync(async () => {
      // Arrange
      const filePath = 'sample-file-path';
      spyOn(httpClient, 'get').and.returnValue(throwError(new Error('Failed to fetch')));

      // Act
      const guardFunction = entryGuard(filePath);
      const result = await guardFunction();

      // Assert
      expect(result).toBeFalse();
      expect(httpClient.get).toHaveBeenCalledWith(filePath, { responseType: 'json' });
    })
  );
});
