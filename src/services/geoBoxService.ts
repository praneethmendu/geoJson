import { of, from } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { switchMap, catchError } from "rxjs/operators";
import osmtogeojson from "osmtogeojson";

import { Bound } from "../model/bound";

const geoBoxService = (bound: Bound) =>
  fromFetch(
    `https://www.openstreetmap.org/api/0.6/map?bbox=${bound.left},${bound.bottom},${bound.right},${bound.top}`
  ).pipe(
    switchMap((response) => {
      if (response.ok) {
        return from(
          response
            .text()
            .then((rawosm) =>
              osmtogeojson(new DOMParser().parseFromString(rawosm, "text/xml"))
            )
        );
      } else {
        console.log(response);
        return from(
          response.text().then((respText) => {
            return { error: true, message: respText };
          })
        );
      }
    }),
    catchError((err) => {
      console.error(err);
      return of({ error: true, message: err.message });
    })
  );

export default geoBoxService;
