# Angular 20 Best Practices & Patterns

## 1. Component Architecture

### Standalone Components (Always)
```typescript
@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `...`
})
export class FeatureComponent {}
```

### Change Detection Strategy
```typescript
@Component({
  selector: 'app-performance',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`
})
export class PerformanceComponent {}
```

### Component Organization
```typescript
// Order of component members
export class MyComponent {
  // 1. Input properties
  @Input() data: string;
  
  // 2. Output properties  
  @Output() dataChange = new EventEmitter<string>();
  
  // 3. ViewChild/ContentChild
  @ViewChild('myRef') myRef: ElementRef;
  
  // 4. Public properties
  isLoading = false;
  
  // 5. Private properties
  private subscription: Subscription;
  
  // 6. Constructor
  constructor(private service: MyService) {}
  
  // 7. Lifecycle hooks (in order)
  ngOnInit() {}
  ngOnDestroy() {}
  
  // 8. Public methods
  handleClick() {}
  
  // 9. Private methods
  private processData() {}
}
```

## 2. Modern Angular Features

### Control Flow Syntax (v17+)
```typescript
// Use new control flow instead of structural directives
@Component({
  template: `
    <!-- Old way (avoid) -->
    <div *ngIf="condition">Content</div>
    <div *ngFor="let item of items">{{item}}</div>
    
    <!-- New way (preferred) -->
    @if (condition) {
      <div>Content</div>
    }
    
    @for (item of items; track item.id) {
      <div>{{item.name}}</div>
    } @empty {
      <div>No items</div>
    }
    
    @switch (status) {
      @case ('loading') { <app-loader /> }
      @case ('error') { <app-error /> }
      @default { <app-content /> }
    }
  `
})
```

### Signals (v16+)
```typescript
import { signal, computed, effect } from '@angular/core';

@Component({
  template: `
    <div>Count: {{ count() }}</div>
    <div>Double: {{ doubleCount() }}</div>
    <button (click)="increment()">+</button>
  `
})
export class SignalComponent {
  // Writable signal
  count = signal(0);
  
  // Computed signal
  doubleCount = computed(() => this.count() * 2);
  
  constructor() {
    // Effect runs when signals change
    effect(() => {
      console.log('Count changed:', this.count());
    });
  }
  
  increment() {
    this.count.update(v => v + 1);
  }
}
```

### DestroyRef Pattern (v16+)
```typescript
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({...})
export class ModernComponent {
  private destroyRef = inject(DestroyRef);
  
  ngOnInit() {
    // Automatic cleanup
    this.service.data$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        // Handle data
      });
  }
}
```

## 3. Dependency Injection

### Inject Function (Preferred)
```typescript
@Component({...})
export class InjectComponent {
  // Preferred: inject() function
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  
  // Avoid: constructor injection (unless needed for testing)
  constructor() {}
}
```

### Service Patterns
```typescript
@Injectable({
  providedIn: 'root' // Always use this for app-wide services
})
export class DataService {
  private dataSubject = new BehaviorSubject<Data[]>([]);
  
  // Expose as observable
  data$ = this.dataSubject.asObservable();
  
  // Use signals for state
  dataSignal = signal<Data[]>([]);
  
