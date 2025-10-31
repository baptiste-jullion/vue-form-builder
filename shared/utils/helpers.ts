import * as _ from "lodash-es";

export function cleanUndefined(obj: object) {
  return _.transform(obj, (res: any, val, key) => {
    if (!_.isUndefined(val)) {
      res[key] = _.isObject(val) ? cleanUndefined(val) : val;
    }
  }) as typeof obj;
}

export function clearObject(obj: Record<string, unknown>) {
  _.forOwn(obj, (_, key) => delete obj[key]);
}
