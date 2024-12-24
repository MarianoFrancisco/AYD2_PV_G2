import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackupService {
  private readonly backupUrl = `${environment.API_URL}/database/backup`;

  constructor(private http: HttpClient) {}

  createBackup(): Observable<{ message: string; fileUrl: string }> {
    return this.http.post<{ message: string; fileUrl: string }>(this.backupUrl, {});
  }
}
