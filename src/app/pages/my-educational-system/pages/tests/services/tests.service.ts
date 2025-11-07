import {Injectable} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {BehaviorSubject, filter} from "rxjs";

export enum TypeTests {
  notHeld = 'not-held',
  uncorrected = 'uncorrected',
  completed = 'completed',
}

@Injectable({
  providedIn: 'root'
})
export class TestsService {

}