  loadData() {
    return this.http.get<Data[]>('/api/data').pipe(
      tap(data => {
        this.dataSubject.next(data);
        this.dataSignal.set(data);
      }),
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong'));
  }
}
```

## 4. RxJS Best Practices

### Operator Usage
```typescript
// Good: Use proper operators
data$ = this.service.getData().pipe(
  map(data => data.filter(item => item.active)),
  distinctUntilChanged(),
  shareReplay(1)
);

// Avoid: Nested subscriptions
// BAD
this.service.getData().subscribe(data => {
  this.service.processData(data).subscribe(result => {
    // Nested subscription - avoid!
  });
});

// GOOD: Use higher-order operators
this.service.getData().pipe(
  switchMap(data => this.service.processData(data)),
  takeUntilDestroyed(this.destroyRef)
).subscribe(result => {
  // Handle result
});
```

### Async Pipe Pattern
```typescript
@Component({
  template: `
    @if (data$ | async; as data) {
      <div>{{ data.name }}</div>
    } @else {
      <div>Loading...</div>
    }
  `
})
export class AsyncComponent {
  data$ = this.service.getData();
}
```

## 5. Forms Best Practices

### Reactive Forms (Preferred)
```typescript
@Component({
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="email" />
      @if (form.get('email')?.errors?.['required'] && form.get('email')?.touched) {
        <span>Email is required</span>
      }
    </form>
  `
})
export class FormComponent {
  private fb = inject(FormBuilder);
  
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  
  onSubmit() {
    if (this.form.valid) {
      // Process form
    }
  }
}
```

### Custom Validators
```typescript
// Validator function
export function customValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;
    
    return value.length > 10 
      ? null 
      : { customError: { requiredLength: 10, actualLength: value.length } };
  };
}
```

## 6. Performance Optimization

### TrackBy Functions
```typescript
@Component({
  template: `
    @for (item of items; track trackById) {
      <app-item [data]="item" />
    }
  `
})
export class ListComponent {
  trackById(index: number, item: any): any {
    return item.id;
  }
}
```

### Lazy Loading
```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'feature',
    loadComponent: () => import('./feature/feature.component')
      .then(m => m.FeatureComponent)
  },
  {
    path: 'module',
    loadChildren: () => import('./module/module.routes')
      .then(m => m.MODULE_ROUTES)
  }
];
```

### Virtual Scrolling
```typescript
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  imports: [CdkVirtualScrollViewport],
  template: `
    <cdk-virtual-scroll-viewport itemSize="50" class="h-96">
      <div *cdkVirtualFor="let item of items">{{item}}</div>
    </cdk-virtual-scroll-viewport>
  `
})
```

## 7. Error Handling

### Global Error Handler
```typescript
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error): void {
    console.error('Global error:', error);
    // Send to logging service
  }
}

// In app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
};
```

### HTTP Interceptors
```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).getToken();
  
  if (authToken) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` }
    });
  }
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        inject(Router).navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
```

## 8. Testing Patterns

### Component Testing
```typescript
describe('ComponentTest', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;
  let service: jasmine.SpyObj<MyService>;
  
  beforeEach(() => {
    const spy = jasmine.createSpyObj('MyService', ['getData']);
    
    TestBed.configureTestingModule({
      imports: [MyComponent],
      providers: [
        { provide: MyService, useValue: spy }
      ]
    });
    
    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(MyService) as jasmine.SpyObj<MyService>;
  });
  
  it('should load data on init', () => {
    const testData = [{ id: 1, name: 'Test' }];
    service.getData.and.returnValue(of(testData));
    
    fixture.detectChanges();
    
    expect(service.getData).toHaveBeenCalled();
    expect(component.data).toEqual(testData);
  });
});
```

## 9. State Management

### Simple State with Signals
```typescript
@Injectable({ providedIn: 'root' })
export class StateService {
  // State
  private state = signal<AppState>({
    user: null,
    isLoading: false
  });
  
  // Selectors
  user = computed(() => this.state().user);
  isLoading = computed(() => this.state().isLoading);
  
  // Actions
  setUser(user: User) {
    this.state.update(state => ({ ...state, user }));
  }
  
  setLoading(isLoading: boolean) {
    this.state.update(state => ({ ...state, isLoading }));
  }
}
```

## 10. Security Best Practices

### Sanitization
```typescript
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  template: `
    <!-- Automatic sanitization -->
    <div [innerHTML]="htmlContent"></div>
    
    <!-- Manual sanitization for URLs -->
    <a [href]="trustedUrl">Link</a>
  `
})
export class SafeComponent {
  private sanitizer = inject(DomSanitizer);
  
  trustedUrl = this.sanitizer.sanitize(
    SecurityContext.URL, 
    this.untrustedUrl
  );
}
```

### Content Security Policy
```html
<!-- In index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline';">
```

## Common Pitfalls to Avoid

1. **Memory Leaks**: Always unsubscribe from observables
2. **Direct DOM Manipulation**: Use Angular's renderer or directives
3. **Any Type**: Always use proper TypeScript types
4. **Nested Subscriptions**: Use RxJS operators instead
5. **Business Logic in Templates**: Keep templates simple
6. **Mutating State**: Use immutable updates
7. **Not Using TrackBy**: Always use with @for loops
8. **Ignoring Change Detection**: Understand and optimize
9. **Over-engineering**: Start simple, refactor as needed
10. **Not Testing**: Write tests as you develop