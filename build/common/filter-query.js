'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const filterQuery = exports.filterQuery = req => {
  const { limit = 20, skip, status } = req.query;
  req.query.limit = limit > 19 ? 20 : +limit;
  req.query.status = status ? status : 'active';
  req.query.skip = skip ? +skip : 0;
};
//# sourceMappingURL=filter-query.js.map