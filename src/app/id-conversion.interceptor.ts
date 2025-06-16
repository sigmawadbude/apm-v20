import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { map } from "rxjs";

export const idConversionInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map((event) => {
      if (event instanceof HttpResponse && event.body) {
        const convert = (item: any) => {
          if (item && item._id && !item.id) {
            const { _id, ...rest } = item;
            return {
              ...rest,
              id: _id,
            };
          }
          return item;
        };

        const modifiedBody = Array.isArray(event.body)
          ? event.body.map(convert)
          : convert(event.body);

        return event.clone({ body: modifiedBody });
      }
      return event;
    })
  );
};
