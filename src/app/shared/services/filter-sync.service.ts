import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime } from "rxjs";

@Injectable({ providedIn: 'root' })
export class FilterSyncService {
  
  initFormSync(
    form: FormGroup,
    route: ActivatedRoute,
    router: Router,
    onChange: () => void
  ) {

    // Sync Query → Form
    route.queryParams.subscribe(params => {
      const patch :any = {};
      Object.keys(form.controls).forEach(key => {
        if (params[key]) {
          patch[key] = params[key].includes(',')
            ? params[key].split(',').map((x:any) => this.cast(x))
            : this.cast(params[key]);
        } else {
          patch[key] = form.get(key)?.value instanceof Array ? [] : '';
        }
      });

      form.patchValue(patch, { emitEvent: false });
    });

    // Sync Form → URL
    form.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        const queryParams = this.buildQuery(value);
        router.navigate([], {
          relativeTo: route,
          queryParams
        });
        onChange();
      });
  }

  private cast(val: any) {
    if (val === 'true') return true;
    if (val === 'false') return false;
    if (!isNaN(+val)) return +val;
    return val;
  }

  private buildQuery(value: any) {
    const q :any = {};
    Object.keys(value).forEach(key => {
      if (Array.isArray(value[key]) && value[key].length)
        q[key] = value[key].join(',');
      else if (value[key])
        q[key] = value[key];
    });
    return q;
  }
}
